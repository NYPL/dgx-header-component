import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import cx from 'classnames';
import { extend as _extend } from 'underscore';
import {
  CheckSoloIcon,
  LeftArrowIcon,
  XIcon,
} from '@nypl/dgx-svg-icons';

import config from '../../appConfig.js';
import SocialMediaLinksWidget from '../SocialMediaLinksWidget/SocialMediaLinksWidget.js';
import SubscribeMessageBox from './SubscribeMessageBox.js';
import DotsLoader from '../Loaders/DotsLoader.js';
import utils from '../../utils/utils.js';

const styles = {
  base: {
    backgroundColor: '#1B7FA7',
    padding: '0px',
    width: 'auto',
  },
  submitButton: {
    backgroundColor: '#1B7FA7',
    border: '2px solid #FFF',
    color: '#FFF',
    fontFamily: 'Kievit-Book',
    fontSize: '14px',
    height: '38px',
    letterSpacing: '.03em',
    margin: '60px 0 0 0',
    padding: '0 0 0 21px',
    lineHeight: 'normal',
    width: '100px',
  },
  tryAgainButton: {
    display: 'inline-block',
    border: '2px solid #fff',
    color: 'white',
    padding: '5px 15px 5px 5px',
    width: '90px',
    fontSize: '14px',
    backgroundColor: '#1B7FA7',
    fontFamily: 'Kievit-Book',
    marginTop: '25px',
  },
  privacyLink: {
    textDecoration: 'underline',
    fontSize: '12px',
    color: '#FFF',
    fontWeight: '400',
    textTransform: 'uppercase',
    position: 'absolute',
    bottom: '45px',
    right: '30px',
  },
  scLink: {
    textDecoration: 'underline',
    fontSize: '12px',
    color: 'white',
    fontWeight: '200',
    textTransform: 'uppercase',
    position: 'absolute',
    bottom: '68px',
    right: '30px',
    letterSpacing: '0.03em',
  },
  emailFormLabel: {
    color: '#FFF',
    margin: '15px 0 0 0',
    display: 'inline-block',
  },
  resubmitButton: {
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderBottom: '2px solid #FFF',
    color: '#FFF',
    backgroundColor: 'transparent',
    fontSize: '16px',
    padding: '0 0 2px 0',
    letterSpacing: '0.03em',
  },
};

