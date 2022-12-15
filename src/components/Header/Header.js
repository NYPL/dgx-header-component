// NPM Modules
import React from 'react';
import PropTypes from 'prop-types';
import {
  extend as _extend,
  isEmpty as _isEmpty,
} from 'underscore';
// Feature FeatureFlags
import FeatureFlags from 'dgx-feature-flags';
import SkipNavigation from 'dgx-skip-navigation-link';

// Nav Config
import navConfig from '../../navConfig';
import featureFlagConfig from '../../featureFlagConfig';
import config from '../../appConfig';

// NYPL Components
import Logo from '../Logo/Logo';
import DonateButton from '../DonateButton/DonateButton';
import SimpleLink from '../Links/SimpleLink';
import SubscribeButton from '../SubscribeButton/SubscribeButton';
import MyNyplButton from '../MyNyplButton/MyNyplButton';
import NavMenu from '../NavMenu/NavMenu';
import MobileHeader from './MobileHeader';
import GlobalAlerts from '../GlobalAlerts/GlobalAlerts';
import FundraisingBanner from '../FundraisingBanner/FundraisingBanner';
// Utility Library
import utils from '../../utils/utils';
import EncoreCatalogLogOutTimer from '../../utils/encoreCatalogLogOutTimer';

const styles = {
  wrapper: {
    position: 'relative',
  },
  topButtons: {
    position: 'absolute',
    top: '20px',
    textTransform: 'uppercase',
    display: 'block',
  },
  locationsTopLink: {
    display: 'inline-block',
    color: '#000',
    backgroundColor: '#FFF',
    padding: '12px',
    verticalAlign: 'baseline',
  },
  libraryCardButton: {
    display: 'inline-block',
    color: '#000',
    backgroundColor: '#FFF',
    padding: '12px',
    verticalAlign: 'baseline',
  },
  subscribeButton: {
    display: 'inline-block',
    margin: '0px 10px 0px 0px',
    verticalAlign: 'baseline',
  },
  donateButton: {
    display: 'inline-block',
    padding: '10px 18px',
    margin: '0 5px 0 0',
    lineHeight: 'normal',
    verticalAlign: 'baseline',
  },
  shopLink: {
    color: '#000',
    backgroundColor: '#FFF',
    padding: '10px 15px',
    margin: '0 0 0 5px',
    verticalAlign: 'baseline',
  },
  mobileMyNypl: {
    position: 'absolute',
    zIndex: 1000,
    right: '0',
    width: '310px',
    minHeight: '130px',
    backgroundColor: '#1B7FA7',
    padding: '25px 30px',
  },
};

class Header extends React.Component {
  constructor(props) {
    super(props);

    const {
      patron,
      navData,
      currentTime = Date.now() || undefined,
      isTest = false,
    } = this.props;

    const patronNameObject = !_isEmpty(patron) && patron.names && patron.names.length ?
      utils.modelPatronName(patron.names[0]) : {};

    this.state = _extend(
      {
        navData,
        loginCookieName: 'nyplIdentityPatron',
        loginCookieValue: null,
        patronName: patronNameObject.name || '',
        patronInitial: patronNameObject.initial || '',
        patronDataReceived: patron.loggedIn || false,
        isFeatureFlagsActivated: {},
        logOutUrl: '',
        currentTime,
        isTest,
      },
      { featureFlagsStore: FeatureFlags.store.getState() },
    );
  }

  componentDidMount() {
    // Listen on FeatureFlags Store updates
    FeatureFlags.store.listen(this.onFeatureFlagsChange.bind(this));
    // Set the log out link to state
    // this.setLogOutLink(window.location.href);
    // Set the timer to log out the user from the Encore Catalog
    // (mainly for Encore while Catalog as a side effect)
    EncoreCatalogLogOutTimer.setEncoreLoggedInTimer(
      window.location.host,
      this.state.currentTime,
      this.state.isTest
    );
    // Set nyplIdentityPatron cookie to the state.
    // this.setLoginCookie(this.state.loginCookieName);
    // Set feature flag cookies to the state
    // We don't have any feature flags set in the config list at this moment though
    utils.checkFeatureFlagActivated(
      featureFlagConfig.featureFlagList, this.state.isFeatureFlagsActivated
    );
  }

  componentWillUnmount() {
    // Listen on FeatureFlags Store updates
    FeatureFlags.store.unlisten(this.onFeatureFlagsChange.bind(this));
    // Removing event listener to minimize garbage collection
  }

  onFeatureFlagsChange() {
    this.setState({ featureFlagsStore: FeatureFlags.store.getState() });
  }

  /**
   * setLoginCookie()
   * Updates the state loginCookieValue property
   */
  setLoginCookie(cookie) {
    if (utils.hasCookie(cookie)) {
      const loginCookieValue = utils.getCookie(cookie);

      this.setState({ loginCookieValue });

      if (!this.state.patronDataReceived) {
        this.fetchPatronData(loginCookieValue);
      }
    } else {
      this.setState({ loginCookieValue: null });
    }
  }

  /**
   * setLogOutLink(location)
   * Generate the full log out url including the redirect URI, and update the state with it.
   * @param {location} - The URI for redirect request
   */
  setLogOutLink(location) {
    this.setState({ logOutUrl: utils.renderDynamicLogOutLink(location) });
  }

