"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactTappable = _interopRequireDefault(require("react-tappable"));

var _focusTrapReact = _interopRequireDefault(require("focus-trap-react"));

var _dgxSvgIcons = require("@nypl/dgx-svg-icons");

var _underscore = require("underscore");

var _utils = _interopRequireDefault(require("../../utils/utils"));

var _MobileMyNypl = _interopRequireDefault(require("../MyNypl/MobileMyNypl"));

var _SearchBox = _interopRequireDefault(require("../SearchBox/SearchBox"));

var _NavMenu = _interopRequireDefault(require("../NavMenu/NavMenu"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
  base: {
    position: 'relative',
    height: '60px',
    padding: 0,
    margin: 0
  },
  list: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
    float: 'right',
    lineHeight: 'normal'
  },
  listItem: {
    display: 'inline-block',
    padding: 0,
    margin: '0 0 0 4px',
    lineHeight: 'normal'
  },
  mobileLogoLink: {
    color: '#000',
    backgroundColor: '#FFF',
    textDecoration: 'none',
    display: 'inline-block',
    height: 50,
    width: '50px',
    position: 'absolute',
    left: '10px',
    top: '8px',
    margin: 0,
    padding: 0,
    ':hover': {
      color: '#000'
    },
    ':visited': {
      color: '#000'
    }
  },
  locationsLink: {
    margin: 0,
    padding: '11px 13px',
    display: 'inline-block',
    color: '#000',
    backgroundColor: '#FFF'
  },
  myNyplButton: {
    margin: 0,
    padding: '12px 13px',
    display: 'inline-block',
    border: 'none',
    lineHeight: 'normal',
    verticalAlign: '0px'
  },
  activeMyNyplButton: {
    color: '#FFF',
    backgroundColor: '#2B2B2B'
  },
  inactiveMyNyplButton: {
    color: '#000',
    backgroundColor: '#FFF'
  },
  searchButton: {
    margin: 0,
    padding: '12px 13px',
    display: 'inline-block',
    border: 'none',
    lineHeight: 'normal',
    verticalAlign: '0px'
  },
  activeSearchButton: {
    color: '#FFF',
    backgroundColor: '#1B7FA7'
  },
  inactiveSearchButton: {
    color: '#000',
    backgroundColor: '#FFF'
  },
  menuButton: {
    margin: 0,
    padding: '12px 13px',
    display: 'inline-block',
    border: 'none',
    lineHeight: 'normal',
    verticalAlign: '0px'
  },
  activeMenuButton: {
    color: '#FFF',
    backgroundColor: '#2B2B2B'
  },
  inactiveMenuButton: {
    color: '#000',
    backgroundColor: '#FFF'
  }
};

