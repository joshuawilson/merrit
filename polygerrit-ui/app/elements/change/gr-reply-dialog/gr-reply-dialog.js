// Copyright (C) 2016 The Android Open Source Project
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
(function() {
  'use strict';

  Polymer({
    is: 'gr-reply-dialog',

    /**
     * Fired when a reply is successfully sent.
     *
     * @event send
     */

    /**
     * Fired when the user presses the cancel button.
     *
     * @event cancel
     */

    properties: {
      changeNum: String,
      patchNum: String,
      disabled: {
        type: Boolean,
        value: false,
        reflectToAttribute: true,
      },
      draft: {
        type: String,
        value: '',
      },
      diffDrafts: Object,
      labels: Object,
      permittedLabels: Object,

      _account: Object,
    },

    behaviors: [
      Gerrit.RESTClientBehavior,
    ],

    attached: function() {
      this._getAccount().then(function(account) {
        this._account = account;
      }.bind(this));
    },

    focus: function() {
      this.async(function() {
        this.$.textarea.textarea.focus();
      }.bind(this));
    },

    _computeHideDraftList: function(drafts) {
      return Object.keys(drafts || {}).length == 0;
    },

    _computeDraftsTitle: function(drafts) {
      var total = 0;
      for (var file in drafts) {
        total += drafts[file].length;
      }
      if (total == 0) { return ''; }
      if (total == 1) { return '1 Draft'; }
      if (total > 1) { return total + ' Drafts'; }
    },

    _computeLabelArray: function(labelsObj) {
      return Object.keys(labelsObj).sort();
    },

    _computeIndexOfLabelValue: function(
        labels, permittedLabels, labelName, account) {
      var t = labels[labelName];
      if (!t) { return null; }
      var labelValue = t.default_value;

      // Is there an existing vote for the current user? If so, use that.
      var votes = labels[labelName];
      if (votes.all && votes.all.length > 0) {
        for (var i = 0; i < votes.all.length; i++) {
          if (votes.all[i]._account_id == account._account_id) {
            labelValue = votes.all[i].value;
            break;
          }
        }
      }

      var len = permittedLabels[labelName] != null ?
          permittedLabels[labelName].length : 0;
      for (var i = 0; i < len; i++) {
        var val = parseInt(permittedLabels[labelName][i], 10);
        if (val == labelValue) {
          return i;
        }
      }
      return null;
    },

    _computePermittedLabelValues: function(permittedLabels, label) {
      return permittedLabels[label];
    },

    _getAccount: function() {
      return this.$.restAPI.getAccount();
    },

    _cancelTapHandler: function(e) {
      e.preventDefault();
      this.fire('cancel', null, {bubbles: false});
    },

    _sendTapHandler: function(e) {
      e.preventDefault();
      var obj = {
        drafts: 'PUBLISH_ALL_REVISIONS',
        labels: {},
      };
      for (var label in this.permittedLabels) {
        var selectorEl = this.$$('iron-selector[data-label="' + label + '"]');
        var selectedVal = selectorEl.selectedItem.getAttribute('data-value');
        selectedVal = parseInt(selectedVal, 10);
        obj.labels[label] = selectedVal;
      }
      if (this.draft != null) {
        obj.message = this.draft;
      }
      this.disabled = true;
      this._saveReview(obj).then(function(response) {
        this.disabled = false;
        if (!response.ok) { return response; }

        this.draft = '';
        this.fire('send', null, {bubbles: false});
      }.bind(this)).catch(function(err) {
        this.disabled = false;
        throw err;
      }.bind(this));
    },

    _saveReview: function(review) {
      return this.$.restAPI.saveChangeReview(this.changeNum, this.patchNum,
          review);
    },
  });
})();
