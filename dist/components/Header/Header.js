'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.navConfig = exports.Header = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _underscore = require('underscore');

var _navConfig = require('../../navConfig.js');

var _navConfig2 = _interopRequireDefault(_navConfig);

var _HeaderStore = require('../../stores/HeaderStore.js');

var _HeaderStore2 = _interopRequireDefault(_HeaderStore);

var _Actions = require('../../actions/Actions.js');

var _Actions2 = _interopRequireDefault(_Actions);

var _Logo = require('../Logo/Logo.js');

var _Logo2 = _interopRequireDefault(_Logo);

var _DonateButton = require('../DonateButton/DonateButton.js');

var _DonateButton2 = _interopRequireDefault(_DonateButton);

var _SimpleLink = require('../Links/SimpleLink.js');

var _SimpleLink2 = _interopRequireDefault(_SimpleLink);

var _SubscribeButton = require('../SubscribeButton/SubscribeButton.js');

var _SubscribeButton2 = _interopRequireDefault(_SubscribeButton);

var _MyNyplButton = require('../MyNyplButton/MyNyplButton.js');

var _MyNyplButton2 = _interopRequireDefault(_MyNyplButton);

var _NavMenu = require('../NavMenu/NavMenu.js');

var _NavMenu2 = _interopRequireDefault(_NavMenu);

var _MobileHeader = require('./MobileHeader.js');

var _MobileHeader2 = _interopRequireDefault(_MobileHeader);

var _GlobalAlerts = require('../GlobalAlerts/GlobalAlerts.js');

var _GlobalAlerts2 = _interopRequireDefault(_GlobalAlerts);

var _dgxSkipNavigationLink = require('dgx-skip-navigation-link');

var _dgxSkipNavigationLink2 = _interopRequireDefault(_dgxSkipNavigationLink);

var _utils = require('../../utils/utils.js');

var _utils2 = _interopRequireDefault(_utils);

var _dgxFeatureFlags = require('dgx-feature-flags');

var _dgxFeatureFlags2 = _interopRequireDefault(_dgxFeatureFlags);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // NPM Modules

// Nav Config

// ALT Flux

// NYPL Components

// Utility Library

// FeatureFlags Module


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

