"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SubscribeMessageBox = function SubscribeMessageBox(_ref) {
  var className = _ref.className,
      status = _ref.status,
      msg = _ref.msg;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(className, " ").concat(status)
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(className, "-eyebrow")
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(className, "-title")
  }, msg));
};

SubscribeMessageBox.propTypes = {
  msg: _propTypes.default.string,
  className: _propTypes.default.string,
  status: _propTypes.default.string
};
SubscribeMessageBox.defaultProps = {
  msg: 'Thank you for subscribing to our email updates.',
  className: 'subscribeMessageBox',
  status: ''
};
var _default = SubscribeMessageBox;
exports.default = _default;