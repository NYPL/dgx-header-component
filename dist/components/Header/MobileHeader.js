'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactTappable = require('react-tappable');

var _reactTappable2 = _interopRequireDefault(_reactTappable);

var _focusTrapReact = require('focus-trap-react');

var _focusTrapReact2 = _interopRequireDefault(_focusTrapReact);

var _dgxSvgIcons = require('dgx-svg-icons');

var _underscore = require('underscore');

var _utils = require('../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _MobileMyNypl = require('../MyNypl/MobileMyNypl');

var _MobileMyNypl2 = _interopRequireDefault(_MobileMyNypl);

var _SearchBox = require('../SearchBox/SearchBox');

var _SearchBox2 = _interopRequireDefault(_SearchBox);

var _NavMenu = require('../NavMenu/NavMenu');

var _NavMenu2 = _interopRequireDefault(_NavMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// NYPL Components


var styles = {
  base: {
    position: 'relative',
    height: '60px',
    padding: 0,
    margin: 0
  },
  list: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
    float: 'right',
    lineHeight: 'normal'
  },
  listItem: {
    display: 'inline-block',
    padding: 0,
    margin: '0 0 0 4px',
    lineHeight: 'normal'
  },
  mobileLogoLink: {
    color: '#000',
    backgroundColor: '#FFF',
    textDecoration: 'none',
    display: 'inline-block',
    height: '50px',
    width: '50px',
    position: 'absolute',
    left: '10px',
    top: '8px',
    margin: 0,
    padding: 0,
    ':hover': {
      color: '#000'
    },
    ':visited': {
      color: '#000'
    }
  },
  locationsLink: {
    margin: 0,
    padding: '11px 13px',
    display: 'inline-block',
    color: '#000',
    backgroundColor: '#FFF'
  },
  myNyplButton: {
    margin: 0,
    padding: '12px 13px',
    display: 'inline-block',
    border: 'none',
    lineHeight: 'normal',
    verticalAlign: '0px'
  },
  activeMyNyplButton: {
    color: '#FFF',
    backgroundColor: '#2B2B2B'
  },
  inactiveMyNyplButton: {
    color: '#000',
    backgroundColor: '#FFF'
  },
  searchButton: {
    margin: 0,
    padding: '12px 13px',
    display: 'inline-block',
    border: 'none',
    lineHeight: 'normal',
    verticalAlign: '0px'
  },
  activeSearchButton: {
    color: '#FFF',
    backgroundColor: '#1B7FA7'
  },
  inactiveSearchButton: {
    color: '#000',
    backgroundColor: '#FFF'
  },
  menuButton: {
    margin: 0,
    padding: '12px 13px',
    display: 'inline-block',
    border: 'none',
    lineHeight: 'normal',
    verticalAlign: '0px'
  },
  activeMenuButton: {
    color: '#FFF',
    backgroundColor: '#2B2B2B'
  },
  inactiveMenuButton: {
    color: '#000',
    backgroundColor: '#FFF'
  }
};

var MobileHeader = function (_React$Component) {
  _inherits(MobileHeader, _React$Component);

  function MobileHeader(props) {
    _classCallCheck(this, MobileHeader);

    var _this = _possibleConstructorReturn(this, (MobileHeader.__proto__ || Object.getPrototypeOf(MobileHeader)).call(this, props));

    _this.state = {
      activeButton: ''
    };

    _this.closeDropDown = _this.closeDropDown.bind(_this);
    return _this;
  }

  /**
   * toggleMobileMenuButton(activeButton)
   * This function either activates or deactivates the state of the button that was clicked on,
   * to track the active state SCSS styles.
   *
   * @param {String} activeButton
   */


  _createClass(MobileHeader, [{
    key: 'toggleMobileMenuButton',
    value: function toggleMobileMenuButton(activeButton) {
      if (activeButton === 'clickSearch') {
        var searchActive = this.state.activeButton === 'search' ? '' : 'search';
        this.setState({ activeButton: searchActive });
      } else if (activeButton === 'mobileMenu') {
        var navMenuActive = this.state.activeButton === 'navMenu' ? '' : 'navMenu';
        this.setState({ activeButton: navMenuActive });
      } else if (activeButton === 'clickLogIn' || activeButton === 'clickMyAccount') {
        var menuActive = this.state.activeButton === 'myNypl' ? '' : 'myNypl';
        this.setState({ activeButton: menuActive });
      }

      _utils2.default.trackHeader('Click', 'Mobile ' + activeButton);
    }

    /**
     * closeDropDown()
     * This is necessary for the FocusTrap component to execute
     * the proper deactivateMethod for each dialog.
     */

  }, {
    key: 'closeDropDown',
    value: function closeDropDown() {
      this.setState({ activeButton: '' });
    }

    /**
    * renderLogoLink()
    * Generates the DOM for the NYPL Logo Link.
    * Uses SVG LionLogo icon & visuallyHidden label.
    * @returns {Object} React DOM.
    */

  }, {
    key: 'renderLogoLink',
    value: function renderLogoLink() {
      return _react2.default.createElement(
        'a',
        {
          style: styles.mobileLogoLink,
          href: this.props.nyplRootUrl,
          'aria-label': this.props.alt
        },
        _react2.default.createElement(
          'span',
          { className: 'visuallyHidden' },
          this.props.alt
        ),
        _react2.default.createElement(_dgxSvgIcons.LionLogoIcon, { ariaHidden: true, className: this.props.className + '-logo' })
      );
    }

    /**
    * renderMyNyplButton()
    * Generates the DOM for the MyNyplLogin button/dialog.
    * Uses SVG icon & visuallyHidden label.
    * @returns {Object} React DOM.
    */

  }, {
    key: 'renderMyNyplButton',
    value: function renderMyNyplButton() {
      var _this2 = this;

      var myNyplClass = '';
      var gaAction = this.props.patronName ? 'MyAccount' : 'LogIn';
      var icon = _react2.default.createElement(_dgxSvgIcons.LoginIcon, { className: 'loginIcon', ariaHidden: true });
      if (this.props.patronName) {
        icon = _react2.default.createElement(_dgxSvgIcons.LoginIconSolid, { className: 'loginIcon-loggedIn animated fadeIn', ariaHidden: true });
      }
      var buttonStyles = styles.inactiveMyNyplButton;
      var buttonLabel = this.props.patronName ? 'My Account' : 'Login';
      var active = this.state.activeButton === 'myNypl';

      if (active) {
        myNyplClass = 'active';
        icon = _react2.default.createElement(_dgxSvgIcons.XIcon, _defineProperty({ ariaHidden: true, fill: '#FFF' }, 'ariaHidden', true));
        buttonStyles = styles.activeMyNyplButton;
        buttonLabel = 'Close';
      }

      return _react2.default.createElement(
        'li',
        { style: styles.listItem },
        _react2.default.createElement(
          _focusTrapReact2.default,
          {
            className: 'mobileMyNypl-wrapper',
            focusTrapOptions: {
              onDeactivate: this.closeDropDown,
              clickOutsideDeactivates: true
            },
            active: active
          },
          _react2.default.createElement(
            _reactTappable2.default,
            {
              className: this.props.className + '-myNyplButton',
              component: 'button',
              style: (0, _underscore.extend)(styles.myNyplButton, buttonStyles),
              onTap: function onTap() {
                return _this2.toggleMobileMenuButton('click' + gaAction);
              },
              'aria-haspopup': 'true',
              'aria-expanded': active ? true : null
            },
            _react2.default.createElement(
              'span',
              { className: 'visuallyHidden' },
              buttonLabel
            ),
            icon
          ),
          active && _react2.default.createElement(_MobileMyNypl2.default, {
            className: myNyplClass + ' mobileMyNypl',
            isLoggedIn: this.props.isLoggedIn,
            patronName: this.props.patronName,
            logOutLink: this.props.logOutLink
          })
        )
      );
    }

    /**
    * renderLocationsLink()
    * Generates the DOM for the Locations link.
    * Uses SVG icon & visuallyHidden label.
    * @returns {Object} React DOM.
    */

  }, {
    key: 'renderLocationsLink',
    value: function renderLocationsLink() {
      var locatorUrl = this.props.locatorUrl || '//www.nypl.org/locations/map?nearme=true';

      return _react2.default.createElement(
        'li',
        { style: styles.listItem },
        _react2.default.createElement(
          'a',
          {
            style: styles.locationsLink,
            href: locatorUrl,
            onClick: function onClick() {
              return _utils2.default.trackHeader('Click', 'Mobile Locations Button');
            },
            className: this.props.className + '-locator',
            'aria-label': 'NYPL Locations Near Me'
          },
          _react2.default.createElement(
            'span',
            { className: 'visuallyHidden' },
            'NYPL Locations Near Me'
          ),
          _react2.default.createElement(_dgxSvgIcons.LocatorIcon, { ariaHidden: true, fill: '#000' })
        )
      );
    }

    /**
    * renderSearchButton()
    * Generates the DOM for the Search button/dialog.
    * Uses SVG icon & visuallyHidden label.
    * @returns {Object} React DOM.
    */

  }, {
    key: 'renderSearchButton',
    value: function renderSearchButton() {
      var _this3 = this;

      var mobileSearchClass = '';
      var icon = _react2.default.createElement(_dgxSvgIcons.SearchIcon, { ariaHidden: true, fill: '#000' });
      var buttonStyles = styles.inactiveSearchButton;
      var buttonLabel = 'Open Search';
      var active = this.state.activeButton === 'search';

      if (active) {
        mobileSearchClass = ' active';
        icon = _react2.default.createElement(_dgxSvgIcons.XIcon, { ariaHidden: true, fill: '#FFF' });
        buttonStyles = styles.activeSearchButton;
        buttonLabel = 'Close Search';
      }

      return _react2.default.createElement(
        'li',
        { style: styles.listItem },
        _react2.default.createElement(
          _focusTrapReact2.default,
          {
            className: this.props.className + '-searchDialog',
            focusTrapOptions: {
              onDeactivate: this.closeDropDown,
              initialFocus: '.' + this.props.className + '-searchForm-legend',
              clickOutsideDeactivates: true
            },
            active: active
          },
          _react2.default.createElement(
            _reactTappable2.default,
            {
              className: this.props.className + '-searchButton' + mobileSearchClass,
              component: 'button',
              style: (0, _underscore.extend)(styles.searchButton, buttonStyles),
              onTap: function onTap() {
                return _this3.toggleMobileMenuButton('clickSearch');
              },
              'aria-haspopup': 'true',
              'aria-expanded': active ? true : null
            },
            _react2.default.createElement(
              'span',
              { className: 'visuallyHidden' },
              buttonLabel
            ),
            icon
          ),
          active && _react2.default.createElement(_SearchBox2.default, {
            className: this.props.className + '-searchForm',
            type: 'mobile'
          })
        )
      );
    }

    /**
    * renderMenuButton()
    * Generates the DOM for the Menu button
    * Uses SVG icon & visuallyHidden label.
    * @returns {Object} React DOM.
    */

  }, {
    key: 'renderMenuButton',
    value: function renderMenuButton() {
      var _this4 = this;

      var mobileMenuClass = '';
      var icon = _react2.default.createElement(_dgxSvgIcons.MenuIcon, { ariaHidden: true, fill: '#000' });
      var buttonStyles = styles.inactiveMenuButton;
      var buttonLabel = 'Open Menu Dialog';
      var dialogWindow = null;
      var active = this.state.activeButton === 'navMenu';

      if (active) {
        mobileMenuClass = ' active';
        icon = _react2.default.createElement(_dgxSvgIcons.XIcon, { ariaHidden: true, fill: '#FFF' });
        buttonStyles = styles.activeMenuButton;
        buttonLabel = 'Close Menu Dialog';
        dialogWindow = _react2.default.createElement(_NavMenu2.default, {
          className: this.props.className + '-navMenu',
          lang: this.props.lang,
          items: this.props.navData,
          urlType: this.props.urlType,
          isLoggedIn: this.props.isLoggedIn,
          patronName: this.state.patronName,
          logOutLink: this.state.logOutUrl,
          mobileActive: active
        });
      }

      return _react2.default.createElement(
        'li',
        { style: styles.listItem },
        _react2.default.createElement(
          _focusTrapReact2.default,
          {
            focusTrapOptions: {
              initialFocus: 'ul.header-mobile-navMenu-list li:first-of-type a',
              onDeactivate: this.closeDropDown,
              clickOutsideDeactivates: true
            },
            active: active
          },
          _react2.default.createElement(
            _reactTappable2.default,
            {
              className: this.props.className + '-menuButton' + mobileMenuClass,
              component: 'button',
              style: (0, _underscore.extend)(styles.menuButton, buttonStyles),
              onTap: function onTap() {
                return _this4.toggleMobileMenuButton('mobileMenu');
              },
              'aria-haspopup': 'true',
              'aria-expanded': active ? true : null
            },
            _react2.default.createElement(
              'span',
              { className: 'visuallyHidden' },
              buttonLabel
            ),
            icon
          ),
          _react2.default.createElement(
            'div',
            { className: 'header-mobile-wrapper' + mobileMenuClass },
            dialogWindow
          )
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: this.props.className, style: styles.base },
        this.renderLogoLink(),
        _react2.default.createElement(
          'ul',
          { style: styles.list },
          this.renderMyNyplButton(),
          this.renderLocationsLink(),
          this.renderSearchButton(),
          this.renderMenuButton()
        )
      );
    }
  }]);

  return MobileHeader;
}(_react2.default.Component);

MobileHeader.propTypes = {
  lang: _propTypes2.default.string,
  className: _propTypes2.default.string,
  locatorUrl: _propTypes2.default.string.isRequired,
  nyplRootUrl: _propTypes2.default.string,
  alt: _propTypes2.default.string,
  isLoggedIn: _propTypes2.default.bool,
  patronName: _propTypes2.default.string,
  logOutLink: _propTypes2.default.string.isRequired,
  navData: _propTypes2.default.arrayOf(_propTypes2.default.object).isRequired,
  urlType: _propTypes2.default.string.isRequired
};

MobileHeader.defaultProps = {
  lang: 'en',
  isLoggedIn: false,
  patronName: null,
  className: 'mobileHeader',
  nyplRootUrl: '/',
  alt: 'The New York Public Library'
};

exports.default = MobileHeader;
module.exports = exports['default'];