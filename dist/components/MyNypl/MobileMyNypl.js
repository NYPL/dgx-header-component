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

var _dgxSvgIcons = require('dgx-svg-icons');

var _utils = require('../../utils/utils.js');

var _utils2 = _interopRequireDefault(_utils);

var _appConfig = require('../../appConfig.js');

var _appConfig2 = _interopRequireDefault(_appConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Config and Utility


var styles = {
  base: {
    backgroundColor: '#2B2B2B',
    margin: 0,
    padding: 0
  },
  links: {
    display: 'block',
    backgroundColor: '#E32B31',
    color: '#FFF',
    padding: 0,
    margin: '60px 0 0 0',
    width: '50%',
    minHeight: '90px',
    float: 'left',
    textAlign: 'center',
    textDecoration: 'none',
    lineHeight: 'normal'
  },
  loggedInLinksMarginTop: {
    margin: '120px 0 0 0'
  },
  label: {
    fontSize: '14px',
    textTransform: 'uppercase',
    display: 'inline-block',
    margin: '0'
  },
  wrapper: {
    width: '100%',
    display: 'block',
    margin: '0',
    padding: '1.75em 0'
  },
  logOutLink: {
    display: 'block',
    color: '#fff',
    textAlign: 'center',
    padding: '35px',
    fontSize: '18px',
    textTransform: 'uppercase',
    textDecoration: 'underline',
    clear: 'both'
  },
  researchLinkWrapper: {
    borderLeft: '1.25px solid #b92b1a',
    padding: '1.2em 0 1.75em'
  },
  researchLinkLabel: {
    width: '125px'
  },
  catalogLinkWrapper: {
    borderRight: '1.25px solid #b92b1a'
  },
  catalogLinkLabel: {
    width: '102px'
  },
  icon: {
    fontSize: '32px',
    display: 'inline-block',
    color: 'rgba(255, 255, 255, 0.6)'
  }
};

var MobileMyNypl = function (_React$Component) {
  _inherits(MobileMyNypl, _React$Component);

  function MobileMyNypl() {
    _classCallCheck(this, MobileMyNypl);

    return _possibleConstructorReturn(this, (MobileMyNypl.__proto__ || Object.getPrototypeOf(MobileMyNypl)).apply(this, arguments));
  }

  _createClass(MobileMyNypl, [{
    key: 'renderLoginLinks',

    /**
     * renderLoginLinks()
     * Returns the href addresses for catalog and research catalog buttons
     * based on different conditions.
     */
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
          className: this.props.className + '-Catalog-Link',
          onClick: function onClick() {
            return _utils2.default.trackHeader('My Account', 'Log Out');
          },
          style: styles.logOutLink
        },
        'LOG OUT'
      ) : _react2.default.createElement('div', { style: styles.logOutLink });
    }

    /**
     * renderGreeting()
     * Returns the patron's name in the drop down menu if it exists.
     */

  }, {
    key: 'renderGreeting',
    value: function renderGreeting() {
      return this.props.patronName && this.props.isLoggedIn ? _react2.default.createElement(
        'div',
        { className: this.props.className + '-Greeting' },
        _react2.default.createElement(
          'p',
          { className: 'Login-Indication' },
          'You are logged in as:'
        ),
        _react2.default.createElement(
          'p',
          { className: 'Login-Name' },
          this.props.patronName
        )
      ) : null;
    }
  }, {
    key: 'render',
    value: function render() {
      var catalogLinkClass = 'CatalogLink';
      var researchLinkClass = 'ResearchLink';
      var catalogLink = this.renderLoginLinks().catalogLink;
      var researchLink = this.renderLoginLinks().researchLink;
      var catalogLinkLabel = this.props.isLoggedIn ? 'GO TO THE CATALOG' : 'LOG INTO THE CATALOG';
      var researchCatalogLinkLabel = this.props.isLoggedIn ? 'GO TO THE RESEARCH CATALOG' : 'LOG INTO THE RESEARCH CATALOG';
      var loggedInMarginTop = this.props.isLoggedIn ? styles.loggedInLinksMarginTop : null;
      var gaAction = this.props.isLoggedIn ? 'Mobile Go To' : 'Mobile Log In';

      return _react2.default.createElement(
        'div',
        {
          className: this.props.className,
          style: styles.base,
          role: 'dialog'
        },
        this.renderGreeting(),
        _react2.default.createElement(
          'a',
          {
            href: catalogLink,
            className: catalogLinkClass,
            style: (0, _underscore.extend)(styles.links, loggedInMarginTop),
            onClick: function onClick() {
              return _utils2.default.trackHeader(gaAction, 'Catalog');
            }
          },
          _react2.default.createElement(
            'span',
            {
              className: catalogLinkClass + '-Wrapper',
              style: (0, _underscore.extend)(styles.wrapper, styles.catalogLinkWrapper)
            },
            _react2.default.createElement(_dgxSvgIcons.LoginIcon, { fill: '#fff', ariaHidden: true }),
            _react2.default.createElement(
              'span',
              {
                className: catalogLinkClass + '-Label',
                style: (0, _underscore.extend)(styles.catalogLinkLabel, styles.label)
              },
              catalogLinkLabel
            )
          )
        ),
        _react2.default.createElement(
          'a',
          {
            href: researchLink,
            className: researchLinkClass,
            style: (0, _underscore.extend)(styles.links, loggedInMarginTop),
            onClick: function onClick() {
              return _utils2.default.trackHeader(gaAction, 'Research');
            }
          },
          _react2.default.createElement(
            'span',
            {
              className: researchLinkClass + '-Wrapper',
              style: (0, _underscore.extend)(styles.wrapper, styles.researchLinkWrapper)
            },
            _react2.default.createElement(_dgxSvgIcons.BuildingIcon, { fill: '#fff', ariaHidden: true }),
            _react2.default.createElement(
              'span',
              {
                className: researchLinkClass + '-Label',
                style: (0, _underscore.extend)(styles.researchLinkLabel, styles.label)
              },
              researchCatalogLinkLabel
            )
          )
        ),
        this.renderLogOutLink()
      );
    }
  }]);

  return MobileMyNypl;
}(_react2.default.Component);

MobileMyNypl.propTypes = {
  lang: _propTypes2.default.string,
  className: _propTypes2.default.string,
  catalogLink: _propTypes2.default.string,
  researchLink: _propTypes2.default.string,
  loginCatalogLink: _propTypes2.default.string,
  loginResearchLink: _propTypes2.default.string,
  isLoggedIn: _propTypes2.default.bool,
  patronName: _propTypes2.default.string,
  logOutLink: _propTypes2.default.string
};

MobileMyNypl.defaultProps = {
  lang: 'en',
  className: 'MobileMyNypl',
  loginCatalogLink: _appConfig2.default.loginMyNyplLinks.catalog,
  loginResearchLink: _appConfig2.default.loginMyNyplLinks.research,
  catalogLink: _appConfig2.default.myNyplLinks.catalog,
  researchLink: _appConfig2.default.myNyplLinks.research,
  logOutLink: _appConfig2.default.loginMyNyplLinks.logOutLink,
  isLoggedIn: false,
  patronName: ''
};

exports.default = MobileMyNypl;
module.exports = exports['default'];