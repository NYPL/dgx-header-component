import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {
  LogoutIcon,
  BuildingIcon,
  LoginIcon,
} from '@nypl/dgx-svg-icons';
// Config and Utility Library
import utils from '../../utils/utils';
import appConfig from '../../appConfig';

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
    fontFamily: 'system-ui, "Segoe UI", Tahoma',
    fontWeight: 400,
    fontSize: '14px',
    letterSpacing: '.03em',
    padding: '9px 17px 7px',
  },
};

class MyNypl extends React.Component {
  componentDidMount() {
    this.refs.catalogLink.focus();
  }

  /**
   * renderLoginLinks()
   * Returns the href addresses for catalog and research catalog buttons
   * based on different conditions.
   */
  renderLoginLinks() {
    return (
      {
        catalogLink: this.props.catalogLink,
        researchLink: this.props.researchLink,
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
        <LogoutIcon className="logoutIcon" ariaHidden focusable={false} />
        LOG OUT
      </a> : null;
  }

  render() {
    const catalogLinkLabel = 'GO TO THE CATALOG';
    const researchCatalogLinkLabel = 'GO TO THE RESEARCH CATALOG';
    const { catalogLink, researchLink } = this.renderLoginLinks();
    const gaAction = 'Go To';

    return (
      <div className={this.props.className} role="dialog">
        <ul className={`${this.props.className}-login-list`}>
          <li>
            <a
              ref="catalogLink"
              href={catalogLink}
              style={{
                ...styles.loginButtons,
                padding: "5px 58px 5px",
                marginBottom: "20px",
              }}
              className={`${this.props.className}-catalog-btn`}
              onClick={() => utils.trackHeader(gaAction, 'Catalog')}
            >
              <LoginIcon fill="#fff" ariaHidden focusable={false} />
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
              <BuildingIcon ariaHidden focusable={false} />
              {researchCatalogLinkLabel}
            </a>
          </li>
        </ul>
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
  id: '',
  className: 'myNypl',
  lang: 'en',
  loginCatalogLink: appConfig.myNyplLinks.catalog,
  loginResearchLink: appConfig.myNyplLinks.research,
  catalogLink: appConfig.myNyplLinks.catalog,
  researchLink: appConfig.myNyplLinks.research,
  logOutLink: appConfig.loginMyNyplLinks.logOutLink,
  isLoggedIn: false,
  patronName: '',
};

export default MyNypl;
