'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _MegaMenuFeatureItem = require('../MegaMenu/MegaMenuFeatureItem.js');

var _MegaMenuFeatureItem2 = _interopRequireDefault(_MegaMenuFeatureItem);

var _DonateBox = require('./DonateBox.js');

var _DonateBox2 = _interopRequireDefault(_DonateBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DonateWidget = function (_React$Component) {
  _inherits(DonateWidget, _React$Component);

  function DonateWidget(props) {
    _classCallCheck(this, DonateWidget);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(DonateWidget).call(this, props));
  }

  _createClass(DonateWidget, [{
    key: 'render',
    value: function render() {
      var featuredItem = this.props.featuredItem;

      return _react2.default.createElement(
        'div',
        { className: this.props.className },
        _react2.default.createElement(_DonateBox2.default, {
          className: this.props.className + '-DonateBox',
          tag: 'Donate',
          title: 'Donate to the Library',
          donationLinks: this.props.donationLinks,
          desc: 'We rely on your generosity to provide books, literacy classes, children\'s ' + 'story hours, and much more FREE for all New Yorkers.'
        }),
        _react2.default.createElement(_MegaMenuFeatureItem2.default, {
          feature: featuredItem,
          navLabel: this.props.navLabel
        })
      );
    }
  }]);

  return DonateWidget;
}(_react2.default.Component);

DonateWidget.propTypes = {
  className: _react2.default.PropTypes.string,
  featuredItem: _react2.default.PropTypes.object,
  donationLinks: _react2.default.PropTypes.array,
  navLabel: _react2.default.PropTypes.string
};

DonateWidget.defaultProps = {
  lang: 'en',
  className: 'DonateWidget'
};

exports.default = DonateWidget;