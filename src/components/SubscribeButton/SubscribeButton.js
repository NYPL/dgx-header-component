import Radium from 'radium';
import React from 'react';
import cx from 'classnames';
import ClickOutHandler from 'react-onclickout';
import SimpleButton from '../Buttons/SimpleButton.js';
import EmailSubscription from '../EmailSubscription/EmailSubscription.js';

import HeaderStore from '../../stores/HeaderStore.js';
import Actions from '../../actions/Actions.js';

import axios from 'axios';

import gaUtils from '../../utils/gaUtils.js';

class SubscribeButton extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      subscribeFormVisible: HeaderStore._getSubscribeFormVisible(),
      target: this.props.target
    };
  }

  componentDidMount() {
    HeaderStore.listen(this._onChange.bind(this));
    // Make an axios call to the mailinglist API server to check it th server is working.
    // And determine the behavior of subscribe button based on the status of the server.
    this._callMailinglistApi();
  }

  componentWillUnmount() {
    HeaderStore.unlisten(this._onChange.bind(this));
  }

  render() {
    // Assign a variable to hold the reference of state boolean
    let showDialog = this.state.subscribeFormVisible,
      buttonClasses = cx({'active': showDialog}),
      emailFormClasses = cx({
        'active animatedFast fadeIn': showDialog
      }),
      iconClass = cx({
        'nypl-icon-solo-x': showDialog,
        'nypl-icon-wedge-down': !showDialog
      });

    return (
      <ClickOutHandler onClickOut={this._handleOnClickOut.bind(this)}>
        <div className='SubscribeButton-Wrapper'
          ref='SubscribeButton'
          style={[
            styles.base,
            this.props.style
          ]}>

          <a
            id={'SubscribeButton'}
            className={`SubscribeButton ${buttonClasses}`}
            href={this.props.target}
            onClick={this._handleClick.bind(this)}
            style={[
              styles.SimpleButton,
              this.props.style
            ]}>
            {this.props.label}
            <span className={`${iconClass} icon`} style={styles.SubscribeIcon}></span>
          </a>

          <div className={`EmailSubscription-Wrapper ${emailFormClasses}`}
            style={[
              styles.EmailSubscribeForm
            ]}>
            <EmailSubscription
              list_id='1061'
              target='https://mailinglistapi.nypl.org' />
          </div>
        </div>
      </ClickOutHandler>
    );
  }

  /**
   * _handleClick(e) 
   * Toggles the visibility of the form. Sends an Action
   * that will dispatch an event to the Header Store.
   */
  _handleClick(e) {

    if (this.state.target === '#') {
      e.preventDefault();
      let visibleState = this.state.subscribeFormVisible ? 'Closed' : 'Open';
      Actions.toggleSubscribeFormVisible(!this.state.subscribeFormVisible);
      gaUtils._trackEvent('Click', `Subscribe - ${visibleState}`);
    }

  }

  /**
   * _handleOnClickOut(e) 
   * Handles closing the Subscribe form if it is
   * currently visible.
   */
  _handleOnClickOut(e) {

    if (HeaderStore._getSubscribeFormVisible()) {
      Actions.toggleSubscribeFormVisible(false);
      gaUtils._trackEvent('Click', 'Subscribe - Closed');
    }
    
  }

  /**
   * _onChange()
   * Updates the state of the form based off the Header Store.
   */
  _onChange() {
    this.setState({subscribeFormVisible: HeaderStore._getSubscribeFormVisible()});
  }

  /**
  * _callMailinglistApi()
  * An axios call to the mailinglist API server. If the server works,
  * change the link of the button to '#' so it will open the subscribe box.
  * If the server doesn't work, the button will link to subscribe landing page
  * as a fallback.
  */
  _callMailinglistApi() {
    axios
      .get('https://mailinglistapi.nypl.org')
      .then(response => {
        if(response.status === 200 && response.status < 300) {
          this.setState({target: '#'});
        }
      })
      .catch(response => {
        console.warn('Error on Axios GET request: https://mailinglistapi.nypl.org');
        if (response instanceof Error) {
          console.warn(response.message);
        } else {
          console.warn('The Axios GET request has a status of: ' + response.status);
        }
      });
  }
}

SubscribeButton.defaultProps = {
  lang: 'en',
  label: 'Subscribe',
  target: 'http://pages.email.nypl.org/page.aspx?QS=3935619f7de112ef7250fe02b84fb2f9ab74e4ea015814b7'
};

const styles = {
  base: {
    margin: '0px 15px',
    position: 'relative',
    display: 'inline-block'
  },
  SimpleButton: {
    display: 'block',
    padding: '9px 15px 11px 20px'
  },
  SubscribeIcon: {
    fontSize: '15px',
    verticalAlign: 'text-bottom',
    marginLeft: '5px',
    display: 'inline'
  },
  EmailSubscribeForm: {
    position: 'absolute',
    zIndex: 1000,
    right: '0',
    width: '250px',
    minHeight: '210px',
    backgroundColor: '#1DA1D4',
    padding: '25px 30px'
  },
  hide: {
    display: 'none'
  },
  show: {
    display: 'block'
  }
};

export default Radium(SubscribeButton);
