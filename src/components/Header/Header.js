// NPM Modules
import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import {
  extend as _extend,
  map as _map,
} from 'underscore';
import FeatureFlags from 'dgx-feature-flags';
// Nav Config
import navConfig from '../../navConfig.js';
import featureFlagConfig from '../../featureFlagConfig.js';
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
    padding: '5px 15px 5px 5px',
    verticalAlign: 'baseline',
  },
  libraryCardButton: {
    display: 'inline-block',
    color: '#000',
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

    this.state = _extend(
      {
        headerHeight: null,
        navData: this.props.navData,
        loginCookie: null,
        patronName: '',
        patronInitial: '',
        isFeatureFlagsActivated: {
          OauthLogin: FeatureFlags.store._getImmutableState().get('OauthLogin'),
        },
      },
      HeaderStore.getState()
    );

    this.handleStickyHeader = this.handleStickyHeader.bind(this);
  }

  componentDidMount() {
    HeaderStore.listen(this.onChange.bind(this));
    // Height needs to be set once the alerts (if any) are mounted.
    this.setHeaderHeight();
    // Listen to the scroll event for the sticky header.
    window.addEventListener('scroll', this.handleStickyHeader, false);

    // Set nyplIdentityPatron cookie to the state.
    this.setLoginCookie();

    // Set feature flag cookies to the state
    this.checkFeatureFlagActivated(featureFlagConfig.featureFlagList);
  }

  componentWillUnmount() {
    HeaderStore.unlisten(this.onChange.bind(this));
    // Removing event listener to minimize garbage collection
    window.removeEventListener('scroll', this.handleStickyHeader, false);
  }

  onChange() {
    this.setState(
      _extend(
        {
          headerHeight: this.state.headerHeight,
          loginCookie: this.state.loginCookie,
          patronNameObject: this.state.patronNameObject,
          isFeatureFlagsActivated: {
            OauthLogin: FeatureFlags.store._getImmutableState().get('OauthLogin'),
          },
        },
        HeaderStore.getState()
      )
    );
  }

  /**
   * setLoginCookie()
   * Updates the state loginCookie property
   */
  setLoginCookie() {
    if (utils.hasCookie('nyplIdentityPatron')) {
      const loginCookie = utils.getCookie('nyplIdentityPatron');

      this.setState({ loginCookie });
      this.fetchPatronData(loginCookie);
    } else {
      this.setState({ loginCookie: null });
    }
  }

  /**
   * getHeaderHeight()
   * returns the Height of the Header DOM
   * element in pixels.
   */
  getHeaderHeight() {
    const headerDOM = ReactDOM.findDOMNode(this.refs.nyplHeader);
    return headerDOM.getBoundingClientRect().height;
  }

  /**
   * setHeaderHeight()
   * Updates the state headerHeight property
   * only if headerHeight is not defined.
   */
  setHeaderHeight() {
    if (!this.state.headerHeight) {
      setTimeout(() => {
        this.setState({ headerHeight: this.getHeaderHeight() });
      }, 500);
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
   * checkFeatureFlagActivated(featureFlagList)
   * Check if the feature flags have been set. If they have not, activate the function to check
   * if the related cookies are set.
   * @param {string[]} featureFlagList - The list of the feature flags we want to set.
   */
  checkFeatureFlagActivated(featureFlagList) {
    _map(featureFlagList, (item) => {
      if (!this.state.isFeatureFlagsActivated[item]) {
        this.checkFeatureFlagCookie(item);
      }
    });
  }

  /**
   * checkFeatureFlagCookie(name)
   * Check if the cookie exist. If they do, activate the function to enable
   * the indicated feature flags.
   * @param {string} name - The name of the cookie.
   */
  checkFeatureFlagCookie(name) {
    if (utils.hasCookie(`nyplFeatureFlag${name}`)) {
      this.activateFeatureFlag(name);
    }
  }

  /**
   * activateFeatureFlags(name)
   * Activate the feature flag that are indicated in the cookie.
   * @param {string} name - The feature flag's name.
   */
  activateFeatureFlag(name) {
    FeatureFlags.utils.activateFeature(name);
  }

  /**
   * fetchPatronData(cookie)
   * Executes utils.getLoginData to fetch patron's data based on the cookie.
   * Updates the state with the results.
   * @param {cookie} - The cookie returned from log in.
   */
  fetchPatronData(cookie) {
    utils.getLoginData(cookie, result => {
      if (result.data && result.data.data) {
        const patronNameObject = utils.modelPatronName(utils.extractPatronName(result.data));

        this.setState({
          patronName: patronNameObject.name,
          patronInitial: patronNameObject.initial,
        });
      }
    });
  }

  /**
   * handleStickyHeader()
   * Executes Actions.updateIsHeaderSticky()
   * with the proper boolean value to update the
   * HeaderStore.isSticky value based on the window
   * vertical scroll position surpassing the height
   * of the Header DOM element.
   */
  handleStickyHeader() {
    const headerHeight = this.state.headerHeight;
    const windowVerticalDistance = this.getWindowVerticalScroll();

    if (windowVerticalDistance && headerHeight && (windowVerticalDistance > headerHeight)) {
      // Only update the value if sticky is false
      if (!HeaderStore.getIsStickyValue()) {
        // Fire GA Event when Header is in Sticky Mode
        utils.trackHeader.bind(this, 'scroll', 'Sticky Header');
        // Update the isSticky flag
        Actions.updateIsHeaderSticky(true);
      }
    } else {
      // Avoids re-assignment on each scroll by checking if it is already true
      if (HeaderStore.getIsStickyValue()) {
        Actions.updateIsHeaderSticky(false);
      }
    }
  }

  render() {
    const isHeaderSticky = this.state.isSticky;
    const headerHeight = this.state.headerHeight;
    const headerClass = this.props.className || 'Header';
    const headerClasses = cx(headerClass, { sticky: isHeaderSticky });
    const skipNav = this.props.skipNav ?
      (<SkipNavigation {...this.props.skipNav} />) : '';
    const isLoggedIn = !!this.state.loginCookie;
    const isOauthLoginActivated = !!this.state.isFeatureFlagsActivated.OauthLogin;
    const myNyplButtonLabel = this.state.patronName || 'Log In';

    return (
      <header
        id={this.props.id}
        className={headerClasses}
        ref="nyplHeader"
        style={(isHeaderSticky) ? { height: `${headerHeight}px` } : null}
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
            isOauthLoginActivated={isOauthLoginActivated}
            patronInitial={this.state.patronInitial}
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
            <div className={`${headerClass}-Buttons`} style={styles.topButtons}>
              <MyNyplButton
                label={myNyplButtonLabel}
                refId="desktopLogin"
                isLoggedIn={isLoggedIn}
                isOauthLoginActivated={isOauthLoginActivated}
              />
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
              <SubscribeButton
                label="Get Email Updates"
                lang={this.props.lang}
                style={styles.subscribeButton}
              />
              <DonateButton
                id="Top-DonateButton"
                lang={this.props.lang}
                style={styles.donateButton}
                gaLabel="Header Top Links"
              />
              <SimpleLink
                label="Shop"
                target="http://shop.nypl.org"
                className="shopTopLink"
                id="shopTopLink"
                gaAction="Shop"
                gaLabel="Header Top Links"
                style={styles.shopLink}
              />
            </div>
          </div>
          <NavMenu
            className={`${headerClass}-NavMenu`}
            lang={this.props.lang}
            items={this.state.navData}
            urlType={this.props.urlType}
            isLoggedIn={isLoggedIn}
            patronInitial={this.state.patronInitial}
            isOauthLoginActivated={isOauthLoginActivated}
          />
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  lang: React.PropTypes.string,
  className: React.PropTypes.string,
  id: React.PropTypes.string,
  navData: React.PropTypes.array,
  skipNav: React.PropTypes.object,
  urlType: React.PropTypes.string,
};

Header.defaultProps = {
  lang: 'en',
  className: 'Header',
  id: 'nyplHeader',
  skipNav: null,
  urlType: '',
};

export {
  Header,
  navConfig,
};
