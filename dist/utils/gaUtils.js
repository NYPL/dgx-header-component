'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _reactGa = require('react-ga');

var _reactGa2 = _interopRequireDefault(_reactGa);

function gaUtils() {
  /**
   * _trackEvent(gaLabel)
   * Track a GA click event.
   *
   * @param {action} String Action for GA event.
   * @param {label} String Label for GA event.
   */
  this._trackEvent = function _trackEvent(action, label) {
    _reactGa2['default'].event({
      category: 'Global Header',
      action: action,
      label: label
    });
  };
}

exports['default'] = new gaUtils();
module.exports = exports['default'];