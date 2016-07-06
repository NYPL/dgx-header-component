import alt from 'dgx-alt-center';
import axios from 'axios';
import appConfig from '../appConfig.js';
import navConfig from '../navConfig.js';

class Actions {
  fetchHeaderData(environment, urlType, iaType) {
    let headerRootUrl;
    let fullUrl;
    const headerEndpoint = '/header-data';
    const typeOfUrl = urlType === 'absolute' ? 'urls=absolute' : '';
    const typeOfIa = iaType === 'upcoming' ? 'ia=upcoming' : '';

    // Set the proper URL to fetch the Header Data model.
    if (environment === 'development') {
      headerRootUrl = appConfig.headerClientEnv.development;
    } else if (environment === 'qa') {
      headerRootUrl = appConfig.headerClientEnv.qa;
    } else {
      headerRootUrl = appConfig.headerClientEnv.production;
    }

    // Concatenate the proper query params
    if (typeOfUrl !== '' && typeOfIa !== '') {
      fullUrl = `${headerRootUrl}${headerEndpoint}?${typeOfUrl}&${typeOfIa}`;
    } else if (typeOfUrl !== '' && typeOfIa === '') {
      fullUrl = `${headerRootUrl}${headerEndpoint}?${typeOfUrl}`;
    } else if (typeOfUrl === '' && typeOfIa !== '') {
      fullUrl = `${headerRootUrl}${headerEndpoint}?${typeOfIa}`;
    } else {
      fullUrl = `${headerRootUrl}${headerEndpoint}`;
    }

    // Fetch proper /header-data endpoint
    axios
      .get(fullUrl)
      .then(result => {
        this.actions.updateHeaderData(result.data);
      })
      .catch(response => {
        console.warn(`Error on Axios GET request: ${fullUrl}`);

        // Fallback Mode - Populate Header Items from config
        if (typeOfIa !== '') {
          this.actions.updateHeaderData(navConfig.upcoming);
        } else {
          this.actions.updateHeaderData(navConfig.current);
        }

        if (response instanceof Error) {
          console.log(response.message);
        } else {
          // The request was made, but the server responded with a status code
          // that falls out of the range of 2xx
          console.log(response.data);
          console.log(response.status);
          console.log(response.headers);
          console.log(response.config);
        }
      });
  }

  updateHeaderData(data) {
    this.dispatch(data);
  }

  failedHeaderData(errorMessage) {
    this.dispatch(errorMessage);
  }

  setMobileMenuButtonValue(currentActiveMobileButton) {
    this.dispatch(currentActiveMobileButton);
  }

  setMobileMyNyplButtonValue(value) {
    this.dispatch(value);
  }

  setLastActiveMenuItem(value) {
    this.dispatch(value);
  }

  searchButtonActionValue(actionValue) {
    this.dispatch(actionValue);
  }

  updateIsHeaderSticky(value) {
    this.dispatch(value);
  }

  toggleSubscribeFormVisible(value) {
    this.dispatch(value);
  }

  toggleMyNyplVisible(value) {
    this.dispatch(value);
  }

  toggleStickyMyNyplVisible(value) {
    this.dispatch(value);
  }
}

export default alt.createActions(Actions);
