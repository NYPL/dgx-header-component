// NPM Modules
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
  extend as _extend,
  isEmpty as _isEmpty,
} from 'underscore';
// Feature FeatureFlags
import FeatureFlags from 'dgx-feature-flags';

// Nav Config
import navConfig from '../../navConfig.js';
import featureFlagConfig from '../../featureFlagConfig.js';
import config from '../../appConfig.js';
// ALT Flux
import HeaderStore from '../../stores/HeaderStore.js';
import Actions from '../../actions/Actions.js';
// NYPL Components
import Logo from '../Logo/Logo.js';
import DonateButton from '../DonateButton/DonateButton.js';
import SimpleLink from '../Links/SimpleLink.js';
import SubscribeButton from '../SubscribeButton/SubscribeButton.js';
import MyNyplButton from '../MyNyplButton/MyNyplButton.js';
import NavMenu from '../NavMenu/NavMenu.js';
import MobileHeader from './MobileHeader.js';
import GlobalAlerts from '../GlobalAlerts/GlobalAlerts.js';
import FundraisingBanner from '../FundraisingBanner/FundraisingBanner';
import SkipNavigation from 'dgx-skip-navigation-link';
// Utility Library
import utils from '../../utils/utils.js';

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
    padding: '5px 15px 5px 5px',
    verticalAlign: 'baseline',
  },
  libraryCardButton: {
    display: 'inline-block',
    color: '#000',
    backgroundColor: '#FFF',
    padding: '5px',
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
    width: '220px',
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
      },
      HeaderStore.getState(),
      { featureFlagsStore: FeatureFlags.store.getState() },
    );
  }

  componentDidMount() {
    HeaderStore.listen(this.onChange.bind(this));
    // Listen on FeatureFlags Store updates
    FeatureFlags.store.listen(this.onFeatureFlagsChange.bind(this));
    // Set the log out link to state
    this.setLogOutLink(window.location.href);
    // Set nyplIdentityPatron cookie to the state.
    this.setLoginCookie(this.state.loginCookieName);
    // Set feature flag cookies to the state
    // We don't have any feature flags set in the config list at this moment though
    utils.checkFeatureFlagActivated(
      featureFlagConfig.featureFlagList, this.state.isFeatureFlagsActivated
    );
  }

  componentWillUnmount() {
    HeaderStore.unlisten(this.onChange.bind(this));
    // Listen on FeatureFlags Store updates
    FeatureFlags.store.unlisten(this.onFeatureFlagsChange.bind(this));
    // Removing event listener to minimize garbage collection
  }

  onChange() {
    this.setState(
      _extend(
        {
          loginCookieValue: this.state.loginCookieValue,
          patronName: this.state.patronName,
          patronInitial: this.state.patronInitial,
          patronDataReceived: this.state.patronDataReceived,
          isFeatureFlagsActivated: {},
          logOutUrl: this.state.logOutUrl,
        },
        HeaderStore.getState()
      )
    );
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
   * getWindowVerticallScroll()
   * returns the current window vertical
   * scroll position in pixels.
   * @returns {number} - Vertical Scroll Position.
   */
  getWindowVerticalScroll() {
    return window.scrollY
      || window.pageYOffset
      || document.documentElement.scrollTop;
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
      }
    );
  }

  render() {
    const headerClass = this.props.className || 'Header';
    const skipNav = this.props.skipNav ?
      (<SkipNavigation {...this.props.skipNav} />) : '';
    const isLoggedIn = !!this.state.patronDataReceived;
    const gaAction = (isLoggedIn) ? 'My Account' : 'Log In';

    return (
      <header
        id={this.props.id}
        className={headerClass}
        ref="nyplHeader"
      >
        {skipNav}
        <GlobalAlerts className={`${headerClass}-GlobalAlerts`} />
        <div className={`${headerClass}-Wrapper`}>
          <MobileHeader
            className={`${headerClass}-Mobile`}
            locatorUrl={
              (this.props.urlType === 'absolute') ?
                '//www.nypl.org/locations/map?nearme=true' : '/locations/map?nearme=true'
            }
            nyplRootUrl={(this.props.urlType === 'absolute') ? '//www.nypl.org' : '/'}
            isLoggedIn={isLoggedIn}
            patronName={this.state.patronName}
            logOutLink={this.state.logOutUrl}
            ref="headerMobile"
          />
          <div
            className={`${headerClass}-TopWrapper`}
            style={styles.wrapper}
            ref="headerTopWrapper"
          >
            <Logo
              className={`${headerClass}-Logo`}
              target={(this.props.urlType === 'absolute') ? '//www.nypl.org' : '/'}
            />
            <nav
              className={`${headerClass}-Buttons`}
              style={styles.topButtons}
              aria-label="Header top links"
            >
              <ul>
                <li>
                  <MyNyplButton
                    refId="desktopLogin"
                    isLoggedIn={isLoggedIn}
                    patronName={this.state.patronName}
                    logOutLink={this.state.logOutUrl}
                    gaAction={gaAction}
                  />
                </li>
                <li>
                  <SimpleLink
                    label="Locations"
                    target={
                      (this.props.urlType === 'absolute') ?
                        '//www.nypl.org/locations/map' : '/locations/map'
                    }
                    className="LocationsTopLink"
                    id="LocationsTopLink"
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
                    className="LibraryCardButton"
                    id="LibraryCardButton"
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
                    id="Top-DonateButton"
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
            className={`${headerClass}-NavMenu`}
            lang={this.props.lang}
            items={this.state.navData}
            urlType={this.props.urlType}
            isLoggedIn={isLoggedIn}
            patronName={this.state.patronName}
            logOutLink={this.state.logOutUrl}
            gaAction={gaAction}
          />
        </div>
        { FeatureFlags.store._isFeatureActive(config.fundraising.experimentName) &&
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
  navData: PropTypes.array,
  skipNav: PropTypes.object,
  patron: PropTypes.object,
  urlType: PropTypes.string,
};

Header.defaultProps = {
  lang: 'en',
  className: 'Header',
  id: 'nyplHeader',
  skipNav: null,
  urlType: '',
  patron: {},
};

export {
  Header,
  navConfig,
};
