'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _accountConfig = require('./../accountConfig.js');

var _accountConfig2 = _interopRequireDefault(_accountConfig);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function EncoreLogOutTimer() {
  var _this = this;

  /**
   * setEncoreLoggedInTimer(currentLocation, currentTime, isTest)
   * This method is to set the timer to delete ‘PAT_LOGGED_IN’ cookie after its expiration time.
   * This is to keep the logged in status consistent with Encore server,
   * so the patrons don’t have to log in when they are using non-account-required operations,
   * such as searching items.
   * The default expiration time is 30 mins.
   * @param {object} - The window.location object
   * @param {number} - The milliseconds elapsed since January 1, 1970 from Date.now()
   * @param {boolean} - The flag to determine if the function is run for tests
   */
  this.setEncoreLoggedInTimer = function (currentLocation, currentTime) {
    var isTest = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var encoreLogInExpireDuration = _accountConfig2.default.patLoggedInCookieExpiredTime;

    // See if the user has logged in Encore
    if (_utils2.default.hasCookie('PAT_LOGGED_IN')) {
      // Then check if the user is visiting a new Encore page
      if (currentLocation === 'browse.nypl.org') {
        _utils2.default.setCookie('ENCORE_LAST_VISITED', currentTime);
        _this.logOutFromEncoreIn(encoreLogInExpireDuration, isTest);
      } else {
        var lastVisitedEncoreTime = _utils2.default.getCookie('ENCORE_LAST_VISITED');
        var timeTillLogOut = lastVisitedEncoreTime ? encoreLogInExpireDuration - (currentTime - lastVisitedEncoreTime) : undefined;

        _this.logOutFromEncoreIn(timeTillLogOut, isTest);
      }
    }
  };

  /**
   * logOutFromEncoreIn(time, isTest)
   * The timer to delete log in related cookies. It is called by setEncoreLoggedInTimer.
   * @param {time} - The milliseconds for the timer to count down
   * @param {boolean} - The flag to determine if the function is run for tests
   */
  this.logOutFromEncoreIn = function (time, isTest) {
    var timeTillLogOut = time > 0 ? time : 0;

    // Only for testing. If the function is run for tests, set the timeout no longer than 2 seconds
    if (isTest && timeTillLogOut > 2000) {
      timeTillLogOut = 2000;
    }

    setTimeout(function () {
      _utils2.default.deleteCookie('PAT_LOGGED_IN');
      _utils2.default.deleteCookie('ENCORE_LAST_VISITED');
      _utils2.default.deleteCookie('nyplIdentityPatron');
    }, timeTillLogOut);
  };
}

exports.default = new EncoreLogOutTimer();
module.exports = exports['default'];