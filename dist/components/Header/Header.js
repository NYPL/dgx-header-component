// NPM Modules
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _underscore = require('underscore');

// Nav Config

var _navConfigJs = require('../../navConfig.js');

var _navConfigJs2 = _interopRequireDefault(_navConfigJs);

// ALT Flux

var _storesHeaderStoreJs = require('../../stores/HeaderStore.js');

var _storesHeaderStoreJs2 = _interopRequireDefault(_storesHeaderStoreJs);

var _actionsActionsJs = require('../../actions/Actions.js');

var _actionsActionsJs2 = _interopRequireDefault(_actionsActionsJs);

// NYPL Components

var _LogoLogoJs = require('../Logo/Logo.js');

var _LogoLogoJs2 = _interopRequireDefault(_LogoLogoJs);

var _DonateButtonDonateButtonJs = require('../DonateButton/DonateButton.js');

var _DonateButtonDonateButtonJs2 = _interopRequireDefault(_DonateButtonDonateButtonJs);

var _ButtonsSimpleButtonJs = require('../Buttons/SimpleButton.js');

var _ButtonsSimpleButtonJs2 = _interopRequireDefault(_ButtonsSimpleButtonJs);

var _SubscribeButtonSubscribeButtonJs = require('../SubscribeButton/SubscribeButton.js');

var _SubscribeButtonSubscribeButtonJs2 = _interopRequireDefault(_SubscribeButtonSubscribeButtonJs);

var _MyNyplButtonMyNyplButtonJs = require('../MyNyplButton/MyNyplButton.js');

var _MyNyplButtonMyNyplButtonJs2 = _interopRequireDefault(_MyNyplButtonMyNyplButtonJs);

var _MyNyplMobileMyNyplJs = require('../MyNypl/MobileMyNypl.js');

var _MyNyplMobileMyNyplJs2 = _interopRequireDefault(_MyNyplMobileMyNyplJs);

var _NavMenuNavMenuJs = require('../NavMenu/NavMenu.js');

var _NavMenuNavMenuJs2 = _interopRequireDefault(_NavMenuNavMenuJs);

var _MobileHeaderJs = require('./MobileHeader.js');

var _MobileHeaderJs2 = _interopRequireDefault(_MobileHeaderJs);

var _GlobalAlertsGlobalAlertsJs = require('../GlobalAlerts/GlobalAlerts.js');

var _GlobalAlertsGlobalAlertsJs2 = _interopRequireDefault(_GlobalAlertsGlobalAlertsJs);

var _dgxSkipNavigationLink = require('dgx-skip-navigation-link');

var _dgxSkipNavigationLink2 = _interopRequireDefault(_dgxSkipNavigationLink);

// Utility Library

var _utilsUtilsJs = require('../../utils/utils.js');

var _utilsUtilsJs2 = _interopRequireDefault(_utilsUtilsJs);

// FeatureFlags Module

var _dgxFeatureFlags = require('dgx-feature-flags');

var _dgxFeatureFlags2 = _interopRequireDefault(_dgxFeatureFlags);

