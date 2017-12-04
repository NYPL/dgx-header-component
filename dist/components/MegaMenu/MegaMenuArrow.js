'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _HeaderStore = require('../../stores/HeaderStore.js');

var _HeaderStore2 = _interopRequireDefault(_HeaderStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MegaMenuArrow = function MegaMenuArrow(_ref) {
  var index = _ref.index,
      navId = _ref.navId,
      currentActiveItem = _ref.currentActiveItem;

  // Dynamic class assignment based on activeItem property matching current index.
  var classes = (0, _classnames2.default)('NavMenuItem-Arrow nypl-icon-arrow-meganav-large', {
    'active animateMegaMenuArrowEnter fadeIn': index === currentActiveItem,
    active: _HeaderStore2.default.getLastActiveMenuItem() === navId && index !== currentActiveItem
  });

  return _react2.default.createElement('span', { className: 'NavMenuItem-Arrow-' + navId + ' ' + classes });
};
// ALT Flux Store/Actions


MegaMenuArrow.propTypes = {
  index: _propTypes2.default.number,
  currentActiveItem: _propTypes2.default.number,
  navId: _propTypes2.default.string
};

exports.default = MegaMenuArrow;
module.exports = exports['default'];