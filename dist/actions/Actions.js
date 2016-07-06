'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _dgxAltCenter = require('dgx-alt-center');

var _dgxAltCenter2 = _interopRequireDefault(_dgxAltCenter);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _appConfigJs = require('../appConfig.js');

var _appConfigJs2 = _interopRequireDefault(_appConfigJs);

var _navConfigJs = require('../navConfig.js');

var _navConfigJs2 = _interopRequireDefault(_navConfigJs);

var Actions = (function () {
  function Actions() {
    _classCallCheck(this, Actions);
  }

  _createClass(Actions, [{
    key: 'fetchHeaderData',
    value: function fetchHeaderData(environment, urlType, iaType) {
      var _this = this;

      var headerRootUrl = undefined;
      var fullUrl = undefined;
      var headerEndpoint = '/header-data';
      var typeOfUrl = urlType === 'absolute' ? 'urls=absolute' : '';
      var typeOfIa = iaType === 'upcoming' ? 'ia=upcoming' : '';

      // Set the proper URL to fetch the Header Data model.
      if (environment === 'development') {
        headerRootUrl = _appConfigJs2['default'].headerClientEnv.development;
      } else if (environment === 'qa') {
        headerRootUrl = _appConfigJs2['default'].headerClientEnv.qa;
      } else {
        headerRootUrl = _appConfigJs2['default'].headerClientEnv.production;
      }

      // Concatenate the proper query params
      if (typeOfUrl !== '' && typeOfIa !== '') {
        fullUrl = '' + headerRootUrl + headerEndpoint + '?' + typeOfUrl + '&' + typeOfIa;
      } else if (typeOfUrl !== '' && typeOfIa === '') {
        fullUrl = '' + headerRootUrl + headerEndpoint + '?' + typeOfUrl;
      } else if (typeOfUrl === '' && typeOfIa !== '') {
        fullUrl = '' + headerRootUrl + headerEndpoint + '?' + typeOfIa;
      } else {
        fullUrl = '' + headerRootUrl + headerEndpoint;
      }

      // Fetch proper /header-data endpoint
      _axios2['default'].get(fullUrl).then(function (result) {
        _this.actions.updateHeaderData(result.data);
      })['catch'](function (response) {
        console.warn('Error on Axios GET request: ' + fullUrl);

        // Fallback Mode - Populate Header Items from config
        if (typeOfIa !== '') {
          _this.actions.updateHeaderData(_navConfigJs2['default'].upcoming);
        } else {
          _this.actions.updateHeaderData(_navConfigJs2['default'].current);
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
  }, {
    key: 'updateHeaderData',
    value: function updateHeaderData(data) {
      this.dispatch(data);
    }
  }, {
    key: 'failedHeaderData',
    value: function failedHeaderData(errorMessage) {
      this.dispatch(errorMessage);
    }
  }, {
    key: 'setMobileMenuButtonValue',
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
})();

exports['default'] = _dgxAltCenter2['default'].createActions(Actions);
module.exports = exports['default'];