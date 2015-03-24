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
      return this.cursor.selection.screenRangeChanged(this.marker);
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