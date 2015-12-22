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

var _storesHeaderStoreJs = require('../../stores/HeaderStore.js');

var _storesHeaderStoreJs2 = _interopRequireDefault(_storesHeaderStoreJs);

var _actionsActionsJs = require('../../actions/Actions.js');

var _actionsActionsJs2 = _interopRequireDefault(_actionsActionsJs);

var MegaMenuArrow = (function (_React$Component) {
  function MegaMenuArrow(props) {
    _classCallCheck(this, MegaMenuArrow);

    _get(Object.getPrototypeOf(MegaMenuArrow.prototype), 'constructor', this).call(this, props);
  }

  _inherits(MegaMenuArrow, _React$Component);

  _createClass(MegaMenuArrow, [{
    key: 'render',
    value: function render() {
      // Dynamic class assignment based on activeItem property matching current index.
      var classes = (0, _classnames2['default'])('NavMenuItem-Arrow nypl-icon-arrow-meganav-large', {
        'active animateMegaMenuArrowEnter fadeIn': this.props.index === this.props.currentActiveItem,
        'active': _storesHeaderStoreJs2['default']._getLastActiveMenuItem() === this.props.navId && this.props.index !== this.props.currentActiveItem
      });

      return _react2['default'].createElement('span', {
        className: 'NavMenuItem-Arrow-' + this.props.navId + ' ' + classes });
    }
  }]);

  return MegaMenuArrow;
})(_react2['default'].Component);

MegaMenuArrow.defaultProps = {
  lang: 'en'
};

exports['default'] = MegaMenuArrow;
module.exports = exports['default'];