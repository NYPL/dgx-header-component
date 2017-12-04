import alt from 'dgx-alt-center';
import Actions from '../actions/Actions.js';

class HeaderStore {
  constructor() {
    this.bindListeners({
      handleSetMobileMenuButtonValue: Actions.SET_MOBILE_MENU_BUTTON_VALUE,
      handleSetMobileMyNyplButtonValue: Actions.SET_MOBILE_MY_NYPL_BUTTON_VALUE,
      handleSearchButtonActionValue: Actions.SEARCH_BUTTON_ACTION_VALUE,
      handleToggleSubscribeFormVisible: Actions.TOGGLE_SUBSCRIBE_FORM_VISIBLE,
      handleToggleMyNyplVisible: Actions.TOGGLE_MY_NYPL_VISIBLE,
    });

    this.exportPublicMethods({
      getMobileMenuBtnValue: this.getMobileMenuBtnValue,
      getSearchButtonActionValue: this.getSearchButtonActionValue,
      getMobileMyNyplButtonValue: this.getMobileMyNyplButtonValue,
      getSubscribeFormVisible: this.getSubscribeFormVisible,
      getMyNyplVisible: this.getMyNyplVisible,
    });

    this.state = {
      activeMobileButton: '',
      searchButtonAction: '',
      mobileMyNyplButton: '',
      subscribeFormVisible: false,
      myNyplVisible: false,
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
   * getSearchButtonActionValue()
   * returns the current state.getSearchButtonActionValue
   * value.
   * @return {String}
   */
  getSearchButtonActionValue() {
    return this.state.searchButtonAction;
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

  handleToggleSubscribeFormVisible(value) {
    this.setState({ subscribeFormVisible: value });
  }

  handleToggleMyNyplVisible(value) {
    this.setState({ myNyplVisible: value });
  }
}

// Export ALT Store
export default alt.createStore(HeaderStore, 'HeaderStore');
