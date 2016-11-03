import React from 'react';
// Config and Utility Library
import utils from '../../utils/utils.js';
import appConfig from '../../appConfig.js';
import FeatureFlags from 'dgx-feature-flags';

const styles = {
  logoutLink: {
    backgroundColor: '#FFF',
    border: '10px solid #FFF',
    borderRadius: '20px',
    bottom: '15px',
    color: '#1B7FA7',
    fontSize: '14px',
    fontWeight: '200',
    letterSpacing: '.03em',
    padding: '3px 20px',
    position: 'absolute',
    right: '30px',
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
  constructor(props) {
    super(props);

    this.state = {
      isOauthLogin: FeatureFlags.store._getImmutableState().get('oauth-login'),
    };
  }

  componentDidMount() {
    this.refs.catalogLink.focus();
  }

  componentWillUnmount() {
    this.refs.catalogLink.blur();
  }

  onChange() {
    this.setState({
      isOauthLogin: FeatureFlags.store._getImmutableState().get('oauth-login'),
    });
  }

  renderLogoutLink() {
    return (this.props.isLogin) ?
      <a
        href={this.props.logoutLink}
        className={`${this.props.className}-Catalog-Link`}
        onClick={() => utils.trackHeader('My NYPL', 'Log Out')}
        style={styles.logoutLink}
      >
        Log Out
      </a> : null;
  }

  render() {
    const catalogLinkLabel = (this.props.isLogin) ? 'GO TO THE CATALOG' : 'LOG INTO THE CATALOG';
    const researchCatalogLinkLabel = (this.props.isLogin) ? 'GO TO THE RESEARCH CATALOG' :
      'LOG INTO THE RESEARCH CATALOG';
    const catalogLink = (!this.state.isOauthLogin || this.props.isLogin) ?
      this.props.catalogLink : this.props.loginCatalogLink;
    const researchLink = (!this.state.isOauthLogin || this.props.isLogin) ?
      this.props.researchLink : this.props.loginResearchLink;

    console.log(FeatureFlags.store._getImmutableState().get('oauth-login'));

    return (
      <div className={this.props.className} role="dialog">
        <ul className={`${this.props.className}-Login-List`}>
          <li>
            <a
              ref="catalogLink"
              href={catalogLink}
              style={styles.loginButtons}
              className={`${this.props.className}-Catalog-Btn`}
              onClick={() => utils.trackHeader('Log In', 'Catalog')}
            >
              <span className="nypl-icon-login icon"></span>
              {catalogLinkLabel}
            </a>
          </li>
          <li>
            <a
              href={researchLink}
              style={styles.loginButtons}
              className={`${this.props.className}-Research-Btn`}
              onClick={() => utils.trackHeader('Log In', 'Research')}
            >
              <span className="nypl-icon-bldg icon"></span>
              {researchCatalogLinkLabel}
            </a>
          </li>
        </ul>

        {this.renderLogoutLink()}
      </div>
    );
  }
}

MyNypl.propTypes = {
  id: React.PropTypes.string,
  className: React.PropTypes.string,
  lang: React.PropTypes.string,
  catalogLink: React.PropTypes.string,
  researchLink: React.PropTypes.string,
  loginCatalogLink: React.PropTypes.string,
  loginResearchLink: React.PropTypes.string,
  logoutLink: React.PropTypes.string,
  isLogin: React.PropTypes.bool,
};

MyNypl.defaultProps = {
  className: 'MyNypl',
  lang: 'en',
  loginCatalogLink: appConfig.loginMyNyplLinks.catalog,
  loginResearchLink: appConfig.loginMyNyplLinks.research,
  catalogLink: appConfig.myNyplLinks.catalog,
  researchLink: appConfig.myNyplLinks.research,
  logoutLink: appConfig.loginMyNyplLinks.logoutLink,
};

export default MyNypl;
