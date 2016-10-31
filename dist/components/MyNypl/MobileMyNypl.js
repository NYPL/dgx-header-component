'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _underscore = require('underscore');

var _utils = require('../../utils/utils.js');

var _utils2 = _interopRequireDefault(_utils);

var _appConfig = require('../../appConfig.js');

var _appConfig2 = _interopRequireDefault(_appConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  logoutLink: {
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

var MobileMyNypl = function MobileMyNypl(_ref) {
  var lang = _ref.lang,
      className = _ref.className,
      catalogLink = _ref.catalogLink,
      researchLink = _ref.researchLink,
      logoutLink = _ref.logoutLink,
      isLogin = _ref.isLogin;

  var catalogLinkClass = 'CatalogLink';
  var researchLinkClass = 'ResearchLink';
  var catalogLinkLabel = isLogin ? 'GO TO THE CATALOG' : 'LOG INTO THE CATALOG';
  var researchCatalogLinkLabel = isLogin ? 'GO TO THE RESEARCH CATALOG' : 'LOG INTO THE RESEARCH CATALOG';

  return _react2.default.createElement(
    'div',
    {
      className: className,
      style: styles.base,
      role: 'dialog'
    },
    _react2.default.createElement(
      'a',
      {
        href: catalogLink,
        className: catalogLinkClass,
        style: styles.links,
        onClick: function onClick() {
          return _utils2.default.trackHeader('Mobile Log In', 'Catalog');
        }
      },
      _react2.default.createElement(
        'span',
        {
          className: catalogLinkClass + '-Wrapper',
          style: (0, _underscore.extend)(styles.wrapper, styles.catalogLinkWrapper)
        },
        _react2.default.createElement('span', { className: catalogLinkClass + '-Icon nypl-icon-login', style: styles.icon }),
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
        style: styles.links,
        onClick: function onClick() {
          return _utils2.default.trackHeader('Mobile Log In', 'Research');
        }
      },
      _react2.default.createElement(
        'span',
        {
          className: researchLinkClass + '-Wrapper',
          style: (0, _underscore.extend)(styles.wrapper, styles.researchLinkWrapper)
        },
        _react2.default.createElement('span', { className: researchLinkClass + '-Icon nypl-icon-bldg', style: styles.icon }),
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
    _react2.default.createElement(
      'a',
      {
        className: 'Mobile-Catalog-Info',
        href: logoutLink,
        lang: lang,
        onClick: function onClick() {
          return _utils2.default.trackHeader('Mobile Log In', 'Log Out');
        },
        style: styles.logoutLink
      },
      'Log Out'
    )
  );
};

MobileMyNypl.propTypes = {
  lang: _react2.default.PropTypes.string,
  className: _react2.default.PropTypes.string,
  catalogLink: _react2.default.PropTypes.string,
  researchLink: _react2.default.PropTypes.string,
  logoutLink: _react2.default.PropTypes.string,
  isLogin: _react2.default.PropTypes.bool
};

MobileMyNypl.defaultProps = {
  lang: 'en',
  className: 'MobileMyNypl',
  catalogLink: _appConfig2.default.myNyplLinks.catalog,
  researchLink: _appConfig2.default.myNyplLinks.research,
  logoutLink: _appConfig2.default.myNyplLinks.logoutLink
};

exports.default = MobileMyNypl;
module.exports = exports['default'];