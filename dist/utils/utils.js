'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _dgxReactGa = require('dgx-react-ga');

var _underscore = require('underscore');

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _appConfig = require('./../appConfig.js');

var _appConfig2 = _interopRequireDefault(_appConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Utils() {
  var _this = this;

  this.formatDate = function (startDate, endDate) {
    var formattedDate = void 0,
        numDaysBetween = function numDaysBetween(start, end) {
      var s = (0, _moment2.default)(start),
          e = (0, _moment2.default)(end);
      return e.diff(s, 'days');
    },
        dateToString = function dateToString(start, end, type) {
      var dateString = void 0,
          months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

      if (!start && !end) {
        return;
      }

      // String assignment based on type
      switch (type) {
        case "current":
          dateString = "Open now. Ends " + months[end.getUTCMonth()] + " " + end.getUTCDate() + ", " + end.getUTCFullYear() + ".";
          break;
        case "current-ongoing":
          dateString = "Open now. Ongoing.";
          break;
        case "upcoming":
          dateString = "Opening soon. " + months[start.getUTCMonth()] + " " + start.getUTCDate() + ", " + start.getUTCFullYear() + " - " + months[end.getUTCMonth()] + " " + end.getUTCDate() + ", " + end.getUTCFullYear() + ".";
          break;
        case "upcoming-ongoing":
          dateString = "Opening soon. " + months[start.getUTCMonth()] + " " + start.getUTCDate() + ", " + start.getUTCFullYear() + ".";
          break;
        default:
          dateString = months[start.getUTCMonth()] + " " + start.getUTCDate() + ", " + start.getUTCFullYear() + " - " + months[end.getUTCMonth()] + " " + end.getUTCDate() + ", " + end.getUTCFullYear() + ".";
      }
      return dateString;
    };

    if (startDate && endDate) {
      var sDate = new Date(startDate),
          eDate = new Date(endDate),
          today = new Date(),
          daysBetweenStartEnd = numDaysBetween(sDate, eDate),
          rangeLimit = 365;

      // Current Event and not past 1 year between start and end dates.
      if (sDate.getTime() <= today.getTime() && eDate.getTime() >= today.getTime() && daysBetweenStartEnd < rangeLimit && daysBetweenStartEnd > 0) {
        formattedDate = dateToString(sDate, eDate, 'current');
      }
      // Current Event and past 1 year which implies Ongoing
      else if (sDate.getTime() <= today.getTime() && eDate.getTime() >= today.getTime() && daysBetweenStartEnd > rangeLimit) {
          formattedDate = dateToString(sDate, eDate, 'current-ongoing');
        }
        // Upcoming Event and not past 1 year between start and end dates.
        else if (sDate.getTime() > today.getTime() && eDate.getTime() >= today.getTime() && daysBetweenStartEnd < rangeLimit && daysBetweenStartEnd > 0) {
            formattedDate = dateToString(sDate, eDate, 'upcoming');
          }
          // Upcoming Event and past 1 year which implies Ongoing.
          else {
              formattedDate = dateToString(sDate, eDate, 'upcoming-ongoing');
            }
    }

    return formattedDate;
  };

  /**
   * trackHeader(action, label)
   * Track a GA click event, where action and label come from
   * the higher level function call from _trackEvent().
   *
   * @param {string} action - Action for GA event.
   * @param {string} label - Label for GA event.
   */
  this.trackHeader = _dgxReactGa.gaUtils.trackEvent('Global Header');

  /**
   * encodeURI(sKey)
   * Enocode the cookie response.
   *
   * @param {string} sKey -  The name of the cookie to be looked up.
   */
  this.encodeURI = function (sKey) {
    return encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&');
  };

  /**
   * getCookie(sKey)
   * Get a cookie based on its name.
   *
   * @param {string} sKey - The name of the cookie to be looked up.
   */
  this.getCookie = function (sKey) {
    if (!sKey) {
      return null;
    }

    return decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + _this.encodeURI(sKey) + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null;
  };

  /**
   * hasCookie(sKey)
   * See if a specific cookie.
   *
   * @param {string} sKey - The name of the cookie to be looked up.
   */
  this.hasCookie = function (sKey) {
    if (!sKey) {
      return false;
    }

    return new RegExp('(?:^|;\\s*)' + _this.encodeURI(sKey) + '\\s*\\=').test(document.cookie);
  };

  /**
   * getLoginData(cookie, cb, refreshCookieCb)
   * Handle the cookie from log in and make api calls with the callback function passed in.
   * If the returned statusCode is 401 and the cookie is expired, invoke refreshAccessToken()
   * to refresh access_token in the nyplIdentityPatron cookie.
   *
   * @param {string} cookie - The cookie returned.
   * @param {function(result: Object)} cb - The callback function passed in for dealing with data
   * responses.
   * @param {function(result: Object)} refreshCookieCb - The callback function passed in for cookie
   * refreshing mechanism.
   */
  this.getLoginData = function (cookie, cb, refreshCookieCb) {
    var decodedToken = JSON.parse(cookie).access_token;
    var endpoint = '' + _appConfig2.default.patronApiUrl + decodedToken;

    _axios2.default.get(endpoint).then(cb).catch(function (response) {
      console.warn('Error on Axios GET request: ' + endpoint);
      if (response instanceof Error) {
        console.warn(response.message);
      } else {
        // The request was made, but the server responded with a status code
        // that falls out of the range of 2xx
        console.warn(response.data);
        console.warn(response.status);
        console.warn(response.headers);
        console.warn(response.config);
        // If the cookie for getting log in Data is expired
        if (response.data.statusCode === 401 && response.data.expired === true) {
          _this.refreshAccessToken(refreshCookieCb);
        }
      }
    });
  };

  /**
   * refreshAccessToken(cb)
   * Hit the refresh endpoint to set new cookie value.
   *
   * @param {function(result: Object)} cb - The callback function passed in after the cookie
   * has been refreshed.
   */
  this.refreshAccessToken = function (cb) {
    _axios2.default.get('https://isso.nypl.org/auth/refresh', { withCredentials: true }).then(cb).catch(function (response) {
      console.warn('Error on Axios GET request: https://isso.nypl.org/auth/refresh');
      if (response instanceof Error) {
        console.warn(response.message);
      } else {
        // The request was made, but the server responded with a status code
        // that falls out of the range of 2xx
        console.warn(response.status);
        console.warn(response.headers);
        console.warn(response.config);
      }
    });
  };

  /**
   * extractPatronName(data)
   * Dig in the returned patron data to extract the patron's name.
   *
   * @param {Object} data - The returned patron data.
   */
  this.extractPatronName = function (data) {
    try {
      var _data$data$patron$nam = _slicedToArray(data.data.patron.names, 1),
          patronName = _data$data$patron$nam[0];

      return patronName;
    } catch (e) {
      return null;
    }
  };

  /**
   * modelPatronName (name)
   * Model the returned patron name data to get a string of the full name
   * and a string of the initial.
   *
   * @param {string} name - The name data returned.
   * @return {Object} The object contains the modeled patron name and initial.
   */
  this.modelPatronName = function (name) {
    if (!name) {
      return { name: '', initial: '' };
    }

    var nameArray = name.replace(/ /g, '').split(',').reverse();
    var initialArray = (0, _underscore.map)(nameArray, function (item) {
      return item.charAt(0);
    });
    var patronName = nameArray[0];
    var patronInitial = initialArray.join('');

    return { name: patronName, initial: patronInitial };
  };
}

exports.default = new Utils();
module.exports = exports['default'];