"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "navConfig", {
  enumerable: true,
  get: function get() {
    return _navConfig["default"];
  }
});
exports.Header = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _underscore = require("underscore");

var _dgxFeatureFlags = _interopRequireDefault(require("dgx-feature-flags"));

var _dgxSkipNavigationLink = _interopRequireDefault(require("dgx-skip-navigation-link"));

var _navConfig = _interopRequireDefault(require("../../navConfig"));

var _featureFlagConfig = _interopRequireDefault(require("../../featureFlagConfig"));

var _appConfig = _interopRequireDefault(require("../../appConfig"));

var _Logo = _interopRequireDefault(require("../Logo/Logo"));

var _DonateButton = _interopRequireDefault(require("../DonateButton/DonateButton"));

var _SimpleLink = _interopRequireDefault(require("../Links/SimpleLink"));

var _SubscribeButton = _interopRequireDefault(require("../SubscribeButton/SubscribeButton"));

var _MyNyplButton = _interopRequireDefault(require("../MyNyplButton/MyNyplButton"));

var _NavMenu = _interopRequireDefault(require("../NavMenu/NavMenu"));

var _MobileHeader = _interopRequireDefault(require("./MobileHeader"));

var _GlobalAlerts = _interopRequireDefault(require("../GlobalAlerts/GlobalAlerts"));

var _FundraisingBanner = _interopRequireDefault(require("../FundraisingBanner/FundraisingBanner"));

var _utils = _interopRequireDefault(require("../../utils/utils"));

var _encoreCatalogLogOutTimer = _interopRequireDefault(require("../../utils/encoreCatalogLogOutTimer"));

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
  wrapper: {
    position: 'relative'
  },
  topButtons: {
    position: 'absolute',
    top: '20px',
    textTransform: 'uppercase',
    display: 'block'
  },
  locationsTopLink: {
    display: 'inline-block',
    color: '#000',
    backgroundColor: '#FFF',
    padding: '12px',
    verticalAlign: 'baseline'
  },
  libraryCardButton: {
    display: 'inline-block',
    color: '#000',
    backgroundColor: '#FFF',
    padding: '12px',
    verticalAlign: 'baseline'
  },
  subscribeButton: {
    display: 'inline-block',
    margin: '0px 10px 0px 0px',
    verticalAlign: 'baseline'
  },
  donateButton: {
    display: 'inline-block',
    padding: '10px 18px',
    margin: '0 5px 0 0',
    lineHeight: 'normal',
    verticalAlign: 'baseline'
  },
  shopLink: {
    color: '#000',
    backgroundColor: '#FFF',
    padding: '10px 15px',
    margin: '0 0 0 5px',
    verticalAlign: 'baseline'
  },
  mobileMyNypl: {
    position: 'absolute',
    zIndex: 1000,
    right: '0',
    width: '220px',
    minHeight: '130px',
    backgroundColor: '#1B7FA7',
    padding: '25px 30px'
  }
};

