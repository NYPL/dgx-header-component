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

var Actions = (function () {
  function Actions() {
    _classCallCheck(this, Actions);
  }

  _createClass(Actions, [{
    key: 'fetchHeaderData',
    value: function fetchHeaderData(environment) {
      var self = this;
      var appEnv = environment;
      var headerRootUrl = undefined;

      // Set the proper URL to fetch the Header Data model.
      if (appEnv === 'development') {
        headerRootUrl = _appConfigJs2['default'].headerClientEnv.development;
      } else if (appEnv === 'qa') {
        headerRootUrl = _appConfigJs2['default'].headerClientEnv.qa;
      } else {
        headerRootUrl = _appConfigJs2['default'].headerClientEnv.production;
      }

      // Here we will use the client side AJAX request
      // to fetch Header Data
      _axios2['default'].get(headerRootUrl + '/header-data').then(function (result) {
        self.actions.updateHeaderData(result.data);
      })['catch'](function (response) {
        console.warn('Error on Axios GET request: ' + headerRootUrl + '/header-data');

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
    key: 'setClientAppEnv',
    value: function setClientAppEnv(value) {
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