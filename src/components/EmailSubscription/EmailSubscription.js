import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import cx from 'classnames';
import { extend as _extend } from 'underscore';
import config from '../../appConfig.js';
import InputField from '../InputField/InputField.js';
import SocialMediaLinksWidget from '../SocialMediaLinksWidget/SocialMediaLinksWidget.js';
import SubscribeMessageBox from './SubscribeMessageBox.js';
import DotsLoader from '../Loaders/DotsLoader.js';
import utils from '../../utils/utils.js';

const styles = {
  base: {
    backgroundColor: '#1DA1D4',
    padding: '0px',
    width: 'auto',
  },
  submitButton: {
    marginTop: '50px',
    border: '2px solid #fff',
    color: 'white',
    height: '38px',
    paddingLeft: '15px',
    width: '100px',
    fontSize: '12px',
    backgroundColor: '#1DA1D4',
    fontFamily: 'Kievit-Book',
  },
  tryAgainButton: {
    display: 'inline-block',
    border: '2px solid #fff',
    color: 'white',
    padding: '5px 15px 5px 5px',
    width: '90px',
    fontSize: '12px',
    backgroundColor: '#1DA1D4',
    fontFamily: 'Kievit-Book',
    marginTop: '25px',
  },
  privacyLink: {
    textDecoration: 'underline',
    fontSize: '10px',
    color: 'rgba(255, 255, 255, 0.5)',
    fontWeight: '200',
    textTransform: 'uppercase',
    position: 'absolute',
    bottom: '45px',
    right: '30px',
  },
  scLink: {
    textDecoration: 'underline',
    fontSize: '11px',
    color: 'white',
    fontWeight: '200',
    textTransform: 'uppercase',
    position: 'absolute',
    bottom: '68px',
    right: '30px',
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
        this.props.list_id
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
    this.setState({
      formProcessing: true,
    });

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
    const formClass = 'EmailSubscribeForm';
    const emailAddressField = 'emailAddressField';
    const errorClass = cx({ active: notValidEmail });
    let subscribeContent;

    if (!isLoading) {
      // The default view
      subscribeContent = (
        <div>
          <div className={`SubscribeMessageBox ${status}`}>
            <div className="SubscribeMessageBox-Eyebrow"></div>
            <div className="SubscribeMessageBox-Title">
              <label htmlFor={emailAddressField}>
                Get the <span className="SubscribeMessageBox-Title-BestNYPL">
                best of NYPL</span> in your inbox
              </label>
            </div>
          </div>

          <form
            ref="EmailSubscribeForm"
            id="EmailSubscribeForm"
            className={formClass}
            action={this.props.target}
            method={this.props.form_method}
            name={this.props.form_name}
            onSubmit={this.validateForm}
            style={_extend(this.props.style, styles.base)}
          >
            <div className={`${formClass}-fields`}>
              <InputField type="hidden" name="thx" value="http://pages.email.nypl.org/confirmation" />
              <InputField type="hidden" name="err" value="http://pages.email.nypl.org/confirmation" />
              <InputField type="hidden" name="SubAction" value="sub_add_update" />
              <InputField type="hidden" name="MID" value="7000413" />
              <InputField type="hidden" name="Email Type" value="HTML" />
              <InputField type="hidden" name="lid" value="1061" />

              <InputField
                ariaLabel="Email Address Input"
                className={`${formClass}-Input`}
                type="email"
                name="Email Address"
                placeholder={this.props.placeholder}
                ref={emailAddressField}
                id={emailAddressField}
                isRequired
              />

              <div className={`${formClass}-Error ${errorClass}`}>
                <span className="nypl-icon-solo-x icon"></span>
                <span>Please enter a valid email address</span>
              </div>

              <div className={`${formClass}-Submit`}>
                <span className="nypl-icon-check-solo icon"></span>
                <InputField
                  ariaLabel="Sign up"
                  type="submit"
                  name="submit"
                  value="SIGN UP"
                  style={styles.submitButton}
                />
              </div>

              <InputField type="hidden" name="Source Code" value="Homepage" />
            </div>
          </form>
        </div>);

      if (status === 'success') {
        utils._trackHeader('Subscribe', 'Success');
        subscribeContent = (
          <div>
            <SubscribeMessageBox
              status={status}
              msg="Thank you for subscribing to our email updates."
            />
            <div className={`${this.props.className}-NewEmail`}>
              <a href="" onClick={this.initForm}>
                Enter another email address
              </a>
            </div>
            <div className={`${this.props.className}-FollowUs`}>
              <p>Follow us:</p>
              <SocialMediaLinksWidget
                className={`${this.props.className}-SocialMediaWidget`}
                links={config.socialMediaLinks}
                displayOnly={['facebook', 'twitter']}
              />
            </div>
          </div>
        );
      }

      if (status === 'exists') {
        utils._trackHeader('Subscribe', 'Error -- already subscribed');
        subscribeContent = (
          <div>
            <SubscribeMessageBox status={status} msg="Looks like you're already signed up!" />
            <div className={`${this.props.className}-NewEmail`}>
              <a href="" onClick={this.initForm}>
                Enter a different email address
              </a>
            </div>
          </div>
        );
      }

      if (status === 'error' || status === 'Internal Server Error') {
        utils._trackHeader('Subscribe', 'Error');
        subscribeContent = (
          <div className={`${this.props.className}-Misc-Error`}>
            <div>Hmm...</div>
            <div>Something isn&apos;t quite right.</div>
            <div>Please try again.</div>
            <a href="" onClick={this.initForm} style={styles.tryAgainButton}>
              <span className="nypl-icon-arrow-left icon"></span>
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
            onClick={() => utils._trackHeader('Subscribe', 'Subscription Center')}
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
  id: React.PropTypes.string,
  className: React.PropTypes.string,
  lang: React.PropTypes.string,
  target: React.PropTypes.string,
  form_name: React.PropTypes.string,
  list_id: React.PropTypes.string,
  form_method: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  policyUrl: React.PropTypes.string,
  subCenterUrl: React.PropTypes.string,
  style: React.PropTypes.object,
};

EmailSubscription.defaultProps = {
  id: 'EmailSubscription',
  className: 'EmailSubscription',
  lang: 'en',
  target: 'http://cl.exct.net/subscribe.aspx',
  form_name: 'subscribeForm',
  list_id: '1061',
  form_method: 'POST',
  placeholder: 'Your email address',
  policyUrl: 'http://www.nypl.org/help/about-nypl/legal-notices/privacy-policy',
  subCenterUrl: 'http://pages.email.nypl.org/page.aspx?QS=3935619f7de112ef7250fe02b84fb2f9ab74e4ea015814b7',
};

export default EmailSubscription;
