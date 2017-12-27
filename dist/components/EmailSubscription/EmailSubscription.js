'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _underscore = require('underscore');

var _dgxSvgIcons = require('@nypl/dgx-svg-icons');

var _appConfig = require('../../appConfig.js');

var _appConfig2 = _interopRequireDefault(_appConfig);

var _SocialMediaLinksWidget = require('../SocialMediaLinksWidget/SocialMediaLinksWidget.js');

var _SocialMediaLinksWidget2 = _interopRequireDefault(_SocialMediaLinksWidget);

var _SubscribeMessageBox = require('./SubscribeMessageBox.js');

var _SubscribeMessageBox2 = _interopRequireDefault(_SubscribeMessageBox);

var _DotsLoader = require('../Loaders/DotsLoader.js');

var _DotsLoader2 = _interopRequireDefault(_DotsLoader);

var _utils = require('../../utils/utils.js');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
    fontFamily: 'Kievit-Book',
    fontSize: '14px',
    height: '38px',
    letterSpacing: '.03em',
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
    fontSize: '14px',
    backgroundColor: '#1B7FA7',
    fontFamily: 'Kievit-Book',
    marginTop: '25px'
  },
  privacyLink: {
    textDecoration: 'underline',
    fontSize: '12px',
    color: '#FFF',
    fontWeight: '400',
    textTransform: 'uppercase',
    position: 'absolute',
    bottom: '45px',
    right: '30px'
  },
  scLink: {
    textDecoration: 'underline',
    fontSize: '12px',
    color: 'white',
    fontWeight: '200',
    textTransform: 'uppercase',
    position: 'absolute',
    bottom: '68px',
    right: '30px',
    letterSpacing: '0.03em'
  },
  emailFormLabel: {
    color: '#FFF',
    margin: '15px 0 0 5px',
    display: 'inline-block'
  },
  resubmitButton: {
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderBottom: '2px solid #FFF',
    color: '#FFF',
    backgroundColor: 'transparent',
    fontSize: '16px',
    padding: '0 0 2px 0',
    letterSpacing: '0.03em'
  }
};

