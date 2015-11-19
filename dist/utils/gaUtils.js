'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _reactGa = require('react-ga');

var _reactGa2 = _interopRequireDefault(_reactGa);

function gaUtils() {
  /**
   * _trackGeneralEvent(category)
   * Track a GA event.
   *
   * @param {category} String Category for GA event.
   * @param {action} String Action for GA event.
   * @param {label} String Label for GA event.
   */
  this._trackGeneralEvent = function (category, action, label) {
    return _reactGa2['default'].event({
      category: category,
      action: action,
      label: label
    });
  };

  /**
   * _trackEvent(category)
   * Track a GA click event, wrapped in a curried function.
   *
   * @param {category} String Category for GA event.
   * @returns {function} Returns a function with the category set.
   *  Then you pass in the action and the label.
   */
  this._trackEvent = function (category) {
    return function (action, label) {
      return _reactGa2['default'].event({
        category: category,
        action: action,
        label: label
      });
    };
  };
}

exports['default'] = new gaUtils();
module.exports = exports['default'];