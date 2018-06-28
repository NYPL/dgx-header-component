import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { extend as _extend } from 'underscore';
import {
  BuildingIcon,
  LoginIcon,
} from '@nypl/dgx-svg-icons';

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
  componentDidMount() {
    if (this.refs.loginGreeting) {
      ReactDOM.findDOMNode(this.refs.loginGreeting).focus();
    } else {
      ReactDOM.findDOMNode(this.refs.catalogLoginLink).focus();
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
        LOG OUT
      </a> : <div style={styles.logOutLink}></div>;
  }

  /**
   * renderGreeting()
   * Returns the patron's name in the drop down menu if it exists.
   */
  renderGreeting() {
    return (this.props.patronName && this.props.isLoggedIn) ?
      <div className={`${this.props.className}-greeting`} ref="loginGreeting" tabIndex="0">
        <p className="login-indication">You are logged in as:</p>
        <p className="login-name">{this.props.patronName}</p>
      </div> : null;
  }

  render() {
    const catalogLinkClass = 'catalogLink';
    const researchLinkClass = 'researchLink';
    const catalogLink = this.renderLoginLinks().catalogLink;
    const researchLink = this.renderLoginLinks().researchLink;
    const catalogLinkLabel = (this.props.isLoggedIn) ? 'GO TO THE CATALOG' : 'LOG INTO THE CATALOG';
    const researchCatalogLinkLabel = (this.props.isLoggedIn) ? 'GO TO THE RESEARCH CATALOG' :
      'LOG INTO THE RESEARCH CATALOG';
    const loggedInMarginTop = (this.props.isLoggedIn) ? styles.loggedInLinksMarginTop : null;
    const gaAction = (this.props.isLoggedIn) ? 'Mobile Go To' : 'Mobile Log In';

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
          onClick={() => utils.trackHeader(gaAction, 'Catalog')}
          ref="catalogLoginLink"
        >
          <span
            className={`${catalogLinkClass}-wrapper`}
            style={_extend(styles.wrapper, styles.catalogLinkWrapper)}
          >
            <LoginIcon fill="#fff" ariaHidden focusable={false} />
            <span
              className={`${catalogLinkClass}-label`}
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
          onClick={() => utils.trackHeader(gaAction, 'Research')}
        >
          <span
            className={`${researchLinkClass}-wrapper`}
            style={_extend(styles.wrapper, styles.researchLinkWrapper)}
          >
            <BuildingIcon fill="#fff" ariaHidden focusable={false} />
            <span
              className={`${researchLinkClass}-label`}
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
  lang: PropTypes.string,
  className: PropTypes.string,
  catalogLink: PropTypes.string,
  researchLink: PropTypes.string,
  loginCatalogLink: PropTypes.string,
  loginResearchLink: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  patronName: PropTypes.string,
  logOutLink: PropTypes.string,
};

MobileMyNypl.defaultProps = {
  lang: 'en',
  className: 'mobileMyNypl',
  loginCatalogLink: appConfig.loginMyNyplLinks.catalog,
  loginResearchLink: appConfig.loginMyNyplLinks.research,
  catalogLink: appConfig.myNyplLinks.catalog,
  researchLink: appConfig.myNyplLinks.research,
  logOutLink: appConfig.loginMyNyplLinks.logOutLink,
  isLoggedIn: false,
  patronName: '',
};

export default MobileMyNypl;
