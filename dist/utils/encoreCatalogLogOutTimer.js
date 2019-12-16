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

function EncoreCatalogLogOutTimer() {
  var _this = this;

  /**
   * setEncoreLoggedInTimer(currentLocationHost, currentTime, isTest)
   * This method is to set the timer to delete related cookies and completely log out from Encore
   * after its expiration time.
   * This is to keep the logged in status consistent with Encore server
   * so the patrons don’t have to log in when they are using non-account-required operations
   * such as searching items.
   * Unfortunately, the user will be logged out from Catalog as well, so we have to keep tracking
   * the users' activites on Catalog too. Also, we add Test Classic Catalog for QA use.
   * The default expiration time is 30 mins.
   * @param {object} - The current location's host
   * @param {number} - The milliseconds elapsed since January 1, 1970 from Date.now()
   * @param {boolean} - The flag to determine if the function is run for tests
   */
  this.setEncoreLoggedInTimer = function (currentLocationHost, currentTime) {
    var isTest = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var domainsForExtendingLogIn = ['browse.nypl.org', // the domain of Encore's pages
    'catalog.nypl.org', // the domain of Research Catalog's pages
    'nypl-sierra-test.nypl.org'];
    var encoreLogInExpireDuration = _accountConfig2.default.patLoggedInCookieExpiredTime;
    var isOnValidDomain = domainsForExtendingLogIn.some(function (d) {
      return d === currentLocationHost;
    });
    var isLoggedIn = _utils2.default.hasCookie('PAT_LOGGED_IN');

    if (!isLoggedIn) {
      // Delete cookie "nyplIdentityPatron" to show Header logged out if cookie "PAT_LOGGED_IN"
      // does not exist
      if (_utils2.default.hasCookie('nyplIdentityPatron')) {
        _utils2.default.deleteCookie('nyplIdentityPatron');
      }

      // Delete cookie "VALID_DOMAIN_LAST_VISITED" which holds the last time the user visited
      // the valid domain if the cookie "PAT_LOGGED_IN" does not exist
      if (_utils2.default.hasCookie('VALID_DOMAIN_LAST_VISITED')) {
        _utils2.default.deleteCookie('VALID_DOMAIN_LAST_VISITED');
      }
    } else {
      // Update VALID_DOMAIN_LAST_VISITED in two scenarios:
      //  1. Patron is on a Sierra hosted page, so actively refreshing their
      //     session
      //  2. The VALID_DOMAIN_LAST_VISITED cookie doesn't exist, which will
      //     only happen if the patron logged in through a redirect, without
      //     running JS on a "valid domain"
      if (isOnValidDomain || !_utils2.default.hasCookie('VALID_DOMAIN_LAST_VISITED')) {
        _utils2.default.setCookie('VALID_DOMAIN_LAST_VISITED', currentTime);
        _this.logOutFromEncoreAndCatalogIn(encoreLogInExpireDuration, isTest);
      } else {
        var lastVisitedValidDomainTime = _utils2.default.getCookie('VALID_DOMAIN_LAST_VISITED');
        var timeTillLogOut = lastVisitedValidDomainTime ? encoreLogInExpireDuration - (currentTime - lastVisitedValidDomainTime) : undefined;

        _this.logOutFromEncoreAndCatalogIn(timeTillLogOut, isTest);
      }
    }
  };

  /**
   * logOutFromEncoreAndCatalogIn(time, isTest)
   * The timer to delete log in related cookies and call the method to completely log out from Encore
   * and Catalog. It is called by setEncoreLoggedInTimer.
   * @param {time} - The milliseconds for the timer to count down
   * @param {boolean} - The flag to determine if the function is run for tests
   */
  this.logOutFromEncoreAndCatalogIn = function (time, isTest) {
    var timeTillLogOut = time > 0 ? time : 0;

    // Only for testing. If the function is run for tests, set the timeout no longer than 2 seconds
    if (isTest && timeTillLogOut > 8000) {
      timeTillLogOut = 8000;
    }

    setTimeout(function () {
      _utils2.default.deleteCookie('PAT_LOGGED_IN');
      _utils2.default.deleteCookie('VALID_DOMAIN_LAST_VISITED');
      _utils2.default.deleteCookie('nyplIdentityPatron');
      _this.loadLogoutIframe(isTest);
    }, timeTillLogOut);
  };

  /**
   * loadLogoutIframe(isTest)
   * The function that loads a temporary iframe with the log out endpoint
   * to completely log out the user from Encore and Catalog. It then deletes the iframe right away.
   * The reason to use this way to load the endpoint is to bypass the CORS loading from the client
   * since III does not want to provide us a real log out API URI.
   * * @param {isTest} - If running this method for testing, delete the iframe right away
   */
  this.loadLogoutIframe = function (isTest) {
    var logoutIframe = document.createElement('iframe');

    var _document$getElements = document.getElementsByTagName('body'),
        _document$getElements2 = _slicedToArray(_document$getElements, 1),
        body = _document$getElements2[0];

    var iframeExistingTime = isTest ? 100 : 10000;

    logoutIframe.setAttribute(
    // The endpoint is the URL for logging out from Encore
    'src', 'https://browse.nypl.org/iii/encore/logoutFilterRedirect?suite=def');
    // Assigns the ID for CSS ussage
    logoutIframe.setAttribute('id', 'logoutIframe');
    body.appendChild(logoutIframe);
    setTimeout(function () {
      body.removeChild(logoutIframe);
    }, iframeExistingTime);
  };
}

exports.default = new EncoreCatalogLogOutTimer();
module.exports = exports['default'];