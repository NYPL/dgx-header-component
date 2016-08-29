'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _HeaderStore = require('../../stores/HeaderStore.js');

var _HeaderStore2 = _interopRequireDefault(_HeaderStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MegaMenuArrow = function MegaMenuArrow(_ref) {
  var index = _ref.index;
  var navId = _ref.navId;
  var currentActiveItem = _ref.currentActiveItem;

  // Dynamic class assignment based on activeItem property matching current index.
  var classes = (0, _classnames2.default)('NavMenuItem-Arrow nypl-icon-arrow-meganav-large', {
    'active animateMegaMenuArrowEnter fadeIn': index === currentActiveItem,
    active: _HeaderStore2.default.getLastActiveMenuItem() === navId && index !== currentActiveItem
  });

  return _react2.default.createElement('span', { className: 'NavMenuItem-Arrow-' + navId + ' ' + classes });
};
// ALT Flux Store/Actions


MegaMenuArrow.propTypes = {
  index: _react2.default.PropTypes.number,
  currentActiveItem: _react2.default.PropTypes.number,
  navId: _react2.default.PropTypes.string
};

exports.default = MegaMenuArrow;
module.exports = exports['default'];