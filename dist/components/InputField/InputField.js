'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

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
  ariaLabel: _propTypes2.default.string,
  type: _propTypes2.default.string,
  lang: _propTypes2.default.string,
  id: _propTypes2.default.string,
  name: _propTypes2.default.string,
  value: _propTypes2.default.string,
  checked: _propTypes2.default.bool,
  maxLength: _propTypes2.default.string,
  placeholder: _propTypes2.default.string,
  className: _propTypes2.default.string,
  onClick: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  required: _propTypes2.default.bool,
  isRequired: _propTypes2.default.bool,
  style: _propTypes2.default.object
};

InputField.defaultProps = {
  type: 'text',
  lang: 'en',
  name: 'InputField'
};

exports.default = InputField;
module.exports = exports['default'];