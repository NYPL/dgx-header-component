// NPM Modules
import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import { extend as _extend } from 'underscore';
// Nav Config
import navConfig from '../../navConfig.js';
// ALT Flux
import HeaderStore from '../../stores/HeaderStore.js';
import Actions from '../../actions/Actions.js';
// NYPL Components
import Logo from '../Logo/Logo.js';
import DonateButton from '../DonateButton/DonateButton.js';
import SimpleButton from '../Buttons/SimpleButton.js';
import SubscribeButton from '../SubscribeButton/SubscribeButton.js';
import MyNyplButton from '../MyNyplButton/MyNyplButton.js';
import MobileMyNypl from '../MyNypl/MobileMyNypl.js';
import NavMenu from '../NavMenu/NavMenu.js';
import MobileHeader from './MobileHeader.js';
import GlobalAlerts from '../GlobalAlerts/GlobalAlerts.js';
import SkipNavigation from 'dgx-skip-navigation-link';
// Utility Library
import utils from '../../utils/utils.js';
// FeatureFlags Module
import FeatureFlags from 'dgx-feature-flags';

import reactGA from 'dgx-react-ga';

// When minifying with Webpack, you can use this:
// import '../../styles/main.scss';
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
        cookie: this.getCookie('nyplpreview'),
        featureFlags: FeatureFlags.store.getState(),
      },
      HeaderStore.getState()
    );

    this.handleStickyHeader = this.handleStickyHeader.bind(this);
  }

  componentDidMount() {
    HeaderStore.listen(this.onChange.bind(this));
    FeatureFlags.store.listen(this.onChange.bind(this));

    // Height needs to be set once the alerts (if any) are mounted.
    this.setHeaderHeight();

    // Set which FeatureFlag is to be fired based off preview cookie
    this.setFeatureFlagHeaderCall();

    // Watch which FeatureFlag is called to fire
    // the proper client-side ajax call to populate the Header data state
    this.watchFeatureFlagHeaderCall();

    // Read the cookie of "nyplpreview", if the cookie exists and its value is "1",
    // set dimension1 with value of "Public Preview"
    this.setPublicPreviewGA();

    // Listen to the scroll event for the sticky header.
    window.addEventListener('scroll', this.handleStickyHeader, false);
  }

  componentWillUnmount() {
    HeaderStore.unlisten(this.onChange.bind(this));
    FeatureFlags.store.unlisten(this.onChange.bind(this));

    // Removing event listener to minimize garbage collection
    window.removeEventListener('scroll', this.handleStickyHeader, false);
  }

  componentDidUpdate(prevProps, prevState) {
    // Re-fetch the default/current IA /header-data endpoint if
    // the FeatureFlag 'header-upcoming-ia' has been deactivated.
    // Used only as a fallback to deactivate a flag and set the
    // Header data to it's default IA.
    if (!this.state.featureFlags.get('header-upcoming-ia') &&
      prevState.featureFlags.get('header-upcoming-ia')) {
      Actions.fetchHeaderData(this.props.env, this.props.urls);
    }
  }

  onChange() {
    this.setState(
      _extend(
        {
          headerHeight: this.state.headerHeight,
          cookie: this.state.cookie,
          featureFlags: FeatureFlags.store.getState(),
        },
        HeaderStore.getState()
      )
    );
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
   */
  getWindowVerticalScroll() {
    return window.scrollY
      || window.pageYOffset
      || document.documentElement.scrollTop;
  }

  /**
   * Returns the value for the given cookie name.
   * If the cookie doesn't exist a null value will be returned.
   * https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie/Simple_document.cookie_framework
   * @returns {string} - Cookie value.
   */
  getCookie(name) {
    if (!name || typeof document === 'undefined' || !document.cookie) {
      return null;
    }
    return decodeURIComponent(
      document.cookie.replace(
        new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(name).replace(/[\-\.\+\*]/g, '\\$&')
          + '\\s*\\=\\s*([^;]*).*$)|^.*$'),
        '$1'
      )
    ) || null;
  }

  /**
   * Verifies if the previewCookie has been set to '1' and
   * activates the appropriate FeatureFlag
   */
  setFeatureFlagHeaderCall() {
    if (this.state.cookie && this.state.cookie === '1') {
      FeatureFlags.utils.activateFeature('header-upcoming-ia');
    }
  }

  /**
   * Checks if the FeatureFlag name passed is active or not and triggers
   * the appropriate Action to fetch the Header data.
   */
  watchFeatureFlagHeaderCall() {
    if (FeatureFlags.store._isFeatureActive('header-upcoming-ia')) {
      Actions.fetchHeaderData(this.props.env, this.props.urls, 'upcoming');
    } else {
      Actions.fetchHeaderData(this.props.env, this.props.urls);
    }
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
      if (!HeaderStore._getIsStickyValue()) {
        // Fire GA Event when Header is in Sticky Mode
        utils._trackHeader.bind(this, 'scroll', 'Sticky Header');
        // Update the isSticky flag
        Actions.updateIsHeaderSticky(true);
      }
    } else {
      // Avoids re-assignment on each scroll by checking if it is already true
      if (HeaderStore._getIsStickyValue()) {
        Actions.updateIsHeaderSticky(false);
      }
    }
  }

  /**
   * setPublicPreviewGA()
   * Verify if the previewCookie has been set to '1' and
   * set the public preview GA dimension.
   */
  setPublicPreviewGA() {
    if (this.state.cookie && this.state.cookie === '1') {
      reactGA.setDimension('dimension1', 'Public Preview');
    }
  }

  render() {
    const isHeaderSticky = this.state.isSticky;
    const headerHeight = this.state.headerHeight;
    const headerClass = this.props.className || 'Header';
    const headerClasses = cx(headerClass, { sticky: isHeaderSticky });
    const showDialog = HeaderStore._getMobileMyNyplButtonValue();
    const mobileMyNyplClasses = cx({ active: showDialog });
    const skipNav = this.props.skipNav ?
      (<SkipNavigation {...this.props.skipNav} />) : '';

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
              (this.props.urls === 'absolute') ?
                '//www.nypl.org/locations/map?nearme=true' : '/locations/map?nearme=true'
            }
            nyplRootUrl={(this.props.urls === 'absolute') ? '//www.nypl.org' : '/'}
            ref="headerMobile"
          />
          <div className={`MobileMyNypl-Wrapper ${mobileMyNyplClasses}`}>
            <MobileMyNypl />
          </div>
          <div
            className={`${headerClass}-TopWrapper`}
            style={styles.wrapper}
            ref="headerTopWrapper"
          >
            <Logo
              className={`${headerClass}-Logo`}
              target={(this.props.urls === 'absolute') ? '//www.nypl.org' : '/'}
            />
            <div className={`${headerClass}-Buttons`} style={styles.topButtons}>
              <MyNyplButton
                label="Log In"
                refId="desktopLogin"
              />
              <SimpleButton
                label="Locations"
                target={
                  (this.props.urls === 'absolute') ?
                    '//www.nypl.org/locations/map' : '/locations/map'
                }
                className="LocationsTopLink"
                id="LocationsTopLink"
                gaAction="Locations"
                gaLabel="Header Top Links"
                style={styles.locationsTopLink}
              />
              <SimpleButton
                label="Get a Library Card"
                target="//catalog.nypl.org/screens/selfregpick.html"
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
              {
                FeatureFlags.store._isFeatureActive('shop-link') ?
                  <SimpleButton
                    label="Shop"
                    target="http://shop.nypl.org"
                    className="shopTopLink"
                    id="shopTopLink"
                    gaAction="Shop"
                    gaLabel="Header Top Links"
                    style={styles.shopLink}
                  /> : null
              }
            </div>
          </div>
          <NavMenu
            className={`${headerClass}-NavMenu`}
            lang={this.props.lang}
            items={this.state.headerData}
            urlType={this.props.urls}
            cookie={this.state.cookie}
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
  skipNav: React.PropTypes.object,
  urls: React.PropTypes.string,
  env: React.PropTypes.string,
};

Header.defaultProps = {
  lang: 'en',
  className: 'Header',
  id: 'nyplHeader',
  skipNav: null,
  urls: '',
  env: 'production',
};

export default {
  Header,
  navConfig,
};
