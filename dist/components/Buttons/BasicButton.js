'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  base: {}
};

var BasicButton = function (_React$Component) {
  _inherits(BasicButton, _React$Component);

  function BasicButton(props) {
    _classCallCheck(this, BasicButton);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(BasicButton).call(this, props));
  }

  _createClass(BasicButton, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'button',
        {
          ref: this.props.ref,
          id: this.props.id,
          className: this.props.className,
          name: this.props.name,
          onClick: this.props.onClick,
          onMouseEnter: this.props.onMouseEnter,
          onMouseLeave: this.props.onMouseLeave,
          style: [styles.base, this.props.style]
        },
        this.props.label
      );
    }
  }]);

  return BasicButton;
}(_react2.default.Component);

BasicButton.propTypes = {
  ref: _react2.default.PropTypes.string,
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
  ref: 'BasicButton',
  id: 'BasicButton',
  className: 'BasicButton',
  name: 'BasicButton',
  lang: 'en',
  onClick: function onClick() {}
};

exports.default = BasicButton;