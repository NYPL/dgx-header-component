'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _BasicButton = require('../Buttons/BasicButton.js');

var _BasicButton2 = _interopRequireDefault(_BasicButton);

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

// ALT Flux Store/Actions

// GA Utility Library


var SearchButton = function (_React$Component) {
  _inherits(SearchButton, _React$Component);

  function SearchButton(props) {
    _classCallCheck(this, SearchButton);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SearchButton).call(this, props));

    _this.activateHover = _this.activateHover.bind(_this);
    _this.deactivateHover = _this.deactivateHover.bind(_this);
    return _this;
  }

  /**
   * Update the Store's searchButtonActionValue
   * with hoverSearch after a set time delay.
   */


  _createClass(SearchButton, [{
    key: 'activateHover',
    value: function activateHover() {
      this.hoverTimer = setTimeout(function () {
        _Actions2.default.searchButtonActionValue('hoverSearch');

        // Fire GA event to track when the Search Menu is open
        _utils2.default._trackHeader('Search', 'Open Menu');
      }, 80);
    }

    /**
     * Clear the activateHover timer if it exists.
     * Reset the Store's searchButtonActionValue to empty
     * after a set time delay.
     */

  }, {
    key: 'deactivateHover',
    value: function deactivateHover() {
      clearTimeout(this.hoverTimer);

      setTimeout(function () {
        _Actions2.default.searchButtonActionValue('');
      }, 250);
    }
  }, {
    key: 'render',
    value: function render() {
      var rootClass = this.props.className;
      // Give active class if the button is activated by hover
      var classes = (0, _classnames2.default)({
        active: _HeaderStore2.default._getSearchButtonActionValue() === 'hoverSearch' || _HeaderStore2.default._getLastActiveMenuItem() === 'hoverSearch'
      });
      // Detect if the header is sticky
      var stickyStatus = (0, _classnames2.default)({ isSticky: _HeaderStore2.default.getState().isSticky });
      var searchLabel = _react2.default.createElement(
        'span',
        { className: rootClass + '-searchButton-text ' + classes + ' ' + stickyStatus },
        'Search'
      );

      return _react2.default.createElement(
        'div',
        { className: rootClass + '-searchBox-Wrapper' },
        _react2.default.createElement(_BasicButton2.default, {
          onMouseEnter: this.activateHover,
          onMouseLeave: this.deactivateHover,
          id: rootClass + '-searchButton',
          className: 'nypl-icon-magnifier-fat ' + rootClass + '-searchButton ' + classes + ' ' + stickyStatus,
          name: 'Search Button',
          label: searchLabel
        }),
        _react2.default.createElement(_SearchBox2.default, {
          id: rootClass + '-searchBox',
          className: rootClass + '-searchBox'
        })
      );
    }
  }]);

  return SearchButton;
}(_react2.default.Component);

SearchButton.propTypes = {
  lang: _react2.default.PropTypes.string,
  className: _react2.default.PropTypes.string
};

SearchButton.defaultProps = {
  lang: 'en',
  className: 'NavMenu'
};

// Export the component
exports.default = SearchButton;