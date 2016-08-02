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

var _ButtonsBasicButtonJs = require('../Buttons/BasicButton.js');

var _ButtonsBasicButtonJs2 = _interopRequireDefault(_ButtonsBasicButtonJs);

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

    this.state = {
      active: false
    };

    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnClickOut = this.handleOnClickOut.bind(this);
    this.activateHover = this.activateHover.bind(this);
    this.deactivateHover = this.deactivateHover.bind(this);
  }

  /**
   * handleOnClick()
   * Handles when the Search menu item is clicked.
   */

  _createClass(SearchButton, [{
    key: 'handleOnClick',
    value: function handleOnClick(e) {
      e.preventDefault();
      if (this.props.cookie === '1') {
        if (this.state.active) {
          this.handleOnClickOut();
        } else {
          this.setState({ active: true });

          // Fire GA event to track when the Search Menu is open
          _utilsUtilsJs2['default']._trackHeader('Search', 'Open Menu');
        };
      }
    }

    /**
     * handleOnClickOut()
     * Handles closing the nav item.
     */
  }, {
    key: 'handleOnClickOut',
    value: function handleOnClickOut() {
      var _this = this;

      if (this.props.cookie === '1') {
        if (this.state.active) {
          _utilsUtilsJs2['default']._trackHeader('Search', 'Close Menu');
        }

        setTimeout(function () {
          _this.setState({ active: false });
        }, 250);
      }
    }

    /**
     * Update the Store's searchButtonActionValue
     * with hoverSearch after a set time delay.
     */
  }, {
    key: 'activateHover',
    value: function activateHover() {
      if (this.props.cookie === '0') {
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
      if (this.props.cookie === '0') {
        clearTimeout(this.hoverTimer);

        setTimeout(function () {
          _actionsActionsJs2['default'].searchButtonActionValue('');
        }, 250);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var rootClass = this.props.className;
      // Give active class if the button is activated by hover
      var classes = (0, _classnames2['default'])({ active: this.state.active || _storesHeaderStoreJs2['default']._getSearchButtonActionValue() === 'hoverSearch' || _storesHeaderStoreJs2['default']._getLastActiveMenuItem() === 'hoverSearch' });
      // Detect if the header is sticky
      var stickyStatus = (0, _classnames2['default'])({ isSticky: _storesHeaderStoreJs2['default'].getState().isSticky });
      var searchLabel = _react2['default'].createElement(
        'span',
        { className: rootClass + '-searchButton-text ' + classes + ' ' + stickyStatus },
        'Search'
      );

      return _react2['default'].createElement(
        'div',
        { className: rootClass + '-searchBox-Wrapper' },
        _react2['default'].createElement(
          _reactOnclickout2['default'],
          { onClickOut: this.handleOnClickOut },
          _react2['default'].createElement(_ButtonsBasicButtonJs2['default'], {
            onMouseEnter: this.activateHover,
            onMouseLeave: this.deactivateHover,
            id: rootClass + '-searchButton',
            className: 'nypl-icon-magnifier-fat ' + rootClass + '-searchButton ' + classes + ' ' + stickyStatus,
            name: 'Search Button',
            label: searchLabel,
            onClick: function (e) {
              return _this2.handleOnClick(e);
            }
          }),
          _react2['default'].createElement(_SearchBoxSearchBoxJs2['default'], {
            active: this.state.active,
            id: rootClass + '-searchBox',
            className: rootClass + '-searchBox'
          })
        )
      );
    }
  }]);

  return SearchButton;
})(_react2['default'].Component);

SearchButton.propTypes = {
  lang: _react2['default'].PropTypes.string,
  className: _react2['default'].PropTypes.string
};

SearchButton.defaultProps = {
  lang: 'en',
  className: 'NavMenu'
};

// Export the component
exports['default'] = SearchButton;
module.exports = exports['default'];