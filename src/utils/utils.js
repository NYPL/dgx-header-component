import moment from 'moment';
import { gaUtils } from 'dgx-react-ga';
import FeatureFlags from 'dgx-feature-flags';
import { map as _map } from 'underscore';
import axios from 'axios';
import config from './../appConfig.js';

function Utils() {
  this.formatDate = (startDate, endDate) => {
    let formattedDate,
      numDaysBetween = (start, end) => {
        let s = moment(start),
          e = moment(end);
        return e.diff(s, 'days');
      },
      dateToString = (start, end, type) => {
        let dateString,
          months = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'];

        if (!start && !end) {
          return;
        }

        // String assignment based on type
        switch (type) {
          case "current":
            dateString = "Open now. Ends " + months[end.getUTCMonth()] +
              " " + end.getUTCDate() + ", " + end.getUTCFullYear() + ".";
            break;
          case "current-ongoing":
            dateString = "Open now. Ongoing.";
            break;
          case "upcoming":
            dateString = "Opening soon. " + months[start.getUTCMonth()] +
              " " + start.getUTCDate() + ", " + start.getUTCFullYear() +
              " - " + months[end.getUTCMonth()] + " " + end.getUTCDate() +
              ", " + end.getUTCFullYear() + ".";
            break;
          case "upcoming-ongoing":
            dateString = "Opening soon. " + months[start.getUTCMonth()] +
            " " + start.getUTCDate() + ", " + start.getUTCFullYear() + ".";
            break;
          default:
            dateString = months[start.getUTCMonth()] + " " + start.getUTCDate() +
              ", " + start.getUTCFullYear() + " - " + months[end.getUTCMonth()] +
              " " + end.getUTCDate() + ", " + end.getUTCFullYear() + ".";
        }
        return dateString;
      };

    if (startDate && endDate) {
      let sDate = new Date(startDate),
        eDate   = new Date(endDate),
        today   = new Date(),
        daysBetweenStartEnd = numDaysBetween(sDate, eDate),
        rangeLimit = 365;

      // Current Event and not past 1 year between start and end dates.
      if (sDate.getTime() <= today.getTime()
        && eDate.getTime() >= today.getTime()
        && daysBetweenStartEnd < rangeLimit
        && daysBetweenStartEnd > 0) {
        formattedDate = dateToString(sDate, eDate, 'current');
      }
      // Current Event and past 1 year which implies Ongoing
      else if (sDate.getTime() <= today.getTime()
        && eDate.getTime() >= today.getTime()
        && daysBetweenStartEnd > rangeLimit) {
        formattedDate = dateToString(sDate, eDate, 'current-ongoing');
      }
      // Upcoming Event and not past 1 year between start and end dates.
      else if (sDate.getTime() > today.getTime()
        && eDate.getTime() >= today.getTime()
        && daysBetweenStartEnd < rangeLimit
        && daysBetweenStartEnd > 0) {
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
  this.trackHeader = gaUtils.trackEvent('Global Header');

  /**
   * encodeURI(sKey)
   * Enocode the cookie response.
   *
   * @param {string} sKey -  The name of the cookie to be looked up.
   */
  this.encodeURI = (sKey) => encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&');

  /**
   * getCookie(sKey)
   * Get a cookie based on its name.
   *
   * @param {string} sKey - The name of the cookie to be looked up.
   */
  this.getCookie = (sKey) => {
    if (!sKey) { return null; }

    return decodeURIComponent(
      document.cookie.replace(
        new RegExp(`(?:(?:^|.*;)\\s*${this.encodeURI(sKey)}\\s*\\=\\s*([^;]*).*$)|^.*$`), '$1'
      )
    ) || null;
  };

  /**
   * hasCookie(sKey)
   * See if a specific cookie.
   *
   * @param {string} sKey - The name of the cookie to be looked up.
   */
  this.hasCookie = (sKey) => {
    if (!sKey) { return false; }

    return (
      new RegExp(`(?:^|;\\s*)${this.encodeURI(sKey)}\\s*\\=`)
    ).test(document.cookie);
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
   * @param {string} logOutLink - The link to call for logging the patrons out
   */
  this.getLoginData = (cookie, cb, refreshLink, refreshCookieCb, logOutLink) => {
    const decodedToken = JSON.parse(cookie).access_token;
    const endpoint = `${config.patronApiUrl}${decodedToken}`;

    axios
      .get(endpoint)
      .then(cb)
      .catch(response => {
        console.warn(`Error on Axios GET request: ${endpoint}`);
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
            this.refreshAccessToken(
              refreshLink,
              refreshCookieCb,
              () => { this.logOut(logOutLink); }
            );
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
  this.refreshAccessToken = (api, cb, fallBackCb) => {
    axios
      .get(
        api,
        { withCredentials: true }
      )
      .then(cb)
      .catch(response => {
        console.warn(`Error on Axios GET request: ${api}`);
        if (response instanceof Error) {
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

  this.logOut = (link) => {
    window.location.href = link;
  };

  /**
   * extractPatronName(data)
   * Dig in the returned patron data to extract the patron's name.
   *
   * @param {Object} data - The returned patron data.
   */
  this.extractPatronName = (data) => {
    try {
      const {
        data: {
          patron: {
            names: [patronName],
          },
        },
      } = data;

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
  this.modelPatronName = (name) => {
    if (!name) {
      return { name: '', initial: '' };
    }

    const nameArray = name.replace(/ /g, '').split(',').reverse();
    const initialArray = _map(nameArray, (item) => item.charAt(0));
    const patronInitial = initialArray.join('');

    return { name, initial: patronInitial };
  };

  /**
   * renderDynamicLogOutLink (location)
   * Render the log out link URL with redirect URI.
   *
   * @param {string} location - The url it is passed in.
   * @return {String} The log out URL with redirect URI
   */
  this.renderDynamicLogOutLink = (location) => {
    if (!location || location === 'about:blank') {
      return config.loginMyNyplLinks.logOutLink;
    }

    return `${config.loginMyNyplLinks.logOutLink}?redirect_uri=${location}`;
  };

  /**
   * checkFeatureFlagActivated(featureFlagList, componentStateObject)
   * Check if the feature flags have been set. If they have not, activate the function to check
   * if the related cookies are set.
   * @param {string[]} featureFlagList - The list of the feature flags we want to set.
   * @param {object} componentStateObject - The object that points to the state object of
   * the component. The feature flag will change the state of the component through it.
   */
  this.checkFeatureFlagActivated = (featureFlagList, componentStateObject) => {
    _map(featureFlagList, (item) => {
      if (!componentStateObject[item]) {
        this.checkFeatureFlagCookie(item);
      }
    });
  };

  /**
   * checkFeatureFlagCookie(name)
   * Check if the cookie exist. If they do, activate the function to enable
   * the indicated feature flags.
   * @param {string} name - The name of the cookie.
   */
  this.checkFeatureFlagCookie = (name) => {
    if (this.hasCookie(`nyplFeatureFlag${name}`)) {
      this.activateFeatureFlag(name);
    }
  };

  /**
   * activateFeatureFlags(name)
   * Activate the feature flag that are indicated in the cookie.
   * @param {string} name - The feature flag's name.
   */
  this.activateFeatureFlag = (name) => {
    FeatureFlags.utils.activateFeature(name);
  };
}

export default new Utils();
