"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _underscore = require("underscore");

var _dgxSvgIcons = require("@nypl/dgx-svg-icons");

var _utils = _interopRequireDefault(require("../../utils/utils"));

var _DonateButton = _interopRequireDefault(require("../DonateButton/DonateButton"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Dependent NYPL React Component
var styles = {
  base: {
    borderTop: '2px solid #363636',
    color: '#FFF',
    backgroundColor: '#2B2B2B',
    margin: 0,
    padding: 0
  },
  subscribeLinks: {
    display: 'inline-table',
    color: '#FFF',
    backgroundColor: '#2b2b2b',
    padding: 0,
    margin: '0 0 0 3px',
    width: '49%',
    textAlign: 'center',
    textDecoration: 'none',
    lineHeight: 'normal'
  },
  galcLinks: {
    display: 'inline-table',
    color: '#FFF',
    backgroundColor: '#2B2B2B',
    padding: 0,
    margin: '0 0 0 3px',
    width: '49%',
    textAlign: 'center',
    textDecoration: 'none',
    lineHeight: 'normal'
  },
  label: {
    fontSize: '16px',
    margin: '0 3px 0 5px',
    display: 'inline-block'
  },
  wrapper: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    margin: '0',
    padding: '1.75em 0',
    width: '100%'
  },
  subscribeLinkWrapper: {
    borderLeft: '0'
  },
  libraryCardLinkWrapper: {
    borderRight: '1px solid #363636'
  },
  shopLinkWrapper: {
    display: 'flex',
    justifyContent: 'center'
  },
  icon: {
    fontSize: '32px',
    display: 'inline-block',
    color: '#959595',
    backgroundColor: '#2B2B2B'
  },
  donateLink: {
    display: 'block',
    fontSize: '16px',
    lineHeight: 'normal',
    margin: '0 0 0 3px',
    padding: '1.75em 0',
    textAlign: 'center',
    textTransform: 'uppercase',
    width: '98.5%'
  },
  shopLink: {
    backgroundColor: '#2B2B2B',
    borderTop: '2px solid #363636',
    color: '#FFF',
    display: 'inline-table',
    lineHeight: 'normal',
    margin: '0 0 0 3px',
    padding: 0,
    textAlign: 'center',
    textDecoration: 'none'
  }
};

var NavMenuMobileButtons = function NavMenuMobileButtons(_ref) {
  var className = _ref.className,
      libraryCardLink = _ref.libraryCardLink,
      subscribeLink = _ref.subscribeLink,
      shopLink = _ref.shopLink;
  var libraryCardClass = 'libraryCardLink';
  var subscribeLinkClass = 'subscribeLink';
  var shopLinkClass = 'shopLink';
  return /*#__PURE__*/_react.default.createElement("div", {
    className: className,
    style: styles.base
  }, /*#__PURE__*/_react.default.createElement("a", {
    href: libraryCardLink,
    className: libraryCardClass,
    style: styles.galcLinks,
    onClick: function onClick() {
      return _utils.default.trackHeader('Click', 'Mobile Bottom Buttons - Library Card');
    }
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "".concat(libraryCardClass, "-wrapper"),
    style: (0, _underscore.extend)({}, styles.wrapper, styles.libraryCardLinkWrapper)
  }, /*#__PURE__*/_react.default.createElement(_dgxSvgIcons.LibraryCardIcon, {
    iconId: "libraryCardSVG",
    ariaHidden: true,
    focusable: false
  }), /*#__PURE__*/_react.default.createElement("span", {
    className: "".concat(libraryCardClass, "-label"),
    style: (0, _underscore.extend)({}, styles.label)
  }, "Get a Library Card"))), /*#__PURE__*/_react.default.createElement("a", {
    href: subscribeLink,
    className: subscribeLinkClass,
    style: styles.subscribeLinks,
    onClick: function onClick() {
      return _utils.default.trackHeader('Click', 'Mobile Bottom Buttons - Email Updates');
    }
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "".concat(subscribeLinkClass, "-wrapper"),
    style: (0, _underscore.extend)({}, styles.wrapper, styles.subscribeLinkWrapper)
  }, /*#__PURE__*/_react.default.createElement(_dgxSvgIcons.EnvelopeIcon, {
    iconId: "envelopSVG",
    ariaHidden: true,
    focusable: false
  }), /*#__PURE__*/_react.default.createElement("span", {
    className: "".concat(subscribeLinkClass, "-label"),
    style: (0, _underscore.extend)({}, styles.label)
  }, "Get Email Updates"))), /*#__PURE__*/_react.default.createElement("a", {
    href: shopLink,
    className: shopLinkClass,
    style: styles.shopLink,
    onClick: function onClick() {
      return _utils.default.trackHeader('Click', 'Mobile Bottom Buttons - Shop NYPL');
    }
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "".concat(shopLinkClass, "-wrapper"),
    style: (0, _underscore.extend)({}, styles.wrapper, styles.shopLinkWrapper)
  }, /*#__PURE__*/_react.default.createElement(_dgxSvgIcons.ShoppingBagIcon, {
    iconId: "shoppingBagSVG",
    ariaHidden: true,
    focusable: false
  }), /*#__PURE__*/_react.default.createElement("span", {
    className: "".concat(shopLinkClass, "-label"),
    style: (0, _underscore.extend)(styles.shopLinkLabel, styles.label)
  }, "Shop NYPL"))), /*#__PURE__*/_react.default.createElement(_DonateButton.default, {
    id: "mobileNav-donateButton",
    className: "donateLink",
    style: styles.donateLink,
    gaLabel: "Mobile Buttons Donate"
  }));
};

NavMenuMobileButtons.propTypes = {
  lang: _propTypes.default.string,
  className: _propTypes.default.string,
  libraryCardLink: _propTypes.default.string,
  subscribeLink: _propTypes.default.string,
  shopLink: _propTypes.default.string
};
NavMenuMobileButtons.defaultProps = {
  lang: 'en',
  className: 'navMenuMobileButtons',
  libraryCardLink: '//www.nypl.org/library-card',
  subscribeLink: 'http://pages.email.nypl.org/page.aspx' + '?QS=3935619f7de112ef7250fe02b84fb2f9ab74e4ea015814b7',
  shopLink: 'http://shop.nypl.org/?utm_campaign=NYPLMobileHeaderButton&utm_source=nypl.org&utm_medium=referral'
};
var _default = NavMenuMobileButtons;
exports.default = _default;