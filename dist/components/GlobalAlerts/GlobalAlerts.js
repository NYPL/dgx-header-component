'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactTappable = require('react-tappable');

var _reactTappable2 = _interopRequireDefault(_reactTappable);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _appConfigJs = require('../../appConfig.js');

var _appConfigJs2 = _interopRequireDefault(_appConfigJs);

var _AlertsBoxAlertsBoxJs = require('../AlertsBox/AlertsBox.js');

var _AlertsBoxAlertsBoxJs2 = _interopRequireDefault(_AlertsBoxAlertsBoxJs);

var GlobalAlerts = (function (_React$Component) {
  function GlobalAlerts(props) {
    _classCallCheck(this, GlobalAlerts);

    _get(Object.getPrototypeOf(GlobalAlerts.prototype), 'constructor', this).call(this, props);

    this.state = {
      globalAlerts: [],
      hideAlertsBox: false,
      animateAlertsBox: false
    };
  }

  _inherits(GlobalAlerts, _React$Component);

  _createClass(GlobalAlerts, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      //Fetch the Global Alerts via Client
      this._fetchGlobalAlerts();
    }
  }, {
    key: 'render',
    value: function render() {
      var currentGlobalAlerts = this._filterCurrentClosingAlerts(this.state.globalAlerts),
          classes = (0, _classnames2['default'])({
        'animatedFast fadeOutUp': this.state.animateAlertsBox,
        'hide': this.state.hideAlertsBox
      });

      return currentGlobalAlerts && currentGlobalAlerts.length ? _react2['default'].createElement(
        'div',
        { className: '' + this.props.className + ' ' + classes, id: this.props.id, style: styles.base },
        _react2['default'].createElement(
          'div',
          { className: '' + this.props.className + '-Wrapper' },
          _react2['default'].createElement(_AlertsBoxAlertsBoxJs2['default'], {
            alerts: currentGlobalAlerts,
            id: '' + this.props.className + '-Box',
            className: '' + this.props.className + '-Box' })
        )
      ) : null;
    }
  }, {
    key: '_closeAlertsBox',

    /**
     * _closeAlertsBox() 
     * updates both state properties
     * (animateAlertsBox & hideAlertsBox)
     * with a setTimeout to allow css transition.
     * NOTE: Disabled for now until further notice.
     */
    value: function _closeAlertsBox() {
      var _this = this;

      this.setState({ animateAlertsBox: true });

      setTimeout(function () {
        _this.setState({ hideAlertsBox: true });
      }, 400);
    }
  }, {
    key: '_fetchGlobalAlerts',

    /**
     * _fetchGlobalAlerts()
     * using axios, fetch the alerts data
     * and assign to state globalAlerts property.
     */
    value: function _fetchGlobalAlerts() {
      var _this2 = this;

      _axios2['default'].get(_appConfigJs2['default'].alertsApiUrl).then(function (result) {
        if (result.data && result.data.data) {
          _this2.setState({
            globalAlerts: result.data.data
          });
        }
      })['catch'](function (response) {
        console.warn('Error on Axios GET request: ' + _appConfigJs2['default'].alertsApiUrl);
        if (response instanceof Error) {
          console.log(response.message);
        } else {
          // The request was made, but the server responded with a status code
          // that falls out of the range of 2xx
          console.log(response.data);
          console.log(response.status);
          console.log(response.headers);
          console.log(response.config);
        }
      });
    }
  }, {
    key: '_filterCurrentClosingAlerts',

    /**
     * _filterCurrentClosingAlerts(data)
     * Returns a filtered array with current
     * closing alerts. If no data is passed,
     * an empty array will be returned.
     *
     * @param {Array} data
     * @return {Array} Alerts
     */
    value: function _filterCurrentClosingAlerts(data) {
      if (!data) {
        return [];
      }

      var today = (0, _moment2['default'])(),
          sDate = undefined,
          eDate = undefined;

      return _underscore2['default'].filter(data, function (elem) {
        if (elem.attributes) {
          if (elem.attributes['display-date-start'] && elem.attributes['display-date-end']) {
            sDate = (0, _moment2['default'])(elem.attributes['display-date-start']);
            eDate = (0, _moment2['default'])(elem.attributes['display-date-end']);

            if (sDate.valueOf() <= today.valueOf() && eDate.valueOf() >= today.valueOf()) {
              return elem;
            }
          }
        }
      });
    }
  }]);

  return GlobalAlerts;
})(_react2['default'].Component);

GlobalAlerts.defaultProps = {
  lang: 'en',
  className: 'GlobalAlerts',
  id: 'GlobalAlerts'
};

var styles = {
  base: {
    backgroundColor: '#fee24a',
    width: '100%',
    margin: 0,
    padding: '15px 0',
    color: '#333333'
  }
};

exports['default'] = (0, _radium2['default'])(GlobalAlerts);
module.exports = exports['default'];