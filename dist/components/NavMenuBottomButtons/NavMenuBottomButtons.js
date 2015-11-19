'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _utilsGaUtilsJs = require('../../utils/gaUtils.js');

var _utilsGaUtilsJs2 = _interopRequireDefault(_utilsGaUtilsJs);

// Dependent NYPL React Component

var _DonateButtonDonateButtonJs = require('../DonateButton/DonateButton.js');

var _DonateButtonDonateButtonJs2 = _interopRequireDefault(_DonateButtonDonateButtonJs);

var NavMenuBottomButtons = (function (_React$Component) {
  function NavMenuBottomButtons(props) {
    _classCallCheck(this, NavMenuBottomButtons);

    _get(Object.getPrototypeOf(NavMenuBottomButtons.prototype), 'constructor', this).call(this, props);
  }

  _inherits(NavMenuBottomButtons, _React$Component);

  _createClass(NavMenuBottomButtons, [{
    key: 'render',
    value: function render() {
      var libraryCardClass = 'LibraryCardLink',
          subscribeLinkClass = 'SubscribeLink';

      return _react2['default'].createElement(
        'div',
        { className: this.props.className, style: styles.base },
        _react2['default'].createElement(
          'a',
          { href: this.props.libraryCardLink, className: libraryCardClass,
            style: styles.links, onClick: _utilsGaUtilsJs2['default']._trackEvent.bind(this, 'Click', 'Mobile Bottom Buttons - Library Card') },
          _react2['default'].createElement(
            'span',
            { className: '' + libraryCardClass + '-Wrapper', style: [styles.wrapper, styles.libraryCardLinkWrapper] },
            _react2['default'].createElement('span', { className: '' + libraryCardClass + '-Icon nypl-icon-card', style: styles.icon }),
            _react2['default'].createElement(
              'span',
              { className: '' + libraryCardClass + '-Label', style: [styles.label, styles.libraryCardLinkLabel] },
              'Get a Library Card'
            )
          )
        ),
        _react2['default'].createElement(
          'a',
          { href: this.props.subscribeLink, className: subscribeLinkClass,
            style: styles.links, onClick: _utilsGaUtilsJs2['default']._trackEvent.bind(this, 'Click', 'Mobile Bottom Buttons - Email Updates') },
          _react2['default'].createElement(
            'span',
            { className: '' + subscribeLinkClass + '-Wrapper', style: [styles.wrapper, styles.subscribeLinkWrapper] },
            _react2['default'].createElement('span', { className: '' + subscribeLinkClass + '-Icon nypl-icon-mail', style: styles.icon }),
            _react2['default'].createElement(
              'span',
              { className: '' + subscribeLinkClass + '-Label', style: [styles.label, styles.subscribeLinkLabel] },
              'Get Email Updates'
            )
          )
        ),
        _react2['default'].createElement(_DonateButtonDonateButtonJs2['default'], { className: 'DonateLink', style: styles.donateLink, gaLabel: 'Mobile Buttons Donate' })
      );
    }
  }]);

  return NavMenuBottomButtons;
})(_react2['default'].Component);

NavMenuBottomButtons.defaultProps = {
  lang: 'en',
  className: 'NavMenuBottomButtons',
  libraryCardLink: '//catalog.nypl.org/screens/selfregpick.html',
  subscribeLink: '//pages.email.nypl.org/page.aspx?QS=3935619f7de112ef7250fe02b84fb2f9ab74e4ea015814b7'
};

var styles = {
  base: {
    borderTop: '2px solid #363636',
    backgroundColor: '#2B2B2B',
    margin: 0,
    padding: 0
  },
  links: {
    display: 'inline-table',
    color: '#FFF',
    padding: 0,
    margin: 0,
    width: '50%',
    textAlign: 'center',
    textDecoration: 'none'
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
    color: '#959595'
  },
  donateLink: {
    padding: '1.75em 0',
    display: 'block',
    width: '100%',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: '16px'
  }
};

exports['default'] = (0, _radium2['default'])(NavMenuBottomButtons);
module.exports = exports['default'];