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

var _utils = require('../../utils/utils.js');

var _utils2 = _interopRequireDefault(_utils);

var _appConfig = require('../../appConfig.js');

var _appConfig2 = _interopRequireDefault(_appConfig);

var _dgxSvgIcons = require('@nypl/dgx-svg-icons');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// Config and Utility Library


var styles = {
  logOutLink: {
    backgroundColor: '#FFF',
    border: '3px solid #FFF',
    borderRadius: '33px',
    bottom: '30px',
    color: '#1B7FA7',
    fontSize: '14px',
    fontWeight: '200',
    letterSpacing: '.03em',
    padding: '3px 20px',
    position: 'absolute',
    left: '30px'
  },
  loginButtons: {
    backgroundColor: '#1B7FA7',
    border: '2px solid #FFF',
    color: '#FFF',
    display: 'inline-block',
    fontFamily: 'system-ui, "Segoe UI", Tahoma',
    fontWeight: 400,
    fontSize: '14px',
    letterSpacing: '.03em',
    marginTop: '20px',
    padding: '9px 17px 7px'
  }
};

var MyNypl = function (_React$Component) {
  _inherits(MyNypl, _React$Component);

  function MyNypl() {
    _classCallCheck(this, MyNypl);

    return _possibleConstructorReturn(this, (MyNypl.__proto__ || Object.getPrototypeOf(MyNypl)).apply(this, arguments));
  }

  _createClass(MyNypl, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.refs.patronGreetingWrapper) {
        _reactDom2.default.findDOMNode(this.refs.patronGreetingWrapper).focus();
      } else {
        this.refs.catalogLink.focus();
      }
    }

    /**
     * renderLoginLinks()
     * Returns the href addresses for catalog and research catalog buttons
     * based on different conditions.
     */

  }, {
    key: 'renderLoginLinks',
    value: function renderLoginLinks() {
      if (this.props.isLoggedIn) {
        return {
          catalogLink: this.props.catalogLink,
          researchLink: this.props.researchLink
        };
      }

      return {
        catalogLink: this.props.loginCatalogLink,
        researchLink: this.props.loginResearchLink
      };
    }

    /**
     * renderGreeting()
     * Returns the patron's name in the drop down menu if it exists.
     */

  }, {
    key: 'renderGreeting',
    value: function renderGreeting() {
      if (!this.props.patronName || !this.props.isLoggedIn) {
        return null;
      }

      return _react2.default.createElement(
        'div',
        { tabIndex: '0', className: 'patron-greeting-wrapper', ref: 'patronGreetingWrapper' },
        _react2.default.createElement(
          'p',
          { className: this.props.className + '-patron-greeting login-indication' },
          'You are logged in as:'
        ),
        _react2.default.createElement(
          'p',
          { className: this.props.className + '-patron-greeting login-name' },
          this.props.patronName
        )
      );
    }

    /**
     * renderLogOutLink()
     * Returns the log out button if the patron has been logged in.
     */

  }, {
    key: 'renderLogOutLink',
    value: function renderLogOutLink() {
      return this.props.isLoggedIn ? _react2.default.createElement(
        'a',
        {
          href: this.props.logOutLink,
          className: this.props.className + '-catalog-link',
          onClick: function onClick() {
            return _utils2.default.trackHeader('My Account', 'Log Out');
          },
          style: styles.logOutLink
        },
        _react2.default.createElement(_dgxSvgIcons.LogoutIcon, { className: 'logoutIcon', ariaHidden: true, focusable: false }),
        'LOG OUT'
      ) : null;
    }
  }, {
    key: 'render',
    value: function render() {
      var catalogLinkLabel = this.props.isLoggedIn ? 'GO TO THE CATALOG' : 'LOG INTO THE CATALOG';
      var researchCatalogLinkLabel = this.props.isLoggedIn ? 'GO TO THE RESEARCH CATALOG' : 'LOG INTO THE RESEARCH CATALOG';
      var catalogLink = this.renderLoginLinks().catalogLink;
      var researchLink = this.renderLoginLinks().researchLink;
      var gaAction = this.props.isLoggedIn ? 'Go To' : 'Log In';

      return _react2.default.createElement(
        'div',
        { className: this.props.className, role: 'dialog' },
        this.renderGreeting(),
        _react2.default.createElement(
          'ul',
          { className: this.props.className + '-login-list' },
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              'a',
              {
                ref: 'catalogLink',
                href: catalogLink,
                style: styles.loginButtons,
                className: this.props.className + '-catalog-btn',
                onClick: function onClick() {
                  return _utils2.default.trackHeader(gaAction, 'Catalog');
                }
              },
              _react2.default.createElement(_dgxSvgIcons.LoginIcon, { fill: '#fff', ariaHidden: true, focusable: false }),
              catalogLinkLabel
            )
          ),
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              'a',
              {
                href: researchLink,
                style: styles.loginButtons,
                className: this.props.className + '-research-btn',
                onClick: function onClick() {
                  return _utils2.default.trackHeader(gaAction, 'Research');
                }
              },
              _react2.default.createElement(_dgxSvgIcons.BuildingIcon, { ariaHidden: true, focusable: false }),
              researchCatalogLinkLabel
            )
          )
        ),
        this.renderLogOutLink()
      );
    }
  }]);

  return MyNypl;
}(_react2.default.Component);

MyNypl.propTypes = {
  id: _propTypes2.default.string,
  className: _propTypes2.default.string,
  lang: _propTypes2.default.string,
  catalogLink: _propTypes2.default.string,
  researchLink: _propTypes2.default.string,
  loginCatalogLink: _propTypes2.default.string,
  loginResearchLink: _propTypes2.default.string,
  logOutLink: _propTypes2.default.string,
  isLoggedIn: _propTypes2.default.bool,
  patronName: _propTypes2.default.string
};

MyNypl.defaultProps = {
  className: 'myNypl',
  lang: 'en',
  loginCatalogLink: _appConfig2.default.loginMyNyplLinks.catalog,
  loginResearchLink: _appConfig2.default.loginMyNyplLinks.research,
  catalogLink: _appConfig2.default.myNyplLinks.catalog,
  researchLink: _appConfig2.default.myNyplLinks.research,
  logOutLink: _appConfig2.default.loginMyNyplLinks.logOutLink,
  isLoggedIn: false,
  patronName: ''
};

exports.default = MyNypl;
module.exports = exports['default'];