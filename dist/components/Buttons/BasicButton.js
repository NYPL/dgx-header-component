'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BasicButton = function BasicButton(_ref) {
  var id = _ref.id;
  var className = _ref.className;
  var name = _ref.name;
  var onClick = _ref.onClick;
  var onMouseEnter = _ref.onMouseEnter;
  var onMouseLeave = _ref.onMouseLeave;
  var style = _ref.style;
  var label = _ref.label;
  return _react2.default.createElement(
    'button',
    {
      id: id,
      className: className,
      name: name,
      onClick: onClick,
      onMouseEnter: onMouseEnter,
      onMouseLeave: onMouseLeave,
      style: style
    },
    label
  );
};

BasicButton.propTypes = {
  id: _react2.default.PropTypes.string,
  className: _react2.default.PropTypes.string,
  name: _react2.default.PropTypes.string,
  label: _react2.default.PropTypes.object,
  lang: _react2.default.PropTypes.string,
  onClick: _react2.default.PropTypes.func,
  onMouseEnter: _react2.default.PropTypes.func,
  onMouseLeave: _react2.default.PropTypes.func,
  style: _react2.default.PropTypes.object
};

BasicButton.defaultProps = {
  className: 'BasicButton',
  name: 'BasicButton',
  lang: 'en'
};

exports.default = BasicButton;
module.exports = exports['default'];