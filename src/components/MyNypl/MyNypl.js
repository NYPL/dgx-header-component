import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
// Config and Utility Library
import utils from '../../utils/utils.js';
import appConfig from '../../appConfig.js';

import {
  LogoutIcon,
  BuildingIcon,
  LoginIcon,
} from '@nypl/dgx-svg-icons';

const styles = {
  logOutLink: {
    backgroundColor: '#FFF',
    border: '3px solid #FFF',
    borderRadius: '33px',
    bottom: '30px',
    color: '#1B7FA7',
    fontSize: '14px',
    fontWeight: '200',
    letterSpacing: '.03em',
    padding: '3px 20px',
    position: 'absolute',
    left: '30px',
  },
  loginButtons: {
    backgroundColor: '#1B7FA7',
    border: '2px solid #FFF',
    color: '#FFF',
    display: 'inline-block',
    fontFamily: 'Kievit-Book',
    fontSize: '14px',
    letterSpacing: '.03em',
    marginTop: '20px',
    padding: '9px 17px 7px',
  },
};

class MyNypl extends React.Component {
  componentDidMount() {
    if (this.refs.patronGreetingWrapper) {
      ReactDOM.findDOMNode(this.refs.patronGreetingWrapper).focus();
    } else {
      this.refs.catalogLink.focus();
    }
  }

  /**
   * renderLoginLinks()
   * Returns the href addresses for catalog and research catalog buttons
   * based on different conditions.
   */
  renderLoginLinks() {
    if (this.props.isLoggedIn) {
      return (
        {
          catalogLink: this.props.catalogLink,
          researchLink: this.props.researchLink,
        }
      );
    }

    return (
      {
        catalogLink: this.props.loginCatalogLink,
        researchLink: this.props.loginResearchLink,
      }
    );
  }

  /**
   * renderGreeting()
   * Returns the patron's name in the drop down menu if it exists.
   */
  renderGreeting() {
    if (!this.props.patronName || !this.props.isLoggedIn) {
      return null;
    }

    return (
      <div tabIndex="0" className="patron-greeting-wrapper" ref="patronGreetingWrapper">
        <p className={`${this.props.className}-patron-greeting login-indication`}>
          You are logged in as:
        </p>
        <p className={`${this.props.className}-patron-greeting login-name`}>
          {this.props.patronName}
        </p>
      </div>
    );
  }

  /**
   * renderLogOutLink()
   * Returns the log out button if the patron has been logged in.
   */
  renderLogOutLink() {
    return (this.props.isLoggedIn) ?
      <a
        href={this.props.logOutLink}
        className={`${this.props.className}-catalog-link`}
        onClick={() => utils.trackHeader('My Account', 'Log Out')}
        style={styles.logOutLink}
      >
        <LogoutIcon className="logoutIcon" ariaHidden />
        LOG OUT
      </a> : null;
  }

  render() {
    const catalogLinkLabel = (this.props.isLoggedIn) ? 'GO TO THE CATALOG' : 'LOG INTO THE CATALOG';
    const researchCatalogLinkLabel = (this.props.isLoggedIn) ? 'GO TO THE RESEARCH CATALOG' :
      'LOG INTO THE RESEARCH CATALOG';
    const catalogLink = this.renderLoginLinks().catalogLink;
    const researchLink = this.renderLoginLinks().researchLink;
    const gaAction = (this.props.isLoggedIn) ? 'Go To' : 'Log In';

    return (
      <div className={this.props.className} role="dialog">
       {this.renderGreeting()}
        <ul className={`${this.props.className}-login-list`}>
          <li>
            <a
              ref="catalogLink"
              href={catalogLink}
              style={styles.loginButtons}
              className={`${this.props.className}-catalog-btn`}
              onClick={() => utils.trackHeader(gaAction, 'Catalog')}
            >
              <LoginIcon fill="#fff" ariaHidden />
              {catalogLinkLabel}
            </a>
          </li>
          <li>
            <a
              href={researchLink}
              style={styles.loginButtons}
              className={`${this.props.className}-research-btn`}
              onClick={() => utils.trackHeader(gaAction, 'Research')}
            >
              <BuildingIcon ariaHidden />
              {researchCatalogLinkLabel}
            </a>
          </li>
        </ul>
        {this.renderLogOutLink()}
      </div>
    );
  }
}

MyNypl.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  lang: PropTypes.string,
  catalogLink: PropTypes.string,
  researchLink: PropTypes.string,
  loginCatalogLink: PropTypes.string,
  loginResearchLink: PropTypes.string,
  logOutLink: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  patronName: PropTypes.string,
};

MyNypl.defaultProps = {
  className: 'myNypl',
  lang: 'en',
  loginCatalogLink: appConfig.loginMyNyplLinks.catalog,
  loginResearchLink: appConfig.loginMyNyplLinks.research,
  catalogLink: appConfig.myNyplLinks.catalog,
  researchLink: appConfig.myNyplLinks.research,
  logOutLink: appConfig.loginMyNyplLinks.logOutLink,
  isLoggedIn: false,
  patronName: '',
};

export default MyNypl;
