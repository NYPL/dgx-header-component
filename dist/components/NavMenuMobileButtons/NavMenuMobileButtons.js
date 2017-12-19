'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _underscore = require('underscore');

var _utils = require('../../utils/utils.js');

var _utils2 = _interopRequireDefault(_utils);

var _DonateButton = require('../DonateButton/DonateButton.js');

var _DonateButton2 = _interopRequireDefault(_DonateButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  base: {
    borderTop: '2px solid #363636',
    color: '#FFF',
    backgroundColor: '#2B2B2B',
    margin: 0,
    padding: 0
  },
  links: {
    display: 'inline-table',
    color: '#FFF',
    backgroundColor: '#2B2B2B',
    padding: 0,
    margin: 0,
    width: '50%',
    textAlign: 'center',
    textDecoration: 'none',
    lineHeight: 'normal'
  },
  label: {
    fontSize: '16px',
    margin: '0 0 0 10px',
    textTransform: 'uppercase',
    display: 'inline-block'
  },
  wrapper: {
    width: '100%',
    display: 'block',
    margin: '0',
    padding: '1.75em 0'
  },
  subscribeLinkWrapper: {
    borderLeft: '1.25px solid #252525'
  },
  subscribeLinkLabel: {
    width: '85px'
  },
  libraryCardLinkWrapper: {
    borderRight: '1.25px solid #252525'
  },
  libraryCardLinkLabel: {
    width: '110px'
  },
  icon: {
    fontSize: '32px',
    display: 'inline-block',
    color: '#959595',
    backgroundColor: '#2B2B2B'
  },
  donateLink: {
    padding: '1.75em 0',
    display: 'block',
    width: '100%',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: '16px',
    lineHeight: 'normal'
  }
};
// Dependent NYPL React Component


var NavMenuMobileButtons = function NavMenuMobileButtons(_ref) {
  var className = _ref.className,
      libraryCardLink = _ref.libraryCardLink,
      subscribeLink = _ref.subscribeLink;

  var libraryCardClass = 'libraryCardLink';
  var subscribeLinkClass = 'subscribeLink';

  return _react2.default.createElement(
    'div',
    { className: className, style: styles.base },
    _react2.default.createElement(
      'a',
      {
        href: libraryCardLink,
        className: libraryCardClass,
        style: styles.links,
        onClick: function onClick() {
          return _utils2.default.trackHeader('Click', 'Mobile Bottom Buttons - Library Card');
        }
      },
      _react2.default.createElement(
        'span',
        {
          className: libraryCardClass + '-wrapper',
          style: (0, _underscore.extend)(styles.wrapper, styles.libraryCardLinkWrapper)
        },
        _react2.default.createElement('span', {
          className: libraryCardClass + '-icon nypl-icon-card',
          style: styles.icon,
          'aria-hidden': 'true'
        }),
        _react2.default.createElement(
          'span',
          {
            className: libraryCardClass + '-label',
            style: (0, _underscore.extend)(styles.libraryCardLinkLabel, styles.label)
          },
          'Get a Library Card'
        )
      )
    ),
    _react2.default.createElement(
      'a',
      {
        href: subscribeLink,
        className: subscribeLinkClass,
        style: styles.links,
        onClick: function onClick() {
          return _utils2.default.trackHeader('Click', 'Mobile Bottom Buttons - Email Updates');
        }
      },
      _react2.default.createElement(
        'span',
        {
          className: subscribeLinkClass + '-wrapper',
          style: (0, _underscore.extend)(styles.wrapper, styles.subscribeLinkWrapper)
        },
        _react2.default.createElement('span', {
          className: subscribeLinkClass + '-icon nypl-icon-mail',
          style: styles.icon,
          'aria-hidden': 'true'
        }),
        _react2.default.createElement(
          'span',
          {
            className: subscribeLinkClass + '-label',
            style: (0, _underscore.extend)(styles.subscribeLinkLabel, styles.label)
          },
          'Get Email Updates'
        )
      )
    ),
    _react2.default.createElement(_DonateButton2.default, {
      id: 'mobileNav-donateButton',
      className: 'donateLink',
      style: styles.donateLink,
      gaLabel: 'Mobile Buttons Donate'
    })
  );
};

NavMenuMobileButtons.propTypes = {
  lang: _propTypes2.default.string,
  className: _propTypes2.default.string,
  libraryCardLink: _propTypes2.default.string,
  subscribeLink: _propTypes2.default.string
};

NavMenuMobileButtons.defaultProps = {
  lang: 'en',
  className: 'navMenuMobileButtons',
  libraryCardLink: '//www.nypl.org/library-card',
  subscribeLink: 'http://pages.email.nypl.org/page.aspx' + '?QS=3935619f7de112ef7250fe02b84fb2f9ab74e4ea015814b7'
};

exports.default = NavMenuMobileButtons;
module.exports = exports['default'];