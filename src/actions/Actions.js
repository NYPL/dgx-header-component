import alt from 'dgx-alt-center';

class Actions {
  setMobileMenuButtonValue(currentActiveMobileButton) {
    this.dispatch(currentActiveMobileButton);
  }

  setMobileMyNyplButtonValue(value) {
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
