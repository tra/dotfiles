(function() {
  var Mark, Point;

  Point = require('atom').Point;

  Mark = (function() {
    function Mark(cursor) {
      this.cursor = cursor;
      this.editor = cursor.editor;
      this.marker = this.editor.markBufferPosition(cursor.getBufferPosition());
      this.active = false;
      this.updating = false;
      this.cursorDestroyedCallback = (function(_this) {
        return function(event) {
          return _this._destroy();
        };
      })(this);
      this.cursor.on('destroyed', this.cursorDestroyedCallback);
    }

    Mark.prototype.set = function() {
      this.deactivate();
      this.marker.setHeadBufferPosition(this.cursor.getBufferPosition());
      return this;
    };

    Mark.prototype.getBufferPosition = function() {
      return this.marker.getHeadBufferPosition();
    };

    Mark.prototype.activate = function() {
      if (!this.active) {
        if (this.movedCallback == null) {
          this.movedCallback = (function(_this) {
            return function(event) {
              return _this._updateSelection(event);
            };
          })(this);
        }
        if (this.modifiedCallback == null) {
          this.modifiedCallback = (function(_this) {
            return function(event) {
              if (_this._isIndent(event) || _this._isOutdent(event)) {
                return;
              }
              return _this.deactivate();
            };
          })(this);
        }
        this.cursor.on('moved', this.movedCallback);
        this.editor.getBuffer().on('changed', this.modifiedCallback);
        return this.active = true;
      }
    };

    Mark.prototype.deactivate = function() {
      if (this.active) {
        this.cursor.off('moved', this.movedCallback);
        this.editor.getBuffer().on('changed', this.modifiedCallback);
        this.active = false;
      }
      this.cursor.clearSelection();
      return this.cursor.selection.screenRangeChanged();
    };

    Mark.prototype.isActive = function() {
      return this.active;
    };

    Mark.prototype.exchange = function() {
      var position;
      position = this.marker.getHeadBufferPosition();
      this.set().activate();
      return this.cursor.setBufferPosition(position);
    };

    Mark.prototype._destroy = function() {
      if (this.active) {
        this.deactivate();
      }
      this.marker.destroy();
      this.cursor.off('destroyed', this.cursorDestroyedCallback);
      return delete this.cursor._atomicEmacsMark;
    };

    Mark.prototype._updateSelection = function(event) {
      var a, b;
      if (!this.updating) {
        this.updating = true;
        try {
          a = this.marker.getHeadBufferPosition();
          b = this.cursor.getBufferPosition();
          return this.cursor.selection.setBufferRange([a, b], {
            isReversed: Point.min(a, b) === b
          });
        } finally {
          this.updating = false;
        }
      }
    };

    Mark["for"] = function(cursor) {
      return cursor._atomicEmacsMark != null ? cursor._atomicEmacsMark : cursor._atomicEmacsMark = new Mark(cursor);
    };

    Mark.prototype._isIndent = function(event) {
      return this._isIndentOutdent(event.newRange, event.newText);
    };

    Mark.prototype._isOutdent = function(event) {
      return this._isIndentOutdent(event.oldRange, event.oldText);
    };

    Mark.prototype._isIndentOutdent = function(range, text) {
      var diff, tabLength;
      tabLength = this.editor.getTabLength();
      diff = range.end.column - range.start.column;
      if (diff === this.editor.getTabLength() && range.start.row === range.end.row && this._checkTextForSpaces(text, tabLength)) {
        return true;
      }
    };

    Mark.prototype._checkTextForSpaces = function(text, tabSize) {
      var ch, _i, _len;
      if (!(text && text.length === tabSize)) {
        return false;
      }
      for (_i = 0, _len = text.length; _i < _len; _i++) {
        ch = text[_i];
        if (ch !== " ") {
          return false;
        }
      }
      return true;
    };

    return Mark;

  })();

  module.exports = Mark;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLFdBQUE7O0FBQUEsRUFBQyxRQUFTLE9BQUEsQ0FBUSxNQUFSLEVBQVQsS0FBRCxDQUFBOztBQUFBLEVBYU07QUFDUyxJQUFBLGNBQUMsTUFBRCxHQUFBO0FBQ1gsTUFBQSxJQUFDLENBQUEsTUFBRCxHQUFVLE1BQVYsQ0FBQTtBQUFBLE1BQ0EsSUFBQyxDQUFBLE1BQUQsR0FBVSxNQUFNLENBQUMsTUFEakIsQ0FBQTtBQUFBLE1BRUEsSUFBQyxDQUFBLE1BQUQsR0FBVSxJQUFDLENBQUEsTUFBTSxDQUFDLGtCQUFSLENBQTJCLE1BQU0sQ0FBQyxpQkFBUCxDQUFBLENBQTNCLENBRlYsQ0FBQTtBQUFBLE1BR0EsSUFBQyxDQUFBLE1BQUQsR0FBVSxLQUhWLENBQUE7QUFBQSxNQUlBLElBQUMsQ0FBQSxRQUFELEdBQVksS0FKWixDQUFBO0FBQUEsTUFNQSxJQUFDLENBQUEsdUJBQUQsR0FBMkIsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUMsS0FBRCxHQUFBO2lCQUFXLEtBQUMsQ0FBQSxRQUFELENBQUEsRUFBWDtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBTjNCLENBQUE7QUFBQSxNQU9BLElBQUMsQ0FBQSxNQUFNLENBQUMsRUFBUixDQUFXLFdBQVgsRUFBd0IsSUFBQyxDQUFBLHVCQUF6QixDQVBBLENBRFc7SUFBQSxDQUFiOztBQUFBLG1CQVVBLEdBQUEsR0FBSyxTQUFBLEdBQUE7QUFDSCxNQUFBLElBQUMsQ0FBQSxVQUFELENBQUEsQ0FBQSxDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsTUFBTSxDQUFDLHFCQUFSLENBQThCLElBQUMsQ0FBQSxNQUFNLENBQUMsaUJBQVIsQ0FBQSxDQUE5QixDQURBLENBQUE7YUFFQSxLQUhHO0lBQUEsQ0FWTCxD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
//# sourceURL=/Users/tra/.atom/packages/atomic-emacs/lib/mark.coffee