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

var _underscore = require('underscore');

var _reactOnclickout = require('react-onclickout');

var _reactOnclickout2 = _interopRequireDefault(_reactOnclickout);

var _EmailSubscriptionEmailSubscriptionJs = require('../EmailSubscription/EmailSubscription.js');

var _EmailSubscriptionEmailSubscriptionJs2 = _interopRequireDefault(_EmailSubscriptionEmailSubscriptionJs);

// Alt Store/Actions

var _storesHeaderStoreJs = require('../../stores/HeaderStore.js');

var _storesHeaderStoreJs2 = _interopRequireDefault(_storesHeaderStoreJs);

var _actionsActionsJs = require('../../actions/Actions.js');

var _actionsActionsJs2 = _interopRequireDefault(_actionsActionsJs);

// Utilities

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _utilsUtilsJs = require('../../utils/utils.js');

var _utilsUtilsJs2 = _interopRequireDefault(_utilsUtilsJs);

var styles = {
  base: {
    position: 'relative'
  },
  subscribeButton: {
    display: 'inline-block',
    padding: '10px 10px 10px 12px',
    verticalAlign: 'baseline'
  },
  subscribeLabel: {
    display: 'inline',
    verticalAlign: 'baseline'
  },
  subscribeIcon: {
    fontSize: '15px',
    verticalAlign: 'text-bottom',
    marginLeft: '3px',
    display: 'inline'
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

var SubscribeButton = (function (_React$Component) {
  _inherits(SubscribeButton, _React$Component);

  function SubscribeButton(props) {
    _classCallCheck(this, SubscribeButton);

    _get(Object.getPrototypeOf(SubscribeButton.prototype), 'constructor', this).call(this, props);

    this.state = {
      subscribeFormVisible: _storesHeaderStoreJs2['default']._getSubscribeFormVisible(),
      target: this.props.target
    };

    this.handleOnClickOut = this.handleOnClickOut.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleEscKey = this.handleEscKey.bind(this);
  }

  _createClass(SubscribeButton, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _storesHeaderStoreJs2['default'].listen(this.onChange.bind(this));
      window.addEventListener('keydown', this.handleEscKey, false);
      // Make an axios call to the mailinglist API server to check it th server is working.
      // And determine the behavior of subscribe button based on the status of the server.
      this.callMailinglistApi();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _storesHeaderStoreJs2['default'].unlisten(this.onChange.bind(this));
      window.removeEventListener('keydown', this.handleEscKey, false);
    }

    /**
     * onChange()
     * Updates the state of the form based off the Header Store.
     */
  }, {
    key: 'onChange',
    value: function onChange() {
      this.setState({ subscribeFormVisible: _storesHeaderStoreJs2['default']._getSubscribeFormVisible() });
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
        var visibleState = this.state.subscribeFormVisible ? 'Closed' : 'Open';
        _actionsActionsJs2['default'].toggleSubscribeFormVisible(!this.state.subscribeFormVisible);
        _utilsUtilsJs2['default']._trackHeader('Click', 'Subscribe - ' + visibleState);
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
      if (_storesHeaderStoreJs2['default']._getSubscribeFormVisible()) {
        _actionsActionsJs2['default'].toggleSubscribeFormVisible(false);
        _utilsUtilsJs2['default']._trackHeader('Click', 'Subscribe - Closed');
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
      var _this = this;

      _axios2['default'].get('https://mailinglistapi.nypl.org').then(function (response) {
        if (response.status === 200 && response.status < 300) {
          _this.setState({ target: '#' });
        }
      })['catch'](function (response) {
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
      var iconClass = 'nypl-icon-wedge-down';

      if (this.state.subscribeFormVisible) {
        iconClass = 'nypl-icon-solo-x';
        buttonClass = 'active';
      }

      return _react2['default'].createElement(
        'a',
        {
          id: 'SubscribeButton',
          className: 'SubscribeButton ' + buttonClass,
          href: this.state.target,
          onClick: this.handleClick,
          style: styles.subscribeButton,
          role: this.state.target === '#' ? 'button' : null
        },
        _react2['default'].createElement(
          'span',
          { style: styles.subscribeLabel },
          this.props.label
        ),
        _react2['default'].createElement('span', {
          className: iconClass + ' icon',
          'aria-hidden': 'true',
          style: styles.subscribeIcon
        })
      );
    }
  }, {
    key: 'renderEmailDialog',
    value: function renderEmailDialog() {
      return this.state.subscribeFormVisible ? _react2['default'].createElement(
        'div',
        {
          className: 'EmailSubscription-Wrapper active animatedFast fadeIn',
          style: styles.EmailSubscribeForm
        },
        _react2['default'].createElement(_EmailSubscriptionEmailSubscriptionJs2['default'], {
          list_id: '1061',
          target: 'https://mailinglistapi.nypl.org'
        })
      ) : null;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        _reactOnclickout2['default'],
        { onClickOut: this.handleOnClickOut },
        _react2['default'].createElement(
          'div',
          {
            className: 'SubscribeButton-Wrapper',
            style: (0, _underscore.extend)(styles.base, this.props.style)
          },
          this.renderEmailButton(),
          this.renderEmailDialog()
        )
      );
    }
  }]);

  return SubscribeButton;
})(_react2['default'].Component);

SubscribeButton.propTypes = {
  lang: _react2['default'].PropTypes.string,
  label: _react2['default'].PropTypes.string,
  target: _react2['default'].PropTypes.string,
  style: _react2['default'].PropTypes.object
};

SubscribeButton.defaultProps = {
  lang: 'en',
  label: 'Subscribe',
  target: 'http://pages.email.nypl.org/page.aspx' + '?QS=3935619f7de112ef7250fe02b84fb2f9ab74e4ea015814b7'
};

exports['default'] = SubscribeButton;
module.exports = exports['default'];