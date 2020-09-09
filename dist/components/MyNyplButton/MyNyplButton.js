"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _underscore = require("underscore");

var _focusTrapReact = _interopRequireDefault(require("focus-trap-react"));

var _dgxSvgIcons = require("@nypl/dgx-svg-icons");

var _utils = _interopRequireDefault(require("../../utils/utils"));

var _MyNypl = _interopRequireDefault(require("../MyNypl/MyNypl"));

var _appConfig = _interopRequireDefault(require("../../appConfig"));

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

var styles = {
  base: {
    margin: '0px 10px 0px 0px',
    position: 'relative',
    display: 'inline-block',
    verticalAlign: 'baseline',
    lineHeight: 'normal'
  },
  MyNyplButton: {
    display: 'inline',
    border: 'none',
    padding: '11px 10px 11px 12px',
    textTransform: 'uppercase',
    lineHeight: 'normal',
    verticalAlign: 'baseline'
  },
  MyNyplWrapper: {
    position: 'absolute',
    zIndex: 1000,
    left: '0',
    minWidth: '250px',
    backgroundColor: '#1B7FA7',
    padding: '25px 30px',
    marginTop: '10px'
  }
};

var MyNyplButton = /*#__PURE__*/function (_React$Component) {
  _inherits(MyNyplButton, _React$Component);

  var _super = _createSuper(MyNyplButton);

  function MyNyplButton(props) {
    var _this;

    _classCallCheck(this, MyNyplButton);

    _this = _super.call(this, props);
    _this.state = {
      visible: false
    };
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this));
    _this.handleOnClickOut = _this.handleOnClickOut.bind(_assertThisInitialized(_this));
    _this.handleEscKey = _this.handleEscKey.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(MyNyplButton, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener('keydown', this.handleEscKey, false);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('keydown', this.handleEscKey, false);
    }
    /**
     * handleEscKey(e)
     * Triggers the clickOut method if the ESC keyboard key is pressed.
     */

  }, {
    key: "handleEscKey",
    value: function handleEscKey(e) {
      if (e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) {
        this.handleOnClickOut();
      }
    }
    /**
     * handleClick()
     * Toggles the visibility of the form. Sends an Action
     * that will dispatch an event to the Header Store.
     */

  }, {
    key: "handleClick",
    value: function handleClick(e) {
      // If javascript is enabled, clicking the button will open the dropdown menu instead of
      // going to the link
      e.preventDefault();
      var visibleState = this.state.visible ? 'Closed' : 'Open';
      this.setState({
        visible: !this.state.visible
      });

      _utils["default"].trackHeader(this.props.gaAction, "MyNyplButton - ".concat(visibleState));
    }
    /**
     * handleOnClickOut()
     * Handles closing the Subscribe form if it is
     * currently visible.
     */

  }, {
    key: "handleOnClickOut",
    value: function handleOnClickOut() {
      if (this.state.visible) {
        _utils["default"].trackHeader(this.props.gaAction, 'MyNyplButton - Closed');

        this.setState({
          visible: false
        });
      }
    }
    /**
     * renderMyNyplButton()
     * Returns MyNypl button and its icon based on the log in and the click status.
     */

  }, {
    key: "renderMyNyplButton",
    value: function renderMyNyplButton() {
      var buttonClass = '';

      var icon = /*#__PURE__*/_react["default"].createElement(_dgxSvgIcons.GenericWedgeIcon, {
        className: "dropDownIcon",
        ariaHidden: true,
        focusable: false
      });

      var myNyplButtonLabel = this.props.patronName ? 'My Account' : 'Log In';
      var labelColorClass = this.props.isLoggedIn ? ' loggedIn' : '';
      var loggedInFadeInAnimation = this.props.patronName ? ' animated fadeIn' : '';

      if (this.state.visible) {
        buttonClass = 'active';
        icon = /*#__PURE__*/_react["default"].createElement(_dgxSvgIcons.XIcon, {
          className: "dropDownIcon",
          ariaHidden: true,
          fill: "#fff",
          focusable: false
        });
        myNyplButtonLabel = 'Close';
      }

      return /*#__PURE__*/_react["default"].createElement("a", {
        className: "myNyplButton ".concat(buttonClass).concat(labelColorClass).concat(loggedInFadeInAnimation),
        onClick: this.handleClick,
        style: (0, _underscore.extend)(styles.MyNyplButton, this.props.style),
        href: this.props.target,
        role: "button",
        "aria-haspopup": "true",
        "aria-expanded": this.state.visible ? true : null
      }, myNyplButtonLabel, icon);
    }
  }, {
    key: "renderMyNyplDialog",
    value: function renderMyNyplDialog() {
      var boxHeight = this.props.isLoggedIn ? ' loggedInHeight' : null;
      return this.state.visible ? /*#__PURE__*/_react["default"].createElement("div", {
        className: "myNypl-wrapper active animatedFast fadeIn".concat(boxHeight),
        style: styles.MyNyplWrapper
      }, /*#__PURE__*/_react["default"].createElement(_MyNypl["default"], {
        patronName: this.props.patronName,
        isLoggedIn: this.props.isLoggedIn,
        logOutLink: this.props.logOutLink
      })) : null;
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement(_focusTrapReact["default"], {
        focusTrapOptions: {
          onDeactivate: this.handleOnClickOut,
          clickOutsideDeactivates: true
        },
        active: this.state.visible,
        className: "myNyplButton-wrapper",
        style: (0, _underscore.extend)(styles.base, this.props.style)
      }, this.renderMyNyplButton(), this.renderMyNyplDialog());
    }
  }]);

  return MyNyplButton;
}(_react["default"].Component);

MyNyplButton.propTypes = {
  style: _propTypes["default"].shape({}),
  isLoggedIn: _propTypes["default"].bool,
  patronName: _propTypes["default"].string,
  logOutLink: _propTypes["default"].string,
  gaAction: _propTypes["default"].string,
  target: _propTypes["default"].string
};
MyNyplButton.defaultProps = {
  style: {},
  isLoggedIn: false,
  patronName: '',
  logOutLink: '',
  gaAction: '',
  target: _appConfig["default"].myNyplLinks.catalog
};
var _default = MyNyplButton;
exports["default"] = _default;