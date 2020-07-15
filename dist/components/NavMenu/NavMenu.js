"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _underscore = require("underscore");

var _dgxSvgIcons = require("@nypl/dgx-svg-icons");

var _SearchButton = _interopRequireDefault(require("../SearchButton/SearchButton"));

var _NavMenuItem = _interopRequireDefault(require("../NavMenuItem/NavMenuItem"));

var _NavMenuMobileButtons = _interopRequireDefault(require("../NavMenuMobileButtons/NavMenuMobileButtons"));

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

var NavMenu = /*#__PURE__*/function (_React$Component) {
  _inherits(NavMenu, _React$Component);

  var _super = _createSuper(NavMenu);

  function NavMenu() {
    _classCallCheck(this, NavMenu);

    return _super.apply(this, arguments);
  }

  _createClass(NavMenu, [{
    key: "renderNavMenu",

    /**
     * Generates the DOM for the NavItems with appropriate class.
     * Optionally, removes any NavItems if a match is found from the exceptionList.
     * @param {items[]} - Array containing NavMenu item Objects.
     * @param {exceptionList[]} (optional) - Array containing NavId strings.
     * @returns {Object} React DOM.
     */
    value: function renderNavMenu(items, exceptionList) {
      var _this = this;

      var navItems = items;

      if ((0, _underscore.isArray)(exceptionList) && !(0, _underscore.isEmpty)(exceptionList)) {
        navItems = (0, _underscore.filter)(navItems, function (item) {
          return item.id && !(0, _underscore.contains)(exceptionList, item.id);
        });
      }

      return (0, _underscore.map)(navItems, function (item, index) {
        return /*#__PURE__*/_react.default.createElement(_NavMenuItem.default, {
          label: item.name,
          lang: _this.props.lang,
          target: item.link.en.text,
          urlType: _this.props.urlType,
          navId: item.id,
          key: index
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var mobileActiveClass = this.props.mobileActive ? 'mobileActive' : '';
      return /*#__PURE__*/_react.default.createElement("div", {
        className: this.props.className
      }, /*#__PURE__*/_react.default.createElement("nav", {
        className: "".concat(this.props.className, "-wrapper ").concat(mobileActiveClass),
        "aria-label": "Main Navigation"
      }, /*#__PURE__*/_react.default.createElement(_dgxSvgIcons.LionLogoWithText, {
        ariaHidden: true,
        focusable: false
      }), /*#__PURE__*/_react.default.createElement("ul", {
        className: "".concat(this.props.className, "-list"),
        id: "navMenu-List"
      }, this.renderNavMenu(this.props.items)), /*#__PURE__*/_react.default.createElement(_SearchButton.default, {
        className: this.props.className
      }), /*#__PURE__*/_react.default.createElement(_NavMenuMobileButtons.default, {
        className: "mobileBottomButtons",
        libraryCardLink: this.props.urlType === 'absolute' ? '//www.nypl.org/library-card' : '/library-card'
      })));
    }
  }]);

  return NavMenu;
}(_react.default.Component);

NavMenu.propTypes = {
  lang: _propTypes.default.string,
  className: _propTypes.default.string,
  items: _propTypes.default.arrayOf(_propTypes.default.object).isRequired,
  urlType: _propTypes.default.string,
  mobileActive: _propTypes.default.bool
};
NavMenu.defaultProps = {
  lang: 'en',
  className: 'navMenu',
  urlType: 'relative',
  mobileActive: false
};
var _default = NavMenu;
exports.default = _default;