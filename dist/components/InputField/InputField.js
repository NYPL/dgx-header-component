'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InputField = function InputField(_ref) {
  var id = _ref.id,
      className = _ref.className,
      lang = _ref.lang,
      type = _ref.type,
      name = _ref.name,
      value = _ref.value,
      checked = _ref.checked,
      maxLength = _ref.maxLength,
      placeholder = _ref.placeholder,
      onClick = _ref.onClick,
      onChange = _ref.onChange,
      isRequired = _ref.isRequired,
      style = _ref.style,
      ariaLabel = _ref.ariaLabel;
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