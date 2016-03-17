// Copyright (C) 2016 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
(function(window, GrDiffLine) {
  'use strict';

  function GrDiffGroup(type, opt_lines) {
    this.type = type;
    this.lines = [];
    this.adds = [];
    this.removes = [];

    if (opt_lines) {
      opt_lines.forEach(this.addLine, this);
    }
  }

  GrDiffGroup.Type = {
    BOTH: 'both',
    DELTA: 'delta',
    HEADER: 'header',
  };

  GrDiffGroup.prototype.addLine = function(line) {
    this.lines.push(line);

    var notDelta = (this.type === GrDiffGroup.Type.BOTH ||
        this.type === GrDiffGroup.Type.HEADER);
    if (notDelta && (line.type === GrDiffLine.Type.ADD ||
        line.type === GrDiffLine.Type.REMOVE)) {
      throw Error('Cannot add delta line to a non-delta group.');
    }

    if (line.type === GrDiffLine.Type.ADD) {
      this.adds.push(line);
    } else if (line.type === GrDiffLine.Type.REMOVE) {
      this.removes.push(line);
    }
  };

  GrDiffGroup.prototype.getSideBySidePairs = function() {
    if (this.type === GrDiffGroup.Type.BOTH ||
        this.type === GrDiffGroup.Type.HEADER) {
      return this.lines.map(function(line) {
        return {
          left: line,
          right: line,
        };
      });
    }

    var pairs = [];
    var i = 0;
    var j = 0;
    while (i < this.removes.length || j < this.adds.length) {
      pairs.push({
        left: this.removes[i] || GrDiffLine.BLANK_LINE,
        right: this.adds[j] || GrDiffLine.BLANK_LINE,
      });
      i++;
      j++;
    }
    return pairs;
  };

  window.GrDiffGroup = GrDiffGroup;
})(window, GrDiffLine);
