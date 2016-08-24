'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DonateBox = require('./DonateBox.js');

var _DonateBox2 = _interopRequireDefault(_DonateBox);

var _MegaMenuFeatureItem = require('../MegaMenu/MegaMenuFeatureItem.js');

var _MegaMenuFeatureItem2 = _interopRequireDefault(_MegaMenuFeatureItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DonateWidget = function DonateWidget(_ref) {
  var className = _ref.className;
  var featuredItem = _ref.featuredItem;
  var donationLinks = _ref.donationLinks;
  var navLabel = _ref.navLabel;
  return _react2.default.createElement(
    'div',
    { className: className },
    _react2.default.createElement(_DonateBox2.default, {
      className: className + '-DonateBox',
      tag: 'Donate',
      title: 'Donate to the Library',
      donationLinks: donationLinks,
      desc: 'We rely on your generosity to provide books, literacy classes, children\'s ' + 'story hours, and much more FREE for all New Yorkers.'
    }),
    _react2.default.createElement(_MegaMenuFeatureItem2.default, {
      feature: featuredItem,
      navLabel: navLabel
    })
  );
};

DonateWidget.propTypes = {
  className: _react2.default.PropTypes.string,
  featuredItem: _react2.default.PropTypes.object,
  donationLinks: _react2.default.PropTypes.array,
  navLabel: _react2.default.PropTypes.string
};

DonateWidget.defaultProps = {
  className: 'DonateWidget'
};

exports.default = DonateWidget;
module.exports = exports['default'];