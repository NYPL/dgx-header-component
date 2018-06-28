'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _underscore = require('underscore');

var _dgxSvgIcons = require('@nypl/dgx-svg-icons');

var _SearchButton = require('../SearchButton/SearchButton');

var _SearchButton2 = _interopRequireDefault(_SearchButton);

var _NavMenuItem = require('../NavMenuItem/NavMenuItem');

var _NavMenuItem2 = _interopRequireDefault(_NavMenuItem);

var _NavMenuMobileButtons = require('../NavMenuMobileButtons/NavMenuMobileButtons');

var _NavMenuMobileButtons2 = _interopRequireDefault(_NavMenuMobileButtons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Dependent Components


var NavMenu = function (_React$Component) {
  _inherits(NavMenu, _React$Component);

  function NavMenu() {
    _classCallCheck(this, NavMenu);

    return _possibleConstructorReturn(this, (NavMenu.__proto__ || Object.getPrototypeOf(NavMenu)).apply(this, arguments));
  }

  _createClass(NavMenu, [{
    key: 'renderNavMenu',

    /**
     * Generates the DOM for the NavItems with appropriate class.
     * Optionally, removes any NavItems if a match is found from the exceptionList.
     * @param {items[]} - Array containing NavMenu item Objects.
     * @param {exceptionList[]} (optional) - Array containing NavId strings.
     * @returns {Object} React DOM.
     */
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
      var mobileActiveClass = this.props.mobileActive ? 'mobileActive' : '';

      return _react2.default.createElement(
        'div',
        { className: this.props.className },
        _react2.default.createElement(
          'nav',
          {
            className: this.props.className + '-wrapper ' + mobileActiveClass,
            'aria-label': 'Main Navigation'
          },
          _react2.default.createElement(_dgxSvgIcons.LionLogoWithText, { ariaHidden: true, focusable: false }),
          _react2.default.createElement(
            'ul',
            { className: this.props.className + '-list', id: 'navMenu-List' },
            this.renderNavMenu(this.props.items)
          ),
          _react2.default.createElement(_SearchButton2.default, {
            className: this.props.className
          }),
          _react2.default.createElement(_NavMenuMobileButtons2.default, {
            className: 'mobileBottomButtons',
            libraryCardLink: this.props.urlType === 'absolute' ? '//www.nypl.org/library-card' : '/library-card'
          })
        )
      );
    }
  }]);

  return NavMenu;
}(_react2.default.Component);

NavMenu.propTypes = {
  lang: _propTypes2.default.string,
  className: _propTypes2.default.string,
  items: _propTypes2.default.arrayOf(_propTypes2.default.object).isRequired,
  urlType: _propTypes2.default.string,
  mobileActive: _propTypes2.default.bool
};

NavMenu.defaultProps = {
  lang: 'en',
  className: 'navMenu',
  urlType: 'relative',
  mobileActive: false
};

exports.default = NavMenu;
module.exports = exports['default'];