var Header = function (_React$Component) {
  _inherits(Header, _React$Component);

  function Header(props) {
    _classCallCheck(this, Header);

    var _this = _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));

    _this.state = (0, _underscore.extend)({
      headerHeight: null,
      navData: _this.props.navData,
      featureFlags: _dgxFeatureFlags2.default.store.getState()
    }, _HeaderStore2.default.getState());

    _this.handleStickyHeader = _this.handleStickyHeader.bind(_this);
    return _this;
  }

  _createClass(Header, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _HeaderStore2.default.listen(this.onChange.bind(this));
      _dgxFeatureFlags2.default.store.listen(this.onChange.bind(this));

      // Height needs to be set once the alerts (if any) are mounted.
      this.setHeaderHeight();
      // Listen to the scroll event for the sticky header.
      window.addEventListener('scroll', this.handleStickyHeader, false);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _HeaderStore2.default.unlisten(this.onChange.bind(this));
      _dgxFeatureFlags2.default.store.unlisten(this.onChange.bind(this));

      // Removing event listener to minimize garbage collection
      window.removeEventListener('scroll', this.handleStickyHeader, false);
    }
  }, {
    key: 'onChange',
    value: function onChange() {
      this.setState((0, _underscore.extend)({
        headerHeight: this.state.headerHeight,
        featureFlags: _dgxFeatureFlags2.default.store.getState()
      }, _HeaderStore2.default.getState()));
    }

    /**
     * getHeaderHeight()
     * returns the Height of the Header DOM
     * element in pixels.
     */

  }, {
    key: 'getHeaderHeight',
    value: function getHeaderHeight() {
      var headerDOM = _reactDom2.default.findDOMNode(this.refs.nyplHeader);
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
      var _this2 = this;

      if (!this.state.headerHeight) {
        setTimeout(function () {
          _this2.setState({ headerHeight: _this2.getHeaderHeight() });
        }, 500);
      }
    }

    /**
     * getWindowVerticallScroll()
     * returns the current window vertical
     * scroll position in pixels.
     * @returns {number} - Vertical Scroll Position.
     */

  }, {
    key: 'getWindowVerticalScroll',
    value: function getWindowVerticalScroll() {
      return window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
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
        if (!_HeaderStore2.default.getIsStickyValue()) {
          // Fire GA Event when Header is in Sticky Mode
          _utils2.default.trackHeader.bind(this, 'scroll', 'Sticky Header');
          // Update the isSticky flag
          _Actions2.default.updateIsHeaderSticky(true);
        }
      } else {
        // Avoids re-assignment on each scroll by checking if it is already true
        if (_HeaderStore2.default.getIsStickyValue()) {
          _Actions2.default.updateIsHeaderSticky(false);
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var isHeaderSticky = this.state.isSticky;
      var headerHeight = this.state.headerHeight;
      var headerClass = this.props.className || 'Header';
      var headerClasses = (0, _classnames2.default)(headerClass, { sticky: isHeaderSticky });
      var skipNav = this.props.skipNav ? _react2.default.createElement(_dgxSkipNavigationLink2.default, this.props.skipNav) : '';

      return _react2.default.createElement(
        'header',
        {
          id: this.props.id,
          className: headerClasses,
          ref: 'nyplHeader',
          style: isHeaderSticky ? { height: headerHeight + 'px' } : null
        },
        skipNav,
        _react2.default.createElement(_GlobalAlerts2.default, { className: headerClass + '-GlobalAlerts' }),
        _react2.default.createElement(
          'div',
          { className: headerClass + '-Wrapper' },
          _react2.default.createElement(_MobileHeader2.default, {
            className: headerClass + '-Mobile',
            locatorUrl: this.props.urlType === 'absolute' ? '//www.nypl.org/locations/map?nearme=true' : '/locations/map?nearme=true',
            nyplRootUrl: this.props.urlType === 'absolute' ? '//www.nypl.org' : '/',
            ref: 'headerMobile'
          }),
          _react2.default.createElement(
            'div',
            {
              className: headerClass + '-TopWrapper',
              style: styles.wrapper,
              ref: 'headerTopWrapper'
            },
            _react2.default.createElement(_Logo2.default, {
              className: headerClass + '-Logo',
              target: this.props.urlType === 'absolute' ? '//www.nypl.org' : '/'
            }),
            _react2.default.createElement(
              'div',
              { className: headerClass + '-Buttons', style: styles.topButtons },
              _react2.default.createElement(_MyNyplButton2.default, {
                label: 'Log In',
                refId: 'desktopLogin'
              }),
              _react2.default.createElement(_SimpleLink2.default, {
                label: 'Locations',
                target: this.props.urlType === 'absolute' ? '//www.nypl.org/locations/map' : '/locations/map',
                className: 'LocationsTopLink',
                id: 'LocationsTopLink',
                gaAction: 'Locations',
                gaLabel: 'Header Top Links',
                style: styles.locationsTopLink
              }),
              _react2.default.createElement(_SimpleLink2.default, {
                label: 'Get a Library Card',
                target: this.props.urlType === 'absolute' ? '//www.nypl.org/library-card' : '/library-card',
                className: 'LibraryCardButton',
                id: 'LibraryCardButton',
                gaAction: 'Get a Library Card',
                gaLabel: 'Header Top Links',
                style: styles.libraryCardButton
              }),
              _react2.default.createElement(_SubscribeButton2.default, {
                label: 'Get Email Updates',
                lang: this.props.lang,
                style: styles.subscribeButton
              }),
              _react2.default.createElement(_DonateButton2.default, {
                id: 'Top-DonateButton',
                lang: this.props.lang,
                style: styles.donateButton,
                gaLabel: 'Header Top Links'
              }),
              _react2.default.createElement(_SimpleLink2.default, {
                label: 'Shop',
                target: 'http://shop.nypl.org',
                className: 'shopTopLink',
                id: 'shopTopLink',
                gaAction: 'Shop',
                gaLabel: 'Header Top Links',
                style: styles.shopLink
              })
            )
          ),
          _react2.default.createElement(_NavMenu2.default, {
            className: headerClass + '-NavMenu',
            lang: this.props.lang,
            items: this.state.navData,
            urlType: this.props.urlType
          })
        )
      );
    }
  }]);

  return Header;
}(_react2.default.Component);

Header.propTypes = {
  lang: _react2.default.PropTypes.string,
  className: _react2.default.PropTypes.string,
  id: _react2.default.PropTypes.string,
  navData: _react2.default.PropTypes.array,
  skipNav: _react2.default.PropTypes.object,
  urlType: _react2.default.PropTypes.string
};

Header.defaultProps = {
  lang: 'en',
  className: 'Header',
  id: 'nyplHeader',
  skipNav: null,
  urlType: ''
};

exports.Header = Header;
exports.navConfig = _navConfig2.default;