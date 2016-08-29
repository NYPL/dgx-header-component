import alt from 'dgx-alt-center';
import Actions from '../actions/Actions.js';

class HeaderStore {
  constructor() {
    this.bindListeners({
      // handleUpdateHeaderData: Actions.UPDATE_HEADER_DATA,
      // handleFetchHeaderData: Actions.FETCH_HEADER_DATA,
      // handleHeaderDataFailedFetch: Actions.FAILED_HEADER_DATA,
      handleSetMobileMenuButtonValue: Actions.SET_MOBILE_MENU_BUTTON_VALUE,
      handleSetMobileMyNyplButtonValue: Actions.SET_MOBILE_MY_NYPL_BUTTON_VALUE,
      handleSearchButtonActionValue: Actions.SEARCH_BUTTON_ACTION_VALUE,
      handleUpdateIsHeaderSticky: Actions.UPDATE_IS_HEADER_STICKY,
      // handleSetLastActiveMenuItem: Actions.SET_LAST_ACTIVE_MENU_ITEM,
      handleToggleSubscribeFormVisible: Actions.TOGGLE_SUBSCRIBE_FORM_VISIBLE,
      handleToggleMyNyplVisible: Actions.TOGGLE_MY_NYPL_VISIBLE,
      handleToggleStickyMyNyplVisible: Actions.TOGGLE_STICKY_MY_NYPL_VISIBLE,
    });

    this.exportPublicMethods({
      getMobileMenuBtnValue: this.getMobileMenuBtnValue,
      getSearchButtonActionValue: this.getSearchButtonActionValue,
      getMobileMyNyplButtonValue: this.getMobileMyNyplButtonValue,
      getIsStickyValue: this.getIsStickyValue,
      // _getLastActiveMenuItem: this._getLastActiveMenuItem,
      getSubscribeFormVisible: this.getSubscribeFormVisible,
      getMyNyplVisible: this.getMyNyplVisible,
      getStickyMyNyplVisible: this.getStickyMyNyplVisible,
    });

    this.state = {
      // headerData: [],
      // errorMessage: null,
      isSticky: false,
      // lastActiveMenuItem: '',
      activeMobileButton: '',
      searchButtonAction: '',
      mobileMyNyplButton: '',
      subscribeFormVisible: false,
      myNyplVisible: false,
      stickyLoginVisible: false,
    };
  }

  /**
   * _getMobileMenuBtnValue()
   * returns the current state.activeMobileButton
   * value.
   * @return {String}
   */
  getMobileMenuBtnValue() {
    return this.state.activeMobileButton;
  }

  /**
   * _getMobileMyNyplButtonValue()
   * returns the current state.mobileMyNyplButton
   * value.
   * @return {String}
   */
  getMobileMyNyplButtonValue() {
    return this.state.mobileMyNyplButton;
  }

  /**
   * _getSubscribeFormVisible()
   * returns the current state.subscribeFormVisible
   * value.
   * @return {Boolean} true/false
   */
  getSubscribeFormVisible() {
    return this.state.subscribeFormVisible;
  }

  /**
   * _getMyNyplVisible()
   * returns the current state.myNYPLVisible
   * value.
   * @return {Boolean} true/false
   */
  getMyNyplVisible() {
    return this.state.myNyplVisible;
  }

  /**
   * _getStickyMyNyplVisible()
   * returns the current state.stickyLoginVisible
   * value.
   * @return {Boolean} true/false
   */
  getStickyMyNyplVisible() {
    return this.state.stickyLoginVisible;
  }

  /**
   * _getSearchButtonActionValue()
   * returns the current state.getSearchButtonActionValue
   * value.
   * @return {String}
   */
  getSearchButtonActionValue() {
    return this.state.searchButtonAction;
  }

  /**
   * getIsStickyValue()
   * returns the current state.isSticky value.
   *
   * @return {Boolean} true/false
   */
  getIsStickyValue() {
    return this.state.isSticky;
  }

  /**
   * _getLastActiveMenuItem()
   * returns the current state.lastActiveMenuItem
   * value.
   * @return {String}
   */
  // _getLastActiveMenuItem() {
  //   return this.state.lastActiveMenuItem;
  // }

  // handleUpdateHeaderData(data) {
  //   this.setState({ headerData: data });
  // }
  //
  // handleFetchHeaderData() {
  //   this.setState({ headerData: [] });
  // }
  //
  // handleHeaderDataFailedFetch(errorMsg) {
  //   this.setState({ errorMessage: errorMsg });
  // }

  handleSetMobileMenuButtonValue(currentActiveMobileButton) {
    this.setState({ activeMobileButton: currentActiveMobileButton });
  }

  handleSetMobileMyNyplButtonValue(value) {
    this.setState({ mobileMyNyplButton: value });
  }

  // The set search button action value to Store
  handleSearchButtonActionValue(actionValue) {
    this.setState({ searchButtonAction: actionValue });
  }

  handleUpdateIsHeaderSticky(value) {
    this.setState({ isSticky: value });
  }

  // handleSetLastActiveMenuItem(value) {
  //   this.setState({ lastActiveMenuItem: value });
  // }

  handleToggleSubscribeFormVisible(value) {
    this.setState({ subscribeFormVisible: value });
  }

  handleToggleMyNyplVisible(value) {
    this.setState({ myNyplVisible: value });
  }

  handleToggleStickyMyNyplVisible(value) {
    this.setState({ stickyLoginVisible: value });
  }
}

// Export ALT Store
export default alt.createStore(HeaderStore, 'HeaderStore');
