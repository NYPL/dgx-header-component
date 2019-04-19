'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _accountConfig = require('../accountConfig');

var _accountConfig2 = _interopRequireDefault(_accountConfig);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function EncoreLogOutTimer() {
  var _this = this;

  /**
   * setEncoreLoggedInTimer(currentLocationHost, currentTime, isTest)
   * This method is to set the timer to delete ‘PAT_LOGGED_IN’ cookie after its expiration time.
   * This is to keep the logged in status consistent with Encore server,
   * so the patrons don’t have to log in when they are using non-account-required operations,
   * such as searching items.
   * The default expiration time is 30 mins.
   * @param {object} - The current location's host
   * @param {number} - The milliseconds elapsed since January 1, 1970 from Date.now()
   * @param {boolean} - The flag to determine if the function is run for tests
   */
  this.setEncoreLoggedInTimer = function (currentLocationHost, currentTime) {
    var isTest = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var encoreLogInExpireDuration = _accountConfig2.default.patLoggedInCookieExpiredTime;
    var isOnEncore = currentLocationHost === 'browse.nypl.org';
    var isLoggedIn = _utils2.default.hasCookie('PAT_LOGGED_IN');

    if (!isLoggedIn) {
      // Delete cookie "nyplIdentityPatron" to show Header logged out if cookie "PAT_LOGGED_IN"
      // does not exist
      if (_utils2.default.hasCookie('nyplIdentityPatron')) {
        _utils2.default.deleteCookie('nyplIdentityPatron');
      }

      // Delete cookie "ENCORE_LAST_VISITED" which holds the last time the user visited Encore
      // if the cookie "PAT_LOGGED_IN" does not exist
      if (_utils2.default.hasCookie('ENCORE_LAST_VISITED')) {
        _utils2.default.deleteCookie('ENCORE_LAST_VISITED');
      }

      // Completely log out the user
      _this.loadLogoutIframe();
    } else {
      if (isOnEncore) {
        // Set the cookie "ENCORE_LAST_VISITED" once the user visited Encore
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
      _this.loadLogoutIframe();
    }, timeTillLogOut);
  };

  /**
   * loadLogoutIframe()
   * The function that loads a temporary iframe with the log out endpoint
   * to completely log out the user from Encore. It then deletes the iframe right away.
   * The reason to use this way to load the endpoint is to bypass the CORS loading from the client
   * since III does not want to provide us a real log out API URI.
   */
  this.loadLogoutIframe = function () {
    var logoutIframe = document.createElement('iframe');

    var _document$getElements = document.getElementsByTagName('body'),
        _document$getElements2 = _slicedToArray(_document$getElements, 1),
        body = _document$getElements2[0];

    logoutIframe.setAttribute(
    // The endpoint is the URL for logging out from Encore
    'src', 'https://browse.nypl.org/iii/encore/logoutFilterRedirect?suite=def');
    // Assigns the ID for CSS ussage
    logoutIframe.setAttribute('id', 'logoutIframe');
    body.appendChild(logoutIframe);
    setTimeout(function () {
      body.removeChild(logoutIframe);
    }, 100);
  };
}

exports.default = new EncoreLogOutTimer();
module.exports = exports['default'];