"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = _interopRequireDefault(require("../../utils/utils.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var SimpleLink = /*#__PURE__*/function (_React$Component) {
  _inherits(SimpleLink, _React$Component);

  var _super = _createSuper(SimpleLink);

  function SimpleLink(props) {
    var _this;

    _classCallCheck(this, SimpleLink);

    _this = _super.call(this, props);
    _this.handleOnClick = _this.handleOnClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(SimpleLink, [{
    key: "handleOnClick",
    value: function handleOnClick() {
      _utils["default"].trackHeader(this.props.gaAction, this.props.gaLabel);

      this.props.onClick();
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("a", {
        ref: this.props.ref,
        id: this.props.id,
        className: this.props.className,
        href: this.props.target,
        onClick: this.handleOnClick,
        style: this.props.style
      }, this.props.label);
    }
  }]);

  return SimpleLink;
}(_react["default"].Component);

SimpleLink.propTypes = {
  id: _propTypes["default"].string,
  ref: _propTypes["default"].string,
  className: _propTypes["default"].string,
  lang: _propTypes["default"].string,
  style: _propTypes["default"].shape({}),
  target: _propTypes["default"].string,
  label: _propTypes["default"].string,
  onClick: _propTypes["default"].func,
  gaAction: _propTypes["default"].string,
  gaLabel: _propTypes["default"].string
};
SimpleLink.defaultProps = {
  id: '',
  ref: '',
  className: 'simpleLink',
  label: 'Link',
  lang: 'en',
  style: {},
  target: '#',
  onClick: function onClick() {},
  gaAction: '',
  gaLabel: ''
};
var _default = SimpleLink;
exports["default"] = _default;