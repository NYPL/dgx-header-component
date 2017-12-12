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

var _focusTrapReact = require('focus-trap-react');

var _focusTrapReact2 = _interopRequireDefault(_focusTrapReact);

var _HeaderStore = require('../../stores/HeaderStore.js');

var _HeaderStore2 = _interopRequireDefault(_HeaderStore);

var _Actions = require('../../actions/Actions.js');

var _Actions2 = _interopRequireDefault(_Actions);

var _utils = require('../../utils/utils.js');

var _utils2 = _interopRequireDefault(_utils);

var _MyNypl = require('../MyNypl/MyNypl.js');

var _MyNypl2 = _interopRequireDefault(_MyNypl);

var _appConfig = require('../../appConfig.js');

var _appConfig2 = _interopRequireDefault(_appConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// Alt Store/Actions

// GA Utilities

// Component Dependencies

// Configs


var styles = {
  base: {
    margin: '0px 10px 0px 0px',
    position: 'relative',
    display: 'inline-block',
    verticalAlign: 'baseline',
    lineHeight: 'normal'
  },
  MyNyplButton: {
    display: 'inline-block',
    border: 'none',
    padding: '9px 10px 10px 12px',
    textTransform: 'uppercase',
    lineHeight: 'normal',
    verticalAlign: 'baseline'
  },
  MyNyplIcon: {
    fontSize: '15px',
    verticalAlign: 'text-bottom',
    marginLeft: '3px',
    display: 'inline'
  },
  MyNyplWrapper: {
    position: 'absolute',
    zIndex: 1000,
    left: '0',
    minWidth: '250px',
    backgroundColor: '#1B7FA7',
    padding: '25px 30px'
  }
};

var MyNyplButton = function (_React$Component) {
  _inherits(MyNyplButton, _React$Component);

  function MyNyplButton(props) {
    _classCallCheck(this, MyNyplButton);

    var _this = _possibleConstructorReturn(this, (MyNyplButton.__proto__ || Object.getPrototypeOf(MyNyplButton)).call(this, props));

    _this.handleClick = _this.handleClick.bind(_this);
    _this.handleOnClickOut = _this.handleOnClickOut.bind(_this);
    _this.handleEscKey = _this.handleEscKey.bind(_this);
    return _this;
  }

  _createClass(MyNyplButton, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('keydown', this.handleEscKey, false);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('keydown', this.handleEscKey, false);
    }
    /**
     * handleEscKey(e)
     * Triggers the clickOut method if the ESC keyboard key is pressed.
     */

  }, {
    key: 'handleEscKey',
    value: function handleEscKey(e) {
      if (e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) {
        this.handleOnClickOut();
      }
    }

    /**
     * handleClick()
     * Toggles the visibility of the form. Sends an Action
     * that will dispatch an event to the Header Store.
     */

  }, {
    key: 'handleClick',
    value: function handleClick(e) {
      // If javascript is enabled, clicking the button will open the dropdown menu instead of
      // going to the link
      e.preventDefault();
      var visibleState = _HeaderStore2.default.getMyNyplVisible() ? 'Closed' : 'Open';

      _Actions2.default.toggleMyNyplVisible(!_HeaderStore2.default.getMyNyplVisible());
      _utils2.default.trackHeader(this.props.gaAction, 'MyNyplButton - ' + visibleState);
    }

    /**
     * handleOnClickOut()
     * Handles closing the Subscribe form if it is
     * currently visible.
     */

  }, {
    key: 'handleOnClickOut',
    value: function handleOnClickOut() {
      if (_HeaderStore2.default.getMyNyplVisible()) {
        if (_HeaderStore2.default.getMobileMyNyplButtonValue() === '') {
          _utils2.default.trackHeader(this.props.gaAction, 'MyNyplButton - Closed');
        }
        _Actions2.default.toggleMyNyplVisible(false);
      }
    }

    /**
     * renderMyNyplButton()
     * Returns MyNypl button and its icon based on the log in and the click status.
     */

  }, {
    key: 'renderMyNyplButton',
    value: function renderMyNyplButton() {
      var buttonClass = '';
      var iconClass = _HeaderStore2.default.getMyNyplVisible() ? 'nypl-icon-solo-x' : 'nypl-icon-wedge-down';
      var icon = _react2.default.createElement('span', { className: iconClass + ' icon', style: styles.MyNyplIcon });
      var labelColorClass = this.props.isLoggedIn ? ' loggedIn' : '';
      var myNyplButtonLabel = this.props.patronName ? 'My Account' : 'Log In';
      var loggedInFadeInAnimation = this.props.patronName ? ' animated fadeIn' : '';

      if (_HeaderStore2.default.getMyNyplVisible()) {
        buttonClass = 'active';
        iconClass = 'nypl-icon-solo-x';
      }

      return _react2.default.createElement(
        'a',
        {
          className: 'MyNyplButton ' + buttonClass + labelColorClass + loggedInFadeInAnimation,
          onClick: this.handleClick,
          style: (0, _underscore.extend)(styles.MyNyplButton, this.props.style),
          href: this.props.target,
          role: 'button'
        },
        myNyplButtonLabel,
        icon
      );
    }
  }, {
    key: 'renderMyNyplDialog',
    value: function renderMyNyplDialog() {
      var boxHeight = this.props.isLoggedIn ? ' loggedInHeight' : null;
      // TODO: CHANGE TO STATE-BASED
      return _HeaderStore2.default.getMyNyplVisible() ? _react2.default.createElement(
        'div',
        {
          className: 'MyNypl-Wrapper active animatedFast fadeIn' + boxHeight,
          style: styles.MyNyplWrapper
        },
        _react2.default.createElement(_MyNypl2.default, {
          patronName: this.props.patronName,
          isLoggedIn: this.props.isLoggedIn,
          logOutLink: this.props.logOutLink
        })
      ) : null;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _focusTrapReact2.default,
        {
          focusTrapOptions: {
            onDeactivate: this.handleOnClickOut,
            clickOutsideDeactivates: true
          },
          active: _HeaderStore2.default.getMyNyplVisible()
        },
        _react2.default.createElement(
          'div',
          {
            className: 'MyNyplButton-Wrapper',
            style: (0, _underscore.extend)(styles.base, this.props.style)
          },
          this.renderMyNyplButton(),
          this.renderMyNyplDialog()
        )
      );
    }
  }]);

  return MyNyplButton;
}(_react2.default.Component);

MyNyplButton.propTypes = {
  lang: _propTypes2.default.string,
  style: _propTypes2.default.object,
  isLoggedIn: _propTypes2.default.bool,
  patronName: _propTypes2.default.string,
  logOutLink: _propTypes2.default.string,
  gaAction: _propTypes2.default.string,
  target: _propTypes2.default.string
};

MyNyplButton.defaultProps = {
  lang: 'en',
  label: 'Log In',
  target: _appConfig2.default.myNyplLinks.catalog
};

exports.default = MyNyplButton;
module.exports = exports['default'];