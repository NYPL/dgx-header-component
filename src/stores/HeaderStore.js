import alt from 'dgx-alt-center';
import Actions from '../actions/Actions.js';

class HeaderStore {
  constructor() {
    this.bindListeners({
      handleSetMobileMenuButtonValue: Actions.SET_MOBILE_MENU_BUTTON_VALUE,
      handleSetMobileMyNyplButtonValue: Actions.SET_MOBILE_MY_NYPL_BUTTON_VALUE,
      handleSearchButtonActionValue: Actions.SEARCH_BUTTON_ACTION_VALUE,
      handleUpdateIsHeaderSticky: Actions.UPDATE_IS_HEADER_STICKY,
      handleToggleSubscribeFormVisible: Actions.TOGGLE_SUBSCRIBE_FORM_VISIBLE,
      handleToggleMyNyplVisible: Actions.TOGGLE_MY_NYPL_VISIBLE,
      handleToggleStickyMyNyplVisible: Actions.TOGGLE_STICKY_MY_NYPL_VISIBLE,
    });

    this.exportPublicMethods({
      getMobileMenuBtnValue: this.getMobileMenuBtnValue,
      getSearchButtonActionValue: this.getSearchButtonActionValue,
      getMobileMyNyplButtonValue: this.getMobileMyNyplButtonValue,
      getIsStickyValue: this.getIsStickyValue,
      getSubscribeFormVisible: this.getSubscribeFormVisible,
      getMyNyplVisible: this.getMyNyplVisible,
      getStickyMyNyplVisible: this.getStickyMyNyplVisible,
    });

    this.state = {
      isSticky: false,
      activeMobileButton: '',
      searchButtonAction: '',
      mobileMyNyplButton: '',
      subscribeFormVisible: false,
      myNyplVisible: false,
      stickyLoginVisible: false,
    };
  }

  /**
   * getMobileMenuBtnValue()
   * returns the current state.activeMobileButton
   * value.
   * @return {String}
   */
  getMobileMenuBtnValue() {
    return this.state.activeMobileButton;
  }

  /**
   * getMobileMyNyplButtonValue()
   * returns the current state.mobileMyNyplButton
   * value.
   * @return {String}
   */
  getMobileMyNyplButtonValue() {
    return this.state.mobileMyNyplButton;
  }

  /**
   * getSubscribeFormVisible()
   * returns the current state.subscribeFormVisible
   * value.
   * @return {Boolean} true/false
   */
  getSubscribeFormVisible() {
    return this.state.subscribeFormVisible;
  }

  /**
   * getMyNyplVisible()
   * returns the current state.myNYPLVisible
   * value.
   * @return {Boolean} true/false
   */
  getMyNyplVisible() {
    return this.state.myNyplVisible;
  }

  /**
   * getStickyMyNyplVisible()
   * returns the current state.stickyLoginVisible
   * value.
   * @return {Boolean} true/false
   */
  getStickyMyNyplVisible() {
    return this.state.stickyLoginVisible;
  }

  /**
   * getSearchButtonActionValue()
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
