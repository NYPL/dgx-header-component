"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _moment = _interopRequireDefault(require("moment"));

var _underscore = require("underscore");

var _axios = _interopRequireDefault(require("axios"));

var _appConfig = _interopRequireDefault(require("../../appConfig"));

var _AlertsBox = _interopRequireDefault(require("../AlertsBox/AlertsBox"));

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

var styles = {
  backgroundColor: '#fee24a',
  width: '100%',
  margin: 0,
  padding: '15px 0',
  color: '#333333'
};

var GlobalAlerts = /*#__PURE__*/function (_React$Component) {
  _inherits(GlobalAlerts, _React$Component);

  var _super = _createSuper(GlobalAlerts);

  function GlobalAlerts(props) {
    var _this;

    _classCallCheck(this, GlobalAlerts);

    _this = _super.call(this, props);
    _this.state = {
      globalAlerts: [],
      hideAlertsBox: false,
      animateAlertsBox: false
    };
    return _this;
  }

  _createClass(GlobalAlerts, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // Fetch the Global Alerts via Client
      this.fetchGlobalAlerts();
    }
    /**
     * _closeAlertsBox()
     * updates both state properties
     * (animateAlertsBox & hideAlertsBox)
     * with a setTimeout to allow css transition.
     * NOTE: Disabled for now until further notice.
     */

  }, {
    key: "closeAlertsBox",
    value: function closeAlertsBox() {
      var _this2 = this;

      this.setState({
        animateAlertsBox: true
      });
      setTimeout(function () {
        _this2.setState({
          hideAlertsBox: true
        });
      }, 400);
    }
    /**
     * _fetchGlobalAlerts()
     * using axios, fetch the alerts data
     * and assign to state globalAlerts property.
     */

  }, {
    key: "fetchGlobalAlerts",
    value: function fetchGlobalAlerts() {
      var _this3 = this;

      _axios["default"].get(_appConfig["default"].alertsApiUrl).then(function (result) {
        if (result.data && result.data.data) {
          _this3.setState({
            globalAlerts: result.data.data
          });
        }
      })["catch"](function (response) {
        console.warn("Error on Axios GET request: ".concat(_appConfig["default"].alertsApiUrl));

        if (response instanceof Error) {
          console.warn(response.message);
        } else {
          // The request was made, but the server responded with a status code
          // that falls out of the range of 2xx
          console.warn(response.data);
          console.warn(response.status);
          console.warn(response.headers);
          console.warn(response.config);
        }
      });
    }
    /**
     * _filterCurrentClosingAlerts(data)
     * Returns a filtered array with current
     * closing alerts. If no data is passed,
     * an empty array will be returned.
     *
     * @param {Array} data
     * @return {Array} Alerts
     */

  }, {
    key: "filterCurrentClosingAlerts",
    value: function filterCurrentClosingAlerts(data) {
      if (!data) {
        return [];
      }

      var today = (0, _moment["default"])();
      var sDate;
      var eDate;
      return (0, _underscore.filter)(data, function (elem) {
        if (elem.attributes) {
          if (elem.attributes['display-date-start'] && elem.attributes['display-date-end']) {
            sDate = (0, _moment["default"])(elem.attributes['display-date-start']);
            eDate = (0, _moment["default"])(elem.attributes['display-date-end']);

            if (sDate.valueOf() <= today.valueOf() && eDate.valueOf() >= today.valueOf()) {
              return elem;
            }
          }
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var currentGlobalAlerts = this.filterCurrentClosingAlerts(this.state.globalAlerts);
      var classes = (0, _classnames["default"])({
        'animatedFast fadeOutUp': this.state.animateAlertsBox,
        hide: this.state.hideAlertsBox
      });
      return currentGlobalAlerts && currentGlobalAlerts.length ? /*#__PURE__*/_react["default"].createElement("div", {
        className: "".concat(this.props.className, " ").concat(classes),
        id: this.props.id,
        style: styles,
        role: "complementary"
      }, /*#__PURE__*/_react["default"].createElement(_AlertsBox["default"], {
        alerts: currentGlobalAlerts,
        id: "".concat(this.props.className, "-box"),
        className: "".concat(this.props.className, "-box")
      })) : null;
    }
  }]);

  return GlobalAlerts;
}(_react["default"].Component);

GlobalAlerts.propTypes = {
  lang: _propTypes["default"].string,
  className: _propTypes["default"].string,
  id: _propTypes["default"].string
};
GlobalAlerts.defaultProps = {
  lang: 'en',
  className: 'globalAlerts',
  id: 'globalAlerts'
};
var _default = GlobalAlerts;
exports["default"] = _default;