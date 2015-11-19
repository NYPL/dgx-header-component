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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

// ALT Flux Store/Actions

var _storesStoreJs = require('../../stores/Store.js');

var _storesStoreJs2 = _interopRequireDefault(_storesStoreJs);

var _actionsActionsJs = require('../../actions/Actions.js');

var _actionsActionsJs2 = _interopRequireDefault(_actionsActionsJs);

// Dependent NYPL React Components

var _MegaMenuSubNavJs = require('./MegaMenuSubNav.js');

var _MegaMenuSubNavJs2 = _interopRequireDefault(_MegaMenuSubNavJs);

var _MegaMenuFeaturesJs = require('./MegaMenuFeatures.js');

var _MegaMenuFeaturesJs2 = _interopRequireDefault(_MegaMenuFeaturesJs);

var MegaMenu = (function (_React$Component) {
  function MegaMenu(props) {
    _classCallCheck(this, MegaMenu);

    _get(Object.getPrototypeOf(MegaMenu.prototype), 'constructor', this).call(this, props);

    this.state = {
      lastActiveMenuItem: _storesStoreJs2['default'].getState().lastActiveMenuItem
    };
  }

  _inherits(MegaMenu, _React$Component);

  _createClass(MegaMenu, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _storesStoreJs2['default'].listen(this._onChange.bind(this));
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _storesStoreJs2['default'].unlisten(this._onChange.bind(this));
    }
  }, {
    key: '_onChange',
    value: function _onChange() {
      this.setState({
        lastActiveMenuItem: _storesStoreJs2['default'].getState().lastActiveMenuItem
      });
    }
  }, {
    key: 'render',
    value: function render() {
      // Dynamic class assignment based on activeItem property matching current index.
      var classes = (0, _classnames2['default'])('MegaMenu', {
        'active animateMegaMenuEnter fadeIn': this.props.index === this.props.currentActiveItem,
        'active': _storesStoreJs2['default']._getLastActiveMenuItem() === this.props.navId && this.props.index !== this.props.currentActiveItem
      });

      return _react2['default'].createElement(
        'div',
        {
          onMouseEnter: this._watchHoverIntentEnter.bind(this),
          onMouseLeave: this._watchHoverIntentLeave.bind(this),
          id: this.props.navId ? 'MegaMenu-' + this.props.navId : 'MegaMenu',
          className: classes },
        _react2['default'].createElement('div', { className: 'MegaMenu-LeftBgWrapper' }),
        _react2['default'].createElement(
          'div',
          { className: 'MegaMenu-Wrapper' },
          _react2['default'].createElement(
            'div',
            { className: 'MegaMenu-SubNavWrapper' },
            _react2['default'].createElement(_MegaMenuSubNavJs2['default'], {
              label: this.props.label,
              items: this.props.items,
              lang: this.props.lang,
              topLink: this.props.topLink,
              navId: this.props.navId })
          ),
          _react2['default'].createElement(
            'div',
            { className: 'MegaMenu-FeaturesWrapper' },
            _react2['default'].createElement(_MegaMenuFeaturesJs2['default'], {
              navId: this.props.navId,
              features: this.props.features,
              navLabel: this.props.label['en'].text })
          )
        )
      );
    }
  }, {
    key: '_watchHoverIntentEnter',

    /**
     * _watchHoverIntentEnter()
     * If the lastActiveMenuItem passed as a prop
     * matches the MegaMenu's navId. Then fire the
     * Action to store a reference to thhe lastActiveMenuItem.
     */
    value: function _watchHoverIntentEnter() {
      if (this.props.lastActiveMenuItem === this.props.navId) {
        _actionsActionsJs2['default'].setLastActiveMenuItem(this.props.navId);
      }
    }
  }, {
    key: '_watchHoverIntentLeave',

    /**
     * _watchHoverIntentLeave()
     * Sets the Store's lastActiveMenuItem
     * property to an empty string when
     * hovered out.
     */
    value: function _watchHoverIntentLeave() {
      _actionsActionsJs2['default'].setLastActiveMenuItem('');
    }
  }]);

  return MegaMenu;
})(_react2['default'].Component);

MegaMenu.defaultProps = {
  lang: 'en'
};

exports['default'] = MegaMenu;
module.exports = exports['default'];