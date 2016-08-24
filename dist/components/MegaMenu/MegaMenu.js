'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _HeaderStore = require('../../stores/HeaderStore.js');

var _HeaderStore2 = _interopRequireDefault(_HeaderStore);

var _Actions = require('../../actions/Actions.js');

var _Actions2 = _interopRequireDefault(_Actions);

var _MegaMenuSubNav = require('./MegaMenuSubNav.js');

var _MegaMenuSubNav2 = _interopRequireDefault(_MegaMenuSubNav);

var _MegaMenuFeatures = require('./MegaMenuFeatures.js');

var _MegaMenuFeatures2 = _interopRequireDefault(_MegaMenuFeatures);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// ALT Flux Store/Actions

// Dependent NYPL React Components


var MegaMenu = function (_React$Component) {
  _inherits(MegaMenu, _React$Component);

  function MegaMenu(props) {
    _classCallCheck(this, MegaMenu);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MegaMenu).call(this, props));

    _this.watchHoverIntentEnter = _this.watchHoverIntentEnter.bind(_this);
    _this.watchHoverIntentLeave = _this.watchHoverIntentLeave.bind(_this);
    return _this;
  }

  /**
   * If the lastActiveMenuItem passed as a prop
   * matches the MegaMenu's navId. Then fire the
   * Action to store a reference to the lastActiveMenuItem.
   */


  _createClass(MegaMenu, [{
    key: 'watchHoverIntentEnter',
    value: function watchHoverIntentEnter() {
      if (this.props.lastActiveMenuItem === this.props.navId) {
        _Actions2.default.setLastActiveMenuItem(this.props.navId);
      }
    }

    /**
     * Sets the Store's lastActiveMenuItem
     * property to an empty string when hovered out.
     */

  }, {
    key: 'watchHoverIntentLeave',
    value: function watchHoverIntentLeave() {
      _Actions2.default.setLastActiveMenuItem('');
    }
  }, {
    key: 'render',
    value: function render() {
      // Dynamic class assignment based on activeItem property matching current index.
      var classes = (0, _classnames2.default)(this.props.className, {
        'active animateMegaMenuEnter fadeIn': this.props.index === this.props.currentActiveItem,
        active: _HeaderStore2.default._getLastActiveMenuItem() === this.props.navId && this.props.index !== this.props.currentActiveItem
      });

      return _react2.default.createElement(
        'div',
        {
          onMouseEnter: this.watchHoverIntentEnter,
          onMouseLeave: this.watchHoverIntentLeave,
          id: this.props.navId ? 'MegaMenu-' + this.props.navId : 'MegaMenu',
          className: classes
        },
        _react2.default.createElement('div', { className: this.props.className + '-LeftBgWrapper' }),
        _react2.default.createElement(
          'div',
          { className: this.props.className + '-Wrapper' },
          _react2.default.createElement(
            'div',
            { className: this.props.className + '-SubNavWrapper' },
            _react2.default.createElement(_MegaMenuSubNav2.default, {
              label: this.props.label,
              items: this.props.items,
              lang: this.props.lang,
              topLink: this.props.topLink,
              navId: this.props.navId
            })
          ),
          _react2.default.createElement(
            'div',
            { className: this.props.className + '-FeaturesWrapper' },
            _react2.default.createElement(_MegaMenuFeatures2.default, {
              navId: this.props.navId,
              features: this.props.features,
              urlType: this.props.urlType,
              navLabel: this.props.label[this.props.lang].text
            })
          )
        )
      );
    }
  }]);

  return MegaMenu;
}(_react2.default.Component);

MegaMenu.propTypes = {
  lang: _react2.default.PropTypes.string,
  className: _react2.default.PropTypes.string,
  lastActiveMenuItem: _react2.default.PropTypes.string,
  currentActiveItem: _react2.default.PropTypes.number,
  index: _react2.default.PropTypes.number,
  navId: _react2.default.PropTypes.string,
  label: _react2.default.PropTypes.object,
  features: _react2.default.PropTypes.array,
  items: _react2.default.PropTypes.array,
  topLink: _react2.default.PropTypes.string,
  urlType: _react2.default.PropTypes.string
};

MegaMenu.defaultProps = {
  lang: 'en',
  className: 'MegaMenu'
};

exports.default = MegaMenu;
module.exports = exports['default'];