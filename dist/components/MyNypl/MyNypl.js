"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _dgxSvgIcons = require("@nypl/dgx-svg-icons");

var _utils = _interopRequireDefault(require("../../utils/utils"));

var _appConfig = _interopRequireDefault(require("../../appConfig"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var styles = {
  logOutLink: {
    backgroundColor: '#FFF',
    border: '3px solid #FFF',
    borderRadius: '33px',
    bottom: '30px',
    color: '#1B7FA7',
    fontSize: '14px',
    fontWeight: '200',
    letterSpacing: '.03em',
    padding: '3px 20px',
    position: 'absolute',
    left: '30px'
  },
  loginButtons: {
    backgroundColor: '#1B7FA7',
    border: '2px solid #FFF',
    color: '#FFF',
    display: 'inline-block',
    fontFamily: 'system-ui, "Segoe UI", Tahoma',
    fontWeight: 400,
    fontSize: '14px',
    letterSpacing: '.03em',
    marginTop: '20px',
    padding: '9px 17px 7px'
  }
};

var MyNypl = /*#__PURE__*/function (_React$Component) {
  _inherits(MyNypl, _React$Component);

  var _super = _createSuper(MyNypl);

  function MyNypl() {
    _classCallCheck(this, MyNypl);

    return _super.apply(this, arguments);
  }

  _createClass(MyNypl, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.refs.patronGreetingWrapper) {
        _reactDom.default.findDOMNode(this.refs.patronGreetingWrapper).focus();
      } else {
        this.refs.catalogLink.focus();
      }
    }
    /**
     * renderLoginLinks()
     * Returns the href addresses for catalog and research catalog buttons
     * based on different conditions.
     */

  }, {
    key: "renderLoginLinks",
    value: function renderLoginLinks() {
      if (this.props.isLoggedIn) {
        return {
          catalogLink: this.props.catalogLink,
          researchLink: this.props.researchLink
        };
      }

      return {
        catalogLink: this.props.loginCatalogLink,
        researchLink: this.props.loginResearchLink
      };
    }
    /**
     * renderGreeting()
     * Returns the patron's name in the drop down menu if it exists.
     */

  }, {
    key: "renderGreeting",
    value: function renderGreeting() {
      if (!this.props.patronName || !this.props.isLoggedIn) {
        return null;
      }

      return /*#__PURE__*/_react.default.createElement("div", {
        tabIndex: "0",
        className: "patron-greeting-wrapper",
        ref: "patronGreetingWrapper"
      }, /*#__PURE__*/_react.default.createElement("p", {
        className: "".concat(this.props.className, "-patron-greeting login-indication")
      }, "You are logged in as:"), /*#__PURE__*/_react.default.createElement("p", {
        className: "".concat(this.props.className, "-patron-greeting login-name")
      }, this.props.patronName));
    }
    /**
     * renderLogOutLink()
     * Returns the log out button if the patron has been logged in.
     */

  }, {
    key: "renderLogOutLink",
    value: function renderLogOutLink() {
      return this.props.isLoggedIn ? /*#__PURE__*/_react.default.createElement("a", {
        href: this.props.logOutLink,
        className: "".concat(this.props.className, "-catalog-link"),
        onClick: function onClick() {
          return _utils.default.trackHeader('My Account', 'Log Out');
        },
        style: styles.logOutLink
      }, /*#__PURE__*/_react.default.createElement(_dgxSvgIcons.LogoutIcon, {
        className: "logoutIcon",
        ariaHidden: true,
        focusable: false
      }), "LOG OUT") : null;
    }
  }, {
    key: "render",
    value: function render() {
      var catalogLinkLabel = this.props.isLoggedIn ? 'GO TO THE CATALOG' : 'LOG INTO THE CATALOG';
      var researchCatalogLinkLabel = this.props.isLoggedIn ? 'GO TO THE RESEARCH CATALOG' : 'LOG INTO THE RESEARCH CATALOG';

      var _this$renderLoginLink = this.renderLoginLinks(),
          catalogLink = _this$renderLoginLink.catalogLink,
          researchLink = _this$renderLoginLink.researchLink;

      var gaAction = this.props.isLoggedIn ? 'Go To' : 'Log In';
      return /*#__PURE__*/_react.default.createElement("div", {
        className: this.props.className,
        role: "dialog"
      }, this.renderGreeting(), /*#__PURE__*/_react.default.createElement("ul", {
        className: "".concat(this.props.className, "-login-list")
      }, /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("a", {
        ref: "catalogLink",
        href: catalogLink,
        style: styles.loginButtons,
        className: "".concat(this.props.className, "-catalog-btn"),
        onClick: function onClick() {
          return _utils.default.trackHeader(gaAction, 'Catalog');
        }
      }, /*#__PURE__*/_react.default.createElement(_dgxSvgIcons.LoginIcon, {
        fill: "#fff",
        ariaHidden: true,
        focusable: false
      }), catalogLinkLabel)), /*#__PURE__*/_react.default.createElement("li", null, /*#__PURE__*/_react.default.createElement("a", {
        href: researchLink,
        style: styles.loginButtons,
        className: "".concat(this.props.className, "-research-btn"),
        onClick: function onClick() {
          return _utils.default.trackHeader(gaAction, 'Research');
        }
      }, /*#__PURE__*/_react.default.createElement(_dgxSvgIcons.BuildingIcon, {
        ariaHidden: true,
        focusable: false
      }), researchCatalogLinkLabel))), this.renderLogOutLink());
    }
  }]);

  return MyNypl;
}(_react.default.Component);

MyNypl.propTypes = {
  id: _propTypes.default.string,
  className: _propTypes.default.string,
  lang: _propTypes.default.string,
  catalogLink: _propTypes.default.string,
  researchLink: _propTypes.default.string,
  loginCatalogLink: _propTypes.default.string,
  loginResearchLink: _propTypes.default.string,
  logOutLink: _propTypes.default.string,
  isLoggedIn: _propTypes.default.bool,
  patronName: _propTypes.default.string
};
MyNypl.defaultProps = {
  id: '',
  className: 'myNypl',
  lang: 'en',
  loginCatalogLink: _appConfig.default.loginMyNyplLinks.catalog,
  loginResearchLink: _appConfig.default.loginMyNyplLinks.research,
  catalogLink: _appConfig.default.myNyplLinks.catalog,
  researchLink: _appConfig.default.myNyplLinks.research,
  logOutLink: _appConfig.default.loginMyNyplLinks.logOutLink,
  isLoggedIn: false,
  patronName: ''
};
var _default = MyNypl;
exports.default = _default;