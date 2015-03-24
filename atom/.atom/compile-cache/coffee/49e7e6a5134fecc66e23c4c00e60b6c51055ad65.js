(function() {
  var AtomicEmacs, CursorTools, Mark, deactivateCursors, endLineIfNecessary, horizontalSpaceRange;

  CursorTools = require('./cursor-tools');

  Mark = require('./mark');

  horizontalSpaceRange = function(cursor) {
    var cursorTools, end, start;
    cursorTools = new CursorTools(cursor);
    cursorTools.skipCharactersBackward(' \t');
    start = cursor.getBufferPosition();
    cursorTools.skipCharactersForward(' \t');
    end = cursor.getBufferPosition();
    return [start, end];
  };

  endLineIfNecessary = function(cursor) {
    var editor, length, row;
    row = cursor.getBufferPosition().row;
    editor = cursor.editor;
    if (row === editor.getLineCount() - 1) {
      length = cursor.getCurrentBufferLine().length;
      return editor.setTextInBufferRange([[row, length], [row, length]], "\n");
    }
  };

  deactivateCursors = function(editor) {
    var cursor, _i, _len, _ref, _results;
    _ref = editor.getCursors();
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      cursor = _ref[_i];
      _results.push(Mark["for"](cursor).deactivate());
    }
    return _results;
  };

  module.exports = {
    Mark: Mark,
    activate: function() {
      return atom.workspaceView.eachEditorView(function(editorView) {
        var atomicEmacs;
        atomicEmacs = new AtomicEmacs(editorView, editorView.editor);
        editorView.command("atomic-emacs:upcase-region", (function(_this) {
          return function(event) {
            return atomicEmacs.upcaseRegion(event);
          };
        })(this));
        editorView.command("atomic-emacs:downcase-region", (function(_this) {
          return function(event) {
            return atomicEmacs.downcaseRegion(event);
          };
        })(this));
        editorView.command("atomic-emacs:open-line", (function(_this) {
          return function(event) {
            return atomicEmacs.openLine(event);
          };
        })(this));
        editorView.command("atomic-emacs:transpose-chars", (function(_this) {
          return function(event) {
            return atomicEmacs.transposeChars(event);
          };
        })(this));
        editorView.command("atomic-emacs:transpose-words", (function(_this) {
          return function(event) {
            return atomicEmacs.transposeWords(event);
          };
        })(this));
        editorView.command("atomic-emacs:transpose-lines", (function(_this) {
          return function(event) {
            return atomicEmacs.transposeLines(event);
          };
        })(this));
        editorView.command("atomic-emacs:mark-whole-buffer", (function(_this) {
          return function(event) {
            return atomicEmacs.markWholeBuffer(event);
          };
        })(this));
        editorView.command("atomic-emacs:set-mark", (function(_this) {
          return function(event) {
            return atomicEmacs.setMark(event);
          };
        })(this));
        editorView.command("atomic-emacs:exchange-point-and-mark", (function(_this) {
          return function(event) {
            return atomicEmacs.exchangePointAndMark(event);
          };
        })(this));
        editorView.command("atomic-emacs:copy", (function(_this) {
          return function(event) {
            return atomicEmacs.copy(event);
          };
        })(this));
        editorView.command("atomic-emacs:forward-char", (function(_this) {
          return function(event) {
            return atomicEmacs.forwardChar(event);
          };
        })(this));
        editorView.command("atomic-emacs:backward-char", (function(_this) {
          return function(event) {
            return atomicEmacs.backwardChar(event);
          };
        })(this));
        editorView.command("atomic-emacs:forward-word", (function(_this) {
          return function(event) {
            return atomicEmacs.forwardWord(event);
          };
        })(this));
        editorView.command("atomic-emacs:kill-word", (function(_this) {
          return function(event) {
            return atomicEmacs.killWord(event);
          };
        })(this));
        editorView.command("atomic-emacs:next-line", (function(_this) {
          return function(event) {
            return atomicEmacs.nextLine(event);
          };
        })(this));
        editorView.command("atomic-emacs:previous-line", (function(_this) {
          return function(event) {
            return atomicEmacs.previousLine(event);
          };
        })(this));
        editorView.command("atomic-emacs:beginning-of-buffer", (function(_this) {
          return function(event) {
            return atomicEmacs.beginningOfBuffer(event);
          };
        })(this));
        editorView.command("atomic-emacs:end-of-buffer", (function(_this) {
          return function(event) {
            return atomicEmacs.endOfBuffer(event);
          };
        })(this));
        editorView.command("atomic-emacs:scroll-up", (function(_this) {
          return function(event) {
            return atomicEmacs.scrollUp(event);
          };
        })(this));
        editorView.command("atomic-emacs:scroll-down", (function(_this) {
          return function(event) {
            return atomicEmacs.scrollDown(event);
          };
        })(this));
        editorView.command("atomic-emacs:backward-paragraph", (function(_this) {
          return function(event) {
            return atomicEmacs.backwardParagraph(event);
          };
        })(this));
        editorView.command("atomic-emacs:forward-paragraph", (function(_this) {
          return function(event) {
            return atomicEmacs.forwardParagraph(event);
          };
        })(this));
        editorView.command("atomic-emacs:backward-word", (function(_this) {
          return function(event) {
            return atomicEmacs.backwardWord(event);
          };
        })(this));
        editorView.command("atomic-emacs:backward-kill-word", (function(_this) {
          return function(event) {
            return atomicEmacs.backwardKillWord(event);
          };
        })(this));
        editorView.command("atomic-emacs:just-one-space", (function(_this) {
          return function(event) {
            return atomicEmacs.justOneSpace(event);
          };
        })(this));
        editorView.command("atomic-emacs:delete-horizontal-space", (function(_this) {
          return function(event) {
            return atomicEmacs.deleteHorizontalSpace(event);
          };
        })(this));
        editorView.command("atomic-emacs:recenter-top-bottom", (function(_this) {
          return function(event) {
            return atomicEmacs.recenterTopBottom(event);
          };
        })(this));
        return editorView.command("core:cancel", (function(_this) {
          return function(event) {
            return atomicEmacs.keyboardQuit(event);
          };
        })(this));
      });
    }
  };

  AtomicEmacs = (function() {
    function AtomicEmacs(editorView, editor) {
      this.editorView = editorView;
      this.editor = editor;
    }

    AtomicEmacs.prototype.upcaseRegion = function(event) {
      return this.editor.upperCase();
    };

    AtomicEmacs.prototype.downcaseRegion = function(event) {
      return this.editor.lowerCase();
    };

    AtomicEmacs.prototype.openLine = function(event) {
      this.editor.insertNewline();
      return this.editor.moveCursorUp();
    };

    AtomicEmacs.prototype.transposeChars = function(event) {
      this.editor.transpose();
      return this.editor.moveCursorRight();
    };

    AtomicEmacs.prototype.transposeWords = function(event) {
      return this.editor.transact((function(_this) {
        return function() {
          var cursor, cursorTools, word1, word1Pos, word2, word2Pos, _i, _len, _ref, _results;
          _ref = _this.editor.getCursors();
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            cursor = _ref[_i];
            cursorTools = new CursorTools(cursor);
            cursorTools.skipNonWordCharactersBackward();
            word1 = cursorTools.extractWord();
            word1Pos = cursor.getBufferPosition();
            cursorTools.skipNonWordCharactersForward();
            if (_this.editor.getEofBufferPosition().isEqual(cursor.getBufferPosition())) {
              _this.editor.setTextInBufferRange([word1Pos, word1Pos], word1);
              cursorTools.skipNonWordCharactersBackward();
            } else {
              word2 = cursorTools.extractWord();
              word2Pos = cursor.getBufferPosition();
              _this.editor.setTextInBufferRange([word2Pos, word2Pos], word1);
              _this.editor.setTextInBufferRange([word1Pos, word1Pos], word2);
            }
            _results.push(cursor.setBufferPosition(cursor.getBufferPosition()));
          }
          return _results;
        };
      })(this));
    };

    AtomicEmacs.prototype.transposeLines = function(event) {
      var cursor, row;
      cursor = this.editor.getCursor();
      row = cursor.getBufferRow();
      return this.editor.transact((function(_this) {
        return function() {
          var text;
          if (row === 0) {
            endLineIfNecessary(cursor);
            cursor.moveDown();
            row += 1;
          }
          endLineIfNecessary(cursor);
          text = _this.editor.getTextInBufferRange([[row, 0], [row + 1, 0]]);
          _this.editor.deleteLine(row);
          return _this.editor.setTextInBufferRange([[row - 1, 0], [row - 1, 0]], text);
        };
      })(this));
    };

    AtomicEmacs.prototype.markWholeBuffer = function(event) {
      return this.editor.selectAll();
    };

    AtomicEmacs.prototype.setMark = function(event) {
      var cursor, _i, _len, _ref, _results;
      _ref = this.editor.getCursors();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        cursor = _ref[_i];
        _results.push(Mark["for"](cursor).set().activate());
      }
      return _results;
    };

    AtomicEmacs.prototype.keyboardQuit = function(event) {
      return deactivateCursors(this.editor);
    };

    AtomicEmacs.prototype.exchangePointAndMark = function(event) {
      return this.editor.moveCursors(function(cursor) {
        return Mark["for"](cursor).exchange();
      });
    };

    AtomicEmacs.prototype.copy = function(event) {
      this.editor.copySelectedText();
      return deactivateCursors(this.editor);
    };

    AtomicEmacs.prototype.forwardChar = function(event) {
      return this.editor.moveCursors(function(cursor) {
        return cursor.moveRight();
      });
    };

    AtomicEmacs.prototype.backwardChar = function(event) {
      return this.editor.moveCursors(function(cursor) {
        return cursor.moveLeft();
      });
    };

    AtomicEmacs.prototype.forwardWord = function(event) {
      return this.editor.moveCursors(function(cursor) {
        var tools;
        tools = new CursorTools(cursor);
        tools.skipNonWordCharactersForward();
        return tools.skipWordCharactersForward();
      });
    };

    AtomicEmacs.prototype.backwardWord = function(event) {
      return this.editor.moveCursors(function(cursor) {
        var tools;
        tools = new CursorTools(cursor);
        tools.skipNonWordCharactersBackward();
        return tools.skipWordCharactersBackward();
      });
    };

    AtomicEmacs.prototype.nextLine = function(event) {
      if (atom.workspaceView.find('.fuzzy-finder').view() || atom.workspaceView.find('.command-palette').view()) {
        event.abortKeyBinding();
      }
      return this.editor.moveCursors(function(cursor) {
        return cursor.moveDown();
      });
    };

    AtomicEmacs.prototype.previousLine = function(event) {
      if (atom.workspaceView.find('.fuzzy-finder').view() || atom.workspaceView.find('.command-palette').view()) {
        event.abortKeyBinding();
      }
      return this.editor.moveCursors(function(cursor) {
        return cursor.moveUp();
      });
    };

    AtomicEmacs.prototype.scrollUp = function(event) {
      var currentRow, firstRow, lastRow, rowCount;
      firstRow = this.editorView.getFirstVisibleScreenRow();
      lastRow = this.editorView.getLastVisibleScreenRow();
      currentRow = this.editor.cursors[0].getBufferRow();
      rowCount = (lastRow - firstRow) - (currentRow - firstRow);
      this.editorView.scrollToBufferPosition([lastRow * 2, 0]);
      return this.editor.moveCursorDown(rowCount);
    };

    AtomicEmacs.prototype.scrollDown = function(event) {
      var currentRow, firstRow, lastRow, rowCount;
      firstRow = this.editorView.getFirstVisibleScreenRow();
      lastRow = this.editorView.getLastVisibleScreenRow();
      currentRow = this.editor.cursors[0].getBufferRow();
      rowCount = (lastRow - firstRow) - (lastRow - currentRow);
      this.editorView.scrollToBufferPosition([Math.floor(firstRow / 2), 0]);
      return this.editor.moveCursorUp(rowCount);
    };

    AtomicEmacs.prototype.backwardParagraph = function(event) {
      var blankRange, blankRow, currentRow, cursor, cursorTools, rowCount, _i, _len, _ref, _results;
      _ref = this.editor.getCursors();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        cursor = _ref[_i];
        currentRow = this.editor.getCursorBufferPosition().row;
        if (currentRow <= 0) {
          break;
        }
        cursorTools = new CursorTools(cursor);
        blankRow = cursorTools.locateBackward(/^\s+$|^\s*$/).start.row;
        while (currentRow === blankRow) {
          if (currentRow <= 0) {
            break;
          }
          this.editor.moveCursorUp();
          currentRow = this.editor.getCursorBufferPosition().row;
          blankRange = cursorTools.locateBackward(/^\s+$|^\s*$/);
          blankRow = blankRange ? blankRange.start.row : 0;
        }
        rowCount = currentRow - blankRow;
        _results.push(this.editor.moveCursorUp(rowCount));
      }
      return _results;
    };

    AtomicEmacs.prototype.forwardParagraph = function(event) {
      var blankRow, currentRow, cursor, cursorTools, lineCount, rowCount, _i, _len, _ref, _results;
      lineCount = this.editor.buffer.getLineCount() - 1;
      _ref = this.editor.getCursors();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        cursor = _ref[_i];
        currentRow = this.editor.getCursorBufferPosition().row;
        if (currentRow >= lineCount) {
          break;
        }
        cursorTools = new CursorTools(cursor);
        blankRow = cursorTools.locateForward(/^\s+$|^\s*$/).start.row;
        while (currentRow === blankRow) {
          this.editor.moveCursorDown();
          currentRow = this.editor.getCursorBufferPosition().row;
          blankRow = cursorTools.locateForward(/^\s+$|^\s*$/).start.row;
        }
        rowCount = blankRow - currentRow;
        _results.push(this.editor.moveCursorDown(rowCount));
      }
      return _results;
    };

    AtomicEmacs.prototype.backwardKillWord = function(event) {
      return this.editor.transact((function(_this) {
        return function() {
          var selection, _i, _len, _ref, _results;
          _ref = _this.editor.getSelections();
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            selection = _ref[_i];
            _results.push(selection.modifySelection(function() {
              var cursorTools;
              if (selection.isEmpty()) {
                cursorTools = new CursorTools(selection.cursor);
                cursorTools.skipNonWordCharactersBackward();
                cursorTools.skipWordCharactersBackward();
              }
              return selection.deleteSelectedText();
            }));
          }
          return _results;
        };
      })(this));
    };

    AtomicEmacs.prototype.killWord = function(event) {
      return this.editor.transact((function(_this) {
        return function() {
          var selection, _i, _len, _ref, _results;
          _ref = _this.editor.getSelections();
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            selection = _ref[_i];
            _results.push(selection.modifySelection(function() {
              var cursorTools;
              if (selection.isEmpty()) {
                cursorTools = new CursorTools(selection.cursor);
                cursorTools.skipNonWordCharactersForward();
                cursorTools.skipWordCharactersForward();
              }
              return selection.deleteSelectedText();
            }));
          }
          return _results;
        };
      })(this));
    };

    AtomicEmacs.prototype.justOneSpace = function(event) {
      var cursor, range, _i, _len, _ref, _results;
      _ref = this.editor.cursors;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        cursor = _ref[_i];
        range = horizontalSpaceRange(cursor);
        _results.push(this.editor.setTextInBufferRange(range, ' '));
      }
      return _results;
    };

    AtomicEmacs.prototype.deleteHorizontalSpace = function(event) {
      var cursor, range, _i, _len, _ref, _results;
      _ref = this.editor.cursors;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        cursor = _ref[_i];
        range = horizontalSpaceRange(cursor);
        _results.push(this.editor.setTextInBufferRange(range, ''));
      }
      return _results;
    };

    AtomicEmacs.prototype.recenterTopBottom = function(event) {
      var c, maxOffset, maxRow, minOffset, minRow, view;
      view = event.targetView();
      minRow = Math.min.apply(Math, (function() {
        var _i, _len, _ref, _results;
        _ref = this.editor.getCursors();
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          c = _ref[_i];
          _results.push(c.getBufferRow());
        }
        return _results;
      }).call(this));
      maxRow = Math.max.apply(Math, (function() {
        var _i, _len, _ref, _results;
        _ref = this.editor.getCursors();
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          c = _ref[_i];
          _results.push(c.getBufferRow());
        }
        return _results;
      }).call(this));
      minOffset = view.pixelPositionForBufferPosition([minRow, 0]);
      maxOffset = view.pixelPositionForBufferPosition([maxRow, 0]);
      return view.scrollTop((minOffset.top + maxOffset.top - view.scrollView.height()) / 2);
    };

    return AtomicEmacs;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDJGQUFBOztBQUFBLEVBQUEsV0FBQSxHQUFjLE9BQUEsQ0FBUSxnQkFBUixDQUFkLENBQUE7O0FBQUEsRUFDQSxJQUFBLEdBQU8sT0FBQSxDQUFRLFFBQVIsQ0FEUCxDQUFBOztBQUFBLEVBR0Esb0JBQUEsR0FBdUIsU0FBQyxNQUFELEdBQUE7QUFDckIsUUFBQSx1QkFBQTtBQUFBLElBQUEsV0FBQSxHQUFrQixJQUFBLFdBQUEsQ0FBWSxNQUFaLENBQWxCLENBQUE7QUFBQSxJQUNBLFdBQVcsQ0FBQyxzQkFBWixDQUFtQyxLQUFuQyxDQURBLENBQUE7QUFBQSxJQUVBLEtBQUEsR0FBUSxNQUFNLENBQUMsaUJBQVAsQ0FBQSxDQUZSLENBQUE7QUFBQSxJQUdBLFdBQVcsQ0FBQyxxQkFBWixDQUFrQyxLQUFsQyxDQUhBLENBQUE7QUFBQSxJQUlBLEdBQUEsR0FBTSxNQUFNLENBQUMsaUJBQVAsQ0FBQSxDQUpOLENBQUE7V0FLQSxDQUFDLEtBQUQsRUFBUSxHQUFSLEVBTnFCO0VBQUEsQ0FIdkIsQ0FBQTs7QUFBQSxFQVdBLGtCQUFBLEdBQXFCLFNBQUMsTUFBRCxHQUFBO0FBQ25CLFFBQUEsbUJBQUE7QUFBQSxJQUFBLEdBQUEsR0FBTSxNQUFNLENBQUMsaUJBQVAsQ0FBQSxDQUEwQixDQUFDLEdBQWpDLENBQUE7QUFBQSxJQUNBLE1BQUEsR0FBUyxNQUFNLENBQUMsTUFEaEIsQ0FBQTtBQUVBLElBQUEsSUFBRyxHQUFBLEtBQU8sTUFBTSxDQUFDLFlBQVAsQ0FBQSxDQUFBLEdBQXdCLENBQWxDO0FBQ0UsTUFBQSxNQUFBLEdBQVMsTUFBTSxDQUFDLG9CQUFQLENBQUEsQ0FBNkIsQ0FBQyxNQUF2QyxDQUFBO2FBQ0EsTUFBTSxDQUFDLG9CQUFQLENBQTRCLENBQUMsQ0FBQyxHQUFE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
//# sourceURL=/Users/tra/.atom/packages/atomic-emacs/lib/atomic-emacs.coffee