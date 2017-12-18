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

var _HeaderStore = require('../../stores/HeaderStore');

var _HeaderStore2 = _interopRequireDefault(_HeaderStore);

var _Actions = require('../../actions/Actions');

var _Actions2 = _interopRequireDefault(_Actions);

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
// ALT FLUX

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
  patronInitial: {
    color: '#497629',
    display: 'inline-block',
    fontSize: '1.8em',
    lineHeight: 'normal',
    margin: '0 5px 0 0',
    verticalAlign: '8px'
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
  searchDialog: {
    position: 'absolute',
    margin: 0,
    padding: 0,
    left: 0,
    width: '100%',
    backgroundColor: '#1B7FA7',
    zIndex: '1000'
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
      activeMobileButton: _HeaderStore2.default.getState().activeMobileButton,
      searchButtonAction: _HeaderStore2.default.getState().searchButtonAction,
      mobileMyNyplButton: _HeaderStore2.default.getState().mobileMyNyplButton
    };

    _this.closeMyNyplDialog = _this.closeMyNyplDialog.bind(_this);
    _this.closeSearchDialog = _this.closeSearchDialog.bind(_this);
    return _this;
  }

  _createClass(MobileHeader, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _HeaderStore2.default.listen(this.onChange.bind(this));
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _HeaderStore2.default.unlisten(this.onChange.bind(this));
    }
  }, {
    key: 'onChange',
    value: function onChange() {
      this.setState({
        activeMobileButton: _HeaderStore2.default.getState().activeMobileButton,
        searchButtonAction: _HeaderStore2.default.getState().searchButtonAction,
        mobileMyNyplButton: _HeaderStore2.default.getState().mobileMyNyplButton
      });
    }

    /**
     * toggleMobileMenuButton(activeButton)
     * Verifies that the activeButton does not
     * match the HeaderStore's current value
     * and set's it as the param activeButton.
     * If it matches, it clears the HeaderStore's
     * current value.
     *
     * @param {String} activeButton
     */

  }, {
    key: 'toggleMobileMenuButton',
    value: function toggleMobileMenuButton(activeButton) {
      if (activeButton === 'clickSearch') {
        if (_HeaderStore2.default.getSearchButtonActionValue() !== activeButton) {
          _Actions2.default.searchButtonActionValue(activeButton);
          _Actions2.default.setMobileMenuButtonValue('');
          _Actions2.default.setMobileMyNyplButtonValue('');
        } else {
          _Actions2.default.searchButtonActionValue('');
        }
      } else if (activeButton === 'mobileMenu') {
        if (_HeaderStore2.default.getMobileMenuBtnValue() !== activeButton) {
          _Actions2.default.setMobileMenuButtonValue(activeButton);
          _Actions2.default.searchButtonActionValue('');
          _Actions2.default.setMobileMyNyplButtonValue('');
        } else {
          _Actions2.default.setMobileMenuButtonValue('');
        }
      } else if (activeButton === 'clickLogIn' || activeButton === 'clickMyAccount') {
        if (_HeaderStore2.default.getMobileMyNyplButtonValue() !== activeButton) {
          _Actions2.default.setMobileMyNyplButtonValue(activeButton);
          _Actions2.default.searchButtonActionValue('');
          _Actions2.default.setMobileMenuButtonValue('');
        } else {
          _Actions2.default.setMobileMyNyplButtonValue('');
        }
      }

      _utils2.default.trackHeader('Click', 'Mobile ' + activeButton);
    }

    /**
     * closeMyNyplDialog()
     * Verifies the current state.mobileMyNyplButton matches
     * 'clickMyNypl' and fires the Action method to reset.
     * This is necessary for the FocusTrap component to execute
     * the proper deactivateMethod for each dialog.
     */

  }, {
    key: 'closeMyNyplDialog',
    value: function closeMyNyplDialog() {
      if (this.state.mobileMyNyplButton === 'clickLogIn' || this.state.mobileMyNyplButton === 'clickMyAccount') {
        _Actions2.default.setMobileMyNyplButtonValue('');
      }
    }

    /**
     * closeSearchDialog()
     * Verifies the current state.searchButtonAction matches
     * 'clickSearch' and fires the Action method to reset.
     * This is necessary for the FocusTrap component to execute
     * the proper deactivateMethod for each dialog.
     */

  }, {
    key: 'closeSearchDialog',
    value: function closeSearchDialog() {
      if (this.state.searchButtonAction === 'clickSearch') {
        _Actions2.default.searchButtonActionValue('');
      }
    }

    /**
     * closeMenuDialog()
     * Verifies the current state.activeMobileButton matches
     * 'mobileMenu' and fires the Action method to reset.
     * This is necessary for the FocusTrap component to execute
     * the proper deactivateMethod for each dialog.
     */

  }, {
    key: 'closeMenuDialog',
    value: function closeMenuDialog() {
      if (this.state.activeMobileButton === 'mobileMenu') {
        _Actions2.default.setMobileMenuButtonValue('');
      }
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
        _react2.default.createElement(_dgxSvgIcons.LionLogoIcon, { ariaHidden: true, className: this.props.className + '-Logo' })
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
      var icon = _react2.default.createElement(_dgxSvgIcons.LoginIcon, { className: 'LoginIcon', ariaHidden: true });
      if (this.props.patronName) {
        icon = _react2.default.createElement(_dgxSvgIcons.LoginIconSolid, { className: 'LoginIcon-loggedIn animated fadeIn', ariaHidden: true });
      }
      var buttonStyles = styles.inactiveMyNyplButton;
      var buttonLabel = this.props.patronName ? 'My Account' : 'Login';
      var active = this.state.mobileMyNyplButton === 'clickLogIn' || this.state.mobileMyNyplButton === 'clickMyAccount';

      if (active) {
        myNyplClass = ' active';
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
            className: 'MobileMyNypl-Wrapper',
            focusTrapOptions: {
              onDeactivate: this.closeMyNyplDialog,
              clickOutsideDeactivates: true
            },
            active: active
          },
          _react2.default.createElement(
            _reactTappable2.default,
            {
              className: this.props.className + '-MyNyplButton',
              component: 'button',
              ref: 'MobileMyNyplButton',
              style: (0, _underscore.extend)(styles.myNyplButton, buttonStyles),
              onTap: function onTap() {
                return _this2.toggleMobileMenuButton('click' + gaAction);
              }
            },
            _react2.default.createElement(
              'span',
              { className: 'visuallyHidden' },
              buttonLabel
            ),
            icon
          ),
          active && _react2.default.createElement(_MobileMyNypl2.default, {
            className: myNyplClass + ' MobileMyNypl',
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
            className: this.props.className + '-Locator',
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
      var buttonLabel = 'Open Search Dialog';
      var dialogWindow = null;

      if (this.state.searchButtonAction === 'clickSearch') {
        mobileSearchClass = ' active';
        icon = _react2.default.createElement(_dgxSvgIcons.XIcon, { ariaHidden: true, fill: '#FFF' });
        buttonStyles = styles.activeSearchButton;
        buttonLabel = 'Close Search Dialog';
        dialogWindow = _react2.default.createElement(
          _focusTrapReact2.default,
          {
            className: this.props.className + '-searchDialog',
            focusTrapOptions: {
              onDeactivate: this.closeSearchDialog,
              initialFocus: '.' + this.props.className + '-searchForm-legend',
              clickOutsideDeactivates: true
            },
            style: styles.searchDialog
          },
          _react2.default.createElement(_SearchBox2.default, {
            className: this.props.className + '-searchForm',
            type: 'mobile'
          })
        );
      }

      return _react2.default.createElement(
        'li',
        { style: styles.listItem },
        _react2.default.createElement(
          _reactTappable2.default,
          {
            className: this.props.className + '-SearchButton' + mobileSearchClass,
            component: 'button',
            style: (0, _underscore.extend)(styles.searchButton, buttonStyles),
            onTap: function onTap() {
              return _this3.toggleMobileMenuButton('clickSearch');
            }
          },
          _react2.default.createElement(
            'span',
            { className: 'visuallyHidden' },
            buttonLabel
          ),
          icon
        ),
        dialogWindow
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

      if (this.state.activeMobileButton === 'mobileMenu') {
        mobileMenuClass = ' active';
        icon = _react2.default.createElement(_dgxSvgIcons.XIcon, { ariaHidden: true, fill: '#FFF' });
        buttonStyles = styles.activeMenuButton;
        buttonLabel = 'Close Menu Dialog';
        dialogWindow = _react2.default.createElement(_NavMenu2.default, {
          className: this.props.className + '-NavMenu',
          lang: this.props.lang,
          items: this.props.navData,
          urlType: this.props.urlType,
          isLoggedIn: this.props.isLoggedIn,
          patronName: this.state.patronName,
          logOutLink: this.state.logOutUrl
        });
      }

      return _react2.default.createElement(
        'li',
        { style: styles.listItem },
        _react2.default.createElement(
          _focusTrapReact2.default,
          {
            focusTrapOptions: {
              initialFocus: 'ul.Header-Mobile-NavMenu-List li:first-of-type a',
              onDeactivate: function onDeactivate() {
                return _this4.closeMenuDialog();
              },
              clickOutsideDeactivates: true
            },
            active: this.state.activeMobileButton === 'mobileMenu'
          },
          _react2.default.createElement(
            _reactTappable2.default,
            {
              className: this.props.className + '-MenuButton' + mobileMenuClass,
              component: 'button',
              style: (0, _underscore.extend)(styles.menuButton, buttonStyles),
              onTap: function onTap() {
                return _this4.toggleMobileMenuButton('mobileMenu');
              }
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
            { className: 'Header-Mobile-Wrapper' + mobileMenuClass },
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
  className: 'MobileHeader',
  nyplRootUrl: '/',
  alt: 'The New York Public Library'
};

exports.default = MobileHeader;
module.exports = exports['default'];