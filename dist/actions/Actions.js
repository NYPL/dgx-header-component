'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dgxAltCenter = require('dgx-alt-center');

var _dgxAltCenter2 = _interopRequireDefault(_dgxAltCenter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Actions = function () {
  function Actions() {
    _classCallCheck(this, Actions);
  }

  _createClass(Actions, [{
    key: 'setMobileMenuButtonValue',
    value: function setMobileMenuButtonValue(currentActiveMobileButton) {
      this.dispatch(currentActiveMobileButton);
    }
  }, {
    key: 'setMobileMyNyplButtonValue',
    value: function setMobileMyNyplButtonValue(value) {
      this.dispatch(value);
    }
  }, {
    key: 'searchButtonActionValue',
    value: function searchButtonActionValue(actionValue) {
      this.dispatch(actionValue);
    }
  }, {
    key: 'updateIsHeaderSticky',
    value: function updateIsHeaderSticky(value) {
      this.dispatch(value);
    }
  }, {
    key: 'toggleSubscribeFormVisible',
    value: function toggleSubscribeFormVisible(value) {
      this.dispatch(value);
    }
  }, {
    key: 'toggleMyNyplVisible',
    value: function toggleMyNyplVisible(value) {
      this.dispatch(value);
    }
  }, {
    key: 'toggleStickyMyNyplVisible',
    value: function toggleStickyMyNyplVisible(value) {
      this.dispatch(value);
    }
  }]);

  return Actions;
}();

exports.default = _dgxAltCenter2.default.createActions(Actions);
module.exports = exports['default'];