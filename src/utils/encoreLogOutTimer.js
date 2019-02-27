import accountConfig from './../accountConfig.js';
import utils from './utils';

function EncoreLogOutTimer() {
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
  this.setEncoreLoggedInTimer = (currentLocation, currentTime, isTest = false) => {
    const encoreLogInExpireDuration = accountConfig.patLoggedInCookieExpiredTime;

    // See if the user has logged in Encore
    if (utils.hasCookie('PAT_LOGGED_IN')) {
      // Then check if the user is visiting a new Encore page
      if (currentLocation === 'browse.nypl.org') {
        utils.setCookie('ENCORE_LAST_VISITED', currentTime);
        this.logOutFromEncoreIn(encoreLogInExpireDuration, isTest);
      } else {
        const lastVisitedEncoreTime = utils.getCookie('ENCORE_LAST_VISITED');
        const timeTillLogOut = lastVisitedEncoreTime
          ? encoreLogInExpireDuration - (currentTime - lastVisitedEncoreTime)
          : undefined;

        this.logOutFromEncoreIn(timeTillLogOut, isTest);
      }
    } else {
      // Delete cookie "nyplIdentityPatron" to show Header logged out if cookie "PAT_LOGGED_IN"
      // does not exist
      if (utils.hasCookie('nyplIdentityPatron')) {
        utils.deleteCookie('nyplIdentityPatron');
      }
    }
  };

  /**
   * logOutFromEncoreIn(time, isTest)
   * The timer to delete log in related cookies. It is called by setEncoreLoggedInTimer.
   * @param {time} - The milliseconds for the timer to count down
   * @param {boolean} - The flag to determine if the function is run for tests
   */
  this.logOutFromEncoreIn = (time, isTest) => {
    let timeTillLogOut = (time > 0) ? time : 0;

    // Only for testing. If the function is run for tests, set the timeout no longer than 2 seconds
    if (isTest && timeTillLogOut > 2000) {
      timeTillLogOut = 2000;
    }

    setTimeout(() => {
      utils.deleteCookie('PAT_LOGGED_IN');
      utils.deleteCookie('ENCORE_LAST_VISITED');
      utils.deleteCookie('nyplIdentityPatron');
    }, timeTillLogOut);
  };
}

export default new EncoreLogOutTimer();