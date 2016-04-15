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

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

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

var _utilsUtilsJs = require('../../utils/utils.js');

var _utilsUtilsJs2 = _interopRequireDefault(_utilsUtilsJs);

// When minifying with Webpack, you can use this:
// import '../../styles/main.scss';

var Header = (function (_React$Component) {
  _inherits(Header, _React$Component);

  function Header(props) {
    _classCallCheck(this, Header);

    _get(Object.getPrototypeOf(Header.prototype), 'constructor', this).call(this, props);

    this.state = _underscore2['default'].extend({ headerHeight: null }, _storesHeaderStoreJs2['default'].getState());

    this._handleStickyHeader = this._handleStickyHeader.bind(this);
  }

  _createClass(Header, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _storesHeaderStoreJs2['default'].listen(this._onChange.bind(this));

      // If the HeaderStore is not populated with
      // the proper data, then fetch via client-side
      this._fetchDataIfNeeded();

      // Height needs to be set once the alerts (if any) are mounted.
      this._setHeaderHeight();

      // Listen to the scroll event for the sticky header.
      window.addEventListener('scroll', this._handleStickyHeader, false);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _storesHeaderStoreJs2['default'].unlisten(this._onChange.bind(this));

      // Removing event listener to minimize garbage collection
      window.removeEventListener('scroll', this._handleStickyHeader, false);
    }
  }, {
    key: '_onChange',
    value: function _onChange() {
      this.setState(_underscore2['default'].extend({ headerHeight: this.state.headerHeight }, _storesHeaderStoreJs2['default'].getState()));
    }
  }, {
    key: 'render',
    value: function render() {
      var isHeaderSticky = this.state.isSticky;
      var headerHeight = this.state.headerHeight;
      var headerClass = this.props.className || 'Header';
      var headerClasses = (0, _classnames2['default'])(headerClass, { 'sticky': isHeaderSticky });
      var mobileMyNyplClasses = (0, _classnames2['default'])({ 'active': _storesHeaderStoreJs2['default']._getMobileMyNyplButtonValue() });
      var skipNav = this.props.skipNav ? _react2['default'].createElement(_dgxSkipNavigationLink2['default'], this.props.skipNav) : '';

      return _react2['default'].createElement(
        'header',
        {
          id: this.props.id,
          className: headerClasses,
          ref: 'nyplHeader',
          style: isHeaderSticky ? { height: headerHeight + 'px' } : null
        },
        skipNav,
        _react2['default'].createElement(_GlobalAlertsGlobalAlertsJs2['default'], { className: headerClass + '-GlobalAlerts' }),
        _react2['default'].createElement(
          'div',
          { className: headerClass + '-Wrapper' },
          _react2['default'].createElement(_MobileHeaderJs2['default'], {
            className: headerClass + '-Mobile',
            locatorUrl: '//www.nypl.org/locations/map?nearme=true',
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
            _react2['default'].createElement(_LogoLogoJs2['default'], { className: headerClass + '-Logo' }),
            _react2['default'].createElement(
              'div',
              { className: headerClass + '-Buttons', style: styles.topButtons },
              _react2['default'].createElement(_MyNyplButtonMyNyplButtonJs2['default'], { label: 'Log In', refId: 'desktopLogin' }),
              _react2['default'].createElement(_ButtonsSimpleButtonJs2['default'], {
                label: 'Get a Library Card',
                target: '//catalog.nypl.org/screens/selfregpick.html',
                className: 'LibraryCardButton',
                id: 'LibraryCardButton',
                gaAction: 'Get a Library Card',
                gaLabel: '',
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
                gaLabel: 'Header Button'
              })
            )
          ),
          _react2['default'].createElement(_NavMenuNavMenuJs2['default'], {
            className: headerClass + '-NavMenu',
            lang: this.props.lang,
            items: this.state.headerData
          })
        )
      );
    }

    /**
     * _fetchDataIfNeeded()
     * checks the existence of headerData items,
     * triggers the Actions.fetchHeaderData()
     * method to dispatch a client-side event
     * to obtain data.
     */
  }, {
    key: '_fetchDataIfNeeded',
    value: function _fetchDataIfNeeded() {
      if (_storesHeaderStoreJs2['default'].getState().headerData.length < 1) {
        console.log(_storesHeaderStoreJs2['default']._getClientAppEnv(), this.props.urls);
        _actionsActionsJs2['default'].fetchHeaderData(_storesHeaderStoreJs2['default']._getClientAppEnv(), this.props.urls);
      }
    }

    /**
     * _handleStickyHeader()
     * returns the Actions.updateIsHeaderSticky()
     * with the proper boolean value to update the
     * HeaderStore.isSticky value based on the window
     * vertical scroll position surpassing the height
     * of the Header DOM element.
     */
  }, {
    key: '_handleStickyHeader',
    value: function _handleStickyHeader() {
      var headerHeight = this.state.headerHeight;
      var windowVerticalDistance = this._getWindowVerticalScroll();

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

    /**
     * _getHeaderHeight()
     * returns the Height of the Header DOM
     * element in pixels.
     */
  }, {
    key: '_getHeaderHeight',
    value: function _getHeaderHeight() {
      var headerDOM = _reactDom2['default'].findDOMNode(this.refs.nyplHeader);
      return headerDOM.getBoundingClientRect().height;
    }

    /**
     * _setHeaderHeight()
     * Updates the state headerHeight property
     * only if headerHeight is not defined.
     */
  }, {
    key: '_setHeaderHeight',
    value: function _setHeaderHeight() {
      var _this = this;

      if (!this.state.headerHeight) {
        setTimeout(function () {
          _this.setState({ headerHeight: _this._getHeaderHeight() });
        }, 500);
      }
    }

    /**
     * _getWindowVerticallScroll()
     * returns the current window vertical
     * scroll position in pixels.
     */
  }, {
    key: '_getWindowVerticalScroll',
    value: function _getWindowVerticalScroll() {
      return window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    }
  }]);

  return Header;
})(_react2['default'].Component);

;

Header.defaultProps = {
  lang: 'en',
  className: 'Header',
  id: 'nyplHeader',
  skipNav: null,
  urls: ''
};

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
  libraryCardButton: {
    display: 'inline-block',
    color: '#000',
    margin: 0,
    padding: 0
  },
  subscribeButton: {
    display: 'inline-block'
  },
  donateButton: {
    display: 'inline-block',
    padding: '11px 18px 9px 18px'
  },
  mobileMyNypl: {
    position: 'absolute',
    zIndex: 1000,
    right: '0',
    width: '220px',
    minHeight: '130px',
    backgroundColor: '#1DA1D4',
    padding: '25px 30px'
  }
};

exports['default'] = (0, _radium2['default'])(Header);
module.exports = exports['default'];