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

var _dgxSvgIcons = require('dgx-svg-icons');

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _EmailSubscription = require('../EmailSubscription/EmailSubscription.js');

var _EmailSubscription2 = _interopRequireDefault(_EmailSubscription);

var _utils = require('../../utils/utils.js');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// Utilities


var styles = {
  base: {
    position: 'relative'
  },
  subscribeButton: {
    display: 'inline',
    padding: '11px 10px 11px 12px',
    verticalAlign: 'baseline'
  },
  subscribeLabel: {
    display: 'inline',
    verticalAlign: 'baseline'
  },
  EmailSubscribeForm: {
    position: 'absolute',
    zIndex: 1000,
    right: '0',
    width: '250px',
    minHeight: '210px',
    backgroundColor: '#1B7FA7',
    padding: '25px 30px'
  },
  hide: {
    display: 'none'
  },
  show: {
    display: 'block'
  }
};

var SubscribeButton = function (_React$Component) {
  _inherits(SubscribeButton, _React$Component);

  function SubscribeButton(props) {
    _classCallCheck(this, SubscribeButton);

    // subscribeFormVisible
    var _this = _possibleConstructorReturn(this, (SubscribeButton.__proto__ || Object.getPrototypeOf(SubscribeButton)).call(this, props));

    _this.state = {
      visible: false,
      target: _this.props.target
    };

    _this.handleOnClickOut = _this.handleOnClickOut.bind(_this);
    _this.handleClick = _this.handleClick.bind(_this);
    _this.handleEscKey = _this.handleEscKey.bind(_this);
    return _this;
  }

  _createClass(SubscribeButton, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('keydown', this.handleEscKey, false);
      // Make an axios call to the mailinglist API server to check it th server is working.
      // And determine the behavior of subscribe button based on the status of the server.
      this.callMailinglistApi();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('keydown', this.handleEscKey, false);
    }

    /**
     * onChange()
     * Updates the state of the form based off the Header Store.
     */

  }, {
    key: 'onChange',
    value: function onChange() {
      this.setState({ visible: !this.state.visible });
    }
  }, {
    key: 'handleEscKey',
    value: function handleEscKey(e) {
      if (e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) {
        this.handleOnClickOut();
      }
    }

    /**
     * handleClick(e)
     * Toggles the visibility of the form. Sends an Action
     * that will dispatch an event to the Header Store.
     */

  }, {
    key: 'handleClick',
    value: function handleClick(e) {
      if (this.state.target === '#') {
        e.preventDefault();
        var visibleState = this.state.visible ? 'Closed' : 'Open';
        this.setState({ visible: !this.state.visible });
        _utils2.default.trackHeader('Click', 'Subscribe - ' + visibleState);
      }
    }

    /**
     * handleOnClickOut()
     * Handles closing the Subscribe form if it is
     * currently visible.
     */

  }, {
    key: 'handleOnClickOut',
    value: function handleOnClickOut() {
      if (this.state.visible) {
        this.setState({ visible: false });
        _utils2.default.trackHeader('Click', 'Subscribe - Closed');
      }
    }

    /**
    * callMailinglistApi()
    * An axios call to the mailinglist API server. If the server works,
    * change the link of the button to '#' so it will open the subscribe box.
    * If the server doesn't work, the button will link to subscribe landing page
    * as a fallback.
    */

  }, {
    key: 'callMailinglistApi',
    value: function callMailinglistApi() {
      var _this2 = this;

      _axios2.default.get('https://mailinglistapi.nypl.org').then(function (response) {
        if (response.status === 200 && response.status < 300) {
          _this2.setState({ target: '#' });
        }
      }).catch(function (response) {
        console.warn('Error on Axios GET request: https://mailinglistapi.nypl.org');
        if (response instanceof Error) {
          console.warn(response.message);
        } else {
          console.warn('The Axios GET request has a status of: ' + response.status);
        }
      });
    }
  }, {
    key: 'renderEmailButton',
    value: function renderEmailButton() {
      var buttonClass = '';
      var icon = _react2.default.createElement(_dgxSvgIcons.DownWedgeIcon, { className: 'dropDownIcon', ariaHidden: true });
      var label = this.props.label;

      if (this.state.visible) {
        buttonClass = 'active';
        label = 'Close';
        icon = _react2.default.createElement(_dgxSvgIcons.XIcon, { className: 'dropDownIcon', ariaHidden: true, fill: '#fff' });
      }

      return _react2.default.createElement(
        'a',
        {
          id: 'SubscribeButton',
          className: 'SubscribeButton ' + buttonClass,
          href: this.state.target,
          onClick: this.handleClick,
          style: styles.subscribeButton,
          role: this.state.target === '#' ? 'button' : null,
          'aria-haspopup': 'true',
          'aria-expanded': this.state.visible ? true : null
        },
        _react2.default.createElement(
          'span',
          { style: styles.subscribeLabel },
          label
        ),
        icon
      );
    }
  }, {
    key: 'renderEmailDialog',
    value: function renderEmailDialog() {
      return this.state.visible ? _react2.default.createElement(
        'div',
        {
          className: 'EmailSubscription-Wrapper active animatedFast fadeIn',
          style: styles.EmailSubscribeForm
        },
        _react2.default.createElement(_EmailSubscription2.default, {
          listId: '1061',
          target: 'https://mailinglistapi.nypl.org'
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
            clickOutsideDeactivates: true,
            initialFocus: '.SubscribeMessageBox'
          },
          active: this.state.visible,
          className: 'SubscribeButton-Wrapper',
          style: (0, _underscore.extend)(styles.base, this.props.style)
        },
        this.renderEmailButton(),
        this.renderEmailDialog()
      );
    }
  }]);

  return SubscribeButton;
}(_react2.default.Component);

SubscribeButton.propTypes = {
  lang: _propTypes2.default.string,
  label: _propTypes2.default.string,
  target: _propTypes2.default.string,
  style: _propTypes2.default.object
};

SubscribeButton.defaultProps = {
  lang: 'en',
  label: 'Subscribe',
  target: 'http://pages.email.nypl.org/page.aspx' + '?QS=3935619f7de112ef7250fe02b84fb2f9ab74e4ea015814b7'
};

exports.default = SubscribeButton;
module.exports = exports['default'];