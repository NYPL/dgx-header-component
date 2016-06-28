'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('../../utils/utils.js');

var _utils2 = _interopRequireDefault(_utils);

var _HeaderStore = require('../../stores/HeaderStore.js');

var _HeaderStore2 = _interopRequireDefault(_HeaderStore);

var _MegaMenu = require('../MegaMenu/MegaMenu.js');

var _MegaMenu2 = _interopRequireDefault(_MegaMenu);

var _MegaMenuArrow = require('../MegaMenu/MegaMenuArrow.js');

var _MegaMenuArrow2 = _interopRequireDefault(_MegaMenuArrow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// Google Analytics Utility Library

// Alt Store

// NYPL Dependent React Components


var NavMenuItem = function (_React$Component) {
  _inherits(NavMenuItem, _React$Component);

  function NavMenuItem(props) {
    _classCallCheck(this, NavMenuItem);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(NavMenuItem).call(this, props));

    _this.state = {
      activeItem: null,
      lastActiveMenuItem: ''
    };

    _this.activateHover = _this.activateHover.bind(_this);
    _this.deactivateHover = _this.deactivateHover.bind(_this);
    return _this;
  }

  /**
   * Sets the state's lastActiveMenuItem and activeItem after a given time delay.
   */


  _createClass(NavMenuItem, [{
    key: 'activateHover',
    value: function activateHover() {
      var _this2 = this;

      this.hoverTimer = setTimeout(function () {
        _this2.setState({
          lastActiveMenuItem: _this2.props.navId,
          activeItem: _this2.props.index
        });
      }, 80);
    }

    /**
     * Initially clears the hoverTimer initialized by the activateHover function.
     * Then removes the state's activeItem after a given time delay.
     */

  }, {
    key: 'deactivateHover',
    value: function deactivateHover() {
      var _this3 = this;

      clearTimeout(this.hoverTimer);

      setTimeout(function () {
        _this3.setState({ activeItem: null });
      }, 250);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var target = this.props.target;
      var linkClass = (0, _classnames2.default)({
        active: this.props.index === this.state.activeItem || _HeaderStore2.default._getLastActiveMenuItem() === this.props.navId
      });
      var megaMenuArrow = this.props.subNav && this.props.features ? _react2.default.createElement(_MegaMenuArrow2.default, {
        navId: this.props.navId,
        index: this.props.index,
        currentActiveItem: this.state.activeItem
      }) : null;
      var megaMenu = this.props.subNav && this.props.features ? _react2.default.createElement(_MegaMenu2.default, {
        label: this.props.label,
        lang: this.props.lang,
        urlType: this.props.urlType,
        items: this.props.subNav,
        navId: this.props.navId,
        features: this.props.features,
        topLink: target,
        index: this.props.index,
        lastActiveMenuItem: this.state.lastActiveMenuItem,
        currentActiveItem: this.state.activeItem
      }) : null;

      return _react2.default.createElement(
        'li',
        {
          id: this.props.navId ? this.props.className + '-' + this.props.navId : this.props.className,
          className: this.props.className
        },
        _react2.default.createElement(
          'span',
          {
            onMouseEnter: this.activateHover,
            onMouseLeave: this.deactivateHover,
            className: 'NavMenuItem-Link',
            id: this.props.navId ? 'NavMenuItem-Link-' + this.props.navId : 'NavMenuItem-Link'
          },
          _react2.default.createElement(
            'a',
            {
              href: target,
              className: linkClass,
              onClick: function onClick() {
                return _utils2.default._trackHeader('Go to...', '' + _this4.props.label[_this4.props.lang].text);
              }
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
}(_react2.default.Component);

NavMenuItem.propTypes = {
  lang: _react2.default.PropTypes.string,
  root: _react2.default.PropTypes.string,
  target: _react2.default.PropTypes.string,
  className: _react2.default.PropTypes.string,
  hoverTimer: _react2.default.PropTypes.func,
  navId: _react2.default.PropTypes.string,
  index: _react2.default.PropTypes.number,
  label: _react2.default.PropTypes.object,
  subNav: _react2.default.PropTypes.array,
  features: _react2.default.PropTypes.array,
  urlType: _react2.default.PropTypes.string
};

NavMenuItem.defaultProps = {
  target: '#',
  root: '//www.nypl.org/',
  lang: 'en',
  className: 'NavMenuItem',
  hoverTimer: null
};

exports.default = NavMenuItem;