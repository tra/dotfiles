(function() {
  var CursorTools, Mark, deactivateCursors, endLineIfNecessary, getActiveEditor, horizontalSpaceRange;

  CursorTools = require('./cursor-tools');

  Mark = require('./mark');

  getActiveEditor = function(event) {
    return event.targetView().editor;
  };

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
      atom.workspaceView.command("atomic-emacs:upcase-region", (function(_this) {
        return function(event) {
          return _this.upcaseRegion(event);
        };
      })(this));
      atom.workspaceView.command("atomic-emacs:downcase-region", (function(_this) {
        return function(event) {
          return _this.downcaseRegion(event);
        };
      })(this));
      atom.workspaceView.command("atomic-emacs:open-line", (function(_this) {
        return function(event) {
          return _this.openLine(event);
        };
      })(this));
      atom.workspaceView.command("atomic-emacs:transpose-chars", (function(_this) {
        return function(event) {
          return _this.transposeChars(event);
        };
      })(this));
      atom.workspaceView.command("atomic-emacs:transpose-words", (function(_this) {
        return function(event) {
          return _this.transposeWords(event);
        };
      })(this));
      atom.workspaceView.command("atomic-emacs:transpose-lines", (function(_this) {
        return function(event) {
          return _this.transposeLines(event);
        };
      })(this));
      atom.workspaceView.command("atomic-emacs:mark-whole-buffer", (function(_this) {
        return function(event) {
          return _this.markWholeBuffer(event);
        };
      })(this));
      atom.workspaceView.command("atomic-emacs:set-mark", (function(_this) {
        return function(event) {
          return _this.setMark(event);
        };
      })(this));
      atom.workspaceView.command("atomic-emacs:exchange-point-and-mark", (function(_this) {
        return function(event) {
          return _this.exchangePointAndMark(event);
        };
      })(this));
      atom.workspaceView.command("atomic-emacs:copy", (function(_this) {
        return function(event) {
          return _this.copy(event);
        };
      })(this));
      atom.workspaceView.command("atomic-emacs:forward-char", (function(_this) {
        return function(event) {
          return _this.forwardChar(event);
        };
      })(this));
      atom.workspaceView.command("atomic-emacs:backward-char", (function(_this) {
        return function(event) {
          return _this.backwardChar(event);
        };
      })(this));
      atom.workspaceView.command("atomic-emacs:forward-word", (function(_this) {
        return function(event) {
          return _this.forwardWord(event);
        };
      })(this));
      atom.workspaceView.command("atomic-emacs:kill-word", (function(_this) {
        return function(event) {
          return _this.killWord(event);
        };
      })(this));
      atom.workspaceView.command("atomic-emacs:next-line", (function(_this) {
        return function(event) {
          return _this.nextLine(event);
        };
      })(this));
      atom.workspaceView.command("atomic-emacs:previous-line", (function(_this) {
        return function(event) {
          return _this.previousLine(event);
        };
      })(this));
      atom.workspaceView.command("atomic-emacs:beginning-of-buffer", (function(_this) {
        return function(event) {
          return _this.beginningOfBuffer(event);
        };
      })(this));
      atom.workspaceView.command("atomic-emacs:end-of-buffer", (function(_this) {
        return function(event) {
          return _this.endOfBuffer(event);
        };
      })(this));
      atom.workspaceView.command("atomic-emacs:scroll-up", (function(_this) {
        return function(event) {
          return _this.scrollUp(event);
        };
      })(this));
      atom.workspaceView.command("atomic-emacs:scroll-down", (function(_this) {
        return function(event) {
          return _this.scrollDown(event);
        };
      })(this));
      atom.workspaceView.command("atomic-emacs:backward-paragraph", (function(_this) {
        return function(event) {
          return _this.backwardParagraph(event);
        };
      })(this));
      atom.workspaceView.command("atomic-emacs:forward-paragraph", (function(_this) {
        return function(event) {
          return _this.forwardParagraph(event);
        };
      })(this));
      atom.workspaceView.command("atomic-emacs:backward-word", (function(_this) {
        return function(event) {
          return _this.backwardWord(event);
        };
      })(this));
      atom.workspaceView.command("atomic-emacs:backward-kill-word", (function(_this) {
        return function(event) {
          return _this.backwardKillWord(event);
        };
      })(this));
      atom.workspaceView.command("atomic-emacs:just-one-space", (function(_this) {
        return function(event) {
          return _this.justOneSpace(event);
        };
      })(this));
      atom.workspaceView.command("atomic-emacs:delete-horizontal-space", (function(_this) {
        return function(event) {
          return _this.deleteHorizontalSpace(event);
        };
      })(this));
      atom.workspaceView.command("atomic-emacs:recenter-top-bottom", (function(_this) {
        return function(event) {
          return _this.recenterTopBottom(event);
        };
      })(this));
      return atom.workspaceView.command("core:cancel", (function(_this) {
        return function(event) {
          return _this.keyboardQuit(event);
        };
      })(this));
    },
    upcaseRegion: function(event) {
      return getActiveEditor(event).upperCase();
    },
    downcaseRegion: function(event) {
      return getActiveEditor(event).lowerCase();
    },
    openLine: function(event) {
      var editor;
      editor = getActiveEditor(event);
      editor.insertNewline();
      return editor.moveCursorUp();
    },
    transposeChars: function(event) {
      var editor;
      editor = getActiveEditor(event);
      editor.transpose();
      return editor.moveCursorRight();
    },
    transposeWords: function(event) {
      var editor;
      editor = getActiveEditor(event);
      return editor.transact(function() {
        var cursor, cursorTools, word1, word1Pos, word2, word2Pos, _i, _len, _ref, _results;
        _ref = editor.getCursors();
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          cursor = _ref[_i];
          cursorTools = new CursorTools(cursor);
          cursorTools.skipNonWordCharactersBackward();
          word1 = cursorTools.extractWord();
          word1Pos = cursor.getBufferPosition();
          cursorTools.skipNonWordCharactersForward();
          if (editor.getEofBufferPosition().isEqual(cursor.getBufferPosition())) {
            editor.setTextInBufferRange([word1Pos, word1Pos], word1);
            cursorTools.skipNonWordCharactersBackward();
          } else {
            word2 = cursorTools.extractWord();
            word2Pos = cursor.getBufferPosition();
            editor.setTextInBufferRange([word2Pos, word2Pos], word1);
            editor.setTextInBufferRange([word1Pos, word1Pos], word2);
          }
          _results.push(cursor.setBufferPosition(cursor.getBufferPosition()));
        }
        return _results;
      });
    },
    transposeLines: function(event) {
      var cursor, editor, row;
      editor = getActiveEditor(event);
      cursor = editor.getCursor();
      row = cursor.getBufferRow();
      return editor.transact(function() {
        var text;
        if (row === 0) {
          endLineIfNecessary(cursor);
          cursor.moveDown();
          row += 1;
        }
        endLineIfNecessary(cursor);
        text = editor.getTextInBufferRange([[row, 0], [row + 1, 0]]);
        editor.deleteLine(row);
        return editor.setTextInBufferRange([[row - 1, 0], [row - 1, 0]], text);
      });
    },
    markWholeBuffer: function(event) {
      return getActiveEditor(event).selectAll();
    },
    setMark: function(event) {
      var cursor, editor, _i, _len, _ref, _results;
      editor = getActiveEditor(event);
      _ref = editor.getCursors();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        cursor = _ref[_i];
        _results.push(Mark["for"](cursor).set().activate());
      }
      return _results;
    },
    keyboardQuit: function(event) {
      var editor;
      editor = getActiveEditor(event);
      return deactivateCursors(editor);
    },
    exchangePointAndMark: function(event) {
      var editor;
      editor = getActiveEditor(event);
      return editor.moveCursors(function(cursor) {
        return Mark["for"](cursor).exchange();
      });
    },
    copy: function(event) {
      var editor;
      editor = getActiveEditor(event);
      editor.copySelectedText();
      return deactivateCursors(editor);
    },
    forwardChar: function(event) {
      var editor;
      editor = getActiveEditor(event);
      return editor.moveCursors(function(cursor) {
        return cursor.moveRight();
      });
    },
    backwardChar: function(event) {
      var editor;
      editor = getActiveEditor(event);
      return editor.moveCursors(function(cursor) {
        return cursor.moveLeft();
      });
    },
    forwardWord: function(event) {
      var editor;
      editor = getActiveEditor(event);
      return editor.moveCursors(function(cursor) {
        var tools;
        tools = new CursorTools(cursor);
        tools.skipNonWordCharactersForward();
        return tools.skipWordCharactersForward();
      });
    },
    backwardWord: function(event) {
      var editor;
      editor = getActiveEditor(event);
      return editor.moveCursors(function(cursor) {
        var tools;
        tools = new CursorTools(cursor);
        tools.skipNonWordCharactersBackward();
        return tools.skipWordCharactersBackward();
      });
    },
    nextLine: function(event) {
      var editor;
      if (atom.workspaceView.find('.fuzzy-finder').view() || atom.workspaceView.find('.command-palette').view()) {
        event.abortKeyBinding();
      }
      editor = getActiveEditor(event);
      return editor.moveCursors(function(cursor) {
        return cursor.moveDown();
      });
    },
    previousLine: function(event) {
      var editor;
      if (atom.workspaceView.find('.fuzzy-finder').view() || atom.workspaceView.find('.command-palette').view()) {
        event.abortKeyBinding();
      }
      editor = getActiveEditor(event);
      return editor.moveCursors(function(cursor) {
        return cursor.moveUp();
      });
    },
    scrollUp: function(event) {
      var currentRow, editor, editorView, firstRow, lastRow, rowCount;
      editor = getActiveEditor(event);
      editorView = atom.workspaceView.find('.editor.is-focused').view();
      if (editorView) {
        firstRow = editorView.getFirstVisibleScreenRow();
        lastRow = editorView.getLastVisibleScreenRow();
        currentRow = editor.cursors[0].getBufferRow();
        rowCount = (lastRow - firstRow) - (currentRow - firstRow);
        editorView.scrollToBufferPosition([lastRow * 2, 0]);
        return editor.moveCursorDown(rowCount);
      }
    },
    scrollDown: function(event) {
      var currentRow, editor, editorView, firstRow, lastRow, rowCount;
      editor = getActiveEditor(event);
      editorView = atom.workspaceView.find('.editor.is-focused').view();
      if (editorView) {
        firstRow = editorView.getFirstVisibleScreenRow();
        lastRow = editorView.getLastVisibleScreenRow();
        currentRow = editor.cursors[0].getBufferRow();
        rowCount = (lastRow - firstRow) - (lastRow - currentRow);
        editorView.scrollToBufferPosition([Math.floor(firstRow / 2), 0]);
        return editor.moveCursorUp(rowCount);
      }
    },
    backwardParagraph: function(event) {
      var blankRange, blankRow, currentRow, cursor, cursorTools, editor, rowCount, _i, _len, _ref, _results;
      editor = getActiveEditor(event);
      _ref = editor.getCursors();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        cursor = _ref[_i];
        currentRow = editor.getCursorBufferPosition().row;
        if (currentRow <= 0) {
          break;
        }
        cursorTools = new CursorTools(cursor);
        blankRow = cursorTools.locateBackward(/^\s+$|^\s*$/).start.row;
        while (currentRow === blankRow) {
          if (currentRow <= 0) {
            break;
          }
          editor.moveCursorUp();
          currentRow = editor.getCursorBufferPosition().row;
          blankRange = cursorTools.locateBackward(/^\s+$|^\s*$/);
          blankRow = blankRange ? blankRange.start.row : 0;
        }
        rowCount = currentRow - blankRow;
        _results.push(editor.moveCursorUp(rowCount));
      }
      return _results;
    },
    forwardParagraph: function(event) {
      var blankRow, currentRow, cursor, cursorTools, editor, lineCount, rowCount, _i, _len, _ref, _results;
      editor = getActiveEditor(event);
      lineCount = editor.buffer.getLineCount() - 1;
      _ref = editor.getCursors();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        cursor = _ref[_i];
        currentRow = editor.getCursorBufferPosition().row;
        if (currentRow >= lineCount) {
          break;
        }
        cursorTools = new CursorTools(cursor);
        blankRow = cursorTools.locateForward(/^\s+$|^\s*$/).start.row;
        while (currentRow === blankRow) {
          editor.moveCursorDown();
          currentRow = editor.getCursorBufferPosition().row;
          blankRow = cursorTools.locateForward(/^\s+$|^\s*$/).start.row;
        }
        rowCount = blankRow - currentRow;
        _results.push(editor.moveCursorDown(rowCount));
      }
      return _results;
    },
    backwardKillWord: function(event) {
      var editor;
      editor = getActiveEditor(event);
      return editor.transact(function() {
        var selection, _i, _len, _ref, _results;
        _ref = editor.getSelections();
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
      });
    },
    killWord: function(event) {
      var editor;
      editor = getActiveEditor(event);
      return editor.transact(function() {
        var selection, _i, _len, _ref, _results;
        _ref = editor.getSelections();
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
      });
    },
    justOneSpace: function(event) {
      var cursor, editor, range, _i, _len, _ref, _results;
      editor = getActiveEditor(event);
      _ref = editor.cursors;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        cursor = _ref[_i];
        range = horizontalSpaceRange(cursor);
        _results.push(editor.setTextInBufferRange(range, ' '));
      }
      return _results;
    },
    deleteHorizontalSpace: function(event) {
      var cursor, editor, range, _i, _len, _ref, _results;
      editor = getActiveEditor(event);
      _ref = editor.cursors;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        cursor = _ref[_i];
        range = horizontalSpaceRange(cursor);
        _results.push(editor.setTextInBufferRange(range, ''));
      }
      return _results;
    },
    recenterTopBottom: function(event) {
      var c, editor, maxOffset, maxRow, minOffset, minRow, view;
      editor = getActiveEditor(event);
      view = event.targetView();
      minRow = Math.min.apply(Math, (function() {
        var _i, _len, _ref, _results;
        _ref = editor.getCursors();
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          c = _ref[_i];
          _results.push(c.getBufferRow());
        }
        return _results;
      })());
      maxRow = Math.max.apply(Math, (function() {
        var _i, _len, _ref, _results;
        _ref = editor.getCursors();
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          c = _ref[_i];
          _results.push(c.getBufferRow());
        }
        return _results;
      })());
      minOffset = view.pixelPositionForBufferPosition([minRow, 0]);
      maxOffset = view.pixelPositionForBufferPosition([maxRow, 0]);
      return view.scrollTop((minOffset.top + maxOffset.top - view.scrollView.height()) / 2);
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLCtGQUFBOztBQUFBLEVBQUEsV0FBQSxHQUFjLE9BQUEsQ0FBUSxnQkFBUixDQUFkLENBQUE7O0FBQUEsRUFDQSxJQUFBLEdBQU8sT0FBQSxDQUFRLFFBQVIsQ0FEUCxDQUFBOztBQUFBLEVBR0EsZUFBQSxHQUFrQixTQUFDLEtBQUQsR0FBQTtXQUNoQixLQUFLLENBQUMsVUFBTixDQUFBLENBQWtCLENBQUMsT0FESDtFQUFBLENBSGxCLENBQUE7O0FBQUEsRUFNQSxvQkFBQSxHQUF1QixTQUFDLE1BQUQsR0FBQTtBQUNyQixRQUFBLHVCQUFBO0FBQUEsSUFBQSxXQUFBLEdBQWtCLElBQUEsV0FBQSxDQUFZLE1BQVosQ0FBbEIsQ0FBQTtBQUFBLElBQ0EsV0FBVyxDQUFDLHNCQUFaLENBQW1DLEtBQW5DLENBREEsQ0FBQTtBQUFBLElBRUEsS0FBQSxHQUFRLE1BQU0sQ0FBQyxpQkFBUCxDQUFBLENBRlIsQ0FBQTtBQUFBLElBR0EsV0FBVyxDQUFDLHFCQUFaLENBQWtDLEtBQWxDLENBSEEsQ0FBQTtBQUFBLElBSUEsR0FBQSxHQUFNLE1BQU0sQ0FBQyxpQkFBUCxDQUFBLENBSk4sQ0FBQTtXQUtBLENBQUMsS0FBRCxFQUFRLEdBQVIsRUFOcUI7RUFBQSxDQU52QixDQUFBOztBQUFBLEVBY0Esa0JBQUEsR0FBcUIsU0FBQyxNQUFELEdBQUE7QUFDbkIsUUFBQSxtQkFBQTtBQUFBLElBQUEsR0FBQSxHQUFNLE1BQU0sQ0FBQyxpQkFBUCxDQUFBLENBQTBCLENBQUMsR0FBakMsQ0FBQTtBQUFBLElBQ0EsTUFBQSxHQUFTLE1BQU0sQ0FBQyxNQURoQixDQUFBO0FBRUEsSUFBQSxJQUFHLEdBQUEsS0FBTyxNQUFNLENBQUMsWUFBUCxDQUFBLENBQUEsR0FBd0IsQ0FBbEM7QUFDRSxNQUFB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
//# sourceURL=/Users/tra/.atom/packages/atomic-emacs/lib/atomic-emacs.coffee