'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.navConfig = exports.Header = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _underscore = require('underscore');

var _dgxFeatureFlags = require('dgx-feature-flags');

var _dgxFeatureFlags2 = _interopRequireDefault(_dgxFeatureFlags);

var _dgxSkipNavigationLink = require('dgx-skip-navigation-link');

var _dgxSkipNavigationLink2 = _interopRequireDefault(_dgxSkipNavigationLink);

var _navConfig = require('../../navConfig');

var _navConfig2 = _interopRequireDefault(_navConfig);

var _featureFlagConfig = require('../../featureFlagConfig');

var _featureFlagConfig2 = _interopRequireDefault(_featureFlagConfig);

var _appConfig = require('../../appConfig');

var _appConfig2 = _interopRequireDefault(_appConfig);

var _accountConfig = require('../../accountConfig');

var _accountConfig2 = _interopRequireDefault(_accountConfig);

var _Logo = require('../Logo/Logo');

var _Logo2 = _interopRequireDefault(_Logo);

var _DonateButton = require('../DonateButton/DonateButton');

var _DonateButton2 = _interopRequireDefault(_DonateButton);

var _SimpleLink = require('../Links/SimpleLink');

var _SimpleLink2 = _interopRequireDefault(_SimpleLink);

var _SubscribeButton = require('../SubscribeButton/SubscribeButton');

var _SubscribeButton2 = _interopRequireDefault(_SubscribeButton);

var _MyNyplButton = require('../MyNyplButton/MyNyplButton');

var _MyNyplButton2 = _interopRequireDefault(_MyNyplButton);

var _NavMenu = require('../NavMenu/NavMenu');

var _NavMenu2 = _interopRequireDefault(_NavMenu);

var _MobileHeader = require('./MobileHeader');

var _MobileHeader2 = _interopRequireDefault(_MobileHeader);

var _GlobalAlerts = require('../GlobalAlerts/GlobalAlerts');

var _GlobalAlerts2 = _interopRequireDefault(_GlobalAlerts);

var _FundraisingBanner = require('../FundraisingBanner/FundraisingBanner');

var _FundraisingBanner2 = _interopRequireDefault(_FundraisingBanner);