var Header = /*#__PURE__*/function (_React$Component) {
  _inherits(Header, _React$Component);

  var _super = _createSuper(Header);

  function Header(props) {
    var _this;

    _classCallCheck(this, Header);

    _this = _super.call(this, props);
    var _this$props = _this.props,
        patron = _this$props.patron,
        navData = _this$props.navData,
        _this$props$currentTi = _this$props.currentTime,
        currentTime = _this$props$currentTi === void 0 ? Date.now() || undefined : _this$props$currentTi,
        _this$props$isTest = _this$props.isTest,
        isTest = _this$props$isTest === void 0 ? false : _this$props$isTest;
    var patronNameObject = !(0, _underscore.isEmpty)(patron) && patron.names && patron.names.length ? _utils["default"].modelPatronName(patron.names[0]) : {};
    _this.state = (0, _underscore.extend)({
      navData: navData,
      loginCookieName: 'nyplIdentityPatron',
      loginCookieValue: null,
      patronName: patronNameObject.name || '',
      patronInitial: patronNameObject.initial || '',
      patronDataReceived: patron.loggedIn || false,
      isFeatureFlagsActivated: {},
      logOutUrl: '',
      currentTime: currentTime,
      isTest: isTest
    }, {
      featureFlagsStore: _dgxFeatureFlags["default"].store.getState()
    });
    return _this;
  }

  _createClass(Header, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // Listen on FeatureFlags Store updates
      _dgxFeatureFlags["default"].store.listen(this.onFeatureFlagsChange.bind(this)); // Set the log out link to state


      this.setLogOutLink(window.location.href); // Set the timer to log out the user from Encore and Catalog
      // (mainly for Encore while Catalog as a side effect)

      _encoreCatalogLogOutTimer["default"].setEncoreLoggedInTimer(window.location.host, this.state.currentTime, this.state.isTest); // Set nyplIdentityPatron cookie to the state.


      this.setLoginCookie(this.state.loginCookieName); // Set feature flag cookies to the state
      // We don't have any feature flags set in the config list at this moment though

      _utils["default"].checkFeatureFlagActivated(_featureFlagConfig["default"].featureFlagList, this.state.isFeatureFlagsActivated);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      // Listen on FeatureFlags Store updates
      _dgxFeatureFlags["default"].store.unlisten(this.onFeatureFlagsChange.bind(this)); // Removing event listener to minimize garbage collection

    }
  }, {
    key: "onFeatureFlagsChange",
    value: function onFeatureFlagsChange() {
      this.setState({
        featureFlagsStore: _dgxFeatureFlags["default"].store.getState()
      });
    }
    /**
     * setLoginCookie()
     * Updates the state loginCookieValue property
     */

  }, {
    key: "setLoginCookie",
    value: function setLoginCookie(cookie) {
      if (_utils["default"].hasCookie(cookie)) {
        var loginCookieValue = _utils["default"].getCookie(cookie);

        this.setState({
          loginCookieValue: loginCookieValue
        });

        if (!this.state.patronDataReceived) {
          this.fetchPatronData(loginCookieValue);
        }
      } else {
        this.setState({
          loginCookieValue: null
        });
      }
    }
    /**
     * setLogOutLink(location)
     * Generate the full log out url including the redirect URI, and update the state with it.
     * @param {location} - The URI for redirect request
     */

  }, {
    key: "setLogOutLink",
    value: function setLogOutLink(location) {
      this.setState({
        logOutUrl: _utils["default"].renderDynamicLogOutLink(location)
      });
    }
    /**
     * fetchPatronData(cookie)
     * Executes utils.getLoginData to fetch patron's data based on the cookie.
     * Updates the state with the results.
     * Also, pass this.setLoginCookie(), if cookie needs to be refreshed and set again.
     * @param {cookie} - The cookie returned from log in.
     */

  }, {
    key: "fetchPatronData",
    value: function fetchPatronData(cookie) {
      var _this2 = this;

      _utils["default"].getLoginData(cookie, function (result) {
        if (result.data && result.data.data) {
          var patronNameObject = _utils["default"].modelPatronName(_utils["default"].extractPatronName(result.data));

          _this2.setState({
            patronName: patronNameObject.name,
            patronInitial: patronNameObject.initial,
            patronDataReceived: true
          });
        }
      }, _appConfig["default"].loginMyNyplLinks.tokenRefreshLink, function () {
        _this2.setLoginCookie(_this2.state.loginCookieName);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var headerClass = this.props.className;
      var skipNav = this.props.skipNav ? /*#__PURE__*/_react["default"].createElement(_dgxSkipNavigationLink["default"], this.props.skipNav) : '';
      var isLoggedIn = !!this.state.patronDataReceived;
      return /*#__PURE__*/_react["default"].createElement("header", {
        id: this.props.id,
        className: headerClass
      }, skipNav, /*#__PURE__*/_react["default"].createElement(_GlobalAlerts["default"], {
        className: "".concat(headerClass, "-globalAlerts")
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "".concat(headerClass, "-wrapper")
      }, /*#__PURE__*/_react["default"].createElement(_MobileHeader["default"], {
        className: "".concat(headerClass, "-mobile"),
        locatorUrl: this.props.urlType === 'absolute' ? '//www.nypl.org/locations/map?nearme=true' : '/locations/map?nearme=true',
        nyplRootUrl: this.props.urlType === 'absolute' ? '//www.nypl.org' : '/',
        isLoggedIn: isLoggedIn,
        patronName: this.state.patronName,
        logOutLink: this.state.logOutUrl,
        navData: this.props.navData,
        urlType: this.props.urlType
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "".concat(headerClass, "-topWrapper"),
        style: styles.wrapper
      }, /*#__PURE__*/_react["default"].createElement(_Logo["default"], {
        className: "".concat(headerClass, "-logo"),
        target: this.props.urlType === 'absolute' ? '//www.nypl.org' : '/'
      }), /*#__PURE__*/_react["default"].createElement("nav", {
        className: "".concat(headerClass, "-buttons"),
        style: styles.topButtons,
        "aria-label": "Header top links"
      }, /*#__PURE__*/_react["default"].createElement("ul", null, /*#__PURE__*/_react["default"].createElement("li", null, /*#__PURE__*/_react["default"].createElement(_MyNyplButton["default"], {
        refId: "desktopLogin",
        isLoggedIn: isLoggedIn,
        patronName: this.state.patronName,
        logOutLink: this.state.logOutUrl,
        gaAction: isLoggedIn ? 'My Account' : 'Log In'
      })), /*#__PURE__*/_react["default"].createElement("li", null, /*#__PURE__*/_react["default"].createElement(_SimpleLink["default"], {
        label: "Locations",
        target: this.props.urlType === 'absolute' ? '//www.nypl.org/locations/map' : '/locations/map',
        className: "locationsTopLink",
        id: "locationsTopLink",
        gaAction: "Locations",
        gaLabel: "Header Top Links",
        style: styles.locationsTopLink
      })), /*#__PURE__*/_react["default"].createElement("li", null, /*#__PURE__*/_react["default"].createElement(_SimpleLink["default"], {
        label: "Get a Library Card",
        target: this.props.urlType === 'absolute' ? '//www.nypl.org/library-card' : '/library-card',
        className: "libraryCardButton",
        id: "libraryCardButton",
        gaAction: "Get a Library Card",
        gaLabel: "Header Top Links",
        style: styles.libraryCardButton
      })), /*#__PURE__*/_react["default"].createElement("li", null, /*#__PURE__*/_react["default"].createElement(_SubscribeButton["default"], {
        label: "Get Email Updates",
        lang: this.props.lang,
        style: styles.subscribeButton
      })), /*#__PURE__*/_react["default"].createElement("li", null, /*#__PURE__*/_react["default"].createElement(_DonateButton["default"], {
        id: "donateButton",
        lang: this.props.lang,
        style: styles.donateButton,
        gaLabel: "Header Top Links"
      })), /*#__PURE__*/_react["default"].createElement("li", null, /*#__PURE__*/_react["default"].createElement(_SimpleLink["default"], {
        label: "Shop",
        target: 'http://shop.nypl.org/?utm_campaign=NYPLHeaderButton&utm_' + 'source=nypl.org&utm_medium=referral',
        className: "shopTopLink",
        id: "shopTopLink",
        gaAction: "Shop",
        gaLabel: "Header Top Links",
        style: styles.shopLink
      }))))), /*#__PURE__*/_react["default"].createElement(_NavMenu["default"], {
        className: "".concat(headerClass, "-navMenu"),
        lang: this.props.lang,
        items: this.state.navData,
        urlType: this.props.urlType,
        isLoggedIn: isLoggedIn,
        patronName: this.state.patronName,
        logOutLink: this.state.logOutUrl
      })), _dgxFeatureFlags["default"].store._isFeatureActive(_appConfig["default"].fundraising.experimentName) && /*#__PURE__*/_react["default"].createElement(_FundraisingBanner["default"], {
        hideBannerCookieName: "closeFundraiserBanner",
        gaLabel: "Header Fundraising Banner"
      }));
    }
  }]);

  return Header;
}(_react["default"].Component);

exports.Header = Header;
Header.propTypes = {
  lang: _propTypes["default"].string,
  className: _propTypes["default"].string,
  id: _propTypes["default"].string,
  navData: _propTypes["default"].arrayOf(_propTypes["default"].object).isRequired,
  skipNav: _propTypes["default"].shape(_dgxSkipNavigationLink["default"].propTypes),
  currentTime: _propTypes["default"].number,
  isTest: _propTypes["default"].bool,
  patron: _propTypes["default"].shape({
    names: _propTypes["default"].arrayOf(_propTypes["default"].string),
    loggedIn: _propTypes["default"].bool
  }),
  urlType: _propTypes["default"].string
};
Header.defaultProps = {
  lang: 'en',
  className: 'header',
  id: 'nyplHeader',
  skipNav: null,
  urlType: 'relative',
  patron: {}
};