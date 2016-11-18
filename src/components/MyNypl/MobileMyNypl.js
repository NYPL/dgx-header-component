import React from 'react';
import { extend as _extend } from 'underscore';
// Config and Utility
import utils from '../../utils/utils.js';
import appConfig from '../../appConfig.js';

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
  logoutLink: {
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
  /**
   * renderLogoutLink()
   * Returns the log out button if the patron has been logged in.
   */
  renderLogoutLink() {
    return (this.props.isLoggedIn) ?
      <a
        href={this.props.logoutLink}
        className={`${this.props.className}-Catalog-Link`}
        onClick={() => utils.trackHeader('My NYPL', 'Log Out')}
        style={styles.logoutLink}
      >
        Log Out
      </a> : <div style={styles.logoutLink}></div>;
  }

  /**
   * renderGreeting()
   * Returns the patron's name in the drop down menu if it exists.
   */
  renderGreeting() {
    return (this.props.isLoggedIn) ?
      <div className={`${this.props.className}-Greeting`}>
        <p>
          HELLO, {this.props.patronName}
        </p>
      </div> : null;
  }

  render() {
    const catalogLinkClass = 'CatalogLink';
    const researchLinkClass = 'ResearchLink';
    const catalogLink = (!this.props.isOauthLoginActivated || this.props.isLoggedIn) ?
      this.props.catalogLink : this.props.loginCatalogLink;
    const researchLink = (!this.props.isOauthLoginActivated || this.props.isLoggedIn) ?
      this.props.researchLink : this.props.loginResearchLink;
    const catalogLinkLabel = (this.props.isLoggedIn) ? 'GO TO THE CATALOG' : 'LOG INTO THE CATALOG';
    const researchCatalogLinkLabel = (this.props.isLoggedIn) ? 'GO TO THE RESEARCH CATALOG' :
      'LOG INTO THE RESEARCH CATALOG';

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
          style={styles.links}
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
          style={styles.links}
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
        {this.renderLogoutLink()}
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
  logoutLink: React.PropTypes.string,
  isLoggedIn: React.PropTypes.bool,
  isOauthLoginActivated: React.PropTypes.bool,
  patronName: React.PropTypes.string,
};

MobileMyNypl.defaultProps = {
  lang: 'en',
  className: 'MobileMyNypl',
  loginCatalogLink: appConfig.loginMyNyplLinks.catalog,
  loginResearchLink: appConfig.loginMyNyplLinks.research,
  catalogLink: appConfig.myNyplLinks.catalog,
  researchLink: appConfig.myNyplLinks.research,
  logoutLink: appConfig.loginMyNyplLinks.logoutLink,
};

export default MobileMyNypl;
