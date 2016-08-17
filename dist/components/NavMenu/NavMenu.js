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

var _focusTrapReact = require('focus-trap-react');

var _focusTrapReact2 = _interopRequireDefault(_focusTrapReact);

var _underscore = require('underscore');

// Header Store/Actions

var _storesHeaderStoreJs = require('../../stores/HeaderStore.js');

var _storesHeaderStoreJs2 = _interopRequireDefault(_storesHeaderStoreJs);

var _actionsActionsJs = require('../../actions/Actions.js');

var _actionsActionsJs2 = _interopRequireDefault(_actionsActionsJs);

// Dependent Components

var _SearchButtonSearchButtonJs = require('../SearchButton/SearchButton.js');

var _SearchButtonSearchButtonJs2 = _interopRequireDefault(_SearchButtonSearchButtonJs);

var _NavMenuItemNavMenuItemJs = require('../NavMenuItem/NavMenuItem.js');

var _NavMenuItemNavMenuItemJs2 = _interopRequireDefault(_NavMenuItemNavMenuItemJs);

var _NavMenuBottomButtonsNavMenuBottomButtonsJs = require('../NavMenuBottomButtons/NavMenuBottomButtons.js');

var _NavMenuBottomButtonsNavMenuBottomButtonsJs2 = _interopRequireDefault(_NavMenuBottomButtonsNavMenuBottomButtonsJs);

var _DonateButtonDonateButtonJs = require('../DonateButton/DonateButton.js');

var _DonateButtonDonateButtonJs2 = _interopRequireDefault(_DonateButtonDonateButtonJs);

var _MyNyplButtonStickyMyNyplButtonJs = require('../MyNyplButton/StickyMyNyplButton.js');

var _MyNyplButtonStickyMyNyplButtonJs2 = _interopRequireDefault(_MyNyplButtonStickyMyNyplButtonJs);

var styles = {
  donateButton: {
    padding: '8px 15px',
    textTransform: 'uppercase',
    fontSize: '12.5px',
    letterSpacing: '.04em'
  },
  lineSeparator: {
    display: 'inline-block',
    margin: '0 0 -10px 0',
    width: '2px',
    height: '30px',
    backgroundColor: '#837377'
  }
};

var NavMenu = (function (_React$Component) {
  _inherits(NavMenu, _React$Component);

  function NavMenu() {
    _classCallCheck(this, NavMenu);

    _get(Object.getPrototypeOf(NavMenu.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(NavMenu, [{
    key: 'closeMobileNavMenuDialog',

    /**
     * closeMobileNavMenuDialog()
     * Verifies that the HeaderStore's mobileMenuButtonValue equals
     * 'mobileMenu' then resets value with appropriate Action.
     * Used in FocusTrap onDeactivate callback for A11Y users.
     */
    value: function closeMobileNavMenuDialog() {
      if (_storesHeaderStoreJs2['default']._getMobileMenuBtnValue() === 'mobileMenu') {
        _actionsActionsJs2['default'].setMobileMenuButtonValue('');
      }
    }

    /**
     * Generates the DOM for the Sticky Items that will
     * display when the Header is in sticky mode.
     * Adds the appropriate class based off the sticky value.
     * @returns {Object} React DOM.
     */
  }, {
    key: 'renderStickyNavItems',
    value: function renderStickyNavItems() {
      var stickyClass = _storesHeaderStoreJs2['default']._getIsStickyValue() ? ' active' : '';
      return _react2['default'].createElement(
        'div',
        { className: this.props.className + '-stickyItems' + stickyClass },
        _react2['default'].createElement('span', { className: 'lineSeparator', style: styles.lineSeparator }),
        _react2['default'].createElement(_MyNyplButtonStickyMyNyplButtonJs2['default'], null),
        _react2['default'].createElement(_DonateButtonDonateButtonJs2['default'], {
          id: 'Collapsed-DonateButton',
          style: styles.donateButton,
          gaLabel: 'Collapsed Donate Button'
        })
      );
    }

    /**
     * Generates the DOM for the NavItems with appropriate class.
     * Optionally, removes any NavItems if a match is found from the exceptionList.
     * @param {items[]} - Array containing NavMenu item Objects.
     * @param {exceptionList[]} (optional) - Array containing NavId strings.
     * @returns {Object} React DOM.
     */
  }, {
    key: 'renderNavMenu',
    value: function renderNavMenu(items, exceptionList) {
      var _this = this;

      var navItems = items;

      if ((0, _underscore.isArray)(exceptionList) && !(0, _underscore.isEmpty)(exceptionList)) {
        navItems = (0, _underscore.filter)(navItems, function (item) {
          return item.id && !(0, _underscore.contains)(exceptionList, item.id);
        });
      }

      return (0, _underscore.map)(navItems, function (item, index) {
        return _react2['default'].createElement(_NavMenuItemNavMenuItemJs2['default'], {
          label: item.name,
          lang: _this.props.lang,
          target: item.link.en.text,
          urlType: _this.props.urlType,
          navId: item.id,
          features: item.features,
          subNav: item.subnav,
          key: index,
          index: index,
          cookie: _this.props.cookie
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var mobileActiveClass = _storesHeaderStoreJs2['default']._getMobileMenuBtnValue() === 'mobileMenu' ? ' mobileActive' : '';

      return _react2['default'].createElement(
        _focusTrapReact2['default'],
        {
          onDeactivate: function () {
            return _this2.closeMobileNavMenuDialog();
          },
          className: this.props.className,
          clickOutsideDeactivates: true,
          active: _storesHeaderStoreJs2['default']._getMobileMenuBtnValue() === 'mobileMenu'
        },
        _react2['default'].createElement(
          'nav',
          {
            className: this.props.className + '-Wrapper' + mobileActiveClass,
            role: 'navigation'
          },
          _react2['default'].createElement('span', { className: 'MobileLogoText nypl-icon-logo-type', 'aria-hidden': 'true' }),
          _react2['default'].createElement(
            'ul',
            { className: this.props.className + '-List', id: 'NavMenu-List' },
            this.renderNavMenu(this.props.items, ['1b4916f4-6723-44f0-bfae-112441527c4d'])
          ),
          _react2['default'].createElement(_SearchButtonSearchButtonJs2['default'], {
            className: '' + this.props.className,
            cookie: this.props.cookie
          }),
          this.renderStickyNavItems(),
          _react2['default'].createElement(_NavMenuBottomButtonsNavMenuBottomButtonsJs2['default'], { className: 'MobileBottomButtons' })
        )
      );
    }
  }]);

  return NavMenu;
})(_react2['default'].Component);

NavMenu.propTypes = {
  lang: _react2['default'].PropTypes.string,
  className: _react2['default'].PropTypes.string,
  items: _react2['default'].PropTypes.array,
  urlType: _react2['default'].PropTypes.string,
  cookie: _react2['default'].PropTypes.string
};

NavMenu.defaultProps = {
  lang: 'en',
  className: 'NavMenu',
  cookie: '0'
};

exports['default'] = NavMenu;
module.exports = exports['default'];