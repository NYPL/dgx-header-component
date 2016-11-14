'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('../../utils/utils.js');

var _utils2 = _interopRequireDefault(_utils);

var _appConfig = require('../../appConfig.js');

var _appConfig2 = _interopRequireDefault(_appConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// Config and Utility Library


var styles = {
  logoutLink: {
    backgroundColor: '#FFF',
    border: '10px solid #FFF',
    borderRadius: '20px',
    bottom: '15px',
    color: '#1B7FA7',
    fontSize: '14px',
    fontWeight: '200',
    letterSpacing: '.03em',
    padding: '3px 20px',
    position: 'absolute',
    right: '30px'
  },
  loginButtons: {
    backgroundColor: '#1B7FA7',
    border: '2px solid #FFF',
    color: '#FFF',
    display: 'inline-block',
    fontFamily: 'Kievit-Book',
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
      this.refs.catalogLink.focus();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.refs.catalogLink.blur();
    }
  }, {
    key: 'renderLogoutLink',
    value: function renderLogoutLink() {
      return this.props.isLoggedIn ? _react2.default.createElement(
        'a',
        {
          href: this.props.logoutLink,
          className: this.props.className + '-Catalog-Link',
          onClick: function onClick() {
            return _utils2.default.trackHeader('My NYPL', 'Log Out');
          },
          style: styles.logoutLink
        },
        'Log Out'
      ) : null;
    }
  }, {
    key: 'render',
    value: function render() {
      var catalogLinkLabel = this.props.isLoggedIn ? 'GO TO THE CATALOG' : 'LOG INTO THE CATALOG';
      var researchCatalogLinkLabel = this.props.isLoggedIn ? 'GO TO THE RESEARCH CATALOG' : 'LOG INTO THE RESEARCH CATALOG';
      var catalogLink = !this.props.isOauthLoginActivated || this.props.isLoggedIn ? this.props.catalogLink : this.props.loginCatalogLink;
      var researchLink = !this.props.isOauthLoginActivated || this.props.isLoggedIn ? this.props.researchLink : this.props.loginResearchLink;

      return _react2.default.createElement(
        'div',
        { className: this.props.className, role: 'dialog' },
        _react2.default.createElement(
          'p',
          { className: this.props.className + '-Patron-Name' },
          'HELLO, ',
          this.props.patronName
        ),
        _react2.default.createElement(
          'ul',
          { className: this.props.className + '-Login-List' },
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              'a',
              {
                ref: 'catalogLink',
                href: catalogLink,
                style: styles.loginButtons,
                className: this.props.className + '-Catalog-Btn',
                onClick: function onClick() {
                  return _utils2.default.trackHeader('Log In', 'Catalog');
                }
              },
              _react2.default.createElement('span', { className: 'nypl-icon-login icon' }),
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
                className: this.props.className + '-Research-Btn',
                onClick: function onClick() {
                  return _utils2.default.trackHeader('Log In', 'Research');
                }
              },
              _react2.default.createElement('span', { className: 'nypl-icon-bldg icon' }),
              researchCatalogLinkLabel
            )
          )
        ),
        this.renderLogoutLink()
      );
    }
  }]);

  return MyNypl;
}(_react2.default.Component);

MyNypl.propTypes = {
  id: _react2.default.PropTypes.string,
  className: _react2.default.PropTypes.string,
  lang: _react2.default.PropTypes.string,
  catalogLink: _react2.default.PropTypes.string,
  researchLink: _react2.default.PropTypes.string,
  loginCatalogLink: _react2.default.PropTypes.string,
  loginResearchLink: _react2.default.PropTypes.string,
  logoutLink: _react2.default.PropTypes.string,
  isLoggedIn: _react2.default.PropTypes.bool,
  isOauthLoginActivated: _react2.default.PropTypes.bool,
  patronName: _react2.default.PropTypes.string
};

MyNypl.defaultProps = {
  className: 'MyNypl',
  lang: 'en',
  loginCatalogLink: _appConfig2.default.loginMyNyplLinks.catalog,
  loginResearchLink: _appConfig2.default.loginMyNyplLinks.research,
  catalogLink: _appConfig2.default.myNyplLinks.catalog,
  researchLink: _appConfig2.default.myNyplLinks.research,
  logoutLink: _appConfig2.default.loginMyNyplLinks.logoutLink
};

exports.default = MyNypl;
module.exports = exports['default'];