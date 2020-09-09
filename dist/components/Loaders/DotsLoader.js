"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var styles = {
  text: {
    display: 'inline-block',
    fontFamily: 'system-ui, "Segoe UI", Tahoma',
    fontWeight: 400,
    color: '#FFF',
    fontSize: '20px',
    margin: '0 5px 0 0'
  },
  list: {
    position: 'relative',
    display: 'inline-block',
    listStyle: 'none',
    verticalAlign: '-1px',
    margin: 0,
    padding: 0,
    fontSize: 0
  },
  dots: {
    margin: 0,
    height: '3px',
    width: '3px',
    borderRadius: '100%',
    border: '2px solid white',
    display: 'inline-block'
  }
};

var DotsLoader = function DotsLoader(_ref) {
  var className = _ref.className,
      dots = _ref.dots;

  var renderDots = function renderDots(amount) {
    var dotsList = [];

    for (var i = 0; i < amount; i++) {
      dotsList.push( /*#__PURE__*/_react["default"].createElement("li", {
        key: i,
        style: styles.dots
      }));
    }

    return dotsList;
  };

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "".concat(className, "-wrapper")
  }, /*#__PURE__*/_react["default"].createElement("span", {
    style: styles.text
  }, "Loading"), /*#__PURE__*/_react["default"].createElement("ul", {
    className: className,
    style: styles.list
  }, renderDots(dots)));
};

DotsLoader.propTypes = {
  className: _propTypes["default"].string,
  dots: _propTypes["default"].number
};
DotsLoader.defaultProps = {
  className: 'DotsLoader',
  dots: 3
};
var _default = DotsLoader;
exports["default"] = _default;