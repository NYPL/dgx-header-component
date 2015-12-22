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

// Add-on Modules to generate FindUs Widget

var _FindUsFeatureJs = require('./FindUsFeature.js');

var _FindUsFeatureJs2 = _interopRequireDefault(_FindUsFeatureJs);

var _MegaMenuMegaMenuFeatureItemJs = require('../MegaMenu/MegaMenuFeatureItem.js');

var _MegaMenuMegaMenuFeatureItemJs2 = _interopRequireDefault(_MegaMenuMegaMenuFeatureItemJs);

var FindUsWidget = (function (_React$Component) {
  function FindUsWidget(props) {
    _classCallCheck(this, FindUsWidget);

    _get(Object.getPrototypeOf(FindUsWidget.prototype), 'constructor', this).call(this, props);
  }

  _inherits(FindUsWidget, _React$Component);

  _createClass(FindUsWidget, [{
    key: 'render',
    value: function render() {
      var feature = this.props.featuredItem;

      return _react2['default'].createElement(
        'div',
        { className: this.props.className },
        _react2['default'].createElement(_FindUsFeatureJs2['default'], { className: this.props.className + '-FindUsFeature' }),
        _react2['default'].createElement(_MegaMenuMegaMenuFeatureItemJs2['default'], { feature: feature, navLabel: this.props.navLabel })
      );
    }
  }]);

  return FindUsWidget;
})(_react2['default'].Component);

FindUsWidget.defaultProps = {
  lang: 'en',
  className: 'FindUsWidget'
};

exports['default'] = FindUsWidget;
module.exports = exports['default'];