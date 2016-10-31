'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTappable = require('react-tappable');

var _reactTappable2 = _interopRequireDefault(_reactTappable);

var _focusTrapReact = require('focus-trap-react');

var _focusTrapReact2 = _interopRequireDefault(_focusTrapReact);

var _dgxSvgIcons = require('dgx-svg-icons');

var _underscore = require('underscore');

var _HeaderStore = require('../../stores/HeaderStore.js');

var _HeaderStore2 = _interopRequireDefault(_HeaderStore);

var _Actions = require('../../actions/Actions.js');

var _Actions2 = _interopRequireDefault(_Actions);

var _utils = require('../../utils/utils.js');

var _utils2 = _interopRequireDefault(_utils);

var _MobileMyNypl = require('../MyNypl/MobileMyNypl.js');

var _MobileMyNypl2 = _interopRequireDefault(_MobileMyNypl);

var _SearchBox = require('../SearchBox/SearchBox.js');

var _SearchBox2 = _interopRequireDefault(_SearchBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    padding: '12px 13px',
    display: 'inline-block',
    color: '#000'
  },
  myNyplButton: {
    margin: 0,
    padding: '13px',
    display: 'inline-block',
    border: 'none',
    lineHeight: 'normal',
    verticalAlign: '0px'
  },
  activeMyNyplButton: {
    backgroundColor: '#2B2B2B'
  },
  inactiveMyNyplButton: {
    backgroundColor: '#FFF'
  },
  searchButton: {
    margin: 0,
    padding: '13px',
    display: 'inline-block',
    border: 'none',
    lineHeight: 'normal',
    verticalAlign: '0px'
  },
  activeSearchButton: {
    backgroundColor: '#1B7FA7'
  },
  inactiveSearchButton: {
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
    padding: '13px',
    display: 'inline-block',
    border: 'none',
    lineHeight: 'normal',
    verticalAlign: '0px'
  },
  activeMenuButton: {
    backgroundColor: '#2B2B2B'
  },
  inactiveMenuButton: {
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
      } else if (activeButton === 'clickMyNypl') {
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
      if (this.state.mobileMyNyplButton === 'clickMyNypl') {
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
      var icon = _react2.default.createElement(_dgxSvgIcons.LoginIcon, { ariaHidden: true, fill: '#000' });
      var buttonStyles = styles.inactiveMyNyplButton;
      var buttonLabel = 'Open Log In Dialog';
      var dialogWindow = null;

      if (this.state.mobileMyNyplButton === 'clickMyNypl') {
        myNyplClass = ' active';
        icon = _react2.default.createElement(_dgxSvgIcons.XIcon, { ariaHidden: true, fill: '#FFF' });
        buttonStyles = styles.activeMyNyplButton;
        buttonLabel = 'Close Log In Dialog';
        dialogWindow = _react2.default.createElement(
          _focusTrapReact2.default,
          {
            className: 'MobileMyNypl-Wrapper' + myNyplClass,
            onDeactivate: this.closeMyNyplDialog
          },
          _react2.default.createElement(_MobileMyNypl2.default, { isLogin: this.props.isLogin })
        );
      }

      return _react2.default.createElement(
        'li',
        { style: styles.listItem },
        _react2.default.createElement(
          _reactTappable2.default,
          {
            className: this.props.className + '-MyNyplButton' + myNyplClass,
            component: 'button',
            ref: 'MobileMyNyplButton',
            style: (0, _underscore.extend)(styles.myNyplButton, buttonStyles),
            onTap: function onTap() {
              return _this2.toggleMobileMenuButton('clickMyNypl');
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
            onDeactivate: this.closeSearchDialog,
            initialFocus: '.' + this.props.className + '-searchForm-legend',
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
            ref: 'MobileSearchButton',
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

      if (this.state.activeMobileButton === 'mobileMenu') {
        mobileMenuClass = ' active';
        icon = _react2.default.createElement(_dgxSvgIcons.XIcon, { ariaHidden: true, fill: '#FFF' });
        buttonStyles = styles.activeMenuButton;
        buttonLabel = 'Close Menu Dialog';
      }

      return _react2.default.createElement(
        'li',
        { style: styles.listItem },
        _react2.default.createElement(
          _reactTappable2.default,
          {
            className: this.props.className + '-MenuButton' + mobileMenuClass,
            component: 'button',
            ref: 'MobileMenuButton',
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
  lang: _react2.default.PropTypes.string,
  className: _react2.default.PropTypes.string,
  locatorUrl: _react2.default.PropTypes.string,
  nyplRootUrl: _react2.default.PropTypes.string,
  alt: _react2.default.PropTypes.string,
  isLogin: _react2.default.PropTypes.bool
};

MobileHeader.defaultProps = {
  lang: 'en',
  className: 'MobileHeader',
  nyplRootUrl: '/',
  alt: 'The New York Public Library'
};

exports.default = MobileHeader;
module.exports = exports['default'];