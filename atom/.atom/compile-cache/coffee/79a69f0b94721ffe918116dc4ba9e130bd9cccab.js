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
    attachInstance: function(editorView, editor) {
      return editorView._atomicEmacs != null ? editorView._atomicEmacs : editorView._atomicEmacs = new AtomicEmacs(editorView, editor);
    },
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

    AtomicEmacs.prototype.Mark = Mark;

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
      var c, maxOffset, maxRow, minOffset, minRow;
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
      minOffset = this.editorView.pixelPositionForBufferPosition([minRow, 0]);
      maxOffset = this.editorView.pixelPositionForBufferPosition([maxRow, 0]);
      return this.editorView.scrollTop((minOffset.top + maxOffset.top - this.editorView.scrollView.height()) / 2);
    };

    return AtomicEmacs;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDJGQUFBOztBQUFBLEVBQUEsV0FBQSxHQUFjLE9BQUEsQ0FBUSxnQkFBUixDQUFkLENBQUE7O0FBQUEsRUFDQSxJQUFBLEdBQU8sT0FBQSxDQUFRLFFBQVIsQ0FEUCxDQUFBOztBQUFBLEVBR0Esb0JBQUEsR0FBdUIsU0FBQyxNQUFELEdBQUE7QUFDckIsUUFBQSx1QkFBQTtBQUFBLElBQUEsV0FBQSxHQUFrQixJQUFBLFdBQUEsQ0FBWSxNQUFaLENBQWxCLENBQUE7QUFBQSxJQUNBLFdBQVcsQ0FBQyxzQkFBWixDQUFtQyxLQUFuQyxDQURBLENBQUE7QUFBQSxJQUVBLEtBQUEsR0FBUSxNQUFNLENBQUMsaUJBQVAsQ0FBQSxDQUZSLENBQUE7QUFBQSxJQUdBLFdBQVcsQ0FBQyxxQkFBWixDQUFrQyxLQUFsQyxDQUhBLENBQUE7QUFBQSxJQUlBLEdBQUEsR0FBTSxNQUFNLENBQUMsaUJBQVAsQ0FBQSxDQUpOLENBQUE7V0FLQSxDQUFDLEtBQUQsRUFBUSxHQUFSLEVBTnFCO0VBQUEsQ0FIdkIsQ0FBQTs7QUFBQSxFQVdBLGtCQUFBLEdBQXFCLFNBQUMsTUFBRCxHQUFBO0FBQ25CLFFBQUEsbUJBQUE7QUFBQSxJQUFBLEdBQUEsR0FBTSxNQUFNLENBQUMsaUJBQVAsQ0FBQSxDQUEwQixDQUFDLEdBQWpDLENBQUE7QUFBQSxJQUNBLE1BQUEsR0FBUyxNQUFNLENBQUMsTUFEaEIsQ0FBQTtBQUVBLElBQUEsSUFBRyxHQUFBLEtBQU8sTUFBTSxDQUFDLFlBQVAsQ0FBQSxDQUFBLEdBQXdCLENBQWxDO0FBQ0UsTUFBQSxNQUFBLEdBQVMsTUFBTSxDQUFDLG9CQUFQLENBQUEsQ0FBNkIsQ0FBQyxNQUF2QyxDQUFBO2FBQ0EsTUFBTSxDQUFDLG9CQUFQLENBQTRCLENBQUMsQ0FBQyxHQUFE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
//# sourceURL=/Users/tra/.atom/packages/atomic-emacs/lib/atomic-emacs.coffee