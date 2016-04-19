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

var _MegaMenuFeatureItemJs = require('./MegaMenuFeatureItem.js');

var _MegaMenuFeatureItemJs2 = _interopRequireDefault(_MegaMenuFeatureItemJs);

var _FindUsWidgetFindUsWidgetJs = require('../FindUsWidget/FindUsWidget.js');

var _FindUsWidgetFindUsWidgetJs2 = _interopRequireDefault(_FindUsWidgetFindUsWidgetJs);

var _DonateWidgetDonateWidgetJs = require('../DonateWidget/DonateWidget.js');

var _DonateWidgetDonateWidgetJs2 = _interopRequireDefault(_DonateWidgetDonateWidgetJs);

var _appConfigJs = require('../../appConfig.js');

var _appConfigJs2 = _interopRequireDefault(_appConfigJs);

var MegaMenuFeatures = (function (_React$Component) {
  _inherits(MegaMenuFeatures, _React$Component);

  // Constructor used in ES6

  function MegaMenuFeatures(props) {
    _classCallCheck(this, MegaMenuFeatures);

    _get(Object.getPrototypeOf(MegaMenuFeatures.prototype), 'constructor', this).call(this, props);
  }

  _createClass(MegaMenuFeatures, [{
    key: 'render',
    value: function render() {
      var _this = this;

      var currentFeatureItem = undefined,

      // The specific header items for Find Us and Give only have one feature.
      widgetFeature = this.props.features[0].featuredItem;

      // Donate Widget
      if (this.props.navId === '1d9ea0ec-6ca3-4577-9dd1-e8de1f2a8bb1') {
        currentFeatureItem = _react2['default'].createElement(_DonateWidgetDonateWidgetJs2['default'], {
          navId: this.props.navId,
          featuredItem: widgetFeature,
          donationLinks: _appConfigJs2['default'].donationLinks, navLabel: this.props.navLabel });
      } else if (this.props.navId === 'df621833-4dd1-4223-83e5-6ad7f98ad26a') {
        currentFeatureItem = _react2['default'].createElement(_FindUsWidgetFindUsWidgetJs2['default'], {
          navId: this.props.navId,
          featuredItem: widgetFeature,
          urlType: this.props.urlType,
          navLabel: this.props.navLabel });
      } else {
        currentFeatureItem = this.props.features.map(function (item, i) {
          return _react2['default'].createElement(_MegaMenuFeatureItemJs2['default'], { key: i, feature: item.featuredItem, navLabel: _this.props.navLabel });
        });
      }

      return _react2['default'].createElement(
        'div',
        { className: 'MegaMenu-Features' },
        currentFeatureItem
      );
    }
  }]);

  return MegaMenuFeatures;
})(_react2['default'].Component);

MegaMenuFeatures.defaultProps = {
  lang: 'en'
};

exports['default'] = MegaMenuFeatures;
module.exports = exports['default'];