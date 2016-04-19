// NPM Modules
import React from 'react';
import ReactDOM from 'react-dom';
import Radium from 'radium';
import cx from 'classnames';
import { extend as _extend } from 'underscore';

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
  libraryCardButton: {
    display: 'inline-block',
    color: '#000',
    margin: 0,
    padding: 0,
  },
  subscribeButton: {
    display: 'inline-block',
  },
  donateButton: {
    display: 'inline-block',
    padding: '11px 18px 9px 18px',
  },
  mobileMyNypl: {
    position: 'absolute',
    zIndex: 1000,
    right: '0',
    width: '220px',
    minHeight: '130px',
    backgroundColor: '#1DA1D4',
    padding: '25px 30px',
  },
};

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = _extend({ headerHeight: null }, HeaderStore.getState());

    this._handleStickyHeader = this._handleStickyHeader.bind(this);
  }

  componentDidMount() {
    HeaderStore.listen(this._onChange.bind(this));

    // If the HeaderStore is not populated with
    // the proper data, then fetch via client-side
    this._fetchDataIfNeeded();

    // Height needs to be set once the alerts (if any) are mounted.
    this._setHeaderHeight();

    // Listen to the scroll event for the sticky header.
    window.addEventListener('scroll', this._handleStickyHeader, false);
  }

  componentWillUnmount() {
    HeaderStore.unlisten(this._onChange.bind(this));

    // Removing event listener to minimize garbage collection
    window.removeEventListener('scroll', this._handleStickyHeader, false);
  }

  _onChange() {
    this.setState(_extend({ headerHeight: this.state.headerHeight }, HeaderStore.getState()));
  }

  /**
   * _fetchDataIfNeeded()
   * checks the existence of headerData items,
   * triggers the Actions.fetchHeaderData()
   * method to dispatch a client-side event
   * to obtain data.
   */
  _fetchDataIfNeeded() {
    if (HeaderStore.getState().headerData.length < 1) {
      Actions.fetchHeaderData(HeaderStore._getClientAppEnv());
    }
  }

  /**
   * _handleStickyHeader()
   * returns the Actions.updateIsHeaderSticky()
   * with the proper boolean value to update the
   * HeaderStore.isSticky value based on the window
   * vertical scroll position surpassing the height
   * of the Header DOM element.
   */
  _handleStickyHeader() {
    const headerHeight = this.state.headerHeight;
    const windowVerticalDistance = this._getWindowVerticalScroll();

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
   * _getHeaderHeight()
   * returns the Height of the Header DOM
   * element in pixels.
   */
  _getHeaderHeight() {
    const headerDOM = ReactDOM.findDOMNode(this.refs.nyplHeader);
    return headerDOM.getBoundingClientRect().height;
  }

  /**
   * _setHeaderHeight()
   * Updates the state headerHeight property
   * only if headerHeight is not defined.
   */
  _setHeaderHeight() {
    if (!this.state.headerHeight) {
      setTimeout(() => {
        this.setState({ headerHeight: this._getHeaderHeight() });
      }, 500);
    }
  }

  /**
   * _getWindowVerticallScroll()
   * returns the current window vertical
   * scroll position in pixels.
   */
  _getWindowVerticalScroll() {
    return window.scrollY
      || window.pageYOffset
      || document.documentElement.scrollTop;
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
            locatorUrl="//www.nypl.org/locations/map?nearme=true"
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
            <Logo className={`${headerClass}-Logo`} />
            <div className={`${headerClass}-Buttons`} style={styles.topButtons}>
              <MyNyplButton label="Log In" refId="desktopLogin" />
              <SimpleButton
                label="Get a Library Card"
                target="//catalog.nypl.org/screens/selfregpick.html"
                className="LibraryCardButton"
                id="LibraryCardButton"
                gaAction="Get a Library Card"
                gaLabel=""
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
                gaLabel="Header Button"
              />
            </div>
          </div>
          <NavMenu
            className={`${headerClass}-NavMenu`}
            lang={this.props.lang}
            items={this.state.headerData}
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
};

Header.defaultProps = {
  lang: 'en',
  className: 'Header',
  id: 'nyplHeader',
  skipNav: null,
};

export default Radium(Header);
