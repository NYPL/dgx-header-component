"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _focusTrapReact = _interopRequireDefault(require("focus-trap-react"));

var _dgxSvgIcons = require("@nypl/dgx-svg-icons");

var _SearchBox = _interopRequireDefault(require("../SearchBox/SearchBox"));

var _utils = _interopRequireDefault(require("../../utils/utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var SearchButton = /*#__PURE__*/function (_React$Component) {
  _inherits(SearchButton, _React$Component);

  var _super = _createSuper(SearchButton);

  function SearchButton(props) {
    var _this;

    _classCallCheck(this, SearchButton);

    _this = _super.call(this, props);
    _this.state = {
      active: false
    };
    _this.handleOnClick = _this.handleOnClick.bind(_assertThisInitialized(_this));
    _this.handleOnClickOut = _this.handleOnClickOut.bind(_assertThisInitialized(_this));
    return _this;
  }
  /**
   * handleOnClick(e)
   * Handles the event when the Search button is clicked
   */


  _createClass(SearchButton, [{
    key: "handleOnClick",
    value: function handleOnClick(e) {
      e.preventDefault();

      if (this.state.active) {
        this.handleOnClickOut();
      } else {
        this.setState({
          active: true
        }); // Fire GA event to track when the Search Menu is open

        _utils["default"].trackHeader('Search', 'Open Menu');
      }
    }
    /**
     * handleOnClickOut()
     * Handles closing SearchBox via click event
     */

  }, {
    key: "handleOnClickOut",
    value: function handleOnClickOut() {
      var _this2 = this;

      // Update active state only if ACTIVE is true
      if (this.state.active) {
        setTimeout(function () {
          _this2.setState({
            active: false
          });

          _utils["default"].trackHeader('Search', 'Close Menu');
        }, 200);
      }
    }
    /**
    * renderSearchButton()
    * Generates the button DOM element for the Desktop Search Button.
    * Uses SVG icon & label.
    * @returns {Object} React DOM.
    */

  }, {
    key: "renderSearchButton",
    value: function renderSearchButton() {
      var _this3 = this;

      var classes = (0, _classnames["default"])({
        active: this.state.active
      });
      var label = 'Search';
      var iconComponentType = _dgxSvgIcons.SearchIcon; // If active, change to "Close x" mode:

      if (this.state.active) {
        label = 'Close';
        iconComponentType = _dgxSvgIcons.XIcon;
      }

      var icon = _react["default"].createElement(iconComponentType, {
        className: "".concat(this.props.className, "-searchButton-icon"),
        ariaHidden: true,
        fill: '#FFF',
        width: '20',
        height: '20',
        focusable: false
      });

      return /*#__PURE__*/_react["default"].createElement("button", {
        className: "".concat(this.props.className, "-searchButton ").concat(classes),
        id: "".concat(this.props.className, "-searchButton"),
        name: "Search Button",
        onClick: function onClick(e) {
          return _this3.handleOnClick(e);
        },
        "aria-haspopup": "true",
        "aria-expanded": this.state.active ? true : null
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "".concat(this.props.className, "-searchButton-text")
      }, label), icon);
    }
    /**
    * renderSearchBox()
    * Generates the DOM element for the Desktop Search Box.
    * Verifies if isActive is TRUE and returns the proper DOM.
    * @returns {Object} React DOM.
    */

  }, {
    key: "renderSearchBox",
    value: function renderSearchBox() {
      return this.state.active ? /*#__PURE__*/_react["default"].createElement("div", {
        className: "".concat(this.props.className, "-desktopSearchBox animatedFast fadeIn")
      }, /*#__PURE__*/_react["default"].createElement(_SearchBox["default"], {
        className: "desktopSearch-form"
      })) : null;
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "".concat(this.props.className, "-searchBox-wrapper")
      }, /*#__PURE__*/_react["default"].createElement(_focusTrapReact["default"], {
        focusTrapOptions: {
          onDeactivate: this.handleOnClickOut,
          clickOutsideDeactivates: true
        },
        active: this.state.active
      }, this.renderSearchButton(), this.renderSearchBox()));
    }
  }]);

  return SearchButton;
}(_react["default"].Component);

SearchButton.propTypes = {
  lang: _propTypes["default"].string,
  className: _propTypes["default"].string
};
SearchButton.defaultProps = {
  lang: 'en',
  className: 'NavMenu'
};
var _default = SearchButton;
exports["default"] = _default;