'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _dgxReactGa = require('dgx-react-ga');

var _dgxFeatureFlags = require('dgx-feature-flags');

var _dgxFeatureFlags2 = _interopRequireDefault(_dgxFeatureFlags);

var _underscore = require('underscore');

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _appConfig = require('./../appConfig.js');

var _appConfig2 = _interopRequireDefault(_appConfig);

var _gaConfig = require('./../gaConfig.js');

var _gaConfig2 = _interopRequireDefault(_gaConfig);

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
   * createFunctionWithTimeout(callback, optTimeout)
   * The function serves as a pipe to return the function that is passed to it.
   * It also searves as a timer to execute that function after a certain amount of time.
   *
   * @param {Function} callback - The function to be executed after the time of optTimeout
   * @param {Number} optTimeout
   * @return {Function}
   */
  this.createFunctionWithTimeout = function (callback, optTimeout) {
    var called = false;

    var fn = function fn() {
      if (!called) {
        called = true;
        callback();
      }
    };

    setTimeout(fn, optTimeout || 500);

    return fn;
  };

  /**
   * trackSearchQuerySend = (label ='', dimensions = {})
   * Track a GA click event with custom dimensions.
   * The parameter "dimensions" should be an object with dimensions listed as the following format,
   * { dimensions1: 'value1', dimensions2: 'value2', ... }
   * This function will send GA event first, and after it is completed, it will trigger the
   * original event.
   *
   * @param {string} label - Label for GA event.
   * @param {object} dimensions - the object that consists the custom dimensions for the event.
   * @param {function} hitCallback - the function to be executed after sending GA is completed.
   */
  this.trackSearchQuerySend = function (label) {
    var dimensions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var hitCallback = arguments[2];

    _dgxReactGa.ga.ga('send', 'event', _gaConfig2.default.eventCategory, _gaConfig2.default.eventAction, label, 0, dimensions, { hitCallback: _this.createFunctionWithTimeout(hitCallback) });
  };

  /**
   * setDimensions(dimensions)
   * Set the dimensions for GA events. The scope is decided by the admin of the GA platform.
   * This function will set the dimensions that affect all the hits on the same page.
   *
   * @param {array} dimensions - The array of dimensions. Each dimension includes two properties:
   * the index and the value.
   */
  this.setDimensions = function (dimensions) {
    _dgxReactGa.gaUtils.setDimensions(dimensions);
  };

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
   * setCookie(name, value, maxAge)
   * Sets a cookie with a given name, value and defaults the expiration to 24 hours in seconds
   *
   * @param {string} name - The name of the cookie to be looked up.
   * @param {string} value - value of the given cookie.
   * @param {string} maxAge - string representation of cookie's maximum age in seconds
   */
  this.setCookie = function (name, value) {
    var maxAge = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '86400';

    if (!name || !value) {
      return false;
    }

    var expires = '; max-age=' + maxAge;
    document.cookie = encodeURI(name) + '=' + encodeURI(value) + expires + 'path=/; domain=.nypl.org';
  };

  /**
   * deleteCookie(sKey)
   * Delete the cookie by having it expired.
   *
   * @param {string} sKey - The name of the cookie to be looked up.
   */
  this.deleteCookie = function (sKey) {
    document.cookie = sKey + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; ' + 'path=/; domain=.nypl.org;';
  };

  /**
   * getLoginData(cookie, cb, refreshLink, refreshCookieCb, logOutLink)
   * Handle the cookie from log in and make api calls with the callback function passed in.
   * If the returned statusCode is 401 and the cookie is expired, invoke refreshAccessToken()
   * to refresh access_token in the nyplIdentityPatron cookie.
   *
   * @param {string} cookie - The cookie returned.
   * @param {function(result: Object)} cb - The callback function passed in for dealing with data
   * responses.
   * @param {string} refreshLink - The link to call for refreshing access_token
   * @param {function(result: Object)} refreshCookieCb - The callback function passed in for cookie
   * refreshing mechanism.
   */
  this.getLoginData = function (cookie, cb, refreshLink, refreshCookieCb) {
    var decodedToken = JSON.parse(cookie).access_token;
    var endpoint = '' + _appConfig2.default.patronApiUrl + decodedToken;

    _axios2.default.get(endpoint).then(cb).catch(function (response) {
      if (response instanceof Error) {
        console.warn(response.message);
      } else {
        // If the cookie for getting log in Data is expired
        if (response.data.statusCode === 401 && response.data.expired === true) {
          _this.refreshAccessToken(refreshLink, refreshCookieCb, function () {
            _this.deleteCookie('nyplIdentityPatron');
          });
        } else {
          // The request was made, but the server responded with a status code
          // that falls out of the range of 2xx and it is not 401 with the expired token
          console.warn(response.data);
          console.warn(response.status);
          console.warn(response.headers);
          console.warn(response.config);
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
  this.refreshAccessToken = function (api, cb, fallBackCb) {
    _axios2.default.get(api, { withCredentials: true }).then(cb).catch(function (response) {
      if (response instanceof Error) {
        fallBackCb();
        console.warn(response.message);
      } else {
        // The request was made, but the server responded with a status code
        // that falls out of the range of 2xx
        console.warn(response.status);
        console.warn(response.headers);
        console.warn(response.config);
        fallBackCb();
      }
    });
  };

  this.logOut = function (link) {
    window.location.href = link;
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
    var patronInitial = initialArray.join('');

    return { name: name, initial: patronInitial };
  };

  /**
   * renderDynamicLogOutLink (location)
   * Render the log out link URL with redirect URI.
   *
   * @param {string} location - The url it is passed in.
   * @return {String} The log out URL with redirect URI
   */
  this.renderDynamicLogOutLink = function (location) {
    if (!location || location === 'about:blank') {
      return _appConfig2.default.loginMyNyplLinks.logOutLink;
    }

    return _appConfig2.default.loginMyNyplLinks.logOutLink + '?redirect_uri=' + location;
  };

  /**
   * checkFeatureFlagActivated(featureFlagList, componentStateObject)
   * Check if the feature flags have been set. If they have not, activate the function to check
   * if the related cookies are set.
   * @param {string[]} featureFlagList - The list of the feature flags we want to set.
   * @param {object} componentStateObject - The object that points to the state object of
   * the component. The feature flag will change the state of the component through it.
   */
  this.checkFeatureFlagActivated = function (featureFlagList, componentStateObject) {
    (0, _underscore.map)(featureFlagList, function (item) {
      if (!componentStateObject[item]) {
        _this.checkFeatureFlagCookie(item);
      }
    });
  };

  /**
   * checkFeatureFlagCookie(name)
   * Check if the cookie exist. If they do, activate the function to enable
   * the indicated feature flags.
   * @param {string} name - The name of the cookie.
   */
  this.checkFeatureFlagCookie = function (name) {
    if (_this.hasCookie('nyplFeatureFlag' + name)) {
      _dgxFeatureFlags2.default.utils.activateFeature(name);
    }
  };
}

exports.default = new Utils();
module.exports = exports['default'];