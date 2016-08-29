'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('../../utils/utils.js');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SimpleButton = function (_React$Component) {
  _inherits(SimpleButton, _React$Component);

  function SimpleButton(props) {
    _classCallCheck(this, SimpleButton);

    var _this = _possibleConstructorReturn(this, (SimpleButton.__proto__ || Object.getPrototypeOf(SimpleButton)).call(this, props));

    _this.handleOnClick = _this.handleOnClick.bind(_this);
    return _this;
  }

  _createClass(SimpleButton, [{
    key: 'handleOnClick',
    value: function handleOnClick() {
      _utils2.default._trackHeader(this.props.gaAction, this.props.gaLabel);
      this.props.onClick();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'a',
        {
          ref: this.props.ref,
          id: this.props.id,
          className: this.props.className,
          href: this.props.target,
          onClick: this.handleOnClick,
          style: this.props.style
        },
        this.props.label
      );
    }
  }]);

  return SimpleButton;
}(_react2.default.Component);

SimpleButton.propTypes = {
  id: _react2.default.PropTypes.string,
  ref: _react2.default.PropTypes.string,
  className: _react2.default.PropTypes.string,
  lang: _react2.default.PropTypes.string,
  style: _react2.default.PropTypes.object,
  target: _react2.default.PropTypes.string,
  label: _react2.default.PropTypes.string,
  onClick: _react2.default.PropTypes.func,
  gaAction: _react2.default.PropTypes.string,
  gaLabel: _react2.default.PropTypes.string
};

SimpleButton.defaultProps = {
  ref: 'SimpleButton',
  className: 'SimpleButton',
  label: 'Button',
  lang: 'en',
  target: '#',
  onClick: function onClick() {}
};

exports.default = SimpleButton;
module.exports = exports['default'];