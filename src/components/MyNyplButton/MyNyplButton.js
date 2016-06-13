import Radium from 'radium';
import React from 'react';
import cx from 'classnames';
import ClickOutHandler from 'react-onclickout';
// Alt Store/Actions
import HeaderStore from '../../stores/HeaderStore.js';
import Actions from '../../actions/Actions.js';
// GA Utilities
import utils from '../../utils/utils.js';
// Component Dependencies
import MyNypl from '../MyNypl/MyNypl.js';

const styles = {
  base: {
    margin: '0px 10px 0px 0px',
    position: 'relative',
    display: 'inline-block',
    verticalAlign: 'middle',
    lineHeight: 'normal',
  },
  MyNyplButton: {
    display: 'inline',
    border: 'none',
    padding: '10px 10px 10px 12px',
    textTransform: 'uppercase',
    lineHeight: 'normal',
  },
  MyNyplIcon: {
    fontSize: '15px',
    verticalAlign: 'text-bottom',
    marginLeft: '3px',
    display: 'inline',
  },
  MyNyplWrapper: {
    position: 'absolute',
    zIndex: 1000,
    left: '0',
    minWidth: '250px',
    minHeight: '190px',
    backgroundColor: '#1DA1D4',
    padding: '25px 30px',
  },
  hide: {
    display: 'none',
  },
  show: {
    display: 'block',
  },
};

class MyNyplButton extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleOnClickOut = this.handleOnClickOut.bind(this);
  }

  /**
   * handleClick()
   * Toggles the visibility of the form. Sends an Action
   * that will dispatch an event to the Header Store.
   */
  handleClick() {
    const visibleState = HeaderStore._getMyNyplVisible() ? 'Closed' : 'Open';
    Actions.toggleMyNyplVisible(!HeaderStore._getMyNyplVisible());
    utils._trackHeader('Log In', `MyNyplButton - ${visibleState}`);
  }

  /**
   * handleOnClickOut()
   * Handles closing the Subscribe form if it is
   * currently visible.
   */
  handleOnClickOut() {
    if (HeaderStore._getMyNyplVisible()) {
      if (HeaderStore._getMobileMyNyplButtonValue() === '') {
        utils._trackHeader('Log In', 'MyNyplButton - Closed');
      }
      Actions.toggleMyNyplVisible(false);
    }
  }

  render() {
    // Assign a variable to hold the reference of state boolean
    const showDialog = HeaderStore._getMyNyplVisible();
    const buttonClasses = cx({ active: showDialog });
    const myNyplClasses = cx({ 'active animatedFast fadeIn': showDialog });
    const iconClass = cx({
      'nypl-icon-solo-x': showDialog,
      'nypl-icon-wedge-down': !showDialog,
    });

    return (
      <ClickOutHandler onClickOut={this.handleOnClickOut}>
        <div
          className="MyNyplButton-Wrapper"
          ref="MyNypl"
          style={[styles.base, this.props.style]}
        >
          <button
            id="MyNyplButton"
            className={`MyNyplButton ${buttonClasses}`}
            onClick={this.handleClick}
            style={[styles.MyNyplButton, this.props.style]}
          >
            {this.props.label}
            <span className={`${iconClass} icon`} style={styles.MyNyplIcon}></span>
          </button>
          <div
            className={`MyNypl-Wrapper ${myNyplClasses}`}
            style={styles.MyNyplWrapper}
          >
            <MyNypl />
          </div>
        </div>
      </ClickOutHandler>
    );
  }
}

MyNyplButton.propTypes = {
  lang: React.PropTypes.string,
  label: React.PropTypes.string,
  style: React.PropTypes.object,
};

MyNyplButton.defaultProps = {
  lang: 'en',
  label: 'Log In',
};

export default Radium(MyNyplButton);
