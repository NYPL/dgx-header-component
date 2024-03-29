import React from 'react';
import PropTypes from 'prop-types';
import { extend as _extend } from 'underscore';
import FocusTrap from 'focus-trap-react';
import {
  GenericWedgeIcon,
  XIcon,
} from '@nypl/dgx-svg-icons';
// GA Utilities
import utils from '../../utils/utils';
// Component Dependencies
import MyNypl from '../MyNypl/MyNypl';
// Configs
import appConfig from '../../appConfig';

const styles = {
  base: {
    margin: '0px 10px 0px 0px',
    position: 'relative',
    display: 'inline-block',
    verticalAlign: 'baseline',
    lineHeight: 'normal',
  },
  MyNyplButton: {
    display: 'inline',
    border: 'none',
    padding: '11px 10px 11px 12px',
    textTransform: 'uppercase',
    lineHeight: 'normal',
    verticalAlign: 'baseline',
  },
  MyNyplWrapper: {
    position: 'absolute',
    zIndex: 1000,
    left: '0',
    minWidth: '250px',
    backgroundColor: '#1B7FA7',
    padding: '30px',
    marginTop: '10px',
  },
};

class MyNyplButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };

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
    const visibleState = this.state.visible ? 'Closed' : 'Open';
    this.setState({ visible: !this.state.visible });
    utils.trackHeader(this.props.gaAction, `MyNyplButton - ${visibleState}`);
  }

  /**
   * handleOnClickOut()
   * Handles closing the Subscribe form if it is
   * currently visible.
   */
  handleOnClickOut() {
    if (this.state.visible) {
      utils.trackHeader(this.props.gaAction, 'MyNyplButton - Closed');
      this.setState({ visible: false });
    }
  }

  /**
   * renderMyNyplButton()
   * Returns MyNypl button and its icon based on the log in and the click status.
   */
  renderMyNyplButton() {
    let buttonClass = '';
    let icon = <GenericWedgeIcon className="dropDownIcon" ariaHidden focusable={false} />;
    let myNyplButtonLabel = 'My Account';
    const labelColorClass = ' loggedIn';

    if (this.state.visible) {
      buttonClass = 'active';
      icon = <XIcon className="dropDownIcon" ariaHidden fill="#fff" focusable={false} />;
      myNyplButtonLabel = 'Close';
    }

    return (
      <a
        className={`myNyplButton ${buttonClass}${labelColorClass}`}
        onClick={this.handleClick}
        style={_extend(styles.MyNyplButton, this.props.style)}
        href={this.props.target}
        role="button"
        aria-haspopup="true"
        aria-expanded={this.state.visible ? true : null}
      >
        {myNyplButtonLabel}
        {icon}
      </a>
    );
  }

  renderMyNyplDialog() {
    const boxHeight = ' loggedInHeight';
    return (this.state.visible) ? (
      <div
        className={`myNypl-wrapper active animatedFast fadeIn${boxHeight}`}
        style={styles.MyNyplWrapper}
      >
        <MyNypl />
      </div>
    ) : null;
  }

  render() {
    return (
      <FocusTrap
        focusTrapOptions={{
          onDeactivate: this.handleOnClickOut,
          clickOutsideDeactivates: true,
        }}
        active={this.state.visible}
        className="myNyplButton-wrapper"
        style={_extend(styles.base, this.props.style)}
      >
        {this.renderMyNyplButton()}
        {this.renderMyNyplDialog()}
      </FocusTrap>
    );
  }
}

MyNyplButton.propTypes = {
  style: PropTypes.shape({}),
  isLoggedIn: PropTypes.bool,
  patronName: PropTypes.string,
  logOutLink: PropTypes.string,
  gaAction: PropTypes.string,
  target: PropTypes.string,
};

MyNyplButton.defaultProps = {
  style: {},
  isLoggedIn: false,
  patronName: '',
  logOutLink: '',
  gaAction: '',
  target: appConfig.myNyplLinks.catalog,
};

export default MyNyplButton;
