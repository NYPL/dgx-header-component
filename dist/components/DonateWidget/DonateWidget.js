'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DonateBoxJs = require('./DonateBox.js');

var _DonateBoxJs2 = _interopRequireDefault(_DonateBoxJs);

var _MegaMenuMegaMenuFeatureItemJs = require('../MegaMenu/MegaMenuFeatureItem.js');

var _MegaMenuMegaMenuFeatureItemJs2 = _interopRequireDefault(_MegaMenuMegaMenuFeatureItemJs);

var DonateWidget = function DonateWidget(_ref) {
  var className = _ref.className;
  var featuredItem = _ref.featuredItem;
  var donationLinks = _ref.donationLinks;
  var navLabel = _ref.navLabel;
  return _react2['default'].createElement(
    'div',
    { className: className },
    _react2['default'].createElement(_DonateBoxJs2['default'], {
      className: className + '-DonateBox',
      tag: 'Donate',
      title: 'Donate to the Library',
      donationLinks: donationLinks,
      desc: 'We rely on your generosity to provide books, literacy classes, children\'s ' + 'story hours, and much more FREE for all New Yorkers.'
    }),
    _react2['default'].createElement(_MegaMenuMegaMenuFeatureItemJs2['default'], {
      feature: featuredItem,
      navLabel: navLabel
    })
  );
};

DonateWidget.propTypes = {
  className: _react2['default'].PropTypes.string,
  featuredItem: _react2['default'].PropTypes.object,
  donationLinks: _react2['default'].PropTypes.array,
  navLabel: _react2['default'].PropTypes.string
};

DonateWidget.defaultProps = {
  className: 'DonateWidget'
};

exports['default'] = DonateWidget;
module.exports = exports['default'];