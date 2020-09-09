"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _underscore = require("underscore");

var _axios = _interopRequireDefault(require("axios"));

var _utils = _interopRequireDefault(require("../../utils/utils"));

var _appConfig = _interopRequireDefault(require("../../appConfig"));

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

// Fundraising configuration variables
var _config$fundraising = _appConfig["default"].fundraising,
    apiUrl = _config$fundraising.apiUrl,
    primaryBgImage = _config$fundraising.primaryBgImage,
    secondaryBgImage = _config$fundraising.secondaryBgImage,
    cookieExpInSeconds = _config$fundraising.cookieExpInSeconds;

var FundraisingBanner = /*#__PURE__*/function (_React$Component) {
  _inherits(FundraisingBanner, _React$Component);

  var _super = _createSuper(FundraisingBanner);

  function FundraisingBanner(props) {
    var _this;

    _classCallCheck(this, FundraisingBanner);

    _this = _super.call(this, props);
    _this.state = {
      bannerData: props.bannerData,
      isBannerVisible: false
    };
    _this.closeFundraisingBanner = _this.closeFundraisingBanner.bind(_assertThisInitialized(_this));
    _this.fetchFundraisingData = _this.fetchFundraisingData.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(FundraisingBanner, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // Only fetch data if the cookie is not set or false
      if (_utils["default"].getCookie(this.props.hideBannerCookieName) !== 'true') {
        this.fetchFundraisingData(apiUrl, this.state.bannerData);
      }
    }
    /**
     * getBackgroundImageStyles(primaryImage, secondaryImage)
     * Assigns default background CSS styles and specific backgroundImage properties
     * if the `primaryImage` and `secondaryImage` paths are defined
     *
     * @param {string} primaryImage - The full path of the primary background image
     * @param {string} secondaryImage - The full path of the secondary background image
     */

  }, {
    key: "getBackgroundImageStyles",
    value: function getBackgroundImageStyles(primaryImage, secondaryImage) {
      var styles = {
        backgroundColor: '#07818d'
      };

      if (!(0, _underscore.isEmpty)(primaryImage)) {
        if ((0, _underscore.isEmpty)(secondaryImage)) {
          styles.backgroundImage = "url(".concat(primaryImage, "), url(").concat(primaryImage, ")");
          styles.backgroundRepeat = 'repeat-x, repeat-x';
          styles.backgroundPosition = '0 150%, 55% -110%';
        } else {
          styles.backgroundImage = "url(".concat(primaryImage, "), url(").concat(primaryImage, "), url(").concat(secondaryImage, ")");
          styles.backgroundRepeat = 'repeat-x, repeat-x, repeat';
          styles.backgroundPosition = '0 150%, 55% -110%, 50% 50%';
        }
      }

      return styles;
    }
    /**
     * fetchFundraisingData(url, currentBannerData)
     * Performs a GET request to the fundraising API only if no data exists. Upon a successful GET
     * request, it will update the `isBannerVisible` boolean to true and populate the `bannerData`
     * object with the API data.
     *
     * @param {string} url - The API endpoint to fetch fundraising data
     * @param {object} currentBannerData - The object containing the fundraising data
     */

  }, {
    key: "fetchFundraisingData",
    value: function fetchFundraisingData(url, currentBannerData) {
      var _this2 = this;

      if (!(0, _underscore.isEmpty)(url) && (0, _underscore.isEmpty)(currentBannerData)) {
        return _axios["default"].get(url).then(function (result) {
          if (result.data) {
            _this2.setState({
              bannerData: result.data,
              isBannerVisible: true
            });
          } else {
            console.warn("Missing response from GET request: ".concat(url), result);
          }
        })["catch"](function (error) {
          console.warn("Error on Axios GET request: ".concat(url));

          if (error instanceof Error) {
            console.warn(error.message);
          } else {
            // The request was made, but the server responded with a status code
            // that falls out of the range of 2xx
            console.warn(error.data);
            console.warn(error.status);
          }
        });
      }

      return null;
    }
    /**
     * closeFundraisingBanner()
     * Sets the `closeFundraisingBanner` cookie to expire in 24 hours and
     * updates the `isBannerVisible` boolean to false which will hide the banner.
     */

  }, {
    key: "closeFundraisingBanner",
    value: function closeFundraisingBanner() {
      _utils["default"].setCookie(this.props.hideBannerCookieName, 'true', cookieExpInSeconds);

      this.setState({
        isBannerVisible: false
      }); // Fire the GA event only if the prop gaLabel is not empty

      if (!(0, _underscore.isEmpty)(this.props.gaLabel)) {
        _utils["default"].trackHeader('Close banner button clicked', this.props.gaLabel);
      }
    }
    /**
     * renderBannerImage(imageUrl)
     * Generates the DOM for the main fundraising image if the `imageUrl` parameter is not empty
     *
     * @param {string} imageUrl - The full path of the main fundraising image
     */

  }, {
    key: "renderBannerImage",
    value: function renderBannerImage(imageUrl) {
      return !(0, _underscore.isEmpty)(imageUrl) ? /*#__PURE__*/_react["default"].createElement("div", {
        className: "".concat(this.props.className, "-imageWrapper")
      }, /*#__PURE__*/_react["default"].createElement("img", {
        src: imageUrl,
        alt: ""
      })) : null;
    }
    /**
     * renderBannerHeadline(headline)
     * Generates the DOM for the headline text if the `headline` parameter is not empty
     *
     * @param {string} headline - String representation of the headline text
     */

  }, {
    key: "renderBannerHeadline",
    value: function renderBannerHeadline(headline) {
      return !(0, _underscore.isEmpty)(headline) ? /*#__PURE__*/_react["default"].createElement("span", {
        className: "".concat(this.props.className, "-headline")
      }, headline) : null;
    }
    /**
     * renderBannerDescription(desc)
     * Generates the DOM for the description text if the `desc` parameter is not empty
     *
     * @param {string} desc - String representation of the description text
     */

  }, {
    key: "renderBannerDescription",
    value: function renderBannerDescription(desc) {
      return !(0, _underscore.isEmpty)(desc) ? /*#__PURE__*/_react["default"].createElement("span", {
        className: "".concat(this.props.className, "-description")
      }, desc) : null;
    }
    /**
     * renderCloseButton(closeText, ariaLabel)
     * Generates the DOM for the description text if the `desc` parameter is not empty
     *
     * @param {string} closeText - String of the close text button element (default: `Close`)
     * @param {string} ariaLabel - String of the aria-label property
     *  (default: `Close Fundraising banner`)
     */

  }, {
    key: "renderCloseButton",
    value: function renderCloseButton() {
      var closeText = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Close';
      var ariaLabel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Close Fundraising banner';
      return /*#__PURE__*/_react["default"].createElement("button", {
        "aria-label": ariaLabel,
        className: "".concat(this.props.className, "-closeButton"),
        onClick: this.closeFundraisingBanner
      }, closeText);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$state = this.state,
          bannerData = _this$state.bannerData,
          isBannerVisible = _this$state.isBannerVisible;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "".concat(this.props.className, " ").concat(isBannerVisible ? 'show' : ''),
        id: this.props.id,
        style: this.getBackgroundImageStyles(primaryBgImage, secondaryBgImage),
        role: "complementary"
      }, !(0, _underscore.isEmpty)(bannerData) && /*#__PURE__*/_react["default"].createElement("div", {
        className: "".concat(this.props.className, "-wrapper")
      }, /*#__PURE__*/_react["default"].createElement("a", {
        onClick: function onClick() {
          !(0, _underscore.isEmpty)(_this3.props.gaLabel) && !(0, _underscore.isEmpty)(bannerData.url) ? _utils["default"].trackHeader(bannerData.url, _this3.props.gaLabel) : null;
        },
        href: !(0, _underscore.isEmpty)(bannerData.url) ? bannerData.url : '#'
      }, this.renderBannerImage(bannerData.imageUrl), this.renderBannerHeadline(bannerData.title), this.renderBannerDescription(bannerData.description), /*#__PURE__*/_react["default"].createElement("span", {
        className: "".concat(this.props.className, "-button")
      }, "Donate")), this.renderCloseButton()));
    }
  }]);

  return FundraisingBanner;
}(_react["default"].Component);

FundraisingBanner.propTypes = {
  className: _propTypes["default"].string,
  id: _propTypes["default"].string,
  bannerData: _propTypes["default"].arrayOf(_propTypes["default"].object),
  gaLabel: _propTypes["default"].string,
  hideBannerCookieName: _propTypes["default"].string.isRequired
};
FundraisingBanner.defaultProps = {
  className: 'fundraisingBanner',
  id: 'fundraisingBanner',
  bannerData: {},
  gaLabel: ''
};
var _default = FundraisingBanner;
exports["default"] = _default;