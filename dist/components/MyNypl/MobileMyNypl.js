"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _underscore = require("underscore");

var _dgxSvgIcons = require("@nypl/dgx-svg-icons");

var _utils = _interopRequireDefault(require("../../utils/utils"));

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
    backgroundColor: '#2B2B2B',
    margin: 0
  },
  links: {
    display: 'flex',
    backgroundColor: '#E32B31',
    color: '#FFF',
    padding: 0,
    marginTop: '60px',
    minHeight: '100px',
    textAlign: 'center',
    textDecoration: 'none',
    lineHeight: 'normal'
  },
  loggedInLinksMarginTop: {
    margin: '120px 0 0 0'
  },
  label: {
    fontSize: '14px',
    textTransform: 'uppercase',
    display: 'inline-block',
    margin: '0'
  },
  wrapper: {
    width: '100%',
    display: 'block',
    margin: '0',
    padding: '1.75em 0'
  },
  notLoggedIn: {
    display: 'none'
  },
  logOutLink: {
    color: '#fff',
    display: 'block',
    flex: '1 100%',
    textAlign: 'center',
    padding: '35px',
    fontSize: '18px',
    textTransform: 'uppercase',
    textDecoration: 'underline'
  },
  researchLinkWrapper: {
    alignItems: 'center',
    borderLeft: 0,
    display: 'flex',
    flex: '1 1 auto',
    justifyContent: 'center',
    padding: '1.56em 0 1.85em'
  },
  researchLinkLabel: {
    width: '125px'
  },
  catalogLinkWrapper: {
    borderRight: 0
  },
  catalogLinkLabel: {
    width: '102px'
  },
  icon: {
    fontSize: '32px',
    display: 'inline-block',
    color: 'rgba(255, 255, 255, 0.6)'
  }
};

var MobileMyNypl = /*#__PURE__*/function (_React$Component) {
  _inherits(MobileMyNypl, _React$Component);

  var _super = _createSuper(MobileMyNypl);

  function MobileMyNypl() {
    _classCallCheck(this, MobileMyNypl);

    return _super.apply(this, arguments);
  }

  _createClass(MobileMyNypl, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.refs.loginGreeting) {
        _reactDom["default"].findDOMNode(this.refs.loginGreeting).focus();
      } else {
        _reactDom["default"].findDOMNode(this.refs.catalogLoginLink).focus();
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
     * renderLogOutLink()
     * Returns the log out button if the patron has been logged in.
     */

  }, {
    key: "renderLogOutLink",
    value: function renderLogOutLink() {
      return this.props.isLoggedIn ? /*#__PURE__*/_react["default"].createElement("a", {
        href: this.props.logOutLink,
        className: "".concat(this.props.className, "-catalog-link"),
        onClick: function onClick() {
          return _utils["default"].trackHeader('My Account', 'Log Out');
        },
        style: styles.logOutLink
      }, "LOG OUT") : /*#__PURE__*/_react["default"].createElement("div", {
        style: styles.notLoggedIn
      });
    }
    /**
     * renderGreeting()
     * Returns the patron's name in the drop down menu if it exists.
     */

  }, {
    key: "renderGreeting",
    value: function renderGreeting() {
      return this.props.patronName && this.props.isLoggedIn ? /*#__PURE__*/_react["default"].createElement("div", {
        className: "".concat(this.props.className, "-greeting"),
        ref: "loginGreeting",
        tabIndex: "0"
      }, /*#__PURE__*/_react["default"].createElement("p", {
        className: "login-indication"
      }, "You are logged in as:"), /*#__PURE__*/_react["default"].createElement("p", {
        className: "login-name"
      }, this.props.patronName)) : null;
    }
  }, {
    key: "render",
    value: function render() {
      var catalogLinkClass = 'catalogLink';
      var researchLinkClass = 'researchLink';

      var _this$renderLoginLink = this.renderLoginLinks(),
          catalogLink = _this$renderLoginLink.catalogLink,
          researchLink = _this$renderLoginLink.researchLink;

      var catalogLinkLabel = this.props.isLoggedIn ? 'GO TO THE CATALOG' : 'LOG INTO THE CATALOG';
      var researchCatalogLinkLabel = this.props.isLoggedIn ? 'GO TO THE RESEARCH CATALOG' : 'LOG INTO THE RESEARCH CATALOG';
      var loggedInMarginTop = this.props.isLoggedIn ? styles.loggedInLinksMarginTop : null;
      var gaAction = this.props.isLoggedIn ? 'Mobile Go To' : 'Mobile Log In';
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: this.props.className,
        style: styles.base,
        role: "dialog"
      }, this.renderGreeting(), /*#__PURE__*/_react["default"].createElement("a", {
        href: catalogLink,
        className: catalogLinkClass,
        style: (0, _underscore.extend)(styles.links, loggedInMarginTop),
        onClick: function onClick() {
          return _utils["default"].trackHeader(gaAction, 'Catalog');
        },
        ref: "catalogLoginLink"
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "".concat(catalogLinkClass, "-wrapper"),
        style: (0, _underscore.extend)(styles.wrapper, styles.catalogLinkWrapper)
      }, /*#__PURE__*/_react["default"].createElement(_dgxSvgIcons.LoginIcon, {
        fill: "#fff",
        ariaHidden: true,
        focusable: false
      }), /*#__PURE__*/_react["default"].createElement("span", {
        className: "".concat(catalogLinkClass, "-label"),
        style: (0, _underscore.extend)(styles.catalogLinkLabel, styles.label)
      }, catalogLinkLabel))), /*#__PURE__*/_react["default"].createElement("a", {
        href: researchLink,
        className: researchLinkClass,
        style: (0, _underscore.extend)(styles.links, loggedInMarginTop),
        onClick: function onClick() {
          return _utils["default"].trackHeader(gaAction, 'Research');
        }
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "".concat(researchLinkClass, "-wrapper"),
        style: (0, _underscore.extend)(styles.wrapper, styles.researchLinkWrapper)
      }, /*#__PURE__*/_react["default"].createElement(_dgxSvgIcons.BuildingIcon, {
        fill: "#fff",
        ariaHidden: true,
        focusable: false
      }), /*#__PURE__*/_react["default"].createElement("span", {
        className: "".concat(researchLinkClass, "-label"),
        style: (0, _underscore.extend)(styles.researchLinkLabel, styles.label)
      }, researchCatalogLinkLabel))), this.renderLogOutLink());
    }
  }]);

  return MobileMyNypl;
}(_react["default"].Component);

MobileMyNypl.propTypes = {
  lang: _propTypes["default"].string,
  className: _propTypes["default"].string,
  catalogLink: _propTypes["default"].string,
  researchLink: _propTypes["default"].string,
  loginCatalogLink: _propTypes["default"].string,
  loginResearchLink: _propTypes["default"].string,
  isLoggedIn: _propTypes["default"].bool,
  patronName: _propTypes["default"].string,
  logOutLink: _propTypes["default"].string
};
MobileMyNypl.defaultProps = {
  lang: 'en',
  className: 'mobileMyNypl',
  loginCatalogLink: _appConfig["default"].loginMyNyplLinks.catalog,
  loginResearchLink: _appConfig["default"].loginMyNyplLinks.research,
  catalogLink: _appConfig["default"].myNyplLinks.catalog,
  researchLink: _appConfig["default"].myNyplLinks.research,
  logOutLink: _appConfig["default"].loginMyNyplLinks.logOutLink,
  isLoggedIn: false,
  patronName: ''
};
var _default = MobileMyNypl;
exports["default"] = _default;