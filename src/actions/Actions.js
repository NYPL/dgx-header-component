import alt from 'dgx-alt-center';

class Actions {
  setMobileMenuButtonValue(currentActiveMobileButton) {
    return currentActiveMobileButton;
  }

  setMobileMyNyplButtonValue(value) {
    return value;
  }

  searchButtonActionValue(actionValue) {
    return actionValue;
  }

  toggleSubscribeFormVisible(value) {
    return value;
  }

  toggleMyNyplVisible(value) {
    return value;
  }
}

export default alt.createActions(Actions);