var MobileHeader = /*#__PURE__*/function (_React$Component) {
  _inherits(MobileHeader, _React$Component);

  var _super = _createSuper(MobileHeader);

  function MobileHeader(props) {
    var _this;

    _classCallCheck(this, MobileHeader);

    _this = _super.call(this, props);
    _this.state = {
      activeButton: ''
    };
    _this.closeDropDown = _this.closeDropDown.bind(_assertThisInitialized(_this));
    return _this;
  }
  /**
   * toggleMobileActiveBtn(activeButton)
   * This function either activates or deactivates the state of the button that was clicked on,
   * to track the active state SCSS styles.
   *
   * @param {String} activeButton
   */


  _createClass(MobileHeader, [{
    key: "toggleMobileActiveBtn",
    value: function toggleMobileActiveBtn(activeButton) {
      if (activeButton === 'clickSearch') {
        var searchActive = this.state.activeButton === 'search' ? '' : 'search';
        this.setState({
          activeButton: searchActive
        });
      } else if (activeButton === 'mobileMenu') {
        var navMenuActive = this.state.activeButton === 'navMenu' ? '' : 'navMenu';
        this.setState({
          activeButton: navMenuActive
        });
      } else if (activeButton === 'clickLogIn' || activeButton === 'clickMyAccount') {
        var menuActive = this.state.activeButton === 'myNypl' ? '' : 'myNypl';
        this.setState({
          activeButton: menuActive
        });
      }

      _utils.default.trackHeader('Click', "Mobile ".concat(activeButton));
    }
    /**
     * closeDropDown()
     * This is necessary for the FocusTrap component to execute
     * the proper deactivateMethod for each dialog.
     */

  }, {
    key: "closeDropDown",
    value: function closeDropDown(focusElem) {
      this.setState({
        activeButton: ''
      });

      _reactDom.default.findDOMNode(this.refs[focusElem]).focus();
    }
    /**
    * renderLogoLink()
    * Generates the DOM for the NYPL Logo Link.
    * Uses SVG LionLogo icon & visuallyHidden label.
    * @returns {Object} React DOM.
    */

  }, {
    key: "renderLogoLink",
    value: function renderLogoLink() {
      return /*#__PURE__*/_react.default.createElement("a", {
        style: styles.mobileLogoLink,
        href: this.props.nyplRootUrl,
        "aria-label": this.props.alt
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "visuallyHidden"
      }, this.props.alt), /*#__PURE__*/_react.default.createElement(_dgxSvgIcons.LionLogoIcon, {
        ariaHidden: true,
        className: "".concat(this.props.className, "-logo"),
        height: 30,
        width: 30,
        focusable: false
      }));
    }
    /**
    * renderMyNyplButton()
    * Generates the DOM for the MyNyplLogin button/dialog.
    * Uses SVG icon & visuallyHidden label.
    * @returns {Object} React DOM.
    */

  }, {
    key: "renderMyNyplButton",
    value: function renderMyNyplButton() {
      var _this2 = this;

      var myNyplClass = '';
      var gaAction = this.props.patronName ? 'MyAccount' : 'LogIn';

      var icon = /*#__PURE__*/_react.default.createElement(_dgxSvgIcons.LoginIcon, {
        className: "loginIcon",
        ariaHidden: true,
        focusable: false
      });

      if (this.props.patronName) {
        icon = /*#__PURE__*/_react.default.createElement(_dgxSvgIcons.LoginIconSolid, {
          className: "loginIcon-loggedIn animated fadeIn",
          ariaHidden: true,
          focusable: false
        });
      }

      var buttonStyles = styles.inactiveMyNyplButton;
      var buttonLabel = this.props.patronName ? 'My Account' : 'Log In';
      var active = this.state.activeButton === 'myNypl';

      if (active) {
        var _React$createElement;

        myNyplClass = 'active';
        icon = /*#__PURE__*/_react.default.createElement(_dgxSvgIcons.XIcon, (_React$createElement = {
          ariaHidden: true,
          fill: "#FFF"
        }, _defineProperty(_React$createElement, "ariaHidden", true), _defineProperty(_React$createElement, "focusable", false), _React$createElement));
        buttonStyles = styles.activeMyNyplButton;
        buttonLabel = 'Close';
      }

      return /*#__PURE__*/_react.default.createElement("li", {
        style: styles.listItem
      }, /*#__PURE__*/_react.default.createElement(_focusTrapReact.default, {
        className: "mobileMyNypl-wrapper",
        focusTrapOptions: {
          onDeactivate: function onDeactivate() {
            return _this2.closeDropDown('myNyplBtnFocus');
          },
          clickOutsideDeactivates: true
        },
        active: active
      }, /*#__PURE__*/_react.default.createElement(_reactTappable.default, {
        className: "".concat(this.props.className, "-myNyplButton"),
        component: "button",
        style: (0, _underscore.extend)(styles.myNyplButton, buttonStyles),
        onTap: function onTap() {
          return _this2.toggleMobileActiveBtn("click".concat(gaAction));
        },
        "aria-haspopup": "true",
        "aria-expanded": active ? true : null,
        ref: "myNyplBtnFocus"
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "visuallyHidden"
      }, buttonLabel), icon), active && /*#__PURE__*/_react.default.createElement(_MobileMyNypl.default, {
        className: "".concat(myNyplClass, " mobileMyNypl"),
        isLoggedIn: this.props.isLoggedIn,
        patronName: this.props.patronName,
        logOutLink: this.props.logOutLink
      })));
    }
    /**
    * renderLocationsLink()
    * Generates the DOM for the Locations link.
    * Uses SVG icon & visuallyHidden label.
    * @returns {Object} React DOM.
    */

  }, {
    key: "renderLocationsLink",
    value: function renderLocationsLink() {
      var locatorUrl = this.props.locatorUrl || '//www.nypl.org/locations/map?nearme=true';
      return /*#__PURE__*/_react.default.createElement("li", {
        style: styles.listItem
      }, /*#__PURE__*/_react.default.createElement("a", {
        style: styles.locationsLink,
        href: locatorUrl,
        onClick: function onClick() {
          return _utils.default.trackHeader('Click', 'Mobile Locations Button');
        },
        className: "".concat(this.props.className, "-locator"),
        "aria-label": "NYPL Locations Near Me"
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "visuallyHidden"
      }, "NYPL Locations Near Me"), /*#__PURE__*/_react.default.createElement(_dgxSvgIcons.LocatorIcon, {
        ariaHidden: true,
        fill: "#000",
        focusable: false
      })));
    }
    /**
    * renderSearchButton()
    * Generates the DOM for the Search button/dialog.
    * Uses SVG icon & visuallyHidden label.
    * @returns {Object} React DOM.
    */

  }, {
    key: "renderSearchButton",
    value: function renderSearchButton() {
      var _this3 = this;

      var mobileSearchClass = '';

      var icon = /*#__PURE__*/_react.default.createElement(_dgxSvgIcons.SearchIcon, {
        ariaHidden: true,
        fill: "#000",
        focusable: false
      });

      var buttonStyles = styles.inactiveSearchButton;
      var buttonLabel = 'Open Search';
      var active = this.state.activeButton === 'search';

      if (active) {
        mobileSearchClass = ' active';
        icon = /*#__PURE__*/_react.default.createElement(_dgxSvgIcons.XIcon, {
          ariaHidden: true,
          fill: "#FFF",
          focusable: false
        });
        buttonStyles = styles.activeSearchButton;
        buttonLabel = 'Close Search';
      } // The desired initialFocus selector only exists when active:


      var initialFocus = active ? ".".concat(this.props.className, "-searchForm-legend") : null;
      return /*#__PURE__*/_react.default.createElement("li", {
        style: styles.listItem
      }, /*#__PURE__*/_react.default.createElement(_focusTrapReact.default, {
        className: "".concat(this.props.className, "-searchDialog"),
        focusTrapOptions: {
          onDeactivate: function onDeactivate() {
            return _this3.closeDropDown('searchBtnFocus');
          },
          initialFocus: initialFocus,
          clickOutsideDeactivates: true
        },
        active: active
      }, /*#__PURE__*/_react.default.createElement(_reactTappable.default, {
        className: "".concat(this.props.className, "-searchButton").concat(mobileSearchClass),
        component: "button",
        style: (0, _underscore.extend)(styles.searchButton, buttonStyles),
        onTap: function onTap() {
          return _this3.toggleMobileActiveBtn('clickSearch');
        },
        "aria-haspopup": "true",
        "aria-expanded": active ? true : null,
        ref: "searchBtnFocus"
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "visuallyHidden"
      }, buttonLabel), icon), active && /*#__PURE__*/_react.default.createElement(_SearchBox.default, {
        className: "".concat(this.props.className, "-searchForm"),
        type: "mobile"
      })));
    }
    /**
    * renderMenuButton()
    * Generates the DOM for the Menu button
    * Uses SVG icon & visuallyHidden label.
    * @returns {Object} React DOM.
    */

  }, {
    key: "renderMenuButton",
    value: function renderMenuButton() {
      var _this4 = this;

      var mobileMenuClass = '';

      var icon = /*#__PURE__*/_react.default.createElement(_dgxSvgIcons.MenuIcon, {
        ariaHidden: true,
        fill: "#000",
        focusable: false
      });

      var buttonStyles = styles.inactiveMenuButton;
      var buttonLabel = 'Open Navigation';
      var dialogWindow = null;
      var active = this.state.activeButton === 'navMenu';

      if (active) {
        mobileMenuClass = ' active';
        icon = /*#__PURE__*/_react.default.createElement(_dgxSvgIcons.XIcon, {
          ariaHidden: true,
          fill: "#FFF",
          focusable: false
        });
        buttonStyles = styles.activeMenuButton;
        buttonLabel = 'Close Navigation';
        dialogWindow = /*#__PURE__*/_react.default.createElement(_NavMenu.default, {
          className: "".concat(this.props.className, "-navMenu"),
          lang: this.props.lang,
          items: this.props.navData,
          urlType: this.props.urlType,
          isLoggedIn: this.props.isLoggedIn,
          patronName: this.state.patronName,
          logOutLink: this.state.logOutUrl,
          mobileActive: active
        });
      } // The desired initialFocus selector only exists when active:


      var initialFocus = active ? 'ul.header-mobile-navMenu-list li:first-of-type a' : null;
      return /*#__PURE__*/_react.default.createElement("li", {
        style: styles.listItem
      }, /*#__PURE__*/_react.default.createElement(_focusTrapReact.default, {
        focusTrapOptions: {
          initialFocus: initialFocus,
          onDeactivate: function onDeactivate() {
            return _this4.closeDropDown('navMenuBtnFocus');
          },
          clickOutsideDeactivates: true
        },
        active: active
      }, /*#__PURE__*/_react.default.createElement(_reactTappable.default, {
        className: "".concat(this.props.className, "-menuButton").concat(mobileMenuClass),
        component: "button",
        style: (0, _underscore.extend)(styles.menuButton, buttonStyles),
        onTap: function onTap() {
          return _this4.toggleMobileActiveBtn('mobileMenu');
        },
        "aria-haspopup": "true",
        "aria-expanded": active ? true : null,
        ref: "navMenuBtnFocus"
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "visuallyHidden"
      }, buttonLabel), icon), /*#__PURE__*/_react.default.createElement("div", {
        className: "header-mobile-wrapper".concat(mobileMenuClass)
      }, dialogWindow)));
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react.default.createElement("div", {
        className: this.props.className,
        style: styles.base
      }, this.renderLogoLink(), /*#__PURE__*/_react.default.createElement("ul", {
        style: styles.list
      }, this.renderMyNyplButton(), this.renderLocationsLink(), this.renderSearchButton(), this.renderMenuButton()));
    }
  }]);

  return MobileHeader;
}(_react.default.Component);

MobileHeader.propTypes = {
  lang: _propTypes.default.string,
  className: _propTypes.default.string,
  locatorUrl: _propTypes.default.string.isRequired,
  nyplRootUrl: _propTypes.default.string,
  alt: _propTypes.default.string,
  isLoggedIn: _propTypes.default.bool,
  patronName: _propTypes.default.string,
  logOutLink: _propTypes.default.string.isRequired,
  navData: _propTypes.default.arrayOf(_propTypes.default.object).isRequired,
  urlType: _propTypes.default.string.isRequired
};
MobileHeader.defaultProps = {
  lang: 'en',
  isLoggedIn: false,
  patronName: null,
  className: 'mobileHeader',
  nyplRootUrl: '/',
  alt: 'The New York Public Library'
};
var _default = MobileHeader;
exports.default = _default;