'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _underscore = require('underscore');

var _MegaMenuFeatureItem = require('./MegaMenuFeatureItem.js');

var _MegaMenuFeatureItem2 = _interopRequireDefault(_MegaMenuFeatureItem);

var _FindUsWidget = require('../FindUsWidget/FindUsWidget.js');

var _FindUsWidget2 = _interopRequireDefault(_FindUsWidget);

var _DonateWidget = require('../DonateWidget/DonateWidget.js');

var _DonateWidget2 = _interopRequireDefault(_DonateWidget);

var _appConfig = require('../../appConfig.js');

var _appConfig2 = _interopRequireDefault(_appConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MegaMenuFeatures = function (_React$Component) {
  _inherits(MegaMenuFeatures, _React$Component);

  function MegaMenuFeatures() {
    _classCallCheck(this, MegaMenuFeatures);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(MegaMenuFeatures).apply(this, arguments));
  }

  _createClass(MegaMenuFeatures, [{
    key: 'renderFeatureitems',

    /**
     * Generates the DOM for the FeatureItems.
     * Optionally, returns the appropriate widget component based off navId match.
     * @param {object[]} - Array containing FeatureItem Object data.
     * @param {Object} param (optional) - Object containing widget properties.
     * @param {string} param.donateWidget (optional) - Widget property with String value.
     * @param {string} param.findWidget (optional) - Widget property with String value.
     * @returns {Object} React DOM.
     */
    value: function renderFeatureitems(object) {
      var _this2 = this;

      var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      if ((0, _underscore.isEmpty)(object)) {
        return null;
      }

      var _opts$donateWidget = opts.donateWidget;
      var donateWidget = _opts$donateWidget === undefined ? '' : _opts$donateWidget;
      var _opts$findWidget = opts.findWidget;
      var findWidget = _opts$findWidget === undefined ? '' : _opts$findWidget;
      // Extract the first featured item to pass onto the widgets matching navId

      var widgetFeature = object[0].featuredItem;

      if (this.props.navId === donateWidget) {
        return _react2.default.createElement(_DonateWidget2.default, {
          key: 'donateWidget',
          navId: this.props.navId,
          featuredItem: widgetFeature,
          donationLinks: _appConfig2.default.donationLinks,
          navLabel: this.props.navLabel
        });
      }

      if (this.props.navId === findWidget) {
        return _react2.default.createElement(_FindUsWidget2.default, {
          key: 'findUsWidget',
          navId: this.props.navId,
          featuredItem: widgetFeature,
          navLabel: this.props.navLabel,
          urlType: this.props.urlType
        });
      }

      return (0, _underscore.map)(object, function (item, i) {
        return _react2.default.createElement(_MegaMenuFeatureItem2.default, {
          key: i,
          feature: item.featuredItem,
          navLabel: _this2.props.navLabel
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: this.props.className },
        this.renderFeatureitems(this.props.features, {
          donateWidget: '1d9ea0ec-6ca3-4577-9dd1-e8de1f2a8bb1',
          findWidget: 'df621833-4dd1-4223-83e5-6ad7f98ad26a'
        })
      );
    }
  }]);

  return MegaMenuFeatures;
}(_react2.default.Component);

MegaMenuFeatures.propTypes = {
  lang: _react2.default.PropTypes.string,
  className: _react2.default.PropTypes.string,
  features: _react2.default.PropTypes.array,
  navId: _react2.default.PropTypes.string,
  navLabel: _react2.default.PropTypes.string
};

MegaMenuFeatures.defaultProps = {
  lang: 'en',
  className: 'MegaMenu-Features'
};

exports.default = MegaMenuFeatures;