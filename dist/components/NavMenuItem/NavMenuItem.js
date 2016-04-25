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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

// Google Analytics Utility Library

var _utilsUtilsJs = require('../../utils/utils.js');

var _utilsUtilsJs2 = _interopRequireDefault(_utilsUtilsJs);

// Alt Store

var _storesHeaderStoreJs = require('../../stores/HeaderStore.js');

var _storesHeaderStoreJs2 = _interopRequireDefault(_storesHeaderStoreJs);

// NYPL Dependent React Components

var _MegaMenuMegaMenuJs = require('../MegaMenu/MegaMenu.js');

var _MegaMenuMegaMenuJs2 = _interopRequireDefault(_MegaMenuMegaMenuJs);

var _MegaMenuMegaMenuArrowJs = require('../MegaMenu/MegaMenuArrow.js');

var _MegaMenuMegaMenuArrowJs2 = _interopRequireDefault(_MegaMenuMegaMenuArrowJs);

var NavMenuItem = (function (_React$Component) {
  _inherits(NavMenuItem, _React$Component);

  function NavMenuItem(props) {
    _classCallCheck(this, NavMenuItem);

    _get(Object.getPrototypeOf(NavMenuItem.prototype), 'constructor', this).call(this, props);

    this.state = {
      activeItem: null,
      lastActiveMenuItem: ''
    };

    this._activateHover = this._activateHover.bind(this);
    this._deactivateHover = this._deactivateHover.bind(this);
  }

  /**
   * _activateHover()
   * Sets the state's lastActiveMenuItem
   * & activeItem after set time.
   */

  _createClass(NavMenuItem, [{
    key: '_activateHover',
    value: function _activateHover() {
      var _this = this;

      this.hoverTimer = setTimeout(function () {
        _this.setState({
          lastActiveMenuItem: _this.props.navId,
          activeItem: _this.props.index
        });
      }, 80);
    }

    /**
     * _deactivateHover()
     * Initially clears thhe hoverTimer.
     * Then removes the state's activeItem
     * after set time.
     */
  }, {
    key: '_deactivateHover',
    value: function _deactivateHover() {
      var _this2 = this;

      // Will clear the set timer that activates the menu
      // from executing
      clearTimeout(this.hoverTimer);

      setTimeout(function () {
        _this2.setState({ activeItem: null });
      }, 250);
    }
  }, {
    key: 'render',
    value: function render() {
      var linkClass = (0, _classnames2['default'])({
        active: this.props.index === this.state.activeItem || _storesHeaderStoreJs2['default']._getLastActiveMenuItem() === this.props.navId
      });
      var megaMenuArrow = this.props.subNav && this.props.features ? _react2['default'].createElement(_MegaMenuMegaMenuArrowJs2['default'], {
        navId: this.props.navId,
        index: this.props.index,
        currentActiveItem: this.state.activeItem
      }) : null;
      var target = this.props.target.indexOf('nypl.org') !== -1 || this.props.target === '#' ? this.props.target : '' + this.props.root + this.props.target;
      var megaMenu = this.props.subNav && this.props.features ? _react2['default'].createElement(_MegaMenuMegaMenuJs2['default'], {
        label: this.props.label,
        lang: this.props.lang,
        items: this.props.subNav,
        navId: this.props.navId,
        features: this.props.features,
        topLink: target,
        index: this.props.index,
        lastActiveMenuItem: this.state.lastActiveMenuItem,
        currentActiveItem: this.state.activeItem
      }) : null;

      return _react2['default'].createElement(
        'li',
        {
          id: this.props.navId ? this.props.className + '-' + this.props.navId : this.props.className,
          className: this.props.className
        },
        _react2['default'].createElement(
          'span',
          {
            onMouseEnter: this._activateHover,
            onMouseLeave: this._deactivateHover,
            className: 'NavMenuItem-Link',
            id: this.props.navId ? 'NavMenuItem-Link-' + this.props.navId : 'NavMenuItem-Link'
          },
          _react2['default'].createElement(
            'a',
            {
              href: target,
              className: linkClass,
              onClick: _utilsUtilsJs2['default']._trackHeader.bind(this, 'Go to...', '' + this.props.label[this.props.lang].text)
            },
            this.props.label[this.props.lang].text
          ),
          megaMenuArrow
        ),
        megaMenu
      );
    }
  }]);

  return NavMenuItem;
})(_react2['default'].Component);

NavMenuItem.propTypes = {
  lang: _react2['default'].PropTypes.string,
  root: _react2['default'].PropTypes.string,
  target: _react2['default'].PropTypes.string,
  className: _react2['default'].PropTypes.string,
  hoverTimer: _react2['default'].PropTypes.func,
  navId: _react2['default'].PropTypes.string,
  index: _react2['default'].PropTypes.number,
  label: _react2['default'].PropTypes.object,
  subNav: _react2['default'].PropTypes.array,
  features: _react2['default'].PropTypes.array
};

NavMenuItem.defaultProps = {
  target: '#',
  root: '//www.nypl.org/',
  lang: 'en',
  className: 'NavMenuItem',
  hoverTimer: null
};

exports['default'] = NavMenuItem;
module.exports = exports['default'];