// When minifying with Webpack, you can use this:
// import '../../styles/main.scss';
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
    padding: '5px 15px 5px 5px',
    verticalAlign: 'baseline'
  },
  libraryCardButton: {
    display: 'inline-block',
    color: '#000',
    padding: '5px',
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

var Header = (function (_React$Component) {
  _inherits(Header, _React$Component);

  function Header(props) {
    _classCallCheck(this, Header);

    _get(Object.getPrototypeOf(Header.prototype), 'constructor', this).call(this, props);

    this.state = (0, _underscore.extend)({
      headerHeight: null,
      cookie: this.getCookie('nyplpreview'),
      featureFlags: _dgxFeatureFlags2['default'].store.getState()
    }, _storesHeaderStoreJs2['default'].getState());

    this.handleStickyHeader = this.handleStickyHeader.bind(this);
  }

  _createClass(Header, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _storesHeaderStoreJs2['default'].listen(this.onChange.bind(this));
      _dgxFeatureFlags2['default'].store.listen(this.onChange.bind(this));

      // Height needs to be set once the alerts (if any) are mounted.
      this.setHeaderHeight();

      // Set which FeatureFlag is to be fired based off preview cookie
      this.setFeatureFlagHeaderCall();

      // Watch which FeatureFlag is called to fire
      // the proper client-side ajax call to populate the Header data state
      this.watchFeatureFlagHeaderCall();

      // Listen to the scroll event for the sticky header.
      window.addEventListener('scroll', this.handleStickyHeader, false);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _storesHeaderStoreJs2['default'].unlisten(this.onChange.bind(this));
      _dgxFeatureFlags2['default'].store.unlisten(this.onChange.bind(this));

      // Removing event listener to minimize garbage collection
      window.removeEventListener('scroll', this.handleStickyHeader, false);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      // Re-fetch the default/current IA /header-data endpoint if
      // the FeatureFlag 'header-upcoming-ia' has been deactivated.
      // Used only as a fallback to deactivate a flag and set the
      // Header data to it's default IA.
      if (!this.state.featureFlags.get('header-upcoming-ia') && prevState.featureFlags.get('header-upcoming-ia')) {
        _actionsActionsJs2['default'].fetchHeaderData(this.props.env, this.props.urls);
      }
    }
  }, {
    key: 'onChange',
    value: function onChange() {
      this.setState((0, _underscore.extend)({
        headerHeight: this.state.headerHeight,
        cookie: this.state.cookie,
        featureFlags: _dgxFeatureFlags2['default'].store.getState()
      }, _storesHeaderStoreJs2['default'].getState()));
    }

    /**
     * getHeaderHeight()
     * returns the Height of the Header DOM
     * element in pixels.
     */
  }, {
    key: 'getHeaderHeight',
    value: function getHeaderHeight() {
      var headerDOM = _reactDom2['default'].findDOMNode(this.refs.nyplHeader);
      return headerDOM.getBoundingClientRect().height;
    }

    /**
     * setHeaderHeight()
     * Updates the state headerHeight property
     * only if headerHeight is not defined.
     */
  }, {
    key: 'setHeaderHeight',
    value: function setHeaderHeight() {
      var _this = this;

      if (!this.state.headerHeight) {
        setTimeout(function () {
          _this.setState({ headerHeight: _this.getHeaderHeight() });
        }, 500);
      }
    }

    /**
     * getWindowVerticallScroll()
     * returns the current window vertical
     * scroll position in pixels.
     */
  }, {
    key: 'getWindowVerticalScroll',
    value: function getWindowVerticalScroll() {
      return window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    }

    /**
     * Returns the value for the given cookie name.
     * If the cookie doesn't exist a null value will be returned.
     * https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie/Simple_document.cookie_framework
     * @returns {string} - Cookie value.
     */
  }, {
    key: 'getCookie',
    value: function getCookie(name) {
      if (!name || typeof document === 'undefined' || !document.cookie) {
        return null;
      }
      return decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(name).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null;
    }

    /**
     * Verifies if the previewCookie has been set to '1' and
     * activates the appropriate FeatureFlag
     */
  }, {
    key: 'setFeatureFlagHeaderCall',
    value: function setFeatureFlagHeaderCall() {
      if (this.state.cookie && this.state.cookie === '1') {
        _dgxFeatureFlags2['default'].utils.activateFeature('header-upcoming-ia');
      }
    }

    /**
     * Checks if the FeatureFlag name passed is active or not and triggers
     * the appropriate Action to fetch the Header data.
     */
  }, {
    key: 'watchFeatureFlagHeaderCall',
    value: function watchFeatureFlagHeaderCall() {
      if (_dgxFeatureFlags2['default'].store._isFeatureActive('header-upcoming-ia')) {
        _actionsActionsJs2['default'].fetchHeaderData(this.props.env, this.props.urls, 'upcoming');
      } else {
        _actionsActionsJs2['default'].fetchHeaderData(this.props.env, this.props.urls);
      }
    }

    /**
     * handleStickyHeader()
     * Executes Actions.updateIsHeaderSticky()
     * with the proper boolean value to update the
     * HeaderStore.isSticky value based on the window
     * vertical scroll position surpassing the height
     * of the Header DOM element.
     */
  }, {
    key: 'handleStickyHeader',
    value: function handleStickyHeader() {
      var headerHeight = this.state.headerHeight;
      var windowVerticalDistance = this.getWindowVerticalScroll();

      if (windowVerticalDistance && headerHeight && windowVerticalDistance > headerHeight) {
        // Only update the value if sticky is false
        if (!_storesHeaderStoreJs2['default']._getIsStickyValue()) {
          // Fire GA Event when Header is in Sticky Mode
          _utilsUtilsJs2['default']._trackHeader.bind(this, 'scroll', 'Sticky Header');
          // Update the isSticky flag
          _actionsActionsJs2['default'].updateIsHeaderSticky(true);
        }
      } else {
        // Avoids re-assignment on each scroll by checking if it is already true
        if (_storesHeaderStoreJs2['default']._getIsStickyValue()) {
          _actionsActionsJs2['default'].updateIsHeaderSticky(false);
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var isHeaderSticky = this.state.isSticky;
      var headerHeight = this.state.headerHeight;
      var headerClass = this.props.className || 'Header';
      var headerClasses = (0, _classnames2['default'])(headerClass, { sticky: isHeaderSticky });
      var showDialog = _storesHeaderStoreJs2['default']._getMobileMyNyplButtonValue();
      var mobileMyNyplClasses = (0, _classnames2['default'])({ active: showDialog });
      var skipNav = this.props.skipNav ? _react2['default'].createElement(_dgxSkipNavigationLink2['default'], this.props.skipNav) : '';
      var gaPublicPreview = '\n      var docCookies = {\n        getItem: function (sKey) {\n          if (!sKey) { return null; }\n          return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;\n        }\n      };\n\n      (function(i,s,o,g,r,a,m){i[\'GoogleAnalyticsObject\']=r;i[r]=i[r]||function(){\n      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),\n      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)\n      })(window,document,\'script\',\'https://www.google-analytics.com/analytics.js\',\'ga\');\n\n      ga(\'create\', \'UA-1420324-122\', \'auto\');\n\n      if (docCookies.getItem(nyplpreview) && docCookies.getItem(nyplpreview) === \'1\') {\n        ga(\'set\', \'dimension1\', "Public Preview");\n      }\n\n      ga(\'send\', \'pageview\');\n    ';

      return _react2['default'].createElement(
        'header',
        {
          id: this.props.id,
          className: headerClasses,
          ref: 'nyplHeader',
          style: isHeaderSticky ? { height: headerHeight + 'px' } : null
        },
        _react2['default'].createElement('script', {
          dangerouslySetInnerHTML: this.createMarkup(gaPublicPreview) }),
        skipNav,
        _react2['default'].createElement(_GlobalAlertsGlobalAlertsJs2['default'], { className: headerClass + '-GlobalAlerts' }),
        _react2['default'].createElement(
          'div',
          { className: headerClass + '-Wrapper' },
          _react2['default'].createElement(_MobileHeaderJs2['default'], {
            className: headerClass + '-Mobile',
            locatorUrl: this.props.urls === 'absolute' ? '//www.nypl.org/locations/map?nearme=true' : '/locations/map?nearme=true',
            nyplRootUrl: this.props.urls === 'absolute' ? '//www.nypl.org' : '/',
            ref: 'headerMobile'
          }),
          _react2['default'].createElement(
            'div',
            { className: 'MobileMyNypl-Wrapper ' + mobileMyNyplClasses },
            _react2['default'].createElement(_MyNyplMobileMyNyplJs2['default'], null)
          ),
          _react2['default'].createElement(
            'div',
            {
              className: headerClass + '-TopWrapper',
              style: styles.wrapper,
              ref: 'headerTopWrapper'
            },
            _react2['default'].createElement(_LogoLogoJs2['default'], {
              className: headerClass + '-Logo',
              target: this.props.urls === 'absolute' ? '//www.nypl.org' : '/'
            }),
            _react2['default'].createElement(
              'div',
              { className: headerClass + '-Buttons', style: styles.topButtons },
              _react2['default'].createElement(_MyNyplButtonMyNyplButtonJs2['default'], {
                label: 'Log In',
                refId: 'desktopLogin'
              }),
              _react2['default'].createElement(_ButtonsSimpleButtonJs2['default'], {
                label: 'Locations',
                target: this.props.urls === 'absolute' ? '//www.nypl.org/locations/map' : '/locations/map',
                className: 'LocationsTopLink',
                id: 'LocationsTopLink',
                gaAction: 'Locations',
                gaLabel: 'Header Top Links',
                style: styles.locationsTopLink
              }),
              _react2['default'].createElement(_ButtonsSimpleButtonJs2['default'], {
                label: 'Get a Library Card',
                target: '//catalog.nypl.org/screens/selfregpick.html',
                className: 'LibraryCardButton',
                id: 'LibraryCardButton',
                gaAction: 'Get a Library Card',
                gaLabel: 'Header Top Links',
                style: styles.libraryCardButton
              }),
              _react2['default'].createElement(_SubscribeButtonSubscribeButtonJs2['default'], {
                label: 'Get Email Updates',
                lang: this.props.lang,
                style: styles.subscribeButton
              }),
              _react2['default'].createElement(_DonateButtonDonateButtonJs2['default'], {
                id: 'Top-DonateButton',
                lang: this.props.lang,
                style: styles.donateButton,
                gaLabel: 'Header Top Links'
              }),
              _dgxFeatureFlags2['default'].store._isFeatureActive('shop-link') ? _react2['default'].createElement(_ButtonsSimpleButtonJs2['default'], {
                label: 'Shop',
                target: 'http://shop.nypl.org',
                className: 'shopTopLink',
                id: 'shopTopLink',
                gaAction: 'Shop',
                gaLabel: 'Header Top Links',
                style: styles.shopLink
              }) : null
            )
          ),
          _react2['default'].createElement(_NavMenuNavMenuJs2['default'], {
            className: headerClass + '-NavMenu',
            lang: this.props.lang,
            items: this.state.headerData,
            urlType: this.props.urls,
            cookie: this.state.cookie
          })
        )
      );
    }
  }]);

  return Header;
})(_react2['default'].Component);

Header.propTypes = {
  lang: _react2['default'].PropTypes.string,
  className: _react2['default'].PropTypes.string,
  id: _react2['default'].PropTypes.string,
  skipNav: _react2['default'].PropTypes.object,
  urls: _react2['default'].PropTypes.string,
  env: _react2['default'].PropTypes.string
};

Header.defaultProps = {
  lang: 'en',
  className: 'Header',
  id: 'nyplHeader',
  skipNav: null,
  urls: '',
  env: 'production'
};

exports['default'] = {
  Header: Header,
  navConfig: _navConfigJs2['default']
};
module.exports = exports['default'];