var _utils = require('../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // NPM Modules

// Feature FeatureFlags


// Nav Config


// NYPL Components

// Utility Library


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

var Header = function (_React$Component) {
  _inherits(Header, _React$Component);

  function Header(props) {
    _classCallCheck(this, Header);

    var _this = _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));

    var _this$props = _this.props,
        patron = _this$props.patron,
        navData = _this$props.navData,
        _this$props$currentLo = _this$props.currentLocation,
        currentLocation = _this$props$currentLo === undefined ? window.location || {} : _this$props$currentLo,
        _this$props$currentTi = _this$props.currentTime,
        currentTime = _this$props$currentTi === undefined ? Date.now() || undefined : _this$props$currentTi;


    var patronNameObject = !(0, _underscore.isEmpty)(patron) && patron.names && patron.names.length ? _utils2.default.modelPatronName(patron.names[0]) : {};

    _this.state = (0, _underscore.extend)({
      navData: navData,
      loginCookieName: 'nyplIdentityPatron',
      loginCookieValue: null,
      patronName: patronNameObject.name || '',
      patronInitial: patronNameObject.initial || '',
      patronDataReceived: patron.loggedIn || false,
      isFeatureFlagsActivated: {},
      logOutUrl: '',
      featureFlagsStore: _dgxFeatureFlags2.default.store.getState(),
      currentLocation: currentLocation,
      currentTime: currentTime
    });
    return _this;
  }

  _createClass(Header, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // Listen on FeatureFlags Store updates
      _dgxFeatureFlags2.default.store.listen(this.onFeatureFlagsChange.bind(this));
      // Set the log out link to state
      this.setLogOutLink(window.location.href);
      // Set nyplIdentityPatron cookie to the state.
      this.setLoginCookie(this.state.loginCookieName);
      // Set feature flag cookies to the state
      // We don't have any feature flags set in the config list at this moment though
      _utils2.default.checkFeatureFlagActivated(_featureFlagConfig2.default.featureFlagList, this.state.isFeatureFlagsActivated);
      // Check if the cookie "PAT_LOGGED_IN" exists and then set the timer for deleting it
      this.handleEncoreLoggedInTimer(this.state.currentLocation, this.state.currentTime);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      // Listen on FeatureFlags Store updates
      _dgxFeatureFlags2.default.store.unlisten(this.onFeatureFlagsChange.bind(this));
      // Removing event listener to minimize garbage collection
    }
  }, {
    key: 'handleEncoreLoggedInTimer',
    value: function handleEncoreLoggedInTimer(currentLocation, currentTime) {
      var encoreLogInExpireDuration = _accountConfig2.default.patLoggedInCookieExpiredTime;

      // See if the user has logged in Encore
      if (_utils2.default.hasCookie('PAT_LOGGED_IN')) {
        // Then check if the user is visiting a new Encore page
        if (currentLocation.hostname && currentLocation.hostname == 'browse.nypl.org') {
          _utils2.default.setCookie('ENCORE_LAST_VISITED', currentTime);
          this.logOutEncoreIn(encoreLogInExpireDuration);
        } else {
          var lastVisitedEncoreTime = _utils2.default.getCookie('ENCORE_LAST_VISITED');
          var timeTillLogOut = lastVisitedEncoreTime ? encoreLogInExpireDuration - (currentTime - lastVisitedEncoreTime) : undefined;

          this.logOutEncoreIn(timeTillLogOut);
        }
      }
    }
  }, {
    key: 'logOutEncoreIn',
    value: function logOutEncoreIn(time) {
      var timeTillLogOut = time > 0 ? time : 0;

      setTimeout(function () {
        _utils2.default.deleteCookie('PAT_LOGGED_IN');
        _utils2.default.deleteCookie('ENCORE_LAST_VISITED');
        _utils2.default.deleteCookie('nyplIdentityPatron');
      }, timeTillLogOut);
    }
  }, {
    key: 'onFeatureFlagsChange',
    value: function onFeatureFlagsChange() {
      this.setState({ featureFlagsStore: _dgxFeatureFlags2.default.store.getState() });
    }

    /**
     * setLoginCookie()
     * Updates the state loginCookieValue property
     */

  }, {
    key: 'setLoginCookie',
    value: function setLoginCookie(cookie) {
      if (_utils2.default.hasCookie(cookie)) {
        var loginCookieValue = _utils2.default.getCookie(cookie);

        this.setState({ loginCookieValue: loginCookieValue });

        if (!this.state.patronDataReceived) {
          this.fetchPatronData(loginCookieValue);
        }
      } else {
        this.setState({ loginCookieValue: null });
      }
    }

    /**
     * setLogOutLink(location)
     * Generate the full log out url including the redirect URI, and update the state with it.
     * @param {location} - The URI for redirect request
     */

  }, {
    key: 'setLogOutLink',
    value: function setLogOutLink(location) {
      this.setState({ logOutUrl: _utils2.default.renderDynamicLogOutLink(location) });
    }

    /**
     * fetchPatronData(cookie)
     * Executes utils.getLoginData to fetch patron's data based on the cookie.
     * Updates the state with the results.
     * Also, pass this.setLoginCookie(), if cookie needs to be refreshed and set again.
     * @param {cookie} - The cookie returned from log in.
     */

  }, {
    key: 'fetchPatronData',
    value: function fetchPatronData(cookie) {
      var _this2 = this;

      _utils2.default.getLoginData(cookie, function (result) {
        if (result.data && result.data.data) {
          var patronNameObject = _utils2.default.modelPatronName(_utils2.default.extractPatronName(result.data));

          _this2.setState({
            patronName: patronNameObject.name,
            patronInitial: patronNameObject.initial,
            patronDataReceived: true
          });
        }
      }, _appConfig2.default.loginMyNyplLinks.tokenRefreshLink, function () {
        _this2.setLoginCookie(_this2.state.loginCookieName);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var headerClass = this.props.className;
      var skipNav = this.props.skipNav ? _react2.default.createElement(_dgxSkipNavigationLink2.default, this.props.skipNav) : '';
      var isLoggedIn = !!this.state.patronDataReceived;

      return _react2.default.createElement(
        'header',
        {
          id: this.props.id,
          className: headerClass
        },
        skipNav,
        _react2.default.createElement(_GlobalAlerts2.default, { className: headerClass + '-globalAlerts' }),
        _react2.default.createElement(
          'div',
          { className: headerClass + '-wrapper' },
          _react2.default.createElement(_MobileHeader2.default, {
            className: headerClass + '-mobile',
            locatorUrl: this.props.urlType === 'absolute' ? '//www.nypl.org/locations/map?nearme=true' : '/locations/map?nearme=true',
            nyplRootUrl: this.props.urlType === 'absolute' ? '//www.nypl.org' : '/',
            isLoggedIn: isLoggedIn,
            patronName: this.state.patronName,
            logOutLink: this.state.logOutUrl,
            navData: this.props.navData,
            urlType: this.props.urlType
          }),
          _react2.default.createElement(
            'div',
            {
              className: headerClass + '-topWrapper',
              style: styles.wrapper
            },
            _react2.default.createElement(_Logo2.default, {
              className: headerClass + '-logo',
              target: this.props.urlType === 'absolute' ? '//www.nypl.org' : '/'
            }),
            _react2.default.createElement(
              'nav',
              {
                className: headerClass + '-buttons',
                style: styles.topButtons,
                'aria-label': 'Header top links'
              },
              _react2.default.createElement(
                'ul',
                null,
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(_MyNyplButton2.default, {
                    refId: 'desktopLogin',
                    isLoggedIn: isLoggedIn,
                    patronName: this.state.patronName,
                    logOutLink: this.state.logOutUrl,
                    gaAction: isLoggedIn ? 'My Account' : 'Log In'
                  })
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(_SimpleLink2.default, {
                    label: 'Locations',
                    target: this.props.urlType === 'absolute' ? '//www.nypl.org/locations/map' : '/locations/map',
                    className: 'locationsTopLink',
                    id: 'locationsTopLink',
                    gaAction: 'Locations',
                    gaLabel: 'Header Top Links',
                    style: styles.locationsTopLink
                  })
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(_SimpleLink2.default, {
                    label: 'Get a Library Card',
                    target: this.props.urlType === 'absolute' ? '//www.nypl.org/library-card' : '/library-card',
                    className: 'libraryCardButton',
                    id: 'libraryCardButton',
                    gaAction: 'Get a Library Card',
                    gaLabel: 'Header Top Links',
                    style: styles.libraryCardButton
                  })
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(_SubscribeButton2.default, {
                    label: 'Get Email Updates',
                    lang: this.props.lang,
                    style: styles.subscribeButton
                  })
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(_DonateButton2.default, {
                    id: 'donateButton',
                    lang: this.props.lang,
                    style: styles.donateButton,
                    gaLabel: 'Header Top Links'
                  })
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(_SimpleLink2.default, {
                    label: 'Shop',
                    target: 'http://shop.nypl.org/?utm_campaign=NYPLHeaderButton&utm_' + 'source=nypl.org&utm_medium=referral',
                    className: 'shopTopLink',
                    id: 'shopTopLink',
                    gaAction: 'Shop',
                    gaLabel: 'Header Top Links',
                    style: styles.shopLink
                  })
                )
              )
            )
          ),
          _react2.default.createElement(_NavMenu2.default, {
            className: headerClass + '-navMenu',
            lang: this.props.lang,
            items: this.state.navData,
            urlType: this.props.urlType,
            isLoggedIn: isLoggedIn,
            patronName: this.state.patronName,
            logOutLink: this.state.logOutUrl
          })
        ),
        _dgxFeatureFlags2.default.store._isFeatureActive(_appConfig2.default.fundraising.experimentName) && _react2.default.createElement(_FundraisingBanner2.default, {
          hideBannerCookieName: 'closeFundraiserBanner',
          gaLabel: 'Header Fundraising Banner'
        })
      );
    }
  }]);

  return Header;
}(_react2.default.Component);

Header.propTypes = {
  lang: _propTypes2.default.string,
  className: _propTypes2.default.string,
  id: _propTypes2.default.string,
  navData: _propTypes2.default.arrayOf(_propTypes2.default.object).isRequired,
  skipNav: _propTypes2.default.shape(_dgxSkipNavigationLink2.default.propTypes),
  patron: _propTypes2.default.shape({
    names: _propTypes2.default.arrayOf(_propTypes2.default.string),
    loggedIn: _propTypes2.default.bool
  }),
  urlType: _propTypes2.default.string
};

Header.defaultProps = {
  lang: 'en',
  className: 'header',
  id: 'nyplHeader',
  skipNav: null,
  urlType: 'relative',
  patron: {}
};

exports.Header = Header;
exports.navConfig = _navConfig2.default;