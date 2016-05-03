'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _underscore = require('underscore');

var _MegaMenuFeatureItemJs = require('./MegaMenuFeatureItem.js');

var _MegaMenuFeatureItemJs2 = _interopRequireDefault(_MegaMenuFeatureItemJs);

var _FindUsWidgetFindUsWidgetJs = require('../FindUsWidget/FindUsWidget.js');

var _FindUsWidgetFindUsWidgetJs2 = _interopRequireDefault(_FindUsWidgetFindUsWidgetJs);

var _DonateWidgetDonateWidgetJs = require('../DonateWidget/DonateWidget.js');

var _DonateWidgetDonateWidgetJs2 = _interopRequireDefault(_DonateWidgetDonateWidgetJs);

var _appConfigJs = require('../../appConfig.js');

var _appConfigJs2 = _interopRequireDefault(_appConfigJs);

// FeatureFlags Module

var _dgxFeatureFlags = require('dgx-feature-flags');

var _dgxFeatureFlags2 = _interopRequireDefault(_dgxFeatureFlags);

var MegaMenuFeatures = (function (_React$Component) {
  _inherits(MegaMenuFeatures, _React$Component);

  function MegaMenuFeatures(props) {
    _classCallCheck(this, MegaMenuFeatures);

    _get(Object.getPrototypeOf(MegaMenuFeatures.prototype), 'constructor', this).call(this, props);
    this.state = { featureFlags: _dgxFeatureFlags2['default'].store.getState() };
  }

  _createClass(MegaMenuFeatures, [{
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
    key: '_renderFeatureitems',
    value: function _renderFeatureitems(object) {
      var _this = this;

      var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      if ((0, _underscore.isEmpty)(object)) {
        return null;
      }

      var _opts$donateWidget = opts.donateWidget;
      var donateWidget = _opts$donateWidget === undefined ? false : _opts$donateWidget;
      var _opts$findWidget = opts.findWidget;
      var findWidget = _opts$findWidget === undefined ? false : _opts$findWidget;

      // Extract the first featured item to pass onto the widgets matching navId
      var widgetFeature = object[0].featuredItem;

      if (this.props.navId === '1d9ea0ec-6ca3-4577-9dd1-e8de1f2a8bb1' && donateWidget) {
        return _react2['default'].createElement(_DonateWidgetDonateWidgetJs2['default'], {
          key: 'donateWidget',
          navId: this.props.navId,
          featuredItem: widgetFeature,
          donationLinks: _appConfigJs2['default'].donationLinks,
          navLabel: this.props.navLabel
        });
      }

      if (this.props.navId === 'df621833-4dd1-4223-83e5-6ad7f98ad26a' && findWidget) {
        return _react2['default'].createElement(_FindUsWidgetFindUsWidgetJs2['default'], {
          navId: this.props.navId,
          featuredItem: widgetFeature,
          navLabel: this.props.navLabel
        });
      }

      return (0, _underscore.map)(object, function (item, i) {
        return _react2['default'].createElement(_MegaMenuFeatureItemJs2['default'], {
          key: i,
          feature: item.featuredItem,
          navLabel: _this.props.navLabel
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      if (_dgxFeatureFlags2['default'].store._isFeatureActive('location-top-link')) {
        return _react2['default'].createElement(
          'div',
          { className: this.props.className },
          this._renderFeatureitems(this.props.features, { donateWidget: true, findWidget: true })
        );
      }

      return _react2['default'].createElement(
        'div',
        { className: this.props.className },
        this._renderFeatureitems(this.props.features, { donateWidget: true })
      );
    }
  }]);

  return MegaMenuFeatures;
})(_react2['default'].Component);

MegaMenuFeatures.propTypes = {
  lang: _react2['default'].PropTypes.string,
  className: _react2['default'].PropTypes.string,
  features: _react2['default'].PropTypes.array,
  navId: _react2['default'].PropTypes.string,
  navLabel: _react2['default'].PropTypes.string
};

MegaMenuFeatures.defaultProps = {
  lang: 'en',
  className: 'MegaMenu-Features'
};

exports['default'] = MegaMenuFeatures;
module.exports = exports['default'];