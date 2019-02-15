import accountConfig from './../accountConfig.js';
import utils from './utils';

function EncoreLogOutTimer() {
  /**
   * setEncoreLoggedInTimer(currentLocation, currentTime)
   * This method is to set the timer to delete ‘PAT_LOGGED_IN’ cookie after its expiration time.
   * This is to keep the logged in status consistent with Encore server,
   * so the patrons don’t have to log in when they are using non-account-required operations,
   * such as searching items.
   * The default expiration time is 30 mins.
   * @param {object} - The window.location object
   * @param {number} - The milliseconds elapsed since January 1, 1970 from Date.now()
   */
  this.setEncoreLoggedInTimer = (currentLocation, currentTime) => {
    const encoreLogInExpireDuration = accountConfig.patLoggedInCookieExpiredTime;

    // See if the user has logged in Encore
    if (utils.hasCookie('PAT_LOGGED_IN')) {
      // Then check if the user is visiting a new Encore page
      if (currentLocation === 'browse.nypl.org') {
        utils.setCookie('ENCORE_LAST_VISITED', currentTime);
        this.logOutFromEncoreIn(encoreLogInExpireDuration);
      } else {
        const lastVisitedEncoreTime = utils.getCookie('ENCORE_LAST_VISITED');
        const timeTillLogOut = lastVisitedEncoreTime
          ? encoreLogInExpireDuration - (currentTime - lastVisitedEncoreTime)
          : undefined;

        this.logOutFromEncoreIn(timeTillLogOut);
      }
    }
  };

  /**
   * logOutFromEncoreIn(time)
   * The timer to delete log in related cookies. It is called by setEncoreLoggedInTimer.
   * @param {time} - The milliseconds for the timer to count down
   */
  this.logOutFromEncoreIn = (time) => {
    const timeTillLogOut = (time > 0) ? time : 0;

    setTimeout(() => {
      utils.deleteCookie('PAT_LOGGED_IN');
      utils.deleteCookie('ENCORE_LAST_VISITED');
      utils.deleteCookie('nyplIdentityPatron');
    }, timeTillLogOut);
  };
}

export default new EncoreLogOutTimer();
