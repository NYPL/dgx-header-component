import React from 'react';
import cx from 'classnames';
import { extend as _extend } from 'underscore';
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
  patronInitial: {
    display: 'inline-block',
    fontSize: '1.4em',
    lineHeight: 'normal',
    margin: '0',
    verticalAlign: '6px',
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
    const visibleState = HeaderStore.getStickyMyNyplVisible() ? 'Closed' : 'Open';
    Actions.toggleStickyMyNyplVisible(!HeaderStore.getStickyMyNyplVisible());
    utils.trackHeader('Log In', `StickyMyNyplButton - ${visibleState}`);
  }

  /**
   * handleOnClickOut()
   * Handles closing the Subscribe form if it is
   * currently visible.
   */
  handleOnClickOut() {
    if (HeaderStore.getStickyMyNyplVisible()) {
      Actions.toggleStickyMyNyplVisible(false);
      utils.trackHeader('Log In', 'StickyMyNyplButton - Closed');
    }
  }

  render() {
    // Assign a variable to hold the reference of state boolean
    const showDialog = HeaderStore.getStickyMyNyplVisible();
    const buttonClasses = cx({ active: showDialog });
    const myNyplClasses = cx({ 'active animatedFast fadeIn': showDialog });
    const patronInitialClass = (showDialog) ? '' : 'loginColor';
    const patronInitial = (this.props.patronInitial) ?
      (<p style={styles.patronInitial} className={patronInitialClass}>{this.props.patronInitial}</p>) : null;
    const LoginIconColor = (this.props.isLoggedIn) ? 'green' : '#333';

    return (
      <ClickOutHandler onClickOut={this.handleOnClickOut}>
        <div
          className="MyNyplButton-Wrapper"
          ref="MyNypl"
          style={_extend(styles.base, this.props.style)}
        >
          <button
            id="MyNyplButton"
            className={`MyNyplButton ${buttonClasses}`}
            onClick={this.handleClick}
            style={_extend(styles.MyNyplButton, this.props.style)}
          >
            <span className="visuallyHidden">
              {this.props.label}
            </span>
            {patronInitial}
            <LoginIcon
              width="25"
              height="25"
              fill={showDialog ? '#FFF' : LoginIconColor}
            />
          </button>
          <div
            className={`StickyMyNypl-Wrapper ${myNyplClasses}`}
            style={styles.MyNyplWrapper}
          >
            <MyNypl isLoggedIn={this.props.isLoggedIn} />
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
  isLoggedIn: React.PropTypes.bool,
  patronInitial: React.PropTypes.string,
};

StickyMyNyplButton.defaultProps = {
  lang: 'en',
  label: 'Log In',
};

export default StickyMyNyplButton;
