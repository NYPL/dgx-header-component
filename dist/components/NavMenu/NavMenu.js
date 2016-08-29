'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _underscore = require('underscore');

var _HeaderStore = require('../../stores/HeaderStore.js');

var _HeaderStore2 = _interopRequireDefault(_HeaderStore);

var _Actions = require('../../actions/Actions.js');

var _Actions2 = _interopRequireDefault(_Actions);

var _SearchButton = require('../SearchButton/SearchButton.js');

var _SearchButton2 = _interopRequireDefault(_SearchButton);

var _NavMenuItem = require('../NavMenuItem/NavMenuItem.js');

var _NavMenuItem2 = _interopRequireDefault(_NavMenuItem);

var _NavMenuBottomButtons = require('../NavMenuBottomButtons/NavMenuBottomButtons.js');

var _NavMenuBottomButtons2 = _interopRequireDefault(_NavMenuBottomButtons);

var _DonateButton = require('../DonateButton/DonateButton.js');

var _DonateButton2 = _interopRequireDefault(_DonateButton);

var _StickyMyNyplButton = require('../MyNyplButton/StickyMyNyplButton.js');

var _StickyMyNyplButton2 = _interopRequireDefault(_StickyMyNyplButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// Header Store/Actions

// Dependent Components


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

var NavMenu = function (_React$Component) {
  _inherits(NavMenu, _React$Component);

  function NavMenu(props) {
    _classCallCheck(this, NavMenu);

    var _this = _possibleConstructorReturn(this, (NavMenu.__proto__ || Object.getPrototypeOf(NavMenu)).call(this, props));

    _this.handleEscKey = _this.handleEscKey.bind(_this);
    return _this;
  }

  _createClass(NavMenu, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('keydown', this.handleEscKey, false);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('keydown', this.handleEscKey, false);
    }
  }, {
    key: 'handleEscKey',
    value: function handleEscKey(e) {
      if (e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) {
        this.closeMobileNavMenuDialog();
      }
    }

    /**
     * closeMobileNavMenuDialog()
     * Verifies that the HeaderStore's mobileMenuButtonValue equals
     * 'mobileMenu' then resets value with appropriate Action.
     * Used in FocusTrap onDeactivate callback for A11Y users.
     */

  }, {
    key: 'closeMobileNavMenuDialog',
    value: function closeMobileNavMenuDialog() {
      if (_HeaderStore2.default._getMobileMenuBtnValue() === 'mobileMenu') {
        _Actions2.default.setMobileMenuButtonValue('');
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
      var stickyClass = _HeaderStore2.default._getIsStickyValue() ? ' active' : '';
      return _react2.default.createElement(
        'div',
        { className: this.props.className + '-stickyItems' + stickyClass },
        _react2.default.createElement('span', { className: 'lineSeparator', style: styles.lineSeparator }),
        _react2.default.createElement(_StickyMyNyplButton2.default, null),
        _react2.default.createElement(_DonateButton2.default, {
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
      var _this2 = this;

      var navItems = items;

      if ((0, _underscore.isArray)(exceptionList) && !(0, _underscore.isEmpty)(exceptionList)) {
        navItems = (0, _underscore.filter)(navItems, function (item) {
          return item.id && !(0, _underscore.contains)(exceptionList, item.id);
        });
      }

      return (0, _underscore.map)(navItems, function (item, index) {
        return _react2.default.createElement(_NavMenuItem2.default, {
          label: item.name,
          lang: _this2.props.lang,
          target: item.link.en.text,
          urlType: _this2.props.urlType,
          navId: item.id,
          key: index
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var mobileActiveClass = _HeaderStore2.default._getMobileMenuBtnValue() === 'mobileMenu' ? ' mobileActive' : '';

      return _react2.default.createElement(
        'div',
        { className: this.props.className },
        _react2.default.createElement(
          'nav',
          {
            className: this.props.className + '-Wrapper' + mobileActiveClass,
            role: 'navigation'
          },
          _react2.default.createElement('span', { className: 'MobileLogoText nypl-icon-logo-type', 'aria-hidden': 'true' }),
          _react2.default.createElement(
            'ul',
            { className: this.props.className + '-List', id: 'NavMenu-List' },
            this.renderNavMenu(this.props.items)
          ),
          _react2.default.createElement(_SearchButton2.default, {
            className: '' + this.props.className,
            cookie: this.props.cookie
          }),
          this.renderStickyNavItems(),
          _react2.default.createElement(_NavMenuBottomButtons2.default, {
            className: 'MobileBottomButtons',
            libraryCardLink: this.props.urlType === 'absolute' ? '//www.nypl.org/library-card' : '/library-card'
          })
        )
      );
    }
  }]);

  return NavMenu;
}(_react2.default.Component);

NavMenu.propTypes = {
  lang: _react2.default.PropTypes.string,
  className: _react2.default.PropTypes.string,
  items: _react2.default.PropTypes.array,
  urlType: _react2.default.PropTypes.string,
  cookie: _react2.default.PropTypes.string
};

NavMenu.defaultProps = {
  lang: 'en',
  className: 'NavMenu',
  cookie: '0'
};

exports.default = NavMenu;
module.exports = exports['default'];