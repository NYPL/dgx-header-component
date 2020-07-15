"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _dgxSvgIcons = require("@nypl/dgx-svg-icons");

var _utils = _interopRequireDefault(require("../../utils/utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Logo = function Logo(props) {
  return /*#__PURE__*/_react.default.createElement("a", {
    id: props.id,
    className: props.className,
    href: props.target,
    onClick: function onClick() {
      return _utils.default.trackHeader('Click Logo', '');
    },
    style: props.style
  }, /*#__PURE__*/_react.default.createElement(_dgxSvgIcons.LionLogoWithText, {
    focusable: false
  }), /*#__PURE__*/_react.default.createElement("span", {
    className: "visuallyHidden"
  }, props.alt));
};

Logo.propTypes = {
  target: _propTypes.default.string,
  id: _propTypes.default.string,
  className: _propTypes.default.string,
  alt: _propTypes.default.string,
  style: _propTypes.default.arrayOf(_propTypes.default.object)
};
Logo.defaultProps = {
  target: '/',
  id: 'Logo',
  className: 'Logo',
  alt: 'The New York Public Library',
  style: {}
};
var _default = Logo;
exports.default = _default;