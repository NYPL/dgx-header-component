import React from 'react';
import { extend as _extend } from 'underscore';
import ClickOutHandler from 'react-onclickout';
import EmailSubscription from '../EmailSubscription/EmailSubscription.js';
// Alt Store/Actions
import HeaderStore from '../../stores/HeaderStore.js';
import Actions from '../../actions/Actions.js';
// Utilities
import axios from 'axios';
import utils from '../../utils/utils.js';

const styles = {
  base: {
    position: 'relative',
  },
  subscribeButton: {
    display: 'inline-block',
    padding: '10px 10px 10px 12px',
    verticalAlign: 'baseline',
  },
  subscribeLabel: {
    display: 'inline',
    verticalAlign: 'baseline',
  },
  subscribeIcon: {
    fontSize: '15px',
    verticalAlign: 'text-bottom',
    marginLeft: '3px',
    display: 'inline',
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

    this.state = {
      subscribeFormVisible: HeaderStore.getSubscribeFormVisible(),
      target: this.props.target,
    };

    this.handleOnClickOut = this.handleOnClickOut.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleEscKey = this.handleEscKey.bind(this);
  }

  componentDidMount() {
    HeaderStore.listen(this.onChange.bind(this));
    window.addEventListener('keydown', this.handleEscKey, false);
    // Make an axios call to the mailinglist API server to check it th server is working.
    // And determine the behavior of subscribe button based on the status of the server.
    this.callMailinglistApi();
  }

  componentWillUnmount() {
    HeaderStore.unlisten(this.onChange.bind(this));
    window.removeEventListener('keydown', this.handleEscKey, false);
  }

  /**
   * onChange()
   * Updates the state of the form based off the Header Store.
   */
  onChange() {
    this.setState({ subscribeFormVisible: HeaderStore.getSubscribeFormVisible() });
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
      const visibleState = this.state.subscribeFormVisible ? 'Closed' : 'Open';
      Actions.toggleSubscribeFormVisible(!this.state.subscribeFormVisible);
      utils.trackHeader('Click', `Subscribe - ${visibleState}`);
    }
  }

  /**
   * handleOnClickOut()
   * Handles closing the Subscribe form if it is
   * currently visible.
   */
  handleOnClickOut() {
    if (HeaderStore.getSubscribeFormVisible()) {
      Actions.toggleSubscribeFormVisible(false);
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
    let iconClass = 'nypl-icon-wedge-down';

    if (this.state.subscribeFormVisible) {
      iconClass = 'nypl-icon-solo-x';
      buttonClass = 'active';
    }

    return (
      <a
        id="SubscribeButton"
        className={`SubscribeButton ${buttonClass}`}
        href={this.state.target}
        onClick={this.handleClick}
        style={styles.subscribeButton}
        role={(this.state.target === '#') ? 'button' : null}
      >
        <span style={styles.subscribeLabel}>
          {this.props.label}
        </span>
        <span
          className={`${iconClass} icon`}
          aria-hidden="true"
          style={styles.subscribeIcon}
        >
        </span>
      </a>
    );
  }

  renderEmailDialog() {
    return this.state.subscribeFormVisible ? (
      <div
        className="EmailSubscription-Wrapper active animatedFast fadeIn"
        style={styles.EmailSubscribeForm}
      >
        <EmailSubscription
          list_id="1061"
          target="https://mailinglistapi.nypl.org"
        />
      </div>
    ) : null;
  }

  render() {
    return (
      <ClickOutHandler onClickOut={this.handleOnClickOut}>
        <div
          className="SubscribeButton-Wrapper"
          style={_extend(styles.base, this.props.style)}
        >
          {this.renderEmailButton()}
          {this.renderEmailDialog()}
        </div>
      </ClickOutHandler>
    );
  }
}

SubscribeButton.propTypes = {
  lang: React.PropTypes.string,
  label: React.PropTypes.string,
  target: React.PropTypes.string,
  style: React.PropTypes.object,
};

SubscribeButton.defaultProps = {
  lang: 'en',
  label: 'Subscribe',
  target: 'http://pages.email.nypl.org/page.aspx' +
    '?QS=3935619f7de112ef7250fe02b84fb2f9ab74e4ea015814b7',
};

export default SubscribeButton;
