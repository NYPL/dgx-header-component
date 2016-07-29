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

var NavMenuItem = (function (_React$Component) {
  _inherits(NavMenuItem, _React$Component);

  function NavMenuItem(props) {
    _classCallCheck(this, NavMenuItem);

    _get(Object.getPrototypeOf(NavMenuItem.prototype), 'constructor', this).call(this, props);

    this.state = {
      activeItem: null,
      lastActiveMenuItem: ''
    };

    this.activateHover = this.activateHover.bind(this);
    this.deactivateHover = this.deactivateHover.bind(this);
  }

  /**
   * Sets the state's lastActiveMenuItem and activeItem after a given time delay.
   */

  _createClass(NavMenuItem, [{
    key: 'activateHover',
    value: function activateHover() {
      var _this = this;

      this.hoverTimer = setTimeout(function () {
        _this.setState({
          lastActiveMenuItem: _this.props.navId,
          activeItem: _this.props.index
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
      var _this2 = this;

      clearTimeout(this.hoverTimer);

      setTimeout(function () {
        _this2.setState({ activeItem: null });
      }, 250);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var target = this.props.target;
      var linkClass = (0, _classnames2['default'])({
        active: this.props.index === this.state.activeItem || _storesHeaderStoreJs2['default']._getLastActiveMenuItem() === this.props.navId
      });

      return _react2['default'].createElement(
        'li',
        {
          id: this.props.navId ? this.props.className + '-' + this.props.navId : this.props.className,
          className: this.props.className
        },
        _react2['default'].createElement(
          'span',
          {
            className: 'NavMenuItem-Link',
            id: this.props.navId ? 'NavMenuItem-Link-' + this.props.navId : 'NavMenuItem-Link'
          },
          _react2['default'].createElement(
            'a',
            {
              href: target,
              className: linkClass,
              onClick: function () {
                return _utilsUtilsJs2['default']._trackHeader('Go to...', '' + _this3.props.label[_this3.props.lang].text);
              }
            },
            this.props.label[this.props.lang].text
          )
        )
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
  features: _react2['default'].PropTypes.array,
  urlType: _react2['default'].PropTypes.string
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