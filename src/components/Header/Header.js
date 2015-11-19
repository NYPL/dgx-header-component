// NPM Modules
import React from 'react';
import Radium from 'radium';
import cx from 'classnames';

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

import utils from '../../utils/utils.js';

// When minifying with Webpack, you can use this:
// import '../../styles/main.scss';

class Header extends React.Component {

  // Constructor used in ES6
  constructor(props) {
    super(props);
    // replaces getInitialState()
    this.state = HeaderStore.getState();
  }

  componentDidMount() {
    HeaderStore.listen(this._onChange.bind(this));

    // If the HeaderStore is not populated with
    // the proper Data, then fetch.
    this._fetchDataIfNeeded();

    // Once the component mounts,
    // enable the sticky header depending on position.
    this._handleStickyHeader();

    // Listen to the scroll event for the sticky header.
    window.addEventListener('scroll', this._handleStickyHeader.bind(this));
  }

  componentWillUnmount() {
    HeaderStore.unlisten(this._onChange.bind(this));
  }

  _onChange() {
    this.setState(HeaderStore.getState());
  }

  render () {
    let isHeaderSticky = this.state.isSticky,
      headerClass = this.props.className || 'Header',
      headerClasses = cx(headerClass, {'sticky': isHeaderSticky}),
      showDialog = HeaderStore._getMobileMyNyplButtonValue(),
      mobileMyNyplClasses = cx({'active': showDialog});

    return (
      <header id={this.props.id} className={headerClasses} ref='nyplHeader'>
        <GlobalAlerts className={`${headerClass}-GlobalAlerts`} />
        <div className={`${headerClass}-Wrapper`}>
          <MobileHeader className={`${headerClass}-Mobile`} locatorUrl={'//www.nypl.org/locations/map?nearme=true'} />
          <div className={`MobileMyNypl-Wrapper ${mobileMyNyplClasses}`}>
            <MobileMyNypl />
          </div>
          <div className={`${headerClass}-TopWrapper`} style={styles.wrapper}>
            <Logo className={`${headerClass}-Logo`} />
            <div className={`${headerClass}-Buttons`} style={styles.topButtons}>
              <MyNyplButton label='Log In' refId='desktopLogin' />
              <SimpleButton 
                label='Get a Library Card' 
                target='//catalog.nypl.org/screens/selfregpick.html' 
                className='LibraryCardButton'
                id='LibraryCardButton'
                gaAction='Get a Library Card'
                gaLabel=''
                style={styles.libraryCardButton} />
              <SubscribeButton 
                label='Get Email Updates'
                lang={this.props.lang}
                style={styles.subscribeButton} />
              <DonateButton
                lang={this.props.lang}
                style={styles.donateButton}
                gaLabel={'Header Button'} />
            </div>
          </div>
          <NavMenu 
            className={`${headerClass}-NavMenu`}
            lang={this.props.lang}
            items={this.state.headerData}  />
        </div>
      </header>
    );
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
    let headerHeight = this._getHeaderHeight(),
      windowVerticalDistance = this._getWindowVerticalScroll();

    if (windowVerticalDistance > headerHeight) {
      // Fire GA Event when Header is in Sticky Mode
      utils._trackHeader.bind(this, 'scroll', 'Sticky Header');

      Actions.updateIsHeaderSticky(true);
    } else {
      Actions.updateIsHeaderSticky(false);
    }
  }

  /**
   * _getHeaderHeight() 
   * returns the Height of the Header DOM
   * element in pixels.
   */
  _getHeaderHeight() {
    let headerContainer = React.findDOMNode(this.refs.nyplHeader);

    return headerContainer.clientHeight;
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
};

Header.defaultProps = {
  lang: 'en',
  className: 'Header',
  id: 'nyplHeader'
};

const styles = {
  wrapper: {
    position: 'relative'
  },
  topButtons: {
    position: 'absolute',
    top: '20px',
    textTransform: 'uppercase',
    display: 'block'
  },
  libraryCardButton: {
    display: 'inline-block',
    color: '#000',
    margin: 0,
    padding: 0
  },
  subscribeButton: {
    display: 'inline-block'
  },
  donateButton: {
    display: 'inline-block',
    padding: '11px 18px 9px 18px',
    borderRadius: '4px'
  },
  mobileMyNypl: {
    position: 'absolute',
    zIndex: 1000,
    right: '0',
    width: '220px',
    minHeight: '130px',
    backgroundColor: '#1DA1D4',
    padding: '25px 30px'
  }
};

export default Radium(Header);
