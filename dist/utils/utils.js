'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _dgxReactGa = require('dgx-react-ga');

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
   * @param {action} String Action for GA event.
   * @param {label} String Label for GA event.
   */
  this.trackHeader = _dgxReactGa.gaUtils.trackEvent('Global Header');

  /**
   * encodeURI(sKey)
   * Enocode the cookie response.
   *
   * @param {sKey} String Name of the cookie to be looked up.
   */
  this.encodeURI = function (sKey) {
    return encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&');
  };

  /**
   * getCookie(sKey)
   * Get a cookie based on its name.
   *
   * @param {sKey} String Name of the cookie to be looked up.
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
   * @param {sKey} String Name of the cookie to be looked up.
   */
  this.hasCookie = function (sKey) {
    if (!sKey) {
      return false;
    }

    return new RegExp('(?:^|;\\s*)' + _this.encodeURI(sKey) + '\\s*\\=').test(document.cookie);
  };
}

exports.default = new Utils();
module.exports = exports['default'];