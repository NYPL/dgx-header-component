"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = _interopRequireDefault(require("../../utils/utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Google Analytics Utility Library
var NavMenuItem = function NavMenuItem(_ref) {
  var className = _ref.className,
      label = _ref.label,
      lang = _ref.lang,
      navId = _ref.navId,
      target = _ref.target,
      urlType = _ref.urlType;

  var convertUrlRelative = function convertUrlRelative(url) {
    if (typeof url !== 'string') {
      return '#';
    }

    var regex = new RegExp(/^http(s)?\:\/\/(www.)?nypl.org/i); // Test regex matching pattern

    return regex.test(url) ? url.replace(regex, '') : url;
  };

  return /*#__PURE__*/_react.default.createElement("li", {
    id: navId ? "".concat(className, "-").concat(navId) : className,
    className: className
  }, /*#__PURE__*/_react.default.createElement("a", {
    href: urlType === 'absolute' ? target : convertUrlRelative(target),
    className: "navMenuItem-link",
    id: navId ? "navMenuItem-link-".concat(navId) : 'navMenuItem-link',
    onClick: function onClick() {
      return _utils.default.trackHeader('Go to...', "".concat(label[lang].text));
    }
  }, label[lang].text));
};

NavMenuItem.propTypes = {
  className: _propTypes.default.string,
  label: _propTypes.default.arrayOf(_propTypes.default.object),
  lang: _propTypes.default.string,
  navId: _propTypes.default.string,
  target: _propTypes.default.string,
  urlType: _propTypes.default.string
};
NavMenuItem.defaultProps = {
  className: 'navMenuItem',
  label: {},
  lang: 'en',
  navId: '',
  target: '#',
  urlType: ''
};
var _default = NavMenuItem;
exports.default = _default;