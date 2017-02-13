import React from 'react';
import cx from 'classnames';
import { extend as _extend } from 'underscore';
import ClickOutHandler from 'react-onclickout';
import HeaderStore from '../../stores/HeaderStore.js';
import Actions from '../../actions/Actions.js';
import utils from '../../utils/utils.js';
import MyNypl from '../MyNypl/MyNypl.js';
import { LoginIconSolid } from 'dgx-svg-icons';
// Configs
import appConfig from '../../appConfig.js';

const styles = {
  base: {
    position: 'relative',
    display: 'inline-block',
    verticalAlign: 'middle',
  },
  MyNyplButton: {
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
  handleClick(e) {
    // If javascript is enabled, clicking the button will open the dropdown menu instead of
    // going to the link
    e.preventDefault();
    const visibleState = HeaderStore.getStickyMyNyplVisible() ? 'Closed' : 'Open';

    Actions.toggleStickyMyNyplVisible(!HeaderStore.getStickyMyNyplVisible());
    utils.trackHeader(this.props.gaAction, `StickyMyNyplButton - ${visibleState}`);
  }

  /**
   * handleOnClickOut()
   * Handles closing the Subscribe form if it is
   * currently visible.
   */
  handleOnClickOut() {
    if (HeaderStore.getStickyMyNyplVisible()) {
      Actions.toggleStickyMyNyplVisible(false);
      utils.trackHeader(this.props.gaAction, 'StickyMyNyplButton - Closed');
    }
  }

  render() {
    // Assign a variable to hold the reference of state boolean
    const showDialog = HeaderStore.getStickyMyNyplVisible();
    const buttonClasses = cx({ active: showDialog });
    const myNyplClasses = cx({ 'active animatedFast fadeIn': showDialog });
    const loginIconClass = (this.props.patronName) ? '-loggedIn' : '';
    const loggedInFadeInAnimation = (this.props.patronName) ? ' animated fadeIn' : '';
    const active = (showDialog) ? ' active' : '';
    const boxHeight = (this.props.isLoggedIn) ? ' loggedInHeight' : null;

    return (
      <ClickOutHandler onClickOut={this.handleOnClickOut}>
        <div
          className="MyNyplButton-Wrapper"
          ref="MyNypl"
          style={_extend(styles.base, this.props.style)}
        >
          <a
            id="MyNyplButton"
            className={`MyNyplButton ${buttonClasses}`}
            onClick={this.handleClick}
            style={_extend(styles.MyNyplButton, this.props.style)}
            href={this.props.target}
            role="button"
          >
            <span className="visuallyHidden">
              {this.props.label}
            </span>
            <LoginIconSolid
              className={
                `StickyMyNyplButton LoginIcon${loginIconClass}${loggedInFadeInAnimation}${active}`
              }
            />
          </a>
          <div
            className={`StickyMyNypl-Wrapper ${myNyplClasses}${boxHeight}`}
            style={styles.MyNyplWrapper}
          >
            <MyNypl
              isLoggedIn={this.props.isLoggedIn}
              isOauthLoginActivated={this.props.isOauthLoginActivated}
              patronName={this.props.patronName}
              logOutLink={this.props.logOutLink}
            />
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
  isOauthLoginActivated: React.PropTypes.bool,
  patronName: React.PropTypes.string,
  logOutLink: React.PropTypes.string,
  gaAction: React.PropTypes.string,
  target: React.PropTypes.string,
};

StickyMyNyplButton.defaultProps = {
  lang: 'en',
  label: 'Log In',
  target: appConfig.myNyplLinks.catalog,
};

export default StickyMyNyplButton;