  /**
   * fetchPatronData(cookie)
   * Executes utils.getLoginData to fetch patron's data based on the cookie.
   * Updates the state with the results.
   * Also, pass this.setLoginCookie(), if cookie needs to be refreshed and set again.
   * @param {cookie} - The cookie returned from log in.
   */
  fetchPatronData(cookie) {
    utils.getLoginData(
      cookie,
      result => {
        if (result.data && result.data.data) {
          const patronNameObject = utils.modelPatronName(utils.extractPatronName(result.data));

          this.setState({
            patronName: patronNameObject.name,
            patronInitial: patronNameObject.initial,
            patronDataReceived: true,
          });
        }
      },
      config.loginMyNyplLinks.tokenRefreshLink,
      () => {
        this.setLoginCookie(this.state.loginCookieName);
      },
    );
  }

  render() {
    const headerClass = this.props.className;
    const skipNav = this.props.skipNav ? (<SkipNavigation {...this.props.skipNav} />) : '';
    const isLoggedIn = !!this.state.patronDataReceived;

    return (
      <header
        id={this.props.id}
        className={headerClass}
      >
        {skipNav}
        <GlobalAlerts className={`${headerClass}-globalAlerts`} />
        <div className={`${headerClass}-wrapper`}>
          <MobileHeader
            className={`${headerClass}-mobile`}
            locatorUrl={
              (this.props.urlType === 'absolute') ?
                '//www.nypl.org/locations/map?nearme=true' : '/locations/map?nearme=true'
            }
            nyplRootUrl={(this.props.urlType === 'absolute') ? '//www.nypl.org' : '/'}
            isLoggedIn
            patronName={this.state.patronName}
            logOutLink={this.state.logOutUrl}
            navData={this.props.navData}
            urlType={this.props.urlType}
          />
          <div
            className={`${headerClass}-topWrapper`}
            style={styles.wrapper}
          >
            <Logo
              className={`${headerClass}-logo`}
              target={(this.props.urlType === 'absolute') ? '//www.nypl.org' : '/'}
            />
            <nav
              className={`${headerClass}-buttons`}
              style={styles.topButtons}
              aria-label="Header top links"
            >
              <ul>
                <li>
                  <MyNyplButton
                    refId="desktopLogin"
                    gaAction='My Account'
                  />
                </li>
                <li>
                  <SimpleLink
                    label="Locations"
                    target={
                      (this.props.urlType === 'absolute') ?
                        '//www.nypl.org/locations/map' : '/locations/map'
                    }
                    className="locationsTopLink"
                    id="locationsTopLink"
                    gaAction="Locations"
                    gaLabel="Header Top Links"
                    style={styles.locationsTopLink}
                  />
                </li>
                <li>
                  <SimpleLink
                    label="Get a Library Card"
                    target={
                      (this.props.urlType === 'absolute') ?
                        '//www.nypl.org/library-card' : '/library-card'
                    }
                    className="libraryCardButton"
                    id="libraryCardButton"
                    gaAction="Get a Library Card"
                    gaLabel="Header Top Links"
                    style={styles.libraryCardButton}
                  />
                </li>
                <li>
                  <SubscribeButton
                    label="Get Email Updates"
                    lang={this.props.lang}
                    style={styles.subscribeButton}
                  />
                </li>
                <li>
                  <DonateButton
                    id="donateButton"
                    lang={this.props.lang}
                    style={styles.donateButton}
                    gaLabel="Header Top Links"
                  />
                </li>
                <li>
                  <SimpleLink
                    label="Shop"
                    target={'http://shop.nypl.org/?utm_campaign=NYPLHeaderButton&utm_' +
                      'source=nypl.org&utm_medium=referral'}
                    className="shopTopLink"
                    id="shopTopLink"
                    gaAction="Shop"
                    gaLabel="Header Top Links"
                    style={styles.shopLink}
                  />
                </li>
              </ul>
            </nav>
          </div>
          <NavMenu
            className={`${headerClass}-navMenu`}
            lang={this.props.lang}
            items={this.state.navData}
            urlType={this.props.urlType}
            isLoggedIn
            patronName={this.state.patronName}
            logOutLink={this.state.logOutUrl}
          />
        </div>
        {FeatureFlags.store._isFeatureActive(config.fundraising.experimentName) &&
          <FundraisingBanner
            hideBannerCookieName="closeFundraiserBanner"
            gaLabel="Header Fundraising Banner"
          />
        }
      </header>
    );
  }
}

Header.propTypes = {
  lang: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string,
  navData: PropTypes.arrayOf(PropTypes.object).isRequired,
  skipNav: PropTypes.shape(SkipNavigation.propTypes),
  currentTime: PropTypes.number,
  isTest: PropTypes.bool,
  patron: PropTypes.shape({
    names: PropTypes.arrayOf(PropTypes.string),
    loggedIn: PropTypes.bool,
  }),
  urlType: PropTypes.string,
};

Header.defaultProps = {
  lang: 'en',
  className: 'header',
  id: 'nyplHeader',
  skipNav: null,
  urlType: 'relative',
  patron: {},
};

export {
  Header,
  navConfig,
};