class EmailSubscription extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formProcessing: false,
      formStatus: '',
      notValidEmail: false,
    };

    this.validateForm = this.validateForm.bind(this);
    this.initForm = this.initForm.bind(this);
  }

  initForm(e) {
    e.preventDefault();
    this.setState({
      formProcessing: false,
      formStatus: '',
    });
  }

  // Store changes are funky, need to look into it
  /* _onChange () {
    this.setState({formStatus: HeaderStore.getSubscribeFormStatus()});
  } */

  validateForm(e) {
    // Prevent re-direct, handle validation
    e.preventDefault();
    const userInput = ReactDOM.findDOMNode(this.refs.emailAddressField);

    if (!this.isValidEmail(userInput.value)) {
      userInput.value = '';
      userInput.focus();
      this.setState({
        notValidEmail: true,
      });
    } else {
      this.setState({
        notValidEmail: false,
      });

      // Send as a POST request
      this.addSubscriberToList(
        userInput.value,
        this.props.target,
        this.props.listId
      );
    }
  }

  isValidEmail(value) {
    const emailRegex = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i);
    if (!value) {
      return false;
    }
    return emailRegex.test(value);
  }

  addSubscriberToList(userEmail, url, listid) {
    const postUrl = `${url}/add-subscriber/${listid}`;

    // Display loader while processing finalizes.
    this.setState({ formProcessing: true });

    axios
      .post(postUrl, {
        email: userEmail,
      })
      .then(response => {
        this.setState({
          formStatus: response.data.responseStatus,
          formProcessing: false,
        });
      })
      .catch(response => {
        this.setState({
          formStatus: response.data.responseStatus || response.statusText,
          formProcessing: false,
        });
      });
  }

  render() {
    const status = this.state.formStatus;
    const isLoading = this.state.formProcessing;
    const notValidEmail = this.state.notValidEmail;
    const formClass = 'emailSubscribeForm';
    const emailAddressField = 'emailAddressField';
    const errorClass = cx({ active: notValidEmail });
    let subscribeContent;

    if (!isLoading) {
      // The default view
      subscribeContent = (
        <div role="dialog">
          <div className={`subscribeMessageBox ${status}`} tabIndex="0">
            <div className="subscribeMessageBox-eyebrow"></div>
            <div className="subscribeMessageBox-title">
              Get the <span className="subscribeMessageBox-title-bestNYPL">
              best of NYPL</span> in your inbox
            </div>
          </div>

          <form
            id="emailSubscribeForm"
            className={formClass}
            action={this.props.target}
            method={this.props.form_method}
            name={this.props.form_name}
            onSubmit={this.validateForm}
            style={_extend(this.props.style, styles.base)}
          >
            <div className={`${formClass}-fields`}>
              <label
                className={`${formClass}-label`}
                style={styles.emailFormLabel}
                htmlFor={emailAddressField}
              >
                Email Address
              </label>
              <input
                aria-label="Enter your email address"
                className={`${formClass}-input`}
                type="email"
                name="Email Address"
                placeholder={this.props.placeholder}
                ref={emailAddressField}
                id={emailAddressField}
                required
                aria-required="true"
                autoComplete="off"
                autoFocus
              />

              <div className={`${formClass}-error ${errorClass}`}>
                <XIcon ariaHidden />
                <span>Please enter a valid email address</span>
              </div>

              <div className={`${formClass}-submit`}>
                <CheckSoloIcon ariaHidden />
                <input
                  aria-label="Sign up"
                  type="submit"
                  name="submit"
                  value="SIGN UP"
                  style={styles.submitButton}
                />
              </div>
            </div>
          </form>
        </div>);

      if (status === 'success') {
        utils.trackHeader('Subscribe', 'Success');
        subscribeContent = (
          <div>
            <SubscribeMessageBox
              status={status}
              msg="Thank you for subscribing to our email updates."
            />
            <div className={`${this.props.className}-newEmail`}>
              <button onClick={this.initForm} style={styles.resubmitButton}>
                Enter another email address
              </button>
            </div>
            <div className={`${this.props.className}-followUs`}>
              <p>Follow us:</p>
              <SocialMediaLinksWidget
                className={`${this.props.className}-socialMediaLinksWidget`}
                links={config.socialMediaLinks}
                displayOnlyList={['facebook', 'twitter']}
              />
            </div>
          </div>
        );
      }

      if (status === 'exists') {
        utils.trackHeader('Subscribe', 'Error -- already subscribed');
        subscribeContent = (
          <div>
            <SubscribeMessageBox
              status={status}
              msg="Looks like you're already signed up!"
            />
            <div className={`${this.props.className}-newEmail`}>
              <button style={styles.resubmitButton} onClick={this.initForm}>
                Enter a different email address
              </button>
            </div>
          </div>
        );
      }

      if (status === 'error' || status === 'Internal Server Error') {
        utils.trackHeader('Subscribe', 'Error');
        subscribeContent = (
          <div className={`${this.props.className}-misc-error`}>
            <div>Hmm...</div>
            <div>Something isn&apos;t quite right.</div>
            <div>Please try again.</div>
            <a href="" onClick={this.initForm} style={styles.tryAgainButton}>
              <LeftArrowIcon ariaHidden />
              TRY AGAIN
            </a>
          </div>
        );
      }

      // Always show the privacy link except in the loading phase.
      return (
        <div className={this.props.className}>
          {subscribeContent}
          <a
            href={this.props.subCenterUrl}
            className={`${this.props.className}-sc-link`}
            style={styles.scLink}
            onClick={() => utils.trackHeader('Subscribe', 'Subscription Center')}
          >
            Subscription Center
          </a>
          <a
            href={this.props.policyUrl}
            className={`${this.props.className}-pp-link`}
            style={styles.privacyLink}
          >
            Privacy Policy
          </a>
        </div>
      );
    }

    return (
      <div className={this.props.className}>
        <DotsLoader />
      </div>
    );
  }
}

EmailSubscription.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  lang: PropTypes.string,
  target: PropTypes.string,
  form_name: PropTypes.string,
  listId: PropTypes.string,
  form_method: PropTypes.string,
  placeholder: PropTypes.string,
  policyUrl: PropTypes.string,
  subCenterUrl: PropTypes.string,
  style: PropTypes.object,
};

EmailSubscription.defaultProps = {
  id: 'EmailSubscription',
  className: 'emailSubscription',
  lang: 'en',
  target: 'http://cl.exct.net/subscribe.aspx',
  form_name: 'subscribeForm',
  listId: '1061',
  form_method: 'POST',
  placeholder: 'Your email address',
  policyUrl: 'http://www.nypl.org/help/about-nypl/legal-notices/privacy-policy',
  subCenterUrl: 'http://pages.email.nypl.org/page.aspx?QS=3935619f7de112ef7250fe02b84fb2f9ab74e4ea015814b7',
};

export default EmailSubscription;
