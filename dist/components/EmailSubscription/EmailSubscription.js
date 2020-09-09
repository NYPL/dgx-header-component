"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _axios = _interopRequireDefault(require("axios"));

var _classnames = _interopRequireDefault(require("classnames"));

var _underscore = require("underscore");

var _dgxSvgIcons = require("@nypl/dgx-svg-icons");

var _appConfig = _interopRequireDefault(require("../../appConfig"));

var _SocialMediaLinksWidget = _interopRequireDefault(require("../SocialMediaLinksWidget/SocialMediaLinksWidget"));

var _SubscribeMessageBox = _interopRequireDefault(require("./SubscribeMessageBox"));

var _DotsLoader = _interopRequireDefault(require("../Loaders/DotsLoader"));

var _utils = _interopRequireDefault(require("../../utils/utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var styles = {
  base: {
    backgroundColor: '#1B7FA7',
    padding: '0px',
    width: 'auto'
  },
  submitButton: {
    backgroundColor: '#1B7FA7',
    border: '2px solid #FFF',
    color: '#FFF',
    fontFamily: 'system-ui, "Segoe UI", Tahoma',
    fontWeight: 400,
    fontSize: '0.875em',
    height: '38px',
    margin: '60px 0 0 0',
    padding: '0 0 0 21px',
    lineHeight: 'normal',
    width: '100px'
  },
  tryAgainButton: {
    display: 'inline-block',
    border: '2px solid #fff',
    color: 'white',
    padding: '5px 15px 5px 5px',
    width: '90px',
    fontSize: '0.875em',
    backgroundColor: '#1B7FA7',
    fontFamily: 'system-ui, "Segoe UI", Tahoma',
    fontWeight: 400,
    marginTop: '25px'
  },
  privacyLink: {
    backgroundColor: '#1B7FA7',
    color: '#FFF',
    fontSize: '0.875em',
    fontWeight: '400',
    position: 'relative',
    textDecoration: 'underline'
  },
  scLink: {
    backgroundColor: '#1B7FA7',
    color: '#FFF',
    fontSize: '0.875em',
    fontWeight: '400',
    position: 'relative',
    textDecoration: 'underline'
  },
  emailFormLabel: {
    color: '#FFF',
    margin: '15px 0 0 0',
    display: 'inline-block'
  }
};

var EmailSubscription = /*#__PURE__*/function (_React$Component) {
  _inherits(EmailSubscription, _React$Component);

  var _super = _createSuper(EmailSubscription);

  function EmailSubscription(props) {
    var _this;

    _classCallCheck(this, EmailSubscription);

    _this = _super.call(this, props);
    _this.state = {
      formProcessing: false,
      formStatus: '',
      notValidEmail: false
    };
    _this.validateForm = _this.validateForm.bind(_assertThisInitialized(_this));
    _this.initForm = _this.initForm.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(EmailSubscription, [{
    key: "initForm",
    value: function initForm(e) {
      e.preventDefault();
      this.setState({
        formProcessing: false,
        formStatus: ''
      });
    } // Store changes are funky, need to look into it

    /* _onChange () {
      this.setState({formStatus: HeaderStore.getSubscribeFormStatus()});
    } */

  }, {
    key: "validateForm",
    value: function validateForm(e) {
      // Prevent re-direct, handle validation
      e.preventDefault();

      var userInput = _reactDom["default"].findDOMNode(this.refs.emailAddressField);

      if (!this.isValidEmail(userInput.value)) {
        userInput.value = '';
        userInput.focus();
        this.setState({
          notValidEmail: true
        });
      } else {
        this.setState({
          notValidEmail: false
        }); // Send as a POST request

        this.addSubscriberToList(userInput.value, this.props.target, this.props.listId);
      }
    }
  }, {
    key: "isValidEmail",
    value: function isValidEmail(value) {
      var emailRegex = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i);

      if (!value) {
        return false;
      }

      return emailRegex.test(value);
    }
  }, {
    key: "addSubscriberToList",
    value: function addSubscriberToList(userEmail, url, listid) {
      var _this2 = this;

      var postUrl = "".concat(url, "/add-subscriber/").concat(listid); // Display loader while processing finalizes.

      this.setState({
        formProcessing: true
      });

      _axios["default"].post(postUrl, {
        email: userEmail
      }).then(function (response) {
        _this2.setState({
          formStatus: response.data.responseStatus,
          formProcessing: false
        });
      })["catch"](function (response) {
        _this2.setState({
          formStatus: response.data.responseStatus || response.statusText,
          formProcessing: false
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var status = this.state.formStatus;
      var isLoading = this.state.formProcessing;
      var notValidEmail = this.state.notValidEmail;
      var formClass = 'emailSubscribeForm';
      var emailAddressField = 'emailAddressField';
      var errorClass = (0, _classnames["default"])({
        active: notValidEmail
      });
      var subscribeContent;

      if (!isLoading) {
        // The default view
        subscribeContent = /*#__PURE__*/_react["default"].createElement("div", {
          role: "dialog"
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "subscribeMessageBox ".concat(status),
          tabIndex: "0"
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "subscribeMessageBox-eyebrow"
        }), /*#__PURE__*/_react["default"].createElement("div", {
          className: "subscribeMessageBox-title"
        }, "Get the ", /*#__PURE__*/_react["default"].createElement("span", {
          className: "subscribeMessageBox-title-bestNYPL"
        }, "best of NYPL"), " in your inbox")), /*#__PURE__*/_react["default"].createElement("form", {
          id: "emailSubscribeForm",
          className: formClass,
          action: this.props.target,
          method: this.props.form_method,
          name: this.props.form_name,
          onSubmit: this.validateForm,
          style: (0, _underscore.extend)(this.props.style, styles.base)
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "".concat(formClass, "-fields")
        }, /*#__PURE__*/_react["default"].createElement("label", {
          className: "".concat(formClass, "-label"),
          style: styles.emailFormLabel,
          htmlFor: emailAddressField
        }, "Email Address"), /*#__PURE__*/_react["default"].createElement("input", {
          "aria-label": "Enter your email address",
          className: "".concat(formClass, "-input"),
          type: "email",
          name: "Email Address",
          placeholder: this.props.placeholder,
          ref: emailAddressField,
          id: emailAddressField,
          required: true,
          "aria-required": "true",
          autoComplete: "off",
          autoFocus: true
        }), /*#__PURE__*/_react["default"].createElement("div", {
          className: "".concat(formClass, "-error ").concat(errorClass)
        }, /*#__PURE__*/_react["default"].createElement(_dgxSvgIcons.XIcon, {
          ariaHidden: true,
          focusable: false
        }), /*#__PURE__*/_react["default"].createElement("span", null, "Please enter a valid email address")), /*#__PURE__*/_react["default"].createElement("div", {
          className: "".concat(formClass, "-submit")
        }, /*#__PURE__*/_react["default"].createElement(_dgxSvgIcons.CheckSoloIcon, {
          ariaHidden: true,
          focusable: false
        }), /*#__PURE__*/_react["default"].createElement("input", {
          "aria-label": "Sign up",
          type: "submit",
          name: "submit",
          value: "SIGN UP",
          style: styles.submitButton
        })))));

        if (status === 'success') {
          _utils["default"].trackHeader('Subscribe', 'Success');

          subscribeContent = /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_SubscribeMessageBox["default"], {
            status: status,
            msg: "Thank you for subscribing to our email updates."
          }), /*#__PURE__*/_react["default"].createElement("div", {
            className: "".concat(this.props.className, "-newEmail")
          }, /*#__PURE__*/_react["default"].createElement("button", {
            onClick: this.initForm,
            style: styles.resubmitButton
          }, "Enter another email address")), /*#__PURE__*/_react["default"].createElement("div", {
            className: "".concat(this.props.className, "-followUs")
          }, /*#__PURE__*/_react["default"].createElement("p", null, "Follow us:"), /*#__PURE__*/_react["default"].createElement(_SocialMediaLinksWidget["default"], {
            className: "".concat(this.props.className, "-socialMediaLinksWidget"),
            links: _appConfig["default"].socialMediaLinks,
            displayOnlyList: ['facebook', 'twitter']
          })));
        }

        if (status === 'exists') {
          _utils["default"].trackHeader('Subscribe', 'Error -- already subscribed');

          subscribeContent = /*#__PURE__*/_react["default"].createElement("div", {
            className: "".concat(this.props.className, "-alreadySubscribed")
          }, /*#__PURE__*/_react["default"].createElement(_SubscribeMessageBox["default"], {
            status: status,
            msg: "Looks like you're already signed up!"
          }), /*#__PURE__*/_react["default"].createElement("div", {
            className: "".concat(this.props.className, "-newEmail")
          }, /*#__PURE__*/_react["default"].createElement("button", {
            style: styles.resubmitButton,
            onClick: this.initForm
          }, "Enter a different email address")));
        }

        if (status === 'error' || status === 'Internal Server Error') {
          _utils["default"].trackHeader('Subscribe', 'Error');

          subscribeContent = /*#__PURE__*/_react["default"].createElement("div", {
            className: "".concat(this.props.className, "-misc-error")
          }, /*#__PURE__*/_react["default"].createElement("div", null, "Hmm..."), /*#__PURE__*/_react["default"].createElement("div", null, "Something isn't quite right."), /*#__PURE__*/_react["default"].createElement("div", null, "Please try again."), /*#__PURE__*/_react["default"].createElement("a", {
            href: "",
            onClick: this.initForm,
            style: styles.tryAgainButton
          }, /*#__PURE__*/_react["default"].createElement(_dgxSvgIcons.LeftArrowIcon, {
            ariaHidden: true,
            focusable: false
          }), "TRY AGAIN"));
        } // Always show the privacy link except in the loading phase.


        return /*#__PURE__*/_react["default"].createElement("div", {
          className: this.props.className
        }, subscribeContent, /*#__PURE__*/_react["default"].createElement("a", {
          href: this.props.subCenterUrl,
          className: "".concat(this.props.className, "-sc-link"),
          style: styles.scLink,
          onClick: function onClick() {
            return _utils["default"].trackHeader('Subscribe', 'Subscription Center');
          }
        }, "Subscription Center"), /*#__PURE__*/_react["default"].createElement("a", {
          href: this.props.policyUrl,
          className: "".concat(this.props.className, "-pp-link"),
          style: styles.privacyLink
        }, "Privacy Policy"));
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: this.props.className
      }, /*#__PURE__*/_react["default"].createElement(_DotsLoader["default"], null));
    }
  }]);

  return EmailSubscription;
}(_react["default"].Component);

EmailSubscription.propTypes = {
  id: _propTypes["default"].string,
  className: _propTypes["default"].string,
  lang: _propTypes["default"].string,
  target: _propTypes["default"].string,
  form_name: _propTypes["default"].string,
  listId: _propTypes["default"].string,
  form_method: _propTypes["default"].string,
  placeholder: _propTypes["default"].string,
  policyUrl: _propTypes["default"].string,
  subCenterUrl: _propTypes["default"].string,
  style: _propTypes["default"].arrayOf(_propTypes["default"].object)
};
EmailSubscription.defaultProps = {
  id: 'EmailSubscription',
  className: 'emailSubscription',
  lang: 'en',
  target: 'http://cl.exct.net/subscribe.aspx',
  form_name: 'subscribeForm',
  listId: '1061',
  form_method: 'POST',
  placeholder: 'Your email address',
  policyUrl: 'http://www.nypl.org/help/about-nypl/legal-notices/privacy-policy',
  subCenterUrl: 'http://pages.email.nypl.org/page.aspx?QS=3935619f7de112ef7250fe02b84fb2f9ab74e4ea015814b7',
  style: {}
};
var _default = EmailSubscription;
exports["default"] = _default;