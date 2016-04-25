'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _appConfigJs = require('../../appConfig.js');

var _appConfigJs2 = _interopRequireDefault(_appConfigJs);

// Header Store

var _storesHeaderStoreJs = require('../../stores/HeaderStore.js');

var _storesHeaderStoreJs2 = _interopRequireDefault(_storesHeaderStoreJs);

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

  function NavMenu(props) {
    _classCallCheck(this, NavMenu);

    _get(Object.getPrototypeOf(NavMenu.prototype), 'constructor', this).call(this, props);
  }

  _createClass(NavMenu, [{
    key: 'render',
    value: function render() {
      var _this = this;

      var navItems = this.props.items && this.props.items.length ? this.props.items : _appConfigJs2['default'].navTopLinks;
      var mobileActiveClass = (0, _classnames2['default'])({
        mobileActive: _storesHeaderStoreJs2['default']._getMobileMenuBtnValue() === 'mobileMenu'
      });
      var stickyItemsClass = (0, _classnames2['default'])('StickyItems', {
        active: _storesHeaderStoreJs2['default']._getIsStickyValue()
      });
      var stickyNavItems = _react2['default'].createElement(
        'div',
        { className: stickyItemsClass },
        _react2['default'].createElement('span', { className: 'lineSeparator', style: styles.lineSeparator }),
        _react2['default'].createElement(_MyNyplButtonStickyMyNyplButtonJs2['default'], null),
        _react2['default'].createElement(_DonateButtonDonateButtonJs2['default'], {
          id: 'Collapsed-DonateButton',
          style: styles.donateButton,
          gaLabel: 'Collapsed Donate Button'
        })
      );
      var navMenu = navItems.map(function (item, index) {
        return _react2['default'].createElement(_NavMenuItemNavMenuItemJs2['default'], {
          label: item.name,
          lang: _this.props.lang,
          target: item.link.en.text,
          navId: item.id,
          features: item.features,
          subNav: item.subnav,
          key: index,
          index: index
        });
      });

      return _react2['default'].createElement(
        'nav',
        { className: this.props.className },
        _react2['default'].createElement(
          'div',
          { className: this.props.className + '-Wrapper ' + mobileActiveClass },
          _react2['default'].createElement('span', { className: 'MobileLogoText nypl-icon-logo-type' }),
          _react2['default'].createElement(
            'ul',
            { className: this.props.className + '-List', id: 'NavMenu-List' },
            navMenu
          ),
          _react2['default'].createElement(_SearchButtonSearchButtonJs2['default'], { className: '' + this.props.className }),
          stickyNavItems,
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
  items: _react2['default'].PropTypes.array
};

NavMenu.defaultProps = {
  lang: 'en',
  className: 'NavMenu'
};

exports['default'] = (0, _radium2['default'])(NavMenu);
module.exports = exports['default'];