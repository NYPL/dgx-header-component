import React from 'react';
import { extend as _extend } from 'underscore';
// Config and Utility
import utils from '../../utils/utils.js';
import appConfig from '../../appConfig.js';

import { LogoutIcon } from 'dgx-svg-icons';

const styles = {
  base: {
    backgroundColor: '#2B2B2B',
    margin: 0,
    padding: 0,
  },
  links: {
    display: 'block',
    backgroundColor: '#E32B31',
    color: '#FFF',
    padding: 0,
    margin: '60px 0 0 0',
    width: '50%',
    minHeight: '90px',
    float: 'left',
    textAlign: 'center',
    textDecoration: 'none',
    lineHeight: 'normal',
  },
  loggedInLinksMarginTop: {
    margin: '120px 0 0 0',
  },
  label: {
    fontSize: '14px',
    textTransform: 'uppercase',
    display: 'inline-block',
    margin: '0',
  },
  wrapper: {
    width: '100%',
    display: 'block',
    margin: '0',
    padding: '1.75em 0',
  },
  logOutLink: {
    display: 'block',
    color: '#fff',
    textAlign: 'center',
    padding: '35px',
    fontSize: '18px',
    textTransform: 'uppercase',
    textDecoration: 'underline',
    clear: 'both',
  },
  researchLinkWrapper: {
    borderLeft: '1.25px solid #b92b1a',
    padding: '1.2em 0 1.75em',
  },
  researchLinkLabel: {
    width: '125px',
  },
  catalogLinkWrapper: {
    borderRight: '1.25px solid #b92b1a',
  },
  catalogLinkLabel: {
    width: '102px',
  },
  icon: {
    fontSize: '32px',
    display: 'inline-block',
    color: 'rgba(255, 255, 255, 0.6)',
  },
};

class MobileMyNypl extends React.Component {
  rednerLoginLinks() {
    if (this.props.isLoggedIn) {
      return (
        {
          catalogLink: this.props.sierraTestLink,
          researchLink: this.props.sierraTestLink,
        }
      );
    }

    if (this.props.isOauthLoginActivated) {
      return (
        {
          catalogLink: this.props.loginCatalogLink,
          researchLink: this.props.loginResearchLink,
        }
      );
    }

    return (
      {
        catalogLink: this.props.catalogLink,
        researchLink: this.props.researchLink,
      }
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
        className={`${this.props.className}-Catalog-Link`}
        onClick={() => utils.trackHeader('My NYPL', 'Log Out')}
        style={styles.logOutLink}
      >
        LOG OUT
      </a> : <div style={styles.logOutLink}></div>;
  }

  /**
   * renderGreeting()
   * Returns the patron's name in the drop down menu if it exists.
   */
  renderGreeting() {
    return (this.props.patronName && this.props.isLoggedIn) ?
      <div className={`${this.props.className}-Greeting`}>
        <p>
          HELLO, {this.props.patronName}
        </p>
      </div> : null;
  }

  render() {
    const catalogLinkClass = 'CatalogLink';
    const researchLinkClass = 'ResearchLink';
    const catalogLink = this.rednerLoginLinks().catalogLink;
    const researchLink = this.rednerLoginLinks().researchLink;
    const catalogLinkLabel = (this.props.isLoggedIn) ? 'GO TO THE CATALOG' : 'LOG INTO THE CATALOG';
    const researchCatalogLinkLabel = (this.props.isLoggedIn) ? 'GO TO THE RESEARCH CATALOG' :
      'LOG INTO THE RESEARCH CATALOG';
    const loggedInMarginTop = (this.props.isLoggedIn) ? styles.loggedInLinksMarginTop : null;

    return (
      <div
        className={this.props.className}
        style={styles.base}
        role="dialog"
      >
        {this.renderGreeting()}
        <a
          href={catalogLink}
          className={catalogLinkClass}
          style={_extend(styles.links, loggedInMarginTop)}
          onClick={() => utils.trackHeader('Mobile Log In', 'Catalog')}
        >
          <span
            className={`${catalogLinkClass}-Wrapper`}
            style={_extend(styles.wrapper, styles.catalogLinkWrapper)}
          >
            <span className={`${catalogLinkClass}-Icon nypl-icon-login`} style={styles.icon}>
            </span>
            <span
              className={`${catalogLinkClass}-Label`}
              style={_extend(styles.catalogLinkLabel, styles.label)}
            >
              {catalogLinkLabel}
            </span>
          </span>
        </a>
        <a
          href={researchLink}
          className={researchLinkClass}
          style={_extend(styles.links, loggedInMarginTop)}
          onClick={() => utils.trackHeader('Mobile Log In', 'Research')}
        >
          <span
            className={`${researchLinkClass}-Wrapper`}
            style={_extend(styles.wrapper, styles.researchLinkWrapper)}
          >
            <span className={`${researchLinkClass}-Icon nypl-icon-bldg`} style={styles.icon}></span>
            <span
              className={`${researchLinkClass}-Label`}
              style={_extend(styles.researchLinkLabel, styles.label)}
            >
              {researchCatalogLinkLabel}
            </span>
          </span>
        </a>
        {this.renderLogOutLink()}
      </div>
    );
  }
}

MobileMyNypl.propTypes = {
  lang: React.PropTypes.string,
  className: React.PropTypes.string,
  catalogLink: React.PropTypes.string,
  researchLink: React.PropTypes.string,
  loginCatalogLink: React.PropTypes.string,
  loginResearchLink: React.PropTypes.string,
  isLoggedIn: React.PropTypes.bool,
  isOauthLoginActivated: React.PropTypes.bool,
  patronName: React.PropTypes.string,
  logOutLink: React.PropTypes.string,
};

MobileMyNypl.defaultProps = {
  lang: 'en',
  className: 'MobileMyNypl',
  loginCatalogLink: appConfig.loginMyNyplLinks.catalog,
  loginResearchLink: appConfig.loginMyNyplLinks.research,
  catalogLink: appConfig.myNyplLinks.catalog,
  researchLink: appConfig.myNyplLinks.research,
  logOutLink: appConfig.loginMyNyplLinks.logOutLink,
  isLoggedIn: false,
  isOauthLoginActivated: false,
  patronName: '',
};

export default MobileMyNypl;
