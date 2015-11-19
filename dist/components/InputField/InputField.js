'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var InputField = (function (_React$Component) {

  // Constructor used in ES6

  function InputField(props) {
    _classCallCheck(this, InputField);

    _get(Object.getPrototypeOf(InputField.prototype), 'constructor', this).call(this, props);
  }

  _inherits(InputField, _React$Component);

  _createClass(InputField, [{
    key: 'render',
    value: function render() {
      return _react2['default'].createElement('input', {
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
        style: [styles.base, this.props.style] });
    }
  }]);

  return InputField;
})(_react2['default'].Component);

;

InputField.defaultProps = {
  type: 'text',
  lang: 'en',
  name: 'InputField'
};

var styles = {
  base: {}
};

exports['default'] = (0, _radium2['default'])(InputField);
module.exports = exports['default'];