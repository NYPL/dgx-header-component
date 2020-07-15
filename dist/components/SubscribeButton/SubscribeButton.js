"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _underscore = require("underscore");

var _focusTrapReact = _interopRequireDefault(require("focus-trap-react"));

var _dgxSvgIcons = require("@nypl/dgx-svg-icons");

var _axios = _interopRequireDefault(require("axios"));

var _EmailSubscription = _interopRequireDefault(require("../EmailSubscription/EmailSubscription"));

var _utils = _interopRequireDefault(require("../../utils/utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var styles = {
  base: {
    position: 'relative',
    lineHeight: '1px'
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
    padding: '25px 30px',
    marginTop: '10px'
  },
  hide: {
    display: 'none'
  },
  show: {
    display: 'block'
  }
};

var SubscribeButton = /*#__PURE__*/function (_React$Component) {
  _inherits(SubscribeButton, _React$Component);

  var _super = _createSuper(SubscribeButton);

  function SubscribeButton(props) {
    var _this;

    _classCallCheck(this, SubscribeButton);

    _this = _super.call(this, props); // subscribeFormVisible

    _this.state = {
      visible: false,
      target: _this.props.target
    };
    _this.handleOnClickOut = _this.handleOnClickOut.bind(_assertThisInitialized(_this));
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this));
    _this.handleEscKey = _this.handleEscKey.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(SubscribeButton, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener('keydown', this.handleEscKey, false); // Make an axios call to the mailinglist API server to check it th server is working.
      // And determine the behavior of subscribe button based on the status of the server.

      this.callMailinglistApi();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('keydown', this.handleEscKey, false);
    }
    /**
     * onChange()
     * Updates the state of the form based off the Header Store.
     */

  }, {
    key: "onChange",
    value: function onChange() {
      this.setState({
        visible: !this.state.visible
      });
    }
  }, {
    key: "handleEscKey",
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
    key: "handleClick",
    value: function handleClick(e) {
      if (this.state.target === '#') {
        e.preventDefault();
        var visibleState = this.state.visible ? 'Closed' : 'Open';
        this.setState({
          visible: !this.state.visible
        });

        _utils.default.trackHeader('Click', "Subscribe - ".concat(visibleState));
      }
    }
    /**
     * handleOnClickOut()
     * Handles closing the Subscribe form if it is
     * currently visible.
     */

  }, {
    key: "handleOnClickOut",
    value: function handleOnClickOut() {
      if (this.state.visible) {
        this.setState({
          visible: false
        });

        _utils.default.trackHeader('Click', 'Subscribe - Closed');
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
    key: "callMailinglistApi",
    value: function callMailinglistApi() {
      var _this2 = this;

      _axios.default.get('https://mailinglistapi.nypl.org').then(function (response) {
        if (response.status === 200 && response.status < 300) {
          _this2.setState({
            target: '#'
          });
        }
      }).catch(function (response) {
        console.warn('Error on Axios GET request: https://mailinglistapi.nypl.org');

        if (response instanceof Error) {
          console.warn(response.message);
        } else {
          console.warn("The Axios GET request has a status of: ".concat(response.status));
        }
      });
    }
  }, {
    key: "renderEmailButton",
    value: function renderEmailButton() {
      var buttonClass = '';

      var icon = /*#__PURE__*/_react.default.createElement(_dgxSvgIcons.GenericWedgeIcon, {
        className: "dropDownIcon",
        ariaHidden: true,
        focusable: false
      });

      var label = this.props.label;

      if (this.state.visible) {
        buttonClass = 'active';
        label = 'Close';
        icon = /*#__PURE__*/_react.default.createElement(_dgxSvgIcons.XIcon, {
          className: "dropDownIcon",
          ariaHidden: true,
          fill: "#fff",
          focusable: false
        });
      }

      return /*#__PURE__*/_react.default.createElement("a", {
        id: "subscribeButton",
        className: "subscribeButton ".concat(buttonClass),
        href: this.state.target,
        onClick: this.handleClick,
        style: styles.subscribeButton,
        role: this.state.target === '#' ? 'button' : null,
        "aria-haspopup": "true",
        "aria-expanded": this.state.visible ? true : null
      }, /*#__PURE__*/_react.default.createElement("span", {
        style: styles.subscribeLabel
      }, label), icon);
    }
  }, {
    key: "renderEmailDialog",
    value: function renderEmailDialog() {
      return this.state.visible ? /*#__PURE__*/_react.default.createElement("div", {
        className: "emailSubscription-wrapper active animatedFast fadeIn",
        style: styles.EmailSubscribeForm
      }, /*#__PURE__*/_react.default.createElement(_EmailSubscription.default, {
        listId: "1061",
        target: "https://mailinglistapi.nypl.org"
      })) : null;
    }
  }, {
    key: "render",
    value: function render() {
      // The desired initialFocus selector only exists when modal visible:
      var initialFocus = this.state.visible ? '.subscribeMessageBox' : null;
      return /*#__PURE__*/_react.default.createElement(_focusTrapReact.default, {
        focusTrapOptions: {
          onDeactivate: this.handleOnClickOut,
          clickOutsideDeactivates: true,
          initialFocus: initialFocus
        },
        active: this.state.visible,
        className: "subscribeButton-wrapper",
        style: (0, _underscore.extend)(styles.base, this.props.style)
      }, this.renderEmailButton(), this.renderEmailDialog());
    }
  }]);

  return SubscribeButton;
}(_react.default.Component);

SubscribeButton.propTypes = {
  lang: _propTypes.default.string,
  label: _propTypes.default.string,
  target: _propTypes.default.string,
  style: _propTypes.default.arrayOf(_propTypes.default.object)
};
SubscribeButton.defaultProps = {
  lang: 'en',
  label: 'Subscribe',
  target: 'http://pages.email.nypl.org/page.aspx' + '?QS=3935619f7de112ef7250fe02b84fb2f9ab74e4ea015814b7',
  style: {}
};
var _default = SubscribeButton;
exports.default = _default;