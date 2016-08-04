import Radium from 'radium';
import React from 'react';
import cx from 'classnames';
import ClickOutHandler from 'react-onclickout';
import HeaderStore from '../../stores/HeaderStore.js';
import Actions from '../../actions/Actions.js';
import utils from '../../utils/utils.js';
import MyNypl from '../MyNypl/MyNypl.js';
import { LoginIcon } from 'dgx-svg-icons';

const styles = {
  base: {
    position: 'relative',
    display: 'inline-block',
    verticalAlign: 'middle',
  },
  MyNyplButton: {
    display: 'inline',
    textTransform: 'uppercase',
    padding: '5px 7.5px',
    border: 'none',
    lineHeight: 'normal',
    outline: 'none',
  },
  MyNyplIcon: {
    fontSize: '15px',
    verticalAlign: 'text-bottom',
    marginLeft: '3px',
    display: 'inline',
  },
  MyNyplWrapper: {
    position: 'absolute',
    right: '0',
    minWidth: '218px',
    minHeight: '185px',
    backgroundColor: '#1B7FA7',
    padding: '17px 30px',
  },
  hide: {
    display: 'none',
  },
  show: {
    display: 'block',
  },
};

class StickyMyNyplButton extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleOnClickOut = this.handleOnClickOut.bind(this);
  }

  /**
   * handleClick()
   * Toggles the visibility of the form. Sends an Action
   * that will dispatch an event to the HeaderStore.
   */
  handleClick() {
    const visibleState = HeaderStore._getStickyMyNyplVisible() ? 'Closed' : 'Open';
    Actions.toggleStickyMyNyplVisible(!HeaderStore._getStickyMyNyplVisible());
    utils._trackHeader('Log In', `StickyMyNyplButton - ${visibleState}`);
  }

  /**
   * handleOnClickOut()
   * Handles closing the Subscribe form if it is
   * currently visible.
   */
  handleOnClickOut() {
    if (HeaderStore._getStickyMyNyplVisible()) {
      Actions.toggleStickyMyNyplVisible(false);
      utils._trackHeader('Log In', 'StickyMyNyplButton - Closed');
    }
  }

  render() {
    // Assign a variable to hold the reference of state boolean
    const showDialog = HeaderStore._getStickyMyNyplVisible();
    const buttonClasses = cx({ active: showDialog });
    const myNyplClasses = cx({ 'active animatedFast fadeIn': showDialog });

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
            <span className="visuallyHidden">
              {this.props.label}
            </span>
            <LoginIcon
              width="25"
              height="25"
              fill={showDialog ? '#FFF' : '#333'}
            />
          </button>
          <div
            className={`StickyMyNypl-Wrapper ${myNyplClasses}`}
            style={styles.MyNyplWrapper}
          >
            <MyNypl />
          </div>
        </div>
      </ClickOutHandler>
    );
  }
}

StickyMyNyplButton.propTypes = {
  lang: React.PropTypes.string,
  label: React.PropTypes.string,
  style: React.PropTypes.object,
};

StickyMyNyplButton.defaultProps = {
  lang: 'en',
  label: 'Log In',
};

export default Radium(StickyMyNyplButton);
