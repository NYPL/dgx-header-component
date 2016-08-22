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
    backgroundColor: '#E43534',
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
  catalogInfoLink: {
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
  var lang = _ref.lang;
  var className = _ref.className;
  var catalogLink = _ref.catalogLink;
  var researchLink = _ref.researchLink;
  var infoLink = _ref.infoLink;

  var catalogLinkClass = 'CatalogLink';
  var researchLinkClass = 'ResearchLink';

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
          return _utils2.default._trackHeader('Mobile Log In', 'Catalog');
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
          'Log into the Catalog'
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
          return _utils2.default._trackHeader('Mobile Log In', 'Research');
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
          'Log into the Research Catalog'
        )
      )
    ),
    _react2.default.createElement(
      'a',
      {
        className: 'Mobile-Catalog-Info',
        href: infoLink,
        lang: lang,
        onClick: function onClick() {
          return _utils2.default._trackHeader('Mobile Log In', 'Catalog Info');
        },
        style: styles.catalogInfoLink
      },
      'Catalog Info'
    )
  );
};

MobileMyNypl.propTypes = {
  lang: _react2.default.PropTypes.string,
  className: _react2.default.PropTypes.string,
  catalogLink: _react2.default.PropTypes.string,
  researchLink: _react2.default.PropTypes.string,
  infoLink: _react2.default.PropTypes.string
};

MobileMyNypl.defaultProps = {
  lang: 'en',
  className: 'MobileMyNypl',
  catalogLink: _appConfig2.default.myNyplLinks.catalog,
  researchLink: _appConfig2.default.myNyplLinks.research,
  infoLink: _appConfig2.default.myNyplLinks.moreInfo
};

exports.default = MobileMyNypl;
module.exports = exports['default'];