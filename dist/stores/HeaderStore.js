'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _dgxAltCenter = require('dgx-alt-center');

var _dgxAltCenter2 = _interopRequireDefault(_dgxAltCenter);

var _actionsActionsJs = require('../actions/Actions.js');

var _actionsActionsJs2 = _interopRequireDefault(_actionsActionsJs);

var HeaderStore = (function () {
  function HeaderStore() {
    _classCallCheck(this, HeaderStore);

    this.bindListeners({
      handleUpdateHeaderData: _actionsActionsJs2['default'].UPDATE_HEADER_DATA,
      handleFetchHeaderData: _actionsActionsJs2['default'].FETCH_HEADER_DATA,
      handleHeaderDataFailedFetch: _actionsActionsJs2['default'].FAILED_HEADER_DATA,
      handleSetMobileMenuButtonValue: _actionsActionsJs2['default'].SET_MOBILE_MENU_BUTTON_VALUE,
      handleSetMobileMyNyplButtonValue: _actionsActionsJs2['default'].SET_MOBILE_MY_NYPL_BUTTON_VALUE,
      handleSearchButtonActionValue: _actionsActionsJs2['default'].SEARCH_BUTTON_ACTION_VALUE,
      handleUpdateIsHeaderSticky: _actionsActionsJs2['default'].UPDATE_IS_HEADER_STICKY,
      handleSetLastActiveMenuItem: _actionsActionsJs2['default'].SET_LAST_ACTIVE_MENU_ITEM,
      handleSetClientAppEnv: _actionsActionsJs2['default'].SET_CLIENT_APP_ENV,
      handleToggleSubscribeFormVisible: _actionsActionsJs2['default'].TOGGLE_SUBSCRIBE_FORM_VISIBLE,
      handleToggleMyNyplVisible: _actionsActionsJs2['default'].TOGGLE_MY_NYPL_VISIBLE,
      handleToggleStickyMyNyplVisible: _actionsActionsJs2['default'].TOGGLE_STICKY_MY_NYPL_VISIBLE
    });

    this.exportPublicMethods({
      _getMobileMenuBtnValue: this._getMobileMenuBtnValue,
      _getSearchButtonActionValue: this._getSearchButtonActionValue,
      _getMobileMyNyplButtonValue: this._getMobileMyNyplButtonValue,
      _getIsStickyValue: this._getIsStickyValue,
      _getLastActiveMenuItem: this._getLastActiveMenuItem,
      _getSubscribeFormVisible: this._getSubscribeFormVisible,
      _getMyNyplVisible: this._getMyNyplVisible,
      _getStickyMyNyplVisible: this._getStickyMyNyplVisible,
      _getClientAppEnv: this._getClientAppEnv
    });

    this.state = {
      headerData: [],
      errorMessage: null,
      isSticky: false,
      lastActiveMenuItem: '',
      activeMobileButton: '',
      searchButtonAction: '',
      mobileMyNyplButton: '',
      subscribeFormVisible: false,
      myNyplVisible: false,
      stickyLoginVisible: false,
      clientAppEnv: ''
    };
  }

  // Export ALT Store

  /*** PUBLIC METHODS ***/
  /**
   * _getMobileMenuBtnValue()
   * returns the current state.activeMobileButton
   * value.
   * @return {String}
   */

  _createClass(HeaderStore, [{
    key: '_getMobileMenuBtnValue',
    value: function _getMobileMenuBtnValue() {
      return this.state.activeMobileButton;
    }

    /**
     * _getMobileMyNyplButtonValue()
     * returns the current state.mobileMyNyplButton
     * value.
     * @return {String}
     */
  }, {
    key: '_getMobileMyNyplButtonValue',
    value: function _getMobileMyNyplButtonValue() {
      return this.state.mobileMyNyplButton;
    }

    /**
     * _getSubscribeFormVisible()
     * returns the current state.subscribeFormVisible
     * value.
     * @return {Boolean} true/false
     */
  }, {
    key: '_getSubscribeFormVisible',
    value: function _getSubscribeFormVisible() {
      return this.state.subscribeFormVisible;
    }

    /**
     * _getMyNyplVisible()
     * returns the current state.myNYPLVisible
     * value.
     * @return {Boolean} true/false
     */
  }, {
    key: '_getMyNyplVisible',
    value: function _getMyNyplVisible() {
      return this.state.myNyplVisible;
    }

    /**
     * _getStickyMyNyplVisible()
     * returns the current state.stickyLoginVisible
     * value.
     * @return {Boolean} true/false
     */
  }, {
    key: '_getStickyMyNyplVisible',
    value: function _getStickyMyNyplVisible() {
      return this.state.stickyLoginVisible;
    }

    /**
     * _getSearchButtonActionValue()
     * returns the current state.getSearchButtonActionValue
     * value.
     * @return {String}
     */
  }, {
    key: '_getSearchButtonActionValue',
    value: function _getSearchButtonActionValue() {
      return this.state.searchButtonAction;
    }

    /**
     * _getIsStickyValue() 
     * returns the current state.isSticky value.
     *
     * @return {Boolean} true/false
     */
  }, {
    key: '_getIsStickyValue',
    value: function _getIsStickyValue() {
      return this.state.isSticky;
    }

    /**
     * _getLastActiveMenuItem()
     * returns the current state.lastActiveMenuItem
     * value.
     * @return {String}
     */
  }, {
    key: '_getLastActiveMenuItem',
    value: function _getLastActiveMenuItem() {
      return this.state.lastActiveMenuItem;
    }
  }, {
    key: '_getClientAppEnv',
    value: function _getClientAppEnv() {
      return this.state.clientAppEnv;
    }

    /*** PRIVATE METHODS ***/
  }, {
    key: 'handleUpdateHeaderData',
    value: function handleUpdateHeaderData(data) {
      this.setState({ headerData: data });
    }
  }, {
    key: 'handleFetchHeaderData',
    value: function handleFetchHeaderData() {
      this.setState({ headerData: [] });
    }
  }, {
    key: 'handleHeaderDataFailedFetch',
    value: function handleHeaderDataFailedFetch(errorMessage) {
      this.setState({ errorMessage: errorMessage });
    }
  }, {
    key: 'handleSetMobileMenuButtonValue',
    value: function handleSetMobileMenuButtonValue(currentActiveMobileButton) {
      this.setState({ activeMobileButton: currentActiveMobileButton });
    }
  }, {
    key: 'handleSetMobileMyNyplButtonValue',
    value: function handleSetMobileMyNyplButtonValue(value) {
      this.setState({ mobileMyNyplButton: value });
    }

    // The set search button action value to Store
  }, {
    key: 'handleSearchButtonActionValue',
    value: function handleSearchButtonActionValue(actionValue) {
      this.setState({ searchButtonAction: actionValue });
    }
  }, {
    key: 'handleUpdateIsHeaderSticky',
    value: function handleUpdateIsHeaderSticky(value) {
      this.setState({ isSticky: value });
    }
  }, {
    key: 'handleSetLastActiveMenuItem',
    value: function handleSetLastActiveMenuItem(value) {
      this.setState({ lastActiveMenuItem: value });
    }
  }, {
    key: 'handleSetClientAppEnv',
    value: function handleSetClientAppEnv(value) {
      this.setState({ clientAppEnv: value });
    }
  }, {
    key: 'handleToggleSubscribeFormVisible',
    value: function handleToggleSubscribeFormVisible(value) {
      this.setState({ subscribeFormVisible: value });
    }
  }, {
    key: 'handleToggleMyNyplVisible',
    value: function handleToggleMyNyplVisible(value) {
      this.setState({ myNyplVisible: value });
    }
  }, {
    key: 'handleToggleStickyMyNyplVisible',
    value: function handleToggleStickyMyNyplVisible(value) {
      this.setState({ stickyLoginVisible: value });
    }
  }]);

  return HeaderStore;
})();

exports['default'] = _dgxAltCenter2['default'].createStore(HeaderStore, 'HeaderStore');
module.exports = exports['default'];