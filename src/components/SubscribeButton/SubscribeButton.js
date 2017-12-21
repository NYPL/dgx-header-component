import React from 'react';
import PropTypes from 'prop-types';
import { extend as _extend } from 'underscore';
import FocusTrap from 'focus-trap-react';
import {
  DownWedgeIcon,
  XIcon,
} from '@nypl/dgx-svg-icons';
import axios from 'axios';

import EmailSubscription from '../EmailSubscription/EmailSubscription.js';
// Utilities
import utils from '../../utils/utils.js';

const styles = {
  base: {
    position: 'relative',
  },
  subscribeButton: {
    display: 'inline',
    padding: '11px 10px 11px 12px',
    verticalAlign: 'baseline',
  },
  subscribeLabel: {
    display: 'inline',
    verticalAlign: 'baseline',
  },
  EmailSubscribeForm: {
    position: 'absolute',
    zIndex: 1000,
    right: '0',
    width: '250px',
    minHeight: '210px',
    backgroundColor: '#1B7FA7',
    padding: '25px 30px',
  },
  hide: {
    display: 'none',
  },
  show: {
    display: 'block',
  },
};

class SubscribeButton extends React.Component {
  constructor(props) {
    super(props);

    // subscribeFormVisible
    this.state = {
      visible: false,
      target: this.props.target,
    };

    this.handleOnClickOut = this.handleOnClickOut.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleEscKey = this.handleEscKey.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleEscKey, false);
    // Make an axios call to the mailinglist API server to check it th server is working.
    // And determine the behavior of subscribe button based on the status of the server.
    this.callMailinglistApi();
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscKey, false);
  }

  /**
   * onChange()
   * Updates the state of the form based off the Header Store.
   */
  onChange() {
    this.setState({ visible: !this.state.visible });
  }

  handleEscKey(e) {
    if (e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) {
      this.handleOnClickOut();
    }
  }

  /**
   * handleClick(e)
   * Toggles the visibility of the form. Sends an Action
   * that will dispatch an event to the Header Store.
   */
  handleClick(e) {
    if (this.state.target === '#') {
      e.preventDefault();
      const visibleState = this.state.visible ? 'Closed' : 'Open';
      this.setState({ visible: !this.state.visible });
      utils.trackHeader('Click', `Subscribe - ${visibleState}`);
    }
  }

  /**
   * handleOnClickOut()
   * Handles closing the Subscribe form if it is
   * currently visible.
   */
  handleOnClickOut() {
    if (this.state.visible) {
      this.setState({ visible: false });
      utils.trackHeader('Click', 'Subscribe - Closed');
    }
  }

  /**
  * callMailinglistApi()
  * An axios call to the mailinglist API server. If the server works,
  * change the link of the button to '#' so it will open the subscribe box.
  * If the server doesn't work, the button will link to subscribe landing page
  * as a fallback.
  */
  callMailinglistApi() {
    axios
      .get('https://mailinglistapi.nypl.org')
      .then(response => {
        if (response.status === 200 && response.status < 300) {
          this.setState({ target: '#' });
        }
      })
      .catch(response => {
        console.warn('Error on Axios GET request: https://mailinglistapi.nypl.org');
        if (response instanceof Error) {
          console.warn(response.message);
        } else {
          console.warn(`The Axios GET request has a status of: ${response.status}`);
        }
      });
  }

  renderEmailButton() {
    let buttonClass = '';
    let icon = <DownWedgeIcon className="dropDownIcon" ariaHidden />;
    let label = this.props.label;

    if (this.state.visible) {
      buttonClass = 'active';
      label = 'Close';
      icon = <XIcon className="dropDownIcon" ariaHidden fill="#fff" />;
    }

    return (
      <a
        id="subscribeButton"
        className={`subscribeButton ${buttonClass}`}
        href={this.state.target}
        onClick={this.handleClick}
        style={styles.subscribeButton}
        role={(this.state.target === '#') ? 'button' : null}
        aria-haspopup="true"
        aria-expanded={this.state.visible ? true : null}
      >
        <span style={styles.subscribeLabel}>{label}</span>
        {icon}
      </a>
    );
  }

  renderEmailDialog() {
    return this.state.visible ? (
      <div
        className="emailSubscription-wrapper active animatedFast fadeIn"
        style={styles.EmailSubscribeForm}
      >
        <EmailSubscription
          listId="1061"
          target="https://mailinglistapi.nypl.org"
        />
      </div>
    ) : null;
  }

  render() {
    return (
      <FocusTrap
        focusTrapOptions={{
          onDeactivate: this.handleOnClickOut,
          clickOutsideDeactivates: true,
          initialFocus: '.subscribeMessageBox',
        }}
        active={this.state.visible}
        className="subscribeButton-wrapper"
        style={_extend(styles.base, this.props.style)}
      >
        {this.renderEmailButton()}
        {this.renderEmailDialog()}
      </FocusTrap>
    );
  }
}

SubscribeButton.propTypes = {
  lang: PropTypes.string,
  label: PropTypes.string,
  target: PropTypes.string,
  style: PropTypes.object,
};

SubscribeButton.defaultProps = {
  lang: 'en',
  label: 'Subscribe',
  target: 'http://pages.email.nypl.org/page.aspx' +
    '?QS=3935619f7de112ef7250fe02b84fb2f9ab74e4ea015814b7',
};

export default SubscribeButton;
