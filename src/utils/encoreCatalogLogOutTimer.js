import accountConfig from '../accountConfig';
import utils from './utils';

function EncoreCatalogLogOutTimer() {
  /**
   * setEncoreLoggedInTimer(currentLocationHost, currentTime, isTest)
   * This method is to set the timer to delete related cookies and completely to log out from Encore
   * after its expiration time.
   * This is to keep the logged in status consistent with Encore server
   * so the patrons don’t have to log in when they are using non-account-required operations
   * such as searching items.
   * Unforetunately, the user will be logged out from Catalog as well, so we have to keep tracking
   * the users' activites on Catalog too.
   * The default expiration time is 30 mins.
   * @param {object} - The current location's host
   * @param {number} - The milliseconds elapsed since January 1, 1970 from Date.now()
   * @param {boolean} - The flag to determine if the function is run for tests
   */
  this.setEncoreLoggedInTimer = (currentLocationHost, currentTime, isTest = false) => {
    const domainsForExtendingLogIn = [
      'browse.nypl.org', // the domain of Encore's pages
      'catalog.nypl.org', // the domain of Catalog's pages
    ];
    const encoreLogInExpireDuration = accountConfig.patLoggedInCookieExpiredTime;
    const isOnValidDomain = domainsForExtendingLogIn.some(d => d === currentLocationHost);
    const isLoggedIn = utils.hasCookie('PAT_LOGGED_IN');

    if (!isLoggedIn) {
      // Delete cookie "nyplIdentityPatron" to show Header logged out if cookie "PAT_LOGGED_IN"
      // does not exist
      if (utils.hasCookie('nyplIdentityPatron')) {
        utils.deleteCookie('nyplIdentityPatron');
      }

      // Delete cookie "VALID_DOMAIN_LAST_VISITED" which holds the last time the user visited
      // the valid domain if the cookie "PAT_LOGGED_IN" does not exist
      if (utils.hasCookie('VALID_DOMAIN_LAST_VISITED')) {
        utils.deleteCookie('VALID_DOMAIN_LAST_VISITED');
      }

      // Completely log out the user
      this.loadLogoutIframe(isTest);
    } else {
      if (isOnValidDomain) {
        // Set the cookie "VALID_DOMAIN_LAST_VISITED" once the user visited Encore or Catalog
        utils.setCookie('VALID_DOMAIN_LAST_VISITED', currentTime);
        this.logOutFromEncoreAndCatalogIn(encoreLogInExpireDuration, isTest);
      } else {
        const lastVisitedValidDomainTime = utils.getCookie('VALID_DOMAIN_LAST_VISITED');
        const timeTillLogOut = lastVisitedValidDomainTime
          ? encoreLogInExpireDuration - (currentTime - lastVisitedValidDomainTime)
          : undefined;

        this.logOutFromEncoreAndCatalogIn(timeTillLogOut, isTest);
      }
    }
  };

  /**
   * logOutFromEncoreAndCatalogIn(time, isTest)
   * The timer to delete log in related cookies and call the metod to complete log out from Encore
   * and Catalog. It is called by setEncoreLoggedInTimer.
   * @param {time} - The milliseconds for the timer to count down
   * @param {boolean} - The flag to determine if the function is run for tests
   */
  this.logOutFromEncoreAndCatalogIn = (time, isTest) => {
    let timeTillLogOut = (time > 0) ? time : 0;

    // Only for testing. If the function is run for tests, set the timeout no longer than 2 seconds
    if (isTest && timeTillLogOut > 8000) {
      timeTillLogOut = 8000;
    }

    setTimeout(() => {
      utils.deleteCookie('PAT_LOGGED_IN');
      utils.deleteCookie('VALID_DOMAIN_LAST_VISITED');
      utils.deleteCookie('nyplIdentityPatron');
      this.loadLogoutIframe(isTest);
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
  this.loadLogoutIframe = (isTest) => {
    const logoutIframe = document.createElement('iframe');
    const [body] = document.getElementsByTagName('body');
    const iframeExistingTime = isTest ? 100 : 10000;

    logoutIframe.setAttribute(
      // The endpoint is the URL for logging out from Encore
      'src', 'https://browse.nypl.org/iii/encore/logoutFilterRedirect?suite=def',
    );
    // Assigns the ID for CSS ussage
    logoutIframe.setAttribute('id', 'logoutIframe');
    body.appendChild(logoutIframe);
    setTimeout(() => { body.removeChild(logoutIframe); }, iframeExistingTime);
  };
}

export default new EncoreCatalogLogOutTimer();
