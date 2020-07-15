"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _underscore = require("underscore");

var _dgxSvgIcons = require("@nypl/dgx-svg-icons");

var _utils = _interopRequireDefault(require("../../utils/utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var icons = {
  twitter: /*#__PURE__*/_react.default.createElement(_dgxSvgIcons.TwitterIcon, {
    iconId: "email-twitter",
    focusable: false
  }),
  facebook: /*#__PURE__*/_react.default.createElement(_dgxSvgIcons.FaceBookIcon, {
    iconId: "email-fb",
    focusable: false
  })
};

var SocialMediaLinksWidget = /*#__PURE__*/function (_React$Component) {
  _inherits(SocialMediaLinksWidget, _React$Component);

  var _super = _createSuper(SocialMediaLinksWidget);

  function SocialMediaLinksWidget(props) {
    var _this;

    _classCallCheck(this, SocialMediaLinksWidget);

    _this = _super.call(this, props);
    _this.state = {
      linkClass: ''
    };
    _this.handleOnMouseLeave = _this.handleOnMouseLeave.bind(_assertThisInitialized(_this));
    _this.handleOnMouseEnter = _this.handleOnMouseEnter.bind(_assertThisInitialized(_this));
    _this.trackHeader = _utils.default.trackHeader.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(SocialMediaLinksWidget, [{
    key: "generateLinksToDisplay",
    value: function generateLinksToDisplay(list, displayOnlyList) {
      var _this2 = this;

      var socialLinksList = displayOnlyList && displayOnlyList.length ? (0, _underscore.pick)(list, displayOnlyList) : list;
      return (0, _underscore.map)(socialLinksList, function (item, key) {
        var hoverClass = _this2.state.linkClass === key ? 'animateHover fadeInSlow' : '';
        var icon = icons[key];
        return /*#__PURE__*/_react.default.createElement("li", {
          key: key,
          className: "".concat(_this2.props.className, "-listItem")
        }, /*#__PURE__*/_react.default.createElement("a", {
          href: item,
          onClick: function onClick() {
            return _this2.trackHeader('Click', "Social Media - ".concat(key));
          },
          className: "".concat(_this2.props.className, "-link ").concat(hoverClass),
          onMouseEnter: function onMouseEnter() {
            return _this2.handleOnMouseEnter(key);
          },
          onMouseLeave: _this2.handleOnMouseLeave
        }, icon));
      });
    }
    /**
     * _handleOnMouseEnter(key)
     * Updates the linkClass state
     * object property with the param key
     *
     * @param {String} key
     */

  }, {
    key: "handleOnMouseEnter",
    value: function handleOnMouseEnter(key) {
      this.setState({
        linkClass: key
      });
    }
    /**
     * _handleOnMouseLeave()
     * updates the linkClass state
     * object property to an empty string.
     *
     */

  }, {
    key: "handleOnMouseLeave",
    value: function handleOnMouseLeave() {
      this.setState({
        linkClass: ''
      });
    }
  }, {
    key: "render",
    value: function render() {
      var socialLinks = this.generateLinksToDisplay(this.props.links, this.props.displayOnlyList);
      return /*#__PURE__*/_react.default.createElement("div", {
        className: this.props.className
      }, /*#__PURE__*/_react.default.createElement("ul", {
        className: "".concat(this.props.className, "-list")
      }, socialLinks));
    }
  }]);

  return SocialMediaLinksWidget;
}(_react.default.Component);

SocialMediaLinksWidget.propTypes = {
  lang: _propTypes.default.string,
  className: _propTypes.default.string,
  links: _propTypes.default.arrayOf(_propTypes.default.object),
  displayOnlyList: _propTypes.default.arrayOf(_propTypes.default.array)
};
SocialMediaLinksWidget.defaultProps = {
  lang: 'en',
  className: 'socialMediaLinksWidget',
  links: {},
  displayOnlyList: []
};
var _default = SocialMediaLinksWidget;
exports.default = _default;