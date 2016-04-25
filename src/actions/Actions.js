import alt from 'dgx-alt-center';
import axios from 'axios';
import appConfig from '../appConfig.js';

class Actions {
  fetchHeaderData(environment, urlType) {
    const typeOfUrl = urlType === 'absolute' ? '/header-data?urls=absolute' : '/header-data';
    let headerRootUrl;

    // Set the proper URL to fetch the Header Data model.
    if (environment === 'development') {
      headerRootUrl = appConfig.headerClientEnv.development;
    } else if (environment === 'qa') {
      headerRootUrl = appConfig.headerClientEnv.qa;
    } else {
      headerRootUrl = appConfig.headerClientEnv.production;
    }

    const fullUrl = `${headerRootUrl}${typeOfUrl}`;

    // Fetch proper /header-data endpoint
    axios
      .get(fullUrl)
      .then(result => {
        this.actions.updateHeaderData(result.data);
      })
      .catch(response => {
        console.warn(`Error on Axios GET request: ${fullUrl}`);

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
