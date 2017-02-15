import React from 'react';
import { extend as _extend } from 'underscore';
import ClickOutHandler from 'react-onclickout';
// Alt Store/Actions
import HeaderStore from '../../stores/HeaderStore.js';
import Actions from '../../actions/Actions.js';
// GA Utilities
import utils from '../../utils/utils.js';
// Component Dependencies
import MyNypl from '../MyNypl/MyNypl.js';
// Configs
import appConfig from '../../appConfig.js';

const styles = {
  base: {
    margin: '0px 10px 0px 0px',
    position: 'relative',
    display: 'inline-block',
    verticalAlign: 'baseline',
    lineHeight: 'normal',
  },
  MyNyplButton: {
    display: 'inline-block',
    border: 'none',
    padding: '9px 10px 10px 12px',
    textTransform: 'uppercase',
    lineHeight: 'normal',
    verticalAlign: 'baseline',
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
    backgroundColor: '#1B7FA7',
    padding: '25px 30px',
  },
};

class MyNyplButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleOnClickOut = this.handleOnClickOut.bind(this);
    this.handleEscKey = this.handleEscKey.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleEscKey, false);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscKey, false);
  }
  /**
   * handleEscKey(e)
   * Triggers the clickOut method if the ESC keyboard key is pressed.
   */
  handleEscKey(e) {
    if (e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) {
      this.handleOnClickOut();
    }
  }

  /**
   * handleClick()
   * Toggles the visibility of the form. Sends an Action
   * that will dispatch an event to the Header Store.
   */
  handleClick(e) {
    // If javascript is enabled, clicking the button will open the dropdown menu instead of
    // going to the link
    e.preventDefault();
    const visibleState = HeaderStore.getMyNyplVisible() ? 'Closed' : 'Open';

    Actions.toggleMyNyplVisible(!HeaderStore.getMyNyplVisible());
    utils.trackHeader(this.props.gaAction, `MyNyplButton - ${visibleState}`);
  }

  /**
   * handleOnClickOut()
   * Handles closing the Subscribe form if it is
   * currently visible.
   */
  handleOnClickOut() {
    if (HeaderStore.getMyNyplVisible()) {
      if (HeaderStore.getMobileMyNyplButtonValue() === '') {
        utils.trackHeader(this.props.gaAction, 'MyNyplButton - Closed');
      }
      Actions.toggleMyNyplVisible(false);
    }
  }

  /**
   * renderMyNyplButton()
   * Returns MyNypl button and its icon based on the log in and the click status.
   */
  renderMyNyplButton() {
    let buttonClass = '';
    let iconClass = (HeaderStore.getMyNyplVisible()) ? 'nypl-icon-solo-x' : 'nypl-icon-wedge-down';
    const icon = (<span className={`${iconClass} icon`} style={styles.MyNyplIcon}></span>);
    const labelColorClass = (this.props.isLoggedIn) ? ' loggedIn' : '';
    const myNyplButtonLabel = (this.props.patronName) ? 'My Account' : 'Log In';
    const loggedInFadeInAnimation = (this.props.patronName) ? ' animated fadeIn' : '';

    if (HeaderStore.getMyNyplVisible()) {
      buttonClass = 'active';
      iconClass = 'nypl-icon-solo-x';
    }

    return (
      <a
        className={`MyNyplButton ${buttonClass}${labelColorClass}${loggedInFadeInAnimation}`}
        onClick={this.handleClick}
        style={_extend(styles.MyNyplButton, this.props.style)}
        href={this.props.target}
        role="button"
      >
        {myNyplButtonLabel}
        {icon}
      </a>
    );
  }

  renderMyNyplDialog() {
    const boxHeight = (this.props.isLoggedIn) ? ' loggedInHeight' : null;

    return (HeaderStore.getMyNyplVisible()) ? (
      <div
        className={`MyNypl-Wrapper active animatedFast fadeIn${boxHeight}`}
        style={styles.MyNyplWrapper}
      >
        <MyNypl
          patronName={this.props.patronName}
          isLoggedIn={this.props.isLoggedIn}
          logOutLink={this.props.logOutLink}
        />
      </div>
    ) : null;
  }

  render() {
    return (
      <ClickOutHandler onClickOut={this.handleOnClickOut}>
        <div
          className="MyNyplButton-Wrapper"
          style={_extend(styles.base, this.props.style)}
        >
          {this.renderMyNyplButton()}
          {this.renderMyNyplDialog()}
        </div>
      </ClickOutHandler>
    );
  }
}

MyNyplButton.propTypes = {
  lang: React.PropTypes.string,
  style: React.PropTypes.object,
  isLoggedIn: React.PropTypes.bool,
  patronName: React.PropTypes.string,
  logOutLink: React.PropTypes.string,
  gaAction: React.PropTypes.string,
  target: React.PropTypes.string,
};

MyNyplButton.defaultProps = {
  lang: 'en',
  label: 'Log In',
  target: appConfig.myNyplLinks.catalog,
};

export default MyNyplButton;
