'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _underscore = require('underscore');

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _appConfig = require('../../appConfig.js');

var _appConfig2 = _interopRequireDefault(_appConfig);

var _AlertsBox = require('../AlertsBox/AlertsBox.js');

var _AlertsBox2 = _interopRequireDefault(_AlertsBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  backgroundColor: '#fee24a',
  width: '100%',
  margin: 0,
  padding: '15px 0',
  color: '#333333'
};

var GlobalAlerts = function (_React$Component) {
  _inherits(GlobalAlerts, _React$Component);

  function GlobalAlerts(props) {
    _classCallCheck(this, GlobalAlerts);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(GlobalAlerts).call(this, props));

    _this.state = {
      globalAlerts: [],
      hideAlertsBox: false,
      animateAlertsBox: false
    };
    return _this;
  }

  _createClass(GlobalAlerts, [{
    key: 'componentDidMount',
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
    key: 'closeAlertsBox',
    value: function closeAlertsBox() {
      var _this2 = this;

      this.setState({ animateAlertsBox: true });

      setTimeout(function () {
        _this2.setState({ hideAlertsBox: true });
      }, 400);
    }

    /**
     * _fetchGlobalAlerts()
     * using axios, fetch the alerts data
     * and assign to state globalAlerts property.
     */

  }, {
    key: 'fetchGlobalAlerts',
    value: function fetchGlobalAlerts() {
      var _this3 = this;

      _axios2.default.get(_appConfig2.default.alertsApiUrl).then(function (result) {
        if (result.data && result.data.data) {
          _this3.setState({ globalAlerts: result.data.data });
        }
      }).catch(function (response) {
        console.warn('Error on Axios GET request: ' + _appConfig2.default.alertsApiUrl);
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
    key: 'filterCurrentClosingAlerts',
    value: function filterCurrentClosingAlerts(data) {
      if (!data) {
        return [];
      }

      var today = (0, _moment2.default)();
      var sDate = void 0;
      var eDate = void 0;

      return (0, _underscore.filter)(data, function (elem) {
        if (elem.attributes) {
          if (elem.attributes['display-date-start'] && elem.attributes['display-date-end']) {
            sDate = (0, _moment2.default)(elem.attributes['display-date-start']);
            eDate = (0, _moment2.default)(elem.attributes['display-date-end']);

            if (sDate.valueOf() <= today.valueOf() && eDate.valueOf() >= today.valueOf()) {
              return elem;
            }
          }
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var currentGlobalAlerts = this.filterCurrentClosingAlerts(this.state.globalAlerts);
      var classes = (0, _classnames2.default)({
        'animatedFast fadeOutUp': this.state.animateAlertsBox,
        hide: this.state.hideAlertsBox
      });

      return currentGlobalAlerts && currentGlobalAlerts.length ? _react2.default.createElement(
        'div',
        {
          className: this.props.className + ' ' + classes,
          id: this.props.id,
          style: styles
        },
        _react2.default.createElement(
          'div',
          { className: this.props.className + '-Wrapper' },
          _react2.default.createElement(_AlertsBox2.default, {
            alerts: currentGlobalAlerts,
            id: this.props.className + '-Box',
            className: this.props.className + '-Box'
          })
        )
      ) : null;
    }
  }]);

  return GlobalAlerts;
}(_react2.default.Component);

GlobalAlerts.propTypes = {
  lang: _react2.default.PropTypes.string,
  className: _react2.default.PropTypes.string,
  id: _react2.default.PropTypes.string
};

GlobalAlerts.defaultProps = {
  lang: 'en',
  className: 'GlobalAlerts',
  id: 'GlobalAlerts'
};

exports.default = GlobalAlerts;
module.exports = exports['default'];