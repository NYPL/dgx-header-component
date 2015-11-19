import alt from 'dgx-alt-center';
import Actions from '../actions/Actions.js';

class HeaderStore {
  constructor(){

    this.bindListeners({
      handleUpdateHeaderData: Actions.UPDATE_HEADER_DATA,
      handleFetchHeaderData: Actions.FETCH_HEADER_DATA,
      handleHeaderDataFailedFetch: Actions.FAILED_HEADER_DATA,
      handleSetMobileMenuButtonValue: Actions.SET_MOBILE_MENU_BUTTON_VALUE,
      handleSetMobileMyNyplButtonValue: Actions.SET_MOBILE_MY_NYPL_BUTTON_VALUE,
      handleSearchButtonActionValue: Actions.SEARCH_BUTTON_ACTION_VALUE,
      handleUpdateIsHeaderSticky: Actions.UPDATE_IS_HEADER_STICKY,
      handleSetLastActiveMenuItem: Actions.SET_LAST_ACTIVE_MENU_ITEM,
      handleSetClientAppEnv: Actions.SET_CLIENT_APP_ENV,
      handleToggleSubscribeFormVisible: Actions.TOGGLE_SUBSCRIBE_FORM_VISIBLE,
      handleToggleMyNyplVisible: Actions.TOGGLE_MY_NYPL_VISIBLE,
      handleToggleStickyMyNyplVisible: Actions.TOGGLE_STICKY_MY_NYPL_VISIBLE
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
      searchButtonAction:'',
      mobileMyNyplButton: '',
      subscribeFormVisible: false,
      myNyplVisible: false,
      stickyLoginVisible: false,
      clientAppEnv: ''
    };
  }

  /*** PUBLIC METHODS ***/
  /**
   * _getMobileMenuBtnValue()
   * returns the current state.activeMobileButton
   * value.
   * @return {String}
   */
  _getMobileMenuBtnValue() {
    return this.state.activeMobileButton;
  }

  /**
   * _getMobileMyNyplButtonValue()
   * returns the current state.mobileMyNyplButton
   * value.
   * @return {String}
   */
  _getMobileMyNyplButtonValue() {
    return this.state.mobileMyNyplButton;
  }

  /**
   * _getSubscribeFormVisible()
   * returns the current state.subscribeFormVisible
   * value.
   * @return {Boolean} true/false
   */
  _getSubscribeFormVisible() {
    return this.state.subscribeFormVisible;
  }

  /**
   * _getMyNyplVisible()
   * returns the current state.myNYPLVisible
   * value.
   * @return {Boolean} true/false
   */
  _getMyNyplVisible() {
    return this.state.myNyplVisible;
  }

  /**
   * _getStickyMyNyplVisible()
   * returns the current state.stickyLoginVisible
   * value.
   * @return {Boolean} true/false
   */
  _getStickyMyNyplVisible() {
    return this.state.stickyLoginVisible;
  }

  /**
   * _getSearchButtonActionValue()
   * returns the current state.getSearchButtonActionValue
   * value.
   * @return {String}
   */
  _getSearchButtonActionValue() {
    return this.state.searchButtonAction;
  }

  /**
   * _getIsStickyValue() 
   * returns the current state.isSticky value.
   *
   * @return {Boolean} true/false
   */
  _getIsStickyValue() {
    return this.state.isSticky;
  }

  /**
   * _getLastActiveMenuItem()
   * returns the current state.lastActiveMenuItem
   * value.
   * @return {String}
   */
  _getLastActiveMenuItem() {
    return this.state.lastActiveMenuItem;
  }

  _getClientAppEnv() {
    return this.state.clientAppEnv;
  }

  /*** PRIVATE METHODS ***/
  handleUpdateHeaderData(data) {
    this.setState({headerData: data});
  }

  handleFetchHeaderData() {
    this.setState({headerData: []});
  }

  handleHeaderDataFailedFetch(errorMessage) {
    this.setState({errorMessage: errorMessage});
  }

  handleSetMobileMenuButtonValue(currentActiveMobileButton) {
    this.setState({activeMobileButton: currentActiveMobileButton});
  }

  handleSetMobileMyNyplButtonValue(value) {
    this.setState({mobileMyNyplButton: value});
  }

  // The set search button action value to Store
  handleSearchButtonActionValue(actionValue) {
    this.setState({searchButtonAction: actionValue});
  }

  handleUpdateIsHeaderSticky(value) {
    this.setState({isSticky: value});
  }

  handleSetLastActiveMenuItem(value) {
    this.setState({lastActiveMenuItem: value});
  }

  handleSetClientAppEnv(value) {
    this.setState({clientAppEnv: value});
  }

  handleToggleSubscribeFormVisible(value) {
    this.setState({subscribeFormVisible: value});
  }

  handleToggleMyNyplVisible(value) {
    this.setState({myNyplVisible: value});
  }

  handleToggleStickyMyNyplVisible(value) {
    this.setState({stickyLoginVisible: value});
  }
}

// Export ALT Store
export default alt.createStore(HeaderStore, 'HeaderStore');
