'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SubscribeMessageBox = function SubscribeMessageBox(_ref) {
  var className = _ref.className,
      status = _ref.status,
      msg = _ref.msg;
  return _react2.default.createElement(
    'div',
    { className: className + ' ' + status },
    _react2.default.createElement('div', { className: className + '-Eyebrow' }),
    _react2.default.createElement(
      'div',
      { className: className + '-Title' },
      msg
    )
  );
};

SubscribeMessageBox.propTypes = {
  msg: _propTypes2.default.string,
  className: _propTypes2.default.string,
  status: _propTypes2.default.string
};

SubscribeMessageBox.defaultProps = {
  msg: 'Thank you for subscribing to our email updates.',
  className: 'SubscribeMessageBox'
};

exports.default = SubscribeMessageBox;
module.exports = exports['default'];