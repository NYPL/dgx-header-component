'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactTappable = require('react-tappable');

var _reactTappable2 = _interopRequireDefault(_reactTappable);

// ALT FLUX

var _storesStoreJs = require('../../stores/Store.js');

var _storesStoreJs2 = _interopRequireDefault(_storesStoreJs);

var _actionsActionsJs = require('../../actions/Actions.js');

var _actionsActionsJs2 = _interopRequireDefault(_actionsActionsJs);

var _utilsGaUtilsJs = require('../../utils/gaUtils.js');

var _utilsGaUtilsJs2 = _interopRequireDefault(_utilsGaUtilsJs);

var MobileHeader = (function (_React$Component) {
  function MobileHeader(props) {
    _classCallCheck(this, MobileHeader);

    _get(Object.getPrototypeOf(MobileHeader.prototype), 'constructor', this).call(this, props);

    this.state = {
      activeMobileButton: _storesStoreJs2['default'].getState().activeMobileButton,
      searchButtonAction: _storesStoreJs2['default'].getState().searchButtonAction,
      mobileMyNyplButton: _storesStoreJs2['default'].getState().mobileMyNyplButton
    };

    this._handleMenuBtnPress = this._handleMenuBtnPress.bind(this);
  }

  _inherits(MobileHeader, _React$Component);

  _createClass(MobileHeader, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _storesStoreJs2['default'].listen(this._onChange.bind(this));
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _storesStoreJs2['default'].unlisten(this._onChange.bind(this));
    }
  }, {
    key: '_onChange',
    value: function _onChange() {
      this.setState({
        activeMobileButton: _storesStoreJs2['default'].getState().activeMobileButton,
        searchButtonAction: _storesStoreJs2['default'].getState().searchButtonAction,
        mobileMyNyplButton: _storesStoreJs2['default'].getState().mobileMyNyplButton
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var activeButton = this.state.activeMobileButton,
          searchButtonAction = this.state.searchButtonAction,
          mobileMyNyplButton = this.state.mobileMyNyplButton,
          locatorUrl = this.props.locatorUrl || '//www.nypl.org/locations/map?nearme=true',
          mobileSearchClass = searchButtonAction === 'clickSearch' ? 'active nypl-icon-solo-x' : 'nypl-icon-magnifier-thin',
          mobileMenuClass = activeButton === 'mobileMenu' ? 'active nypl-icon-solo-x' : 'nypl-icon-burger-nav',
          mobileMyNyplClass = mobileMyNyplButton === 'clickMyNypl' ? 'active nypl-icon-solo-x' : 'nypl-icon-login';

      return _react2['default'].createElement(
        'div',
        { className: this.props.className, style: styles.base },
        _react2['default'].createElement(
          'a',
          {
            style: styles.mobileLogo,
            href: '//www.nypl.org' },
          _react2['default'].createElement('span', {
            style: styles.logoIcon,
            className: '' + this.props.className + '-Logo nypl-icon-logo-mark' })
        ),
        _react2['default'].createElement(
          _reactTappable2['default'],
          { onTap: this._handleMenuBtnPress.bind(this, 'clickMyNypl') },
          _react2['default'].createElement('span', {
            style: [styles.myNyplIcon, mobileMyNyplButton === 'clickMyNypl' ? styles.activeMyNyplIcon : ''],
            className: '' + this.props.className + '-MyNyplButton ' + mobileMyNyplClass,
            ref: 'MobileMyNyplButton' })
        ),
        _react2['default'].createElement('a', {
          style: styles.locatorIcon,
          href: locatorUrl,
          className: '' + this.props.className + '-Locator nypl-icon-locator-large' }),
        _react2['default'].createElement(
          _reactTappable2['default'],
          { onTap: this._handleMenuBtnPress.bind(this, 'clickSearch') },
          _react2['default'].createElement('span', {
            style: [styles.searchIcon, searchButtonAction === 'clickSearch' ? styles.activeSearchIcon : ''],
            className: '' + this.props.className + '-SearchButton ' + mobileSearchClass,
            ref: 'MobileSearchButton' })
        ),
        _react2['default'].createElement(
          _reactTappable2['default'],
          { onTap: this._handleMenuBtnPress.bind(this, 'mobileMenu') },
          _react2['default'].createElement('span', {
            style: [styles.menuIcon, activeButton === 'mobileMenu' ? styles.activeMenuIcon : ''],
            className: '' + this.props.className + '-MenuButton ' + mobileMenuClass,
            ref: 'MobileMenuButton' })
        )
      );
    }
  }, {
    key: '_toggleMobileMenu',

    /**
     * _toggleMobileMenu(activeButton) 
     * Verifies that the activeButton does not
     * match the HeaderStore's current value
     * and set's it as the param activeButton.
     * If it matches, it clears the HeaderStore's
     * current value.
     *
     * @param {String} activeButton
     */
    value: function _toggleMobileMenu(activeButton) {
      if (activeButton === 'clickSearch') {
        if (_storesStoreJs2['default']._getSearchButtonActionValue() !== activeButton) {
          _actionsActionsJs2['default'].searchButtonActionValue(activeButton);
          _actionsActionsJs2['default'].setMobileMenuButtonValue('');
          _actionsActionsJs2['default'].setMobileMyNyplButtonValue('');
        } else {
          _actionsActionsJs2['default'].searchButtonActionValue('');
        }
      } else if (activeButton === 'mobileMenu') {
        if (_storesStoreJs2['default']._getMobileMenuBtnValue() !== activeButton) {
          _actionsActionsJs2['default'].setMobileMenuButtonValue(activeButton);
          _actionsActionsJs2['default'].searchButtonActionValue('');
          _actionsActionsJs2['default'].setMobileMyNyplButtonValue('');
        } else {
          _actionsActionsJs2['default'].setMobileMenuButtonValue('');
        }
      } else if (activeButton === 'clickMyNypl') {
        if (_storesStoreJs2['default']._getMobileMyNyplButtonValue() !== activeButton) {
          _actionsActionsJs2['default'].toggleMyNyplVisible(true);
          _actionsActionsJs2['default'].setMobileMyNyplButtonValue(activeButton);
          _actionsActionsJs2['default'].searchButtonActionValue('');
          _actionsActionsJs2['default'].setMobileMenuButtonValue('');
        } else {
          _actionsActionsJs2['default'].setMobileMyNyplButtonValue('');
          _actionsActionsJs2['default'].toggleMyNyplVisible(false);
        }
      }

      _utilsGaUtilsJs2['default']._trackEvent('Click', 'Mobile ' + activeButton);
    }
  }, {
    key: '_handleMenuBtnPress',

    /**
     * _handleMenuBtnPress() 
     * Calls _toggleMobileMenu()
     * with the 'mobileMenu' as a param
     */
    value: function _handleMenuBtnPress(activeButton) {
      this._toggleMobileMenu(activeButton);
    }
  }]);

  return MobileHeader;
})(_react2['default'].Component);

