'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InputField = function InputField(_ref) {
  var id = _ref.id;
  var className = _ref.className;
  var lang = _ref.lang;
  var type = _ref.type;
  var name = _ref.name;
  var value = _ref.value;
  var checked = _ref.checked;
  var maxLength = _ref.maxLength;
  var placeholder = _ref.placeholder;
  var onClick = _ref.onClick;
  var onChange = _ref.onChange;
  var isRequired = _ref.isRequired;
  var style = _ref.style;
  var ariaLabel = _ref.ariaLabel;
  return _react2.default.createElement('input', {
    id: id,
    className: className,
    lang: lang,
    type: type,
    name: name,
    value: value,
    checked: checked,
    maxLength: maxLength,
    placeholder: placeholder,
    onClick: onClick,
    onChange: onChange,
    required: isRequired,
    'aria-required': isRequired,
    'aria-label': ariaLabel,
    style: style
  });
};

InputField.propTypes = {
  ariaLabel: _react2.default.PropTypes.string,
  type: _react2.default.PropTypes.string,
  lang: _react2.default.PropTypes.string,
  id: _react2.default.PropTypes.string,
  name: _react2.default.PropTypes.string,
  value: _react2.default.PropTypes.string,
  checked: _react2.default.PropTypes.bool,
  maxLength: _react2.default.PropTypes.string,
  placeholder: _react2.default.PropTypes.string,
  className: _react2.default.PropTypes.string,
  onClick: _react2.default.PropTypes.func,
  onChange: _react2.default.PropTypes.func,
  required: _react2.default.PropTypes.bool,
  isRequired: _react2.default.PropTypes.bool,
  style: _react2.default.PropTypes.object
};

InputField.defaultProps = {
  type: 'text',
  lang: 'en',
  name: 'InputField'
};

exports.default = InputField;
module.exports = exports['default'];