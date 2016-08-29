'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dgxAltCenter = require('dgx-alt-center');

var _dgxAltCenter2 = _interopRequireDefault(_dgxAltCenter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import axios from 'axios';
// import appConfig from '../appConfig.js';
// import navConfig from '../navConfig.js';

var Actions = function () {
  function Actions() {
    _classCallCheck(this, Actions);
  }

  _createClass(Actions, [{
    key: 'setMobileMenuButtonValue',

    // fetchHeaderData(environment, urlType, iaType) {
    //   let headerRootUrl;
    //   let fullUrl;
    //   const headerEndpoint = '/header-data';
    //   const typeOfUrl = urlType === 'absolute' ? 'urls=absolute' : '';
    //   const typeOfIa = iaType === 'upcoming' ? 'ia=upcoming' : '';
    //
    //   // Set the proper URL to fetch the Header Data model.
    //   if (environment === 'development') {
    //     headerRootUrl = appConfig.headerClientEnv.development;
    //   } else if (environment === 'qa') {
    //     headerRootUrl = appConfig.headerClientEnv.qa;
    //   } else if (environment === 'local') {
    //     headerRootUrl = appConfig.headerClientEnv.local;
    //   } else {
    //     headerRootUrl = appConfig.headerClientEnv.production;
    //   }
    //
    //   // Concatenate the proper query params
    //   if (typeOfUrl !== '' && typeOfIa !== '') {
    //     fullUrl = `${headerRootUrl}${headerEndpoint}?${typeOfUrl}&${typeOfIa}`;
    //   } else if (typeOfUrl !== '' && typeOfIa === '') {
    //     fullUrl = `${headerRootUrl}${headerEndpoint}?${typeOfUrl}`;
    //   } else if (typeOfUrl === '' && typeOfIa !== '') {
    //     fullUrl = `${headerRootUrl}${headerEndpoint}?${typeOfIa}`;
    //   } else {
    //     fullUrl = `${headerRootUrl}${headerEndpoint}`;
    //   }
    //
    //   // Fetch proper /header-data endpoint
    //   axios
    //     .get(fullUrl)
    //     .then(result => {
    //       this.actions.updateHeaderData(result.data);
    //     })
    //     .catch(response => {
    //       console.warn(`Error on Axios GET request: ${fullUrl}`);
    //
    //       // Fallback Mode - Populate Header Items from config
    //       if (typeOfIa !== '') {
    //         this.actions.updateHeaderData(navConfig.upcoming);
    //       } else {
    //         this.actions.updateHeaderData(navConfig.current);
    //       }
    //
    //       if (response instanceof Error) {
    //         console.log(response.message);
    //       } else {
    //         // The request was made, but the server responded with a status code
    //         // that falls out of the range of 2xx
    //         console.log(response.data);
    //         console.log(response.status);
    //         console.log(response.headers);
    //         console.log(response.config);
    //       }
    //     });
    // }
    //
    // updateHeaderData(data) {
    //   this.dispatch(data);
    // }
    //
    // failedHeaderData(errorMessage) {
    //   this.dispatch(errorMessage);
    // }

    value: function setMobileMenuButtonValue(currentActiveMobileButton) {
      this.dispatch(currentActiveMobileButton);
    }
  }, {
    key: 'setMobileMyNyplButtonValue',
    value: function setMobileMyNyplButtonValue(value) {
      this.dispatch(value);
    }
  }, {
    key: 'setLastActiveMenuItem',
    value: function setLastActiveMenuItem(value) {
      this.dispatch(value);
    }
  }, {
    key: 'searchButtonActionValue',
    value: function searchButtonActionValue(actionValue) {
      this.dispatch(actionValue);
    }
  }, {
    key: 'updateIsHeaderSticky',
    value: function updateIsHeaderSticky(value) {
      this.dispatch(value);
    }
  }, {
    key: 'toggleSubscribeFormVisible',
    value: function toggleSubscribeFormVisible(value) {
      this.dispatch(value);
    }
  }, {
    key: 'toggleMyNyplVisible',
    value: function toggleMyNyplVisible(value) {
      this.dispatch(value);
    }
  }, {
    key: 'toggleStickyMyNyplVisible',
    value: function toggleStickyMyNyplVisible(value) {
      this.dispatch(value);
    }
  }]);

  return Actions;
}();

exports.default = _dgxAltCenter2.default.createActions(Actions);
module.exports = exports['default'];