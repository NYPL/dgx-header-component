"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _underscore = require("underscore");

var _utils = _interopRequireDefault(require("../../utils/utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var defaultStyles = {
  backgroundColor: '#E32B31',
  color: '#FFFFFF'
};

var DonateButton = function DonateButton(_ref) {
  var id = _ref.id,
      className = _ref.className,
      target = _ref.target,
      label = _ref.label,
      gaLabel = _ref.gaLabel,
      style = _ref.style;
  return /*#__PURE__*/_react["default"].createElement("a", {
    id: id,
    className: className,
    href: target,
    onClick: function onClick() {
      return _utils["default"].trackHeader('Donate', gaLabel);
    },
    style: (0, _underscore.extend)(style, defaultStyles)
  }, label);
};

DonateButton.propTypes = {
  id: _propTypes["default"].string,
  className: _propTypes["default"].string,
  target: _propTypes["default"].string,
  label: _propTypes["default"].string,
  style: _propTypes["default"].shape({}),
  gaLabel: _propTypes["default"].string
};
DonateButton.defaultProps = {
  id: '',
  label: 'Donate',
  className: 'donateButton',
  target: 'https://secure3.convio.net/nypl/site/Donation2?7825.donation=form1&df_id=7825' + '&mfc_pref=T&s_src=FRQ18ZZ_TNN',
  style: {},
  gaLabel: ''
};
var _default = DonateButton;
exports["default"] = _default;