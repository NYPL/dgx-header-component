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

// Import components

var _ButtonsBasicButtonJs = require('../Buttons/BasicButton.js');

var _ButtonsBasicButtonJs2 = _interopRequireDefault(_ButtonsBasicButtonJs);

var _SearchBoxSearchBoxJs = require('../SearchBox/SearchBox.js');

var _SearchBoxSearchBoxJs2 = _interopRequireDefault(_SearchBoxSearchBoxJs);

// ALT Flux Store/Actions

var _storesHeaderStoreJs = require('../../stores/HeaderStore.js');

var _storesHeaderStoreJs2 = _interopRequireDefault(_storesHeaderStoreJs);

var _actionsActionsJs = require('../../actions/Actions.js');

var _actionsActionsJs2 = _interopRequireDefault(_actionsActionsJs);

// GA Utility Library

var _utilsUtilsJs = require('../../utils/utils.js');

var _utilsUtilsJs2 = _interopRequireDefault(_utilsUtilsJs);

var _dgxFeatureFlags = require('dgx-feature-flags');

var _dgxFeatureFlags2 = _interopRequireDefault(_dgxFeatureFlags);

// Create React class

var SearchButton = (function (_React$Component) {
  _inherits(SearchButton, _React$Component);

  // Constructor used in ES6

  function SearchButton(props) {
    _classCallCheck(this, SearchButton);

    _get(Object.getPrototypeOf(SearchButton.prototype), 'constructor', this).call(this, props);

    this.state = {
      featureFlags: _dgxFeatureFlags2['default'].store.getState()
    };
  }

  _createClass(SearchButton, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _dgxFeatureFlags2['default'].store.listen(this._onChange.bind(this));
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _dgxFeatureFlags2['default'].store.unlisten(this._onChange.bind(this));
    }
  }, {
    key: '_onChange',
    value: function _onChange() {
      this.setState({ featureFlags: _dgxFeatureFlags2['default'].store.getState() });
    }
  }, {
    key: 'render',
    value: function render() {
      // Give active class if the button is activated by hover
      var classes = (0, _classnames2['default'])({
        'active': _storesHeaderStoreJs2['default']._getSearchButtonActionValue() === 'hoverSearch' || _storesHeaderStoreJs2['default']._getLastActiveMenuItem() === 'hoverSearch'
      }),

      // Detect if the header is sticky now
      stickyStatus = (0, _classnames2['default'])({
        'isSticky': _storesHeaderStoreJs2['default'].getState().isSticky
      }),
          searchLabelFlag = (0, _classnames2['default'])({
        'visuallyHidden': !_dgxFeatureFlags2['default'].store._isExperimentActive('search-label')
      }),
          searchLabel = _react2['default'].createElement(
        'div',
        { className: 'Search-Text ' + classes + ' ' + stickyStatus + ' ' + searchLabelFlag },
        'Search'
      );

      return _react2['default'].createElement(
        'div',
        { className: this.props.className + '-SearchBox-Wrapper' },
        _react2['default'].createElement(_ButtonsBasicButtonJs2['default'], {
          onMouseEnter: this._activateHover.bind(this),
          onMouseLeave: this._deactivateHover.bind(this),
          id: this.props.className + '-SearchButton',
          className: 'nypl-icon-magnifier-fat ' + this.props.className + '-SearchButton ' + classes,
          name: 'Search Button',
          label: searchLabel }),
        _react2['default'].createElement(_SearchBoxSearchBoxJs2['default'], {
          id: this.props.className + '-SearchBox',
          className: this.props.className + '-SearchBox' })
      );
    }

    /**
     * _activateHover()
     * Update the Store's searchButtonActionValue
     * with hoverSearch after a set time delay.
     */
  }, {
    key: '_activateHover',
    value: function _activateHover() {
      this.hoverTimer = setTimeout(function () {
        _actionsActionsJs2['default'].searchButtonActionValue('hoverSearch');

        // Fire GA event to track when the Search Menu is open
        _utilsUtilsJs2['default']._trackHeader('Search', 'Open Menu');
      }, 150);
    }

    /**
     * _hoverClose()
     * Clear the activateHover timer if it exists.
     * Reset the Store's searchButtonActionValue to empty
     * after a set time delay.
     */
  }, {
    key: '_deactivateHover',
    value: function _deactivateHover() {
      clearTimeout(this.hoverTimer);

      setTimeout(function () {
        _actionsActionsJs2['default'].searchButtonActionValue('');
      }, 250);
    }
  }]);

  return SearchButton;
})(_react2['default'].Component);

SearchButton.defaultProps = {
  lang: 'en',
  className: 'NavMenu'
};

// Export the component
exports['default'] = SearchButton;
module.exports = exports['default'];