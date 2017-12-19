import React from 'react';
import PropTypes from 'prop-types';
import ReactTappable from 'react-tappable';
import FocusTrap from 'focus-trap-react';
import {
  LionLogoIcon,
  LocatorIcon,
  MenuIcon,
  LoginIcon,
  LoginIconSolid,
  SearchIcon,
  XIcon,
} from 'dgx-svg-icons';
import { extend as _extend } from 'underscore';

import utils from '../../utils/utils';
// NYPL Components
import MobileMyNypl from '../MyNypl/MobileMyNypl';
import SearchBox from '../SearchBox/SearchBox';
import NavMenu from '../NavMenu/NavMenu';

const styles = {
  base: {
    position: 'relative',
    height: '60px',
    padding: 0,
    margin: 0,
  },
  list: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
    float: 'right',
    lineHeight: 'normal',
  },
  listItem: {
    display: 'inline-block',
    padding: 0,
    margin: '0 0 0 4px',
    lineHeight: 'normal',
  },
  mobileLogoLink: {
    color: '#000',
    backgroundColor: '#FFF',
    textDecoration: 'none',
    display: 'inline-block',
    height: '50px',
    width: '50px',
    position: 'absolute',
    left: '10px',
    top: '8px',
    margin: 0,
    padding: 0,
    ':hover': {
      color: '#000',
    },
    ':visited': {
      color: '#000',
    },
  },
  locationsLink: {
    margin: 0,
    padding: '11px 13px',
    display: 'inline-block',
    color: '#000',
    backgroundColor: '#FFF',
  },
  myNyplButton: {
    margin: 0,
    padding: '12px 13px',
    display: 'inline-block',
    border: 'none',
    lineHeight: 'normal',
    verticalAlign: '0px',
  },
  patronInitial: {
    color: '#497629',
    display: 'inline-block',
    fontSize: '1.8em',
    lineHeight: 'normal',
    margin: '0 5px 0 0',
    verticalAlign: '8px',
  },
  activeMyNyplButton: {
    color: '#FFF',
    backgroundColor: '#2B2B2B',
  },
  inactiveMyNyplButton: {
    color: '#000',
    backgroundColor: '#FFF',
  },
  searchButton: {
    margin: 0,
    padding: '12px 13px',
    display: 'inline-block',
    border: 'none',
    lineHeight: 'normal',
    verticalAlign: '0px',
  },
  activeSearchButton: {
    color: '#FFF',
    backgroundColor: '#1B7FA7',
  },
  inactiveSearchButton: {
    color: '#000',
    backgroundColor: '#FFF',
  },
  searchDialog: {
    position: 'absolute',
    margin: 0,
    padding: 0,
    left: 0,
    width: '100%',
    backgroundColor: '#1B7FA7',
    zIndex: '1000',
  },
  menuButton: {
    margin: 0,
    padding: '12px 13px',
    display: 'inline-block',
    border: 'none',
    lineHeight: 'normal',
    verticalAlign: '0px',
  },
  activeMenuButton: {
    color: '#FFF',
    backgroundColor: '#2B2B2B',
  },
  inactiveMenuButton: {
    color: '#000',
    backgroundColor: '#FFF',
  },
};

class MobileHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeButton: '',
    };

    this.closeDropDown = this.closeDropDown.bind(this);
  }

  /**
   * toggleMobileMenuButton(activeButton)
   * This function either activates or deactivates the state of the button that was clicked on,
   * to track the active state SCSS styles.
   *
   * @param {String} activeButton
   */
  toggleMobileMenuButton(activeButton) {
    if (activeButton === 'clickSearch') {
      const searchActive = this.state.activeButton === 'search' ? '' : 'search';
      this.setState({ activeButton: searchActive });
    } else if (activeButton === 'mobileMenu') {
      const navMenuActive = this.state.activeButton === 'navMenu' ? '' : 'navMenu';
      this.setState({ activeButton: navMenuActive });
    } else if (activeButton === 'clickLogIn' || activeButton === 'clickMyAccount') {
      const menuActive = this.state.activeButton === 'myNypl' ? '' : 'myNypl';
      this.setState({ activeButton: menuActive });
    }

    utils.trackHeader('Click', `Mobile ${activeButton}`);
  }

  /**
   * closeDropDown()
   * This is necessary for the FocusTrap component to execute
   * the proper deactivateMethod for each dialog.
   */
  closeDropDown() {
    this.setState({ activeButton: '' });
  }

  /**
  * renderLogoLink()
  * Generates the DOM for the NYPL Logo Link.
  * Uses SVG LionLogo icon & visuallyHidden label.
  * @returns {Object} React DOM.
  */
  renderLogoLink() {
    return (
      <a
        style={styles.mobileLogoLink}
        href={this.props.nyplRootUrl}
        aria-label={this.props.alt}
      >
        <span className="visuallyHidden">{this.props.alt}</span>
        <LionLogoIcon ariaHidden className={`${this.props.className}-logo`} />
      </a>
    );
  }

  /**
  * renderMyNyplButton()
  * Generates the DOM for the MyNyplLogin button/dialog.
  * Uses SVG icon & visuallyHidden label.
  * @returns {Object} React DOM.
  */
  renderMyNyplButton() {
    let myNyplClass = '';
    const gaAction = (this.props.patronName) ? 'MyAccount' : 'LogIn';
    let icon = <LoginIcon className="loginIcon" ariaHidden />;
    if (this.props.patronName) {
      icon = <LoginIconSolid className="loginIcon-loggedIn animated fadeIn" ariaHidden />;
    }
    let buttonStyles = styles.inactiveMyNyplButton;
    let buttonLabel = (this.props.patronName) ? 'My Account' : 'Login';
    const active = this.state.activeButton === 'myNypl';

    if (active) {
      myNyplClass = 'active';
      icon = <XIcon ariaHidden fill="#FFF" ariaHidden />;
      buttonStyles = styles.activeMyNyplButton;
      buttonLabel = 'Close';
    }

    return (
      <li style={styles.listItem}>
        <FocusTrap
          className="mobileMyNypl-wrapper"
          focusTrapOptions={{
            onDeactivate: this.closeDropDown,
            clickOutsideDeactivates: true,
          }}
          active={active}
        >
          <ReactTappable
            className={`${this.props.className}-myNyplButton`}
            component="button"
            style={_extend(styles.myNyplButton, buttonStyles)}
            onTap={() => this.toggleMobileMenuButton(`click${gaAction}`)}
            aria-haspopup="true"
            aria-expanded={active ? true : null}
          >
            <span className="visuallyHidden">{buttonLabel}</span>
            {icon}
          </ReactTappable>
          {
            active &&
              <MobileMyNypl
                className={`${myNyplClass} mobileMyNypl`}
                isLoggedIn={this.props.isLoggedIn}
                patronName={this.props.patronName}
                logOutLink={this.props.logOutLink}
              />
          }
        </FocusTrap>
      </li>
    );
  }

  /**
  * renderLocationsLink()
  * Generates the DOM for the Locations link.
  * Uses SVG icon & visuallyHidden label.
  * @returns {Object} React DOM.
  */
  renderLocationsLink() {
    const locatorUrl = this.props.locatorUrl || '//www.nypl.org/locations/map?nearme=true';

    return (
      <li style={styles.listItem}>
        <a
          style={styles.locationsLink}
          href={locatorUrl}
          onClick={() => utils.trackHeader('Click', 'Mobile Locations Button')}
          className={`${this.props.className}-locator`}
          aria-label="NYPL Locations Near Me"
        >
          <span className="visuallyHidden">NYPL Locations Near Me</span>
          <LocatorIcon ariaHidden fill="#000" />
        </a>
      </li>
    );
  }

  /**
  * renderSearchButton()
  * Generates the DOM for the Search button/dialog.
  * Uses SVG icon & visuallyHidden label.
  * @returns {Object} React DOM.
  */
  renderSearchButton() {
    let mobileSearchClass = '';
    let icon = <SearchIcon ariaHidden fill="#000" />;
    let buttonStyles = styles.inactiveSearchButton;
    let buttonLabel = 'Open Search Dialog';
    let dialogWindow = null;

    if (this.state.activeButton === 'search') {
      mobileSearchClass = ' active';
      icon = <XIcon ariaHidden fill="#FFF" />;
      buttonStyles = styles.activeSearchButton;
      buttonLabel = 'Close Search Dialog';
      dialogWindow = (
        <FocusTrap
          className={`${this.props.className}-searchDialog`}
          focusTrapOptions={{
            onDeactivate: this.closeDropDown,
            initialFocus: `.${this.props.className}-searchForm-legend`,
            clickOutsideDeactivates: true,
          }}
          style={styles.searchDialog}
        >
          <SearchBox
            className={`${this.props.className}-searchForm`}
            type="mobile"
          />
        </FocusTrap>
      );
    }

    return (
      <li style={styles.listItem}>
        <ReactTappable
          className={`${this.props.className}-searchButton${mobileSearchClass}`}
          component="button"
          style={_extend(styles.searchButton, buttonStyles)}
          onTap={() => this.toggleMobileMenuButton('clickSearch')}
        >
          <span className="visuallyHidden">{buttonLabel}</span>
          {icon}
        </ReactTappable>
        {dialogWindow}
      </li>
    );
  }

  /**
  * renderMenuButton()
  * Generates the DOM for the Menu button
  * Uses SVG icon & visuallyHidden label.
  * @returns {Object} React DOM.
  */
  renderMenuButton() {
    let mobileMenuClass = '';
    let icon = <MenuIcon ariaHidden fill="#000" />;
    let buttonStyles = styles.inactiveMenuButton;
    let buttonLabel = 'Open Menu Dialog';
    let dialogWindow = null;
    const active = this.state.activeButton === 'navMenu';

    if (active) {
      mobileMenuClass = ' active';
      icon = <XIcon ariaHidden fill="#FFF" />;
      buttonStyles = styles.activeMenuButton;
      buttonLabel = 'Close Menu Dialog';
      dialogWindow = (
        <NavMenu
          className={`${this.props.className}-navMenu`}
          lang={this.props.lang}
          items={this.props.navData}
          urlType={this.props.urlType}
          isLoggedIn={this.props.isLoggedIn}
          patronName={this.state.patronName}
          logOutLink={this.state.logOutUrl}
          mobileActive={active}
        />
      );
    }

    return (
      <li style={styles.listItem}>
        <FocusTrap
          focusTrapOptions={{
            initialFocus: 'ul.header-mobile-navMenu-list li:first-of-type a',
            onDeactivate: this.closeDropDown,
            clickOutsideDeactivates: true,
          }}
          active={active}
        >
          <ReactTappable
            className={`${this.props.className}-menuButton${mobileMenuClass}`}
            component="button"
            style={_extend(styles.menuButton, buttonStyles)}
            onTap={() => this.toggleMobileMenuButton('mobileMenu')}
          >
            <span className="visuallyHidden">{buttonLabel}</span>
            {icon}
          </ReactTappable>
          <div className={`header-mobile-wrapper${mobileMenuClass}`}>
            {dialogWindow}
          </div>
        </FocusTrap>
      </li>
    );
  }

  render() {
    return (
      <div className={this.props.className} style={styles.base}>
        {this.renderLogoLink()}
        <ul style={styles.list}>
          {this.renderMyNyplButton()}
          {this.renderLocationsLink()}
          {this.renderSearchButton()}
          {this.renderMenuButton()}
        </ul>
      </div>
    );
  }
}

MobileHeader.propTypes = {
  lang: PropTypes.string,
  className: PropTypes.string,
  locatorUrl: PropTypes.string.isRequired,
  nyplRootUrl: PropTypes.string,
  alt: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  patronName: PropTypes.string,
  logOutLink: PropTypes.string.isRequired,
  navData: PropTypes.arrayOf(PropTypes.object).isRequired,
  urlType: PropTypes.string.isRequired,
};

MobileHeader.defaultProps = {
  lang: 'en',
  isLoggedIn: false,
  patronName: null,
  className: 'mobileHeader',
  nyplRootUrl: '/',
  alt: 'The New York Public Library',
};

export default MobileHeader;