MobileHeader.defaultProps = {
  lang: 'en',
  className: 'MobileHeader'
};

var styles = {
  base: {
    position: 'relative',
    height: '59px',
    textAlign: 'right'
  },
  mobileLogo: {
    color: '#000',
    textDecoration: 'none',
    ':hover': {
      color: '#000'
    },
    ':visited': {
      color: '#000'
    }
  },
  logoIcon: {
    position: 'absolute',
    left: 0,
    top: 0,
    fontSize: '59px'
  },
  myNyplIcon: {
    fontSize: '31px',
    margin: 0,
    padding: '14px',
    display: 'inline-block',
    color: '#000'
  },
  locatorIcon: {
    fontSize: '31px',
    margin: 0,
    padding: '14px',
    display: 'inline-block',
    color: '#000'
  },
  searchIcon: {
    fontSize: '31px',
    margin: 0,
    padding: '14px',
    display: 'inline-block',
    color: '#000'
  },
  menuIcon: {
    fontSize: '31px',
    margin: 0,
    padding: '14px',
    display: 'inline-block',
    color: '#000'
  },
  activeSearchIcon: {
    color: '#FFF',
    backgroundColor: '#29A1D2'
  },
  activeMenuIcon: {
    color: '#FFF',
    backgroundColor: '#2B2B2B'
  },
  activeMyNyplIcon: {
    color: '#FFF',
    backgroundColor: '#2B2B2B'
  }
};

exports['default'] = (0, _radium2['default'])(MobileHeader);
module.exports = exports['default'];