'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _DefaultItem = require('../ContentBox/DefaultItem.js');

var _DefaultItem2 = _interopRequireDefault(_DefaultItem);

var _ContentModel = require('../../utils/ContentModel.js');

var _ContentModel2 = _interopRequireDefault(_ContentModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MegaMenuFeatureItem = function (_React$Component) {
  _inherits(MegaMenuFeatureItem, _React$Component);

  function MegaMenuFeatureItem(props) {
    _classCallCheck(this, MegaMenuFeatureItem);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(MegaMenuFeatureItem).call(this, props));
  }

  _createClass(MegaMenuFeatureItem, [{
    key: 'render',
    value: function render() {
      var feature = this.props.feature;
      var classes = (0, _classnames2.default)({
        'with-image': feature && feature.images,
        'without-image': !feature || !feature.images
      });
      var contentObj = _ContentModel2.default.featureItem(feature, this.props.lang);
      var featuredItem = _react2.default.createElement(_DefaultItem2.default, {
        feature: contentObj,
        className: this.props.className,
        classes: classes,
        navLabel: this.props.navLabel
      });

      return featuredItem;
    }
  }]);

  return MegaMenuFeatureItem;
}(_react2.default.Component);

MegaMenuFeatureItem.propTypes = {
  lang: _react2.default.PropTypes.string,
  className: _react2.default.PropTypes.string,
  feature: _react2.default.PropTypes.object,
  navLabel: _react2.default.PropTypes.string
};

MegaMenuFeatureItem.defaultProps = {
  lang: 'en',
  className: 'MegaMenu-FeatureItem'
};

exports.default = MegaMenuFeatureItem;