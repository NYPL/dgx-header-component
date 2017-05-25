'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _underscore = require('underscore');

var _reactOnclickout = require('react-onclickout');

var _reactOnclickout2 = _interopRequireDefault(_reactOnclickout);

var _HeaderStore = require('../../stores/HeaderStore.js');

var _HeaderStore2 = _interopRequireDefault(_HeaderStore);

var _Actions = require('../../actions/Actions.js');

var _Actions2 = _interopRequireDefault(_Actions);

var _utils = require('../../utils/utils.js');

var _utils2 = _interopRequireDefault(_utils);

var _MyNypl = require('../MyNypl/MyNypl.js');

var _MyNypl2 = _interopRequireDefault(_MyNypl);

var _dgxSvgIcons = require('dgx-svg-icons');

var _appConfig = require('../../appConfig.js');

var _appConfig2 = _interopRequireDefault(_appConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// Configs


var styles = {
  base: {
    position: 'relative',
    display: 'inline-block',
    verticalAlign: 'middle'
  },
  MyNyplButton: {
    textTransform: 'uppercase',
    padding: '5px 7.5px',
    border: 'none',
    lineHeight: 'normal',
    outline: 'none'
  },
  MyNyplIcon: {
    fontSize: '15px',
    verticalAlign: 'text-bottom',
    marginLeft: '3px',
    display: 'inline'
  },
  MyNyplWrapper: {
    position: 'absolute',
    right: '0',
    minWidth: '218px',
    backgroundColor: '#1B7FA7',
    padding: '17px 30px'
  },
  hide: {
    display: 'none'
  },
  show: {
    display: 'block'
  }
};

var StickyMyNyplButton = function (_React$Component) {
  _inherits(StickyMyNyplButton, _React$Component);

  function StickyMyNyplButton(props) {
    _classCallCheck(this, StickyMyNyplButton);

    var _this = _possibleConstructorReturn(this, (StickyMyNyplButton.__proto__ || Object.getPrototypeOf(StickyMyNyplButton)).call(this, props));

    _this.handleClick = _this.handleClick.bind(_this);
    _this.handleOnClickOut = _this.handleOnClickOut.bind(_this);
    return _this;
  }

  /**
   * handleClick()
   * Toggles the visibility of the form. Sends an Action
   * that will dispatch an event to the HeaderStore.
   */


  _createClass(StickyMyNyplButton, [{
    key: 'handleClick',
    value: function handleClick(e) {
      // If javascript is enabled, clicking the button will open the dropdown menu instead of
      // going to the link
      e.preventDefault();
      var visibleState = _HeaderStore2.default.getStickyMyNyplVisible() ? 'Closed' : 'Open';

      _Actions2.default.toggleStickyMyNyplVisible(!_HeaderStore2.default.getStickyMyNyplVisible());
      _utils2.default.trackHeader(this.props.gaAction, 'StickyMyNyplButton - ' + visibleState);
    }

    /**
     * handleOnClickOut()
     * Handles closing the Subscribe form if it is
     * currently visible.
     */

  }, {
    key: 'handleOnClickOut',
    value: function handleOnClickOut() {
      if (_HeaderStore2.default.getStickyMyNyplVisible()) {
        _Actions2.default.toggleStickyMyNyplVisible(false);
        _utils2.default.trackHeader(this.props.gaAction, 'StickyMyNyplButton - Closed');
      }
    }
  }, {
    key: 'render',
    value: function render() {
      // Assign a variable to hold the reference of state boolean
      var showDialog = _HeaderStore2.default.getStickyMyNyplVisible();
      var buttonClasses = (0, _classnames2.default)({ active: showDialog });
      var myNyplClasses = (0, _classnames2.default)({ 'active animatedFast fadeIn': showDialog });
      var loginIconClass = this.props.patronName ? '-loggedIn' : '';
      var loggedInFadeInAnimation = this.props.patronName ? ' animated fadeIn' : '';
      var active = showDialog ? ' active' : '';
      var boxHeight = this.props.isLoggedIn ? ' loggedInHeight' : null;

      return _react2.default.createElement(
        _reactOnclickout2.default,
        { onClickOut: this.handleOnClickOut },
        _react2.default.createElement(
          'div',
          {
            className: 'MyNyplButton-Wrapper',
            ref: 'MyNypl',
            style: (0, _underscore.extend)(styles.base, this.props.style)
          },
          _react2.default.createElement(
            'a',
            {
              id: 'MyNyplButton',
              className: 'MyNyplButton ' + buttonClasses,
              onClick: this.handleClick,
              style: (0, _underscore.extend)(styles.MyNyplButton, this.props.style),
              href: this.props.target,
              role: 'button'
            },
            _react2.default.createElement(
              'span',
              { className: 'visuallyHidden' },
              this.props.label
            ),
            _react2.default.createElement(_dgxSvgIcons.LoginIconSolid, {
              className: 'StickyMyNyplButton LoginIcon' + loginIconClass + loggedInFadeInAnimation + active
            })
          ),
          _react2.default.createElement(
            'div',
            {
              className: 'StickyMyNypl-Wrapper ' + myNyplClasses + boxHeight,
              style: styles.MyNyplWrapper
            },
            _react2.default.createElement(_MyNypl2.default, {
              isLoggedIn: this.props.isLoggedIn,
              patronName: this.props.patronName,
              logOutLink: this.props.logOutLink
            })
          )
        )
      );
    }
  }]);

  return StickyMyNyplButton;
}(_react2.default.Component);

StickyMyNyplButton.propTypes = {
  lang: _propTypes2.default.string,
  label: _propTypes2.default.string,
  style: _propTypes2.default.object,
  isLoggedIn: _propTypes2.default.bool,
  patronName: _propTypes2.default.string,
  logOutLink: _propTypes2.default.string,
  gaAction: _propTypes2.default.string,
  target: _propTypes2.default.string
};

StickyMyNyplButton.defaultProps = {
  lang: 'en',
  label: 'Log In',
  target: _appConfig2.default.myNyplLinks.catalog
};

exports.default = StickyMyNyplButton;
module.exports = exports['default'];