var EmailSubscription = function (_React$Component) {
  _inherits(EmailSubscription, _React$Component);

  function EmailSubscription(props) {
    _classCallCheck(this, EmailSubscription);

    var _this = _possibleConstructorReturn(this, (EmailSubscription.__proto__ || Object.getPrototypeOf(EmailSubscription)).call(this, props));

    _this.state = {
      formProcessing: false,
      formStatus: '',
      notValidEmail: false
    };

    _this.validateForm = _this.validateForm.bind(_this);
    _this.initForm = _this.initForm.bind(_this);
    return _this;
  }

  _createClass(EmailSubscription, [{
    key: 'initForm',
    value: function initForm(e) {
      e.preventDefault();
      this.setState({
        formProcessing: false,
        formStatus: ''
      });
    }

    // Store changes are funky, need to look into it
    /* _onChange () {
      this.setState({formStatus: HeaderStore.getSubscribeFormStatus()});
    } */

  }, {
    key: 'validateForm',
    value: function validateForm(e) {
      // Prevent re-direct, handle validation
      e.preventDefault();
      var userInput = _reactDom2.default.findDOMNode(this.refs.emailAddressField);

      if (!this.isValidEmail(userInput.value)) {
        userInput.value = '';
        userInput.focus();
        this.setState({
          notValidEmail: true
        });
      } else {
        this.setState({
          notValidEmail: false
        });

        // Send as a POST request
        this.addSubscriberToList(userInput.value, this.props.target, this.props.listId);
      }
    }
  }, {
    key: 'isValidEmail',
    value: function isValidEmail(value) {
      var emailRegex = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i);
      if (!value) {
        return false;
      }
      return emailRegex.test(value);
    }
  }, {
    key: 'addSubscriberToList',
    value: function addSubscriberToList(userEmail, url, listid) {
      var _this2 = this;

      var postUrl = url + '/add-subscriber/' + listid;

      // Display loader while processing finalizes.
      this.setState({ formProcessing: true });

      _axios2.default.post(postUrl, {
        email: userEmail
      }).then(function (response) {
        _this2.setState({
          formStatus: response.data.responseStatus,
          formProcessing: false
        });
      }).catch(function (response) {
        _this2.setState({
          formStatus: response.data.responseStatus || response.statusText,
          formProcessing: false
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var status = this.state.formStatus;
      var isLoading = this.state.formProcessing;
      var notValidEmail = this.state.notValidEmail;
      var formClass = 'emailSubscribeForm';
      var emailAddressField = 'emailAddressField';
      var errorClass = (0, _classnames2.default)({ active: notValidEmail });
      var subscribeContent = void 0;

      if (!isLoading) {
        // The default view
        subscribeContent = _react2.default.createElement(
          'div',
          { role: 'dialog' },
          _react2.default.createElement(
            'div',
            { className: 'subscribeMessageBox ' + status, tabIndex: '0' },
            _react2.default.createElement('div', { className: 'subscribeMessageBox-eyebrow' }),
            _react2.default.createElement(
              'div',
              { className: 'subscribeMessageBox-title' },
              'Get the ',
              _react2.default.createElement(
                'span',
                { className: 'subscribeMessageBox-title-bestNYPL' },
                'best of NYPL'
              ),
              ' in your inbox'
            )
          ),
          _react2.default.createElement(
            'form',
            {
              id: 'emailSubscribeForm',
              className: formClass,
              action: this.props.target,
              method: this.props.form_method,
              name: this.props.form_name,
              onSubmit: this.validateForm,
              style: (0, _underscore.extend)(this.props.style, styles.base)
            },
            _react2.default.createElement(
              'div',
              { className: formClass + '-fields' },
              _react2.default.createElement(
                'label',
                {
                  className: formClass + '-label',
                  style: styles.emailFormLabel,
                  htmlFor: emailAddressField
                },
                'Email Address'
              ),
              _react2.default.createElement('input', {
                'aria-label': 'Enter your email address',
                className: formClass + '-input',
                type: 'email',
                name: 'Email Address',
                placeholder: this.props.placeholder,
                ref: emailAddressField,
                id: emailAddressField,
                required: true,
                'aria-required': 'true',
                autoComplete: 'off',
                autoFocus: true
              }),
              _react2.default.createElement(
                'div',
                { className: formClass + '-error ' + errorClass },
                _react2.default.createElement(_dgxSvgIcons.XIcon, { ariaHidden: true }),
                _react2.default.createElement(
                  'span',
                  null,
                  'Please enter a valid email address'
                )
              ),
              _react2.default.createElement(
                'div',
                { className: formClass + '-submit' },
                _react2.default.createElement(_dgxSvgIcons.CheckSoloIcon, { ariaHidden: true }),
                _react2.default.createElement('input', {
                  'aria-label': 'Sign up',
                  type: 'submit',
                  name: 'submit',
                  value: 'SIGN UP',
                  style: styles.submitButton
                })
              )
            )
          )
        );

        if (status === 'success') {
          _utils2.default.trackHeader('Subscribe', 'Success');
          subscribeContent = _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(_SubscribeMessageBox2.default, {
              status: status,
              msg: 'Thank you for subscribing to our email updates.'
            }),
            _react2.default.createElement(
              'div',
              { className: this.props.className + '-newEmail' },
              _react2.default.createElement(
                'button',
                { onClick: this.initForm, style: styles.resubmitButton },
                'Enter another email address'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: this.props.className + '-followUs' },
              _react2.default.createElement(
                'p',
                null,
                'Follow us:'
              ),
              _react2.default.createElement(_SocialMediaLinksWidget2.default, {
                className: this.props.className + '-socialMediaLinksWidget',
                links: _appConfig2.default.socialMediaLinks,
                displayOnlyList: ['facebook', 'twitter']
              })
            )
          );
        }

        if (status === 'exists') {
          _utils2.default.trackHeader('Subscribe', 'Error -- already subscribed');
          subscribeContent = _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(_SubscribeMessageBox2.default, {
              status: status,
              msg: 'Looks like you\'re already signed up!'
            }),
            _react2.default.createElement(
              'div',
              { className: this.props.className + '-newEmail' },
              _react2.default.createElement(
                'button',
                { style: styles.resubmitButton, onClick: this.initForm },
                'Enter a different email address'
              )
            )
          );
        }

        if (status === 'error' || status === 'Internal Server Error') {
          _utils2.default.trackHeader('Subscribe', 'Error');
          subscribeContent = _react2.default.createElement(
            'div',
            { className: this.props.className + '-misc-error' },
            _react2.default.createElement(
              'div',
              null,
              'Hmm...'
            ),
            _react2.default.createElement(
              'div',
              null,
              'Something isn\'t quite right.'
            ),
            _react2.default.createElement(
              'div',
              null,
              'Please try again.'
            ),
            _react2.default.createElement(
              'a',
              { href: '', onClick: this.initForm, style: styles.tryAgainButton },
              _react2.default.createElement(_dgxSvgIcons.LeftArrowIcon, { ariaHidden: true }),
              'TRY AGAIN'
            )
          );
        }

        // Always show the privacy link except in the loading phase.
        return _react2.default.createElement(
          'div',
          { className: this.props.className },
          subscribeContent,
          _react2.default.createElement(
            'a',
            {
              href: this.props.subCenterUrl,
              className: this.props.className + '-sc-link',
              style: styles.scLink,
              onClick: function onClick() {
                return _utils2.default.trackHeader('Subscribe', 'Subscription Center');
              }
            },
            'Subscription Center'
          ),
          _react2.default.createElement(
            'a',
            {
              href: this.props.policyUrl,
              className: this.props.className + '-pp-link',
              style: styles.privacyLink
            },
            'Privacy Policy'
          )
        );
      }
      return _react2.default.createElement(
        'div',
        { className: this.props.className },
        _react2.default.createElement(_DotsLoader2.default, null)
      );
    }
  }]);

  return EmailSubscription;
}(_react2.default.Component);

EmailSubscription.propTypes = {
  id: _propTypes2.default.string,
  className: _propTypes2.default.string,
  lang: _propTypes2.default.string,
  target: _propTypes2.default.string,
  form_name: _propTypes2.default.string,
  listId: _propTypes2.default.string,
  form_method: _propTypes2.default.string,
  placeholder: _propTypes2.default.string,
  policyUrl: _propTypes2.default.string,
  subCenterUrl: _propTypes2.default.string,
  style: _propTypes2.default.object
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
  subCenterUrl: 'http://pages.email.nypl.org/page.aspx?QS=3935619f7de112ef7250fe02b84fb2f9ab74e4ea015814b7'
};

exports.default = EmailSubscription;
module.exports = exports['default'];