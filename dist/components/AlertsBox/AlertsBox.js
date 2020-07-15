"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _underscore = require("underscore");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AlertsBox = function AlertsBox(_ref) {
  var className = _ref.className,
      id = _ref.id,
      lang = _ref.lang,
      style = _ref.style,
      alerts = _ref.alerts;
  var alertItems = (0, _underscore.map)(alerts, function (item, index) {
    var alertDescription = item.attributes['alert-text'][lang];
    return /*#__PURE__*/_react.default.createElement("div", {
      key: index,
      className: "".concat(className, "-item"),
      dangerouslySetInnerHTML: {
        __html: alertDescription.text
      }
    });
  });
  return /*#__PURE__*/_react.default.createElement("div", {
    className: className,
    id: id,
    style: style
  }, alertItems);
};

AlertsBox.propTypes = {
  id: _propTypes.default.string,
  className: _propTypes.default.string,
  lang: _propTypes.default.string,
  style: _propTypes.default.object,
  alerts: _propTypes.default.arrayOf(_propTypes.default.object)
};
AlertsBox.defaultProps = {
  lang: 'en',
  className: 'alertsBox',
  id: 'alertsBox',
  style: {},
  alerts: []
};
var _default = AlertsBox;
exports.default = _default;