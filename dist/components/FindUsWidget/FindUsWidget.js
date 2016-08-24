'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FindUsFeature = require('./FindUsFeature.js');

var _FindUsFeature2 = _interopRequireDefault(_FindUsFeature);

var _MegaMenuFeatureItem = require('../MegaMenu/MegaMenuFeatureItem.js');

var _MegaMenuFeatureItem2 = _interopRequireDefault(_MegaMenuFeatureItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FindUsWidget = function FindUsWidget(_ref) {
  var className = _ref.className;
  var featuredItem = _ref.featuredItem;
  var navLabel = _ref.navLabel;
  var urlType = _ref.urlType;
  return _react2.default.createElement(
    'div',
    { className: className },
    _react2.default.createElement(_FindUsFeature2.default, {
      className: className + '-FindUsFeature',
      urlType: urlType
    }),
    _react2.default.createElement(_MegaMenuFeatureItem2.default, {
      feature: featuredItem,
      navLabel: navLabel
    })
  );
};

FindUsWidget.propTypes = {
  className: _react2.default.PropTypes.string,
  featuredItem: _react2.default.PropTypes.object,
  navLabel: _react2.default.PropTypes.string,
  urlType: _react2.default.PropTypes.string
};

FindUsWidget.defaultProps = {
  className: 'FindUsWidget'
};

exports.default = FindUsWidget;
module.exports = exports['default'];