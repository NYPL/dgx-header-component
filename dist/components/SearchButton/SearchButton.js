'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _focusTrapReact = require('focus-trap-react');

var _focusTrapReact2 = _interopRequireDefault(_focusTrapReact);

var _dgxSvgIcons = require('@nypl/dgx-svg-icons');

var _SearchBox = require('../SearchBox/SearchBox');

var _SearchBox2 = _interopRequireDefault(_SearchBox);

var _utils = require('../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Import React libraries

// Import components

// GA Utility Library


var SearchButton = function (_React$Component) {
  _inherits(SearchButton, _React$Component);

  function SearchButton(props) {
    _classCallCheck(this, SearchButton);

    var _this = _possibleConstructorReturn(this, (SearchButton.__proto__ || Object.getPrototypeOf(SearchButton)).call(this, props));

    _this.state = { active: false };

    _this.handleOnClick = _this.handleOnClick.bind(_this);
    _this.handleOnClickOut = _this.handleOnClickOut.bind(_this);
    return _this;
  }

  /**
   * Calculate and return rendered width of inactive button label
   */


  _createClass(SearchButton, [{
    key: 'getInactiveLabelWidth',
    value: function getInactiveLabelWidth() {
      var _this2 = this;

      if (!this.searchButtonLabel) return null;

      // Calculate horiz padding to remove from clientWidth:
      var horizontalPadding = ['paddingLeft', 'paddingRight'].map(function (prop) {
        return getComputedStyle(_this2.searchButtonLabel)[prop];
      }).map(function (v) {
        return parseInt(v, 10);
      }).filter(function (val) {
        return val && val > 0;
      }).reduce(function (sum, val) {
        return sum + val;
      }, 0);
      return this.searchButtonLabel.clientWidth - horizontalPadding;
    }

    /**
     * handleOnClick(e)
     * Handles the event when the Search button is clicked
     */

  }, {
    key: 'handleOnClick',
    value: function handleOnClick(e) {
      e.preventDefault();
      if (this.state.active) {
        this.handleOnClickOut();
      } else {
        var inactiveLabelWidth = this.getInactiveLabelWidth();
        this.setState({ active: true, inactiveLabelWidth: inactiveLabelWidth });
        // Fire GA event to track when the Search Menu is open
        _utils2.default.trackHeader('Search', 'Open Menu');
      }
    }

    /**
     * handleOnClickOut()
     * Handles closing SearchBox via click event
     */

  }, {
    key: 'handleOnClickOut',
    value: function handleOnClickOut() {
      var _this3 = this;

      // Update active state only if ACTIVE is true
      if (this.state.active) {
        setTimeout(function () {
          _this3.setState({ active: false });
          _utils2.default.trackHeader('Search', 'Close Menu');
        }, 200);
      }
    }

    /**
    * renderSearchButton()
    * Generates the button DOM element for the Desktop Search Button.
    * Uses SVG icon & label.
    * @returns {Object} React DOM.
    */

  }, {
    key: 'renderSearchButton',
    value: function renderSearchButton() {
      var _this4 = this;

      var classes = (0, _classnames2.default)({ active: this.state.active });

      var label = 'Search';
      var iconComponentType = _dgxSvgIcons.SearchIcon;
      var labelStyle = {};
      // If active, change to "Close x" mode:
      if (this.state.active) {
        label = 'Close';
        iconComponentType = _dgxSvgIcons.XIcon;
        // If we have recorded the rendered clientWidth of the inactive label,
        // use it on the *active* label:
        if (this.state.inactiveLabelWidth) labelStyle.width = this.state.inactiveLabelWidth + 'px';
      }
      var icon = _react2.default.createElement(iconComponentType, {
        className: this.props.className + '-searchButton-icon',
        ariaHidden: true,
        fill: '#FFF',
        width: '20',
        height: '20'
      });

      return _react2.default.createElement(
        'button',
        {
          className: this.props.className + '-searchButton ' + classes,
          id: this.props.className + '-searchButton',
          name: 'Search Button',
          onClick: function onClick(e) {
            return _this4.handleOnClick(e);
          },
          'aria-haspopup': 'true',
          'aria-expanded': this.state.active ? true : null
        },
        _react2.default.createElement(
          'span',
          {
            className: this.props.className + '-searchButton-text',
            ref: function ref(el) {
              _this4.searchButtonLabel = el;
            },
            style: labelStyle
          },
          label
        ),
        icon
      );
    }

    /**
    * renderSearchBox()
    * Generates the DOM element for the Desktop Search Box.
    * Verifies if isActive is TRUE and returns the proper DOM.
    * @returns {Object} React DOM.
    */

  }, {
    key: 'renderSearchBox',
    value: function renderSearchBox() {
      return this.state.active ? _react2.default.createElement(
        'div',
        { className: this.props.className + '-desktopSearchBox animatedFast fadeIn' },
        _react2.default.createElement(_SearchBox2.default, { className: 'desktopSearch-form' })
      ) : null;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: this.props.className + '-searchBox-wrapper' },
        _react2.default.createElement(
          _focusTrapReact2.default,
          {
            focusTrapOptions: {
              onDeactivate: this.handleOnClickOut,
              clickOutsideDeactivates: true
            },
            active: this.state.active
          },
          this.renderSearchButton(),
          this.renderSearchBox()
        )
      );
    }
  }]);

  return SearchButton;
}(_react2.default.Component);

SearchButton.propTypes = {
  lang: _propTypes2.default.string,
  className: _propTypes2.default.string
};

SearchButton.defaultProps = {
  lang: 'en',
  className: 'NavMenu'
};

exports.default = SearchButton;
module.exports = exports['default'];