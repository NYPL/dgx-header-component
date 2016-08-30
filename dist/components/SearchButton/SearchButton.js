'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactOnclickout = require('react-onclickout');

var _reactOnclickout2 = _interopRequireDefault(_reactOnclickout);

var _dgxSvgIcons = require('dgx-svg-icons');

var _SearchBox = require('../SearchBox/SearchBox.js');

var _SearchBox2 = _interopRequireDefault(_SearchBox);

var _HeaderStore = require('../../stores/HeaderStore.js');

var _HeaderStore2 = _interopRequireDefault(_HeaderStore);

var _Actions = require('../../actions/Actions.js');

var _Actions2 = _interopRequireDefault(_Actions);

var _utils = require('../../utils/utils.js');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Import React libraries

// Import components

// ALT Flux Store

// GA Utility Library


var SearchButton = function (_React$Component) {
  _inherits(SearchButton, _React$Component);

  function SearchButton(props) {
    _classCallCheck(this, SearchButton);

    var _this = _possibleConstructorReturn(this, (SearchButton.__proto__ || Object.getPrototypeOf(SearchButton)).call(this, props));

    _this.state = { active: false };

    _this.handleOnClick = _this.handleOnClick.bind(_this);
    _this.handleOnClickOut = _this.handleOnClickOut.bind(_this);
    _this.activateHover = _this.activateHover.bind(_this);
    _this.deactivateHover = _this.deactivateHover.bind(_this);
    return _this;
  }

  /**
   * handleOnClick(e)
   * Handles the event when the Search button is clicked
   */


  _createClass(SearchButton, [{
    key: 'handleOnClick',
    value: function handleOnClick(e) {
      e.preventDefault();
      // Only handle click event if cookie is set
      if (this.props.cookie === '1') {
        if (this.state.active) {
          this.handleOnClickOut();
        } else {
          this.setState({ active: true });
          // Fire GA event to track when the Search Menu is open
          _utils2.default._trackHeader('Search', 'Open Menu');
        }
      }
    }

    /**
     * handleOnClickOut()
     * Handles closing SearchBox via click event
     */

  }, {
    key: 'handleOnClickOut',
    value: function handleOnClickOut() {
      var _this2 = this;

      // Only handle ClickOut events if cookie is SET
      if (this.props.cookie === '1') {
        // Update active state only if ACTIVE is true
        if (this.state.active) {
          setTimeout(function () {
            _this2.setState({ active: false });
            _utils2.default._trackHeader('Search', 'Close Menu');
          }, 200);
        }
      }
    }

    /**
     * Update the Store's searchButtonActionValue
     * with hoverSearch after a set time delay.
     */

  }, {
    key: 'activateHover',
    value: function activateHover() {
      // Only handle the hover event if the cookie is NOT set
      if (this.props.cookie !== '1') {
        this.hoverTimer = setTimeout(function () {
          _Actions2.default.searchButtonActionValue('hoverSearch');
          // Fire GA event to track when the Search Menu is open
          _utils2.default._trackHeader('Search', 'Open Menu');
        }, 80);
      }
    }

    /**
     * Clear the activateHover timer if it exists.
     * Reset the Store's searchButtonActionValue to empty
     * after a set time delay.
     */

  }, {
    key: 'deactivateHover',
    value: function deactivateHover() {
      // Only handle the hover event if the cookie is NOT set
      if (this.props.cookie !== '1') {
        clearTimeout(this.hoverTimer);

        setTimeout(function () {
          _Actions2.default.searchButtonActionValue('');
          _utils2.default._trackHeader('Search', 'Close Menu');
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
      var _this3 = this;

      var classes = (0, _classnames2.default)({
        active: this.state.active || _HeaderStore2.default._getSearchButtonActionValue() === 'hoverSearch' || _HeaderStore2.default._getLastActiveMenuItem() === 'hoverSearch'
      });
      var stickyStatus = (0, _classnames2.default)({ isSticky: _HeaderStore2.default.getState().isSticky });

      return _react2.default.createElement(
        'button',
        {
          className: this.props.className + '-searchButton ' + classes + ' ' + stickyStatus,
          id: this.props.className + '-searchButton',
          name: 'Search Button',
          onClick: function onClick(e) {
            return _this3.handleOnClick(e);
          }
        },
        _react2.default.createElement(
          'span',
          { className: this.props.className + '-searchButton-text' },
          'Search'
        ),
        _react2.default.createElement(_dgxSvgIcons.SearchIcon, {
          className: this.props.className + '-searchButton-icon',
          width: '20',
          height: '20',
          ariaHidden: true
        })
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
      var isActive = this.state.active || _HeaderStore2.default._getSearchButtonActionValue() === 'hoverSearch' || _HeaderStore2.default._getLastActiveMenuItem() === 'hoverSearch';
      var sticky = (0, _classnames2.default)({ isSticky: _HeaderStore2.default.getState().isSticky });

      return isActive ? _react2.default.createElement(
        'div',
        {
          className: this.props.className + '-desktopSearchBox animatedFast fadeIn ' + sticky
        },
        _react2.default.createElement(_SearchBox2.default, { className: 'desktopSearch-Form' })
      ) : null;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        {
          className: this.props.className + '-searchBox-Wrapper',
          onMouseEnter: this.activateHover,
          onMouseLeave: this.deactivateHover
        },
        _react2.default.createElement(
          _reactOnclickout2.default,
          { onClickOut: this.handleOnClickOut },
          this.renderSearchButton(),
          this.renderSearchBox()
        )
      );
    }
  }]);

  return SearchButton;
}(_react2.default.Component);

SearchButton.propTypes = {
  lang: _react2.default.PropTypes.string,
  className: _react2.default.PropTypes.string,
  cookie: _react2.default.PropTypes.string
};

SearchButton.defaultProps = {
  lang: 'en',
  className: 'NavMenu'
};

exports.default = SearchButton;
module.exports = exports['default'];