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

var _MegaMenuMegaMenuFeatureItemJs = require('../MegaMenu/MegaMenuFeatureItem.js');

var _MegaMenuMegaMenuFeatureItemJs2 = _interopRequireDefault(_MegaMenuMegaMenuFeatureItemJs);

var _DonateBoxJs = require('./DonateBox.js');

var _DonateBoxJs2 = _interopRequireDefault(_DonateBoxJs);

var DonateWidget = (function (_React$Component) {
  function DonateWidget(props) {
    _classCallCheck(this, DonateWidget);

    _get(Object.getPrototypeOf(DonateWidget.prototype), 'constructor', this).call(this, props);
  }

  _inherits(DonateWidget, _React$Component);

  _createClass(DonateWidget, [{
    key: 'render',
    value: function render() {
      // This is pending removal once we establish the Data from API.
      var mockedFeaturedLocation = {
        headline: {
          en: {
            text: 'George Bruce Library Celebrates 100 Years'
          }
        },
        category: {
          en: {
            text: 'Mocked Location Spotlight'
          }
        },
        images: [{
          uri: 'http://fpoimg.com/88x88'
        }],
        description: {
          en: {
            text: 'The original George Bruce Library was located on 42nd Street.'
          }
        },
        link: {
          en: {
            text: 'nypl.org'
          }
        }
      };

      var featuredItem = this.props.featuredItem || mockedFeaturedLocation;

      return _react2['default'].createElement(
        'div',
        { className: this.props.className },
        _react2['default'].createElement(_DonateBoxJs2['default'], {
          className: this.props.className + '-DonateBox',
          tag: 'Donate',
          title: 'Donate to the Library',
          donationLinks: this.props.donationLinks,
          desc: 'We rely on your generosity to provide books, literacy classes, children\'s story hours, and much more FREE for all New Yorkers.' }),
        _react2['default'].createElement(_MegaMenuMegaMenuFeatureItemJs2['default'], {
          feature: featuredItem, navLabel: this.props.navLabel })
      );
    }
  }]);

  return DonateWidget;
})(_react2['default'].Component);

DonateWidget.defaultProps = {
  lang: 'en',
  className: 'DonateWidget'
};

exports['default'] = DonateWidget;
module.exports = exports['default'];