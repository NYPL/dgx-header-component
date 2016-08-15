// Import React libraries
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactOnclickout = require('react-onclickout');

var _reactOnclickout2 = _interopRequireDefault(_reactOnclickout);

// Import components

var _dgxSvgIcons = require('dgx-svg-icons');

var _SearchBoxSearchBoxJs = require('../SearchBox/SearchBox.js');

var _SearchBoxSearchBoxJs2 = _interopRequireDefault(_SearchBoxSearchBoxJs);

// ALT Flux Store

var _storesHeaderStoreJs = require('../../stores/HeaderStore.js');

var _storesHeaderStoreJs2 = _interopRequireDefault(_storesHeaderStoreJs);

var _actionsActionsJs = require('../../actions/Actions.js');

var _actionsActionsJs2 = _interopRequireDefault(_actionsActionsJs);

// GA Utility Library

var _utilsUtilsJs = require('../../utils/utils.js');

var _utilsUtilsJs2 = _interopRequireDefault(_utilsUtilsJs);

var SearchButton = (function (_React$Component) {
  _inherits(SearchButton, _React$Component);

  function SearchButton(props) {
    _classCallCheck(this, SearchButton);

    _get(Object.getPrototypeOf(SearchButton.prototype), 'constructor', this).call(this, props);

    this.state = { active: false };

    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnClickOut = this.handleOnClickOut.bind(this);
    this.activateHover = this.activateHover.bind(this);
    this.deactivateHover = this.deactivateHover.bind(this);
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
          _utilsUtilsJs2['default']._trackHeader('Search', 'Open Menu');
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
      var _this = this;

      // Only handle ClickOut events if cookie is SET
      if (this.props.cookie === '1') {
        // Update active state only if ACTIVE is true
        if (this.state.active) {
          _utilsUtilsJs2['default']._trackHeader('Search', 'Close Menu');
          setTimeout(function () {
            _this.setState({ active: false });
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
          _actionsActionsJs2['default'].searchButtonActionValue('hoverSearch');
          // Fire GA event to track when the Search Menu is open
          _utilsUtilsJs2['default']._trackHeader('Search', 'Open Menu');
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
          _actionsActionsJs2['default'].searchButtonActionValue('');
          _utilsUtilsJs2['default']._trackHeader('Search', 'Close Menu');
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
      var _this2 = this;

      var classes = (0, _classnames2['default'])({
        active: this.state.active || _storesHeaderStoreJs2['default']._getSearchButtonActionValue() === 'hoverSearch' || _storesHeaderStoreJs2['default']._getLastActiveMenuItem() === 'hoverSearch'
      });
      var stickyStatus = (0, _classnames2['default'])({ isSticky: _storesHeaderStoreJs2['default'].getState().isSticky });

      return _react2['default'].createElement(
        'button',
        {
          className: this.props.className + '-searchButton ' + classes + ' ' + stickyStatus,
          id: this.props.className + '-searchButton',
          name: 'Search Button',
          onClick: function (e) {
            return _this2.handleOnClick(e);
          }
        },
        _react2['default'].createElement(
          'span',
          { className: this.props.className + '-searchButton-text' },
          'Search'
        ),
        _react2['default'].createElement(_dgxSvgIcons.SearchIcon, {
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
      var isActive = this.state.active || _storesHeaderStoreJs2['default']._getSearchButtonActionValue() === 'hoverSearch' || _storesHeaderStoreJs2['default']._getLastActiveMenuItem() === 'hoverSearch';
      var sticky = (0, _classnames2['default'])({ isSticky: _storesHeaderStoreJs2['default'].getState().isSticky });

      return isActive ? _react2['default'].createElement(
        'div',
        {
          className: this.props.className + '-desktopSearchBox animatedFast fadeIn ' + sticky
        },
        _react2['default'].createElement(_SearchBoxSearchBoxJs2['default'], { className: 'desktopSearch-Form' })
      ) : null;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        {
          className: this.props.className + '-searchBox-Wrapper',
          onMouseEnter: this.activateHover,
          onMouseLeave: this.deactivateHover
        },
        _react2['default'].createElement(
          _reactOnclickout2['default'],
          { onClickOut: this.handleOnClickOut },
          this.renderSearchButton(),
          this.renderSearchBox()
        )
      );
    }
  }]);

  return SearchButton;
})(_react2['default'].Component);

SearchButton.propTypes = {
  lang: _react2['default'].PropTypes.string,
  className: _react2['default'].PropTypes.string,
  cookie: _react2['default'].PropTypes.string
};

SearchButton.defaultProps = {
  lang: 'en',
  className: 'NavMenu'
};

exports['default'] = SearchButton;
module.exports = exports['default'];