'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dgxAltCenter = require('dgx-alt-center');

var _dgxAltCenter2 = _interopRequireDefault(_dgxAltCenter);

var _Actions = require('../actions/Actions.js');

var _Actions2 = _interopRequireDefault(_Actions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HeaderStore = function () {
  function HeaderStore() {
    _classCallCheck(this, HeaderStore);

    this.bindListeners({
      handleSetMobileMenuButtonValue: _Actions2.default.SET_MOBILE_MENU_BUTTON_VALUE,
      handleSetMobileMyNyplButtonValue: _Actions2.default.SET_MOBILE_MY_NYPL_BUTTON_VALUE,
      handleSearchButtonActionValue: _Actions2.default.SEARCH_BUTTON_ACTION_VALUE,
      handleUpdateIsHeaderSticky: _Actions2.default.UPDATE_IS_HEADER_STICKY,
      handleToggleSubscribeFormVisible: _Actions2.default.TOGGLE_SUBSCRIBE_FORM_VISIBLE,
      handleToggleMyNyplVisible: _Actions2.default.TOGGLE_MY_NYPL_VISIBLE,
      handleToggleStickyMyNyplVisible: _Actions2.default.TOGGLE_STICKY_MY_NYPL_VISIBLE
    });

    this.exportPublicMethods({
      getMobileMenuBtnValue: this.getMobileMenuBtnValue,
      getSearchButtonActionValue: this.getSearchButtonActionValue,
      getMobileMyNyplButtonValue: this.getMobileMyNyplButtonValue,
      getIsStickyValue: this.getIsStickyValue,
      getSubscribeFormVisible: this.getSubscribeFormVisible,
      getMyNyplVisible: this.getMyNyplVisible,
      getStickyMyNyplVisible: this.getStickyMyNyplVisible
    });

    this.state = {
      isSticky: false,
      activeMobileButton: '',
      searchButtonAction: '',
      mobileMyNyplButton: '',
      subscribeFormVisible: false,
      myNyplVisible: false,
      stickyLoginVisible: false
    };
  }

  /**
   * getMobileMenuBtnValue()
   * returns the current state.activeMobileButton
   * value.
   * @return {String}
   */


  _createClass(HeaderStore, [{
    key: 'getMobileMenuBtnValue',
    value: function getMobileMenuBtnValue() {
      return this.state.activeMobileButton;
    }

    /**
     * getMobileMyNyplButtonValue()
     * returns the current state.mobileMyNyplButton
     * value.
     * @return {String}
     */

  }, {
    key: 'getMobileMyNyplButtonValue',
    value: function getMobileMyNyplButtonValue() {
      return this.state.mobileMyNyplButton;
    }

    /**
     * getSubscribeFormVisible()
     * returns the current state.subscribeFormVisible
     * value.
     * @return {Boolean} true/false
     */

  }, {
    key: 'getSubscribeFormVisible',
    value: function getSubscribeFormVisible() {
      return this.state.subscribeFormVisible;
    }

    /**
     * getMyNyplVisible()
     * returns the current state.myNYPLVisible
     * value.
     * @return {Boolean} true/false
     */

  }, {
    key: 'getMyNyplVisible',
    value: function getMyNyplVisible() {
      return this.state.myNyplVisible;
    }

    /**
     * getStickyMyNyplVisible()
     * returns the current state.stickyLoginVisible
     * value.
     * @return {Boolean} true/false
     */

  }, {
    key: 'getStickyMyNyplVisible',
    value: function getStickyMyNyplVisible() {
      return this.state.stickyLoginVisible;
    }

    /**
     * getSearchButtonActionValue()
     * returns the current state.getSearchButtonActionValue
     * value.
     * @return {String}
     */

  }, {
    key: 'getSearchButtonActionValue',
    value: function getSearchButtonActionValue() {
      return this.state.searchButtonAction;
    }

    /**
     * getIsStickyValue()
     * returns the current state.isSticky value.
     *
     * @return {Boolean} true/false
     */

  }, {
    key: 'getIsStickyValue',
    value: function getIsStickyValue() {
      return this.state.isSticky;
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
}();

// Export ALT Store


exports.default = _dgxAltCenter2.default.createStore(HeaderStore, 'HeaderStore');
module.exports = exports['default'];