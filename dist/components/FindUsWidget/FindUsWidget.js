'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FindUsFeature = require('./FindUsFeature.js');

var _FindUsFeature2 = _interopRequireDefault(_FindUsFeature);

var _MegaMenuFeatureItem = require('../MegaMenu/MegaMenuFeatureItem.js');

var _MegaMenuFeatureItem2 = _interopRequireDefault(_MegaMenuFeatureItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FindUsWidget = function (_React$Component) {
  _inherits(FindUsWidget, _React$Component);

  function FindUsWidget(props) {
    _classCallCheck(this, FindUsWidget);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(FindUsWidget).call(this, props));
  }

  _createClass(FindUsWidget, [{
    key: 'render',
    value: function render() {
      var feature = this.props.featuredItem;

      return _react2.default.createElement(
        'div',
        { className: this.props.className },
        _react2.default.createElement(_FindUsFeature2.default, {
          urlType: this.props.urlType,
          className: this.props.className + '-FindUsFeature'
        }),
        _react2.default.createElement(_MegaMenuFeatureItem2.default, {
          feature: feature,
          navLabel: this.props.navLabel
        })
      );
    }
  }]);

  return FindUsWidget;
}(_react2.default.Component);

FindUsWidget.propTypes = {
  lang: _react2.default.PropTypes.string,
  className: _react2.default.PropTypes.string,
  featuredItem: _react2.default.PropTypes.object,
  navLabel: _react2.default.PropTypes.string,
  urlType: _react2.default.PropTypes.string
};

FindUsWidget.defaultProps = {
  lang: 'en',
  className: 'FindUsWidget'
};

exports.default = FindUsWidget;