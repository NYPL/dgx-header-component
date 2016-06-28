'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  base: {}
};

var InputField = function (_React$Component) {
  _inherits(InputField, _React$Component);

  function InputField(props) {
    _classCallCheck(this, InputField);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(InputField).call(this, props));
  }

  _createClass(InputField, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement('input', {
        id: this.props.id,
        lang: this.props.lang,
        type: this.props.type,
        name: this.props.name,
        value: this.props.value,
        checked: this.props.checked,
        maxLength: this.props.maxLength,
        placeholder: this.props.placeholder,
        className: this.props.className,
        onClick: this.props.onClick,
        onChange: this.props.onChange,
        required: this.props.isRequired || false,
        style: [styles.base, this.props.style]
      });
    }
  }]);

  return InputField;
}(_react2.default.Component);

InputField.propTypes = {
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

exports.default = (0, _radium2.default)(InputField);