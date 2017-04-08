import React from 'react';
import ReactTappable from 'react-tappable';
import FocusTrap from 'focus-trap-react';
import {
  LionLogoIcon,
  LocatorIcon,
  MenuIcon,
  LoginIconSolid,
  SearchIcon,
  XIcon,
} from 'dgx-svg-icons';
import { extend as _extend } from 'underscore';
// ALT FLUX
import HeaderStore from '../../stores/HeaderStore.js';
import Actions from '../../actions/Actions.js';
import utils from '../../utils/utils.js';
// NYPL Components
import MobileMyNypl from '../MyNypl/MobileMyNypl.js';
import SearchBox from '../SearchBox/SearchBox.js';

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
    padding: '12px 13px',
    display: 'inline-block',
    color: '#000',
    backgroundColor: '#FFF',
  },
  myNyplButton: {
    margin: 0,
    padding: '13px',
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
    backgroundColor: '#2B2B2B',
  },
  inactiveMyNyplButton: {
    backgroundColor: '#FFF',
  },
  searchButton: {
    margin: 0,
    padding: '13px',
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
    padding: '13px',
    display: 'inline-block',
    border: 'none',
    lineHeight: 'normal',
    verticalAlign: '0px',
  },
  activeMenuButton: {
    backgroundColor: '#2B2B2B',
  },
  inactiveMenuButton: {
    backgroundColor: '#FFF',
  },
};

class MobileHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeMobileButton: HeaderStore.getState().activeMobileButton,
      searchButtonAction: HeaderStore.getState().searchButtonAction,
      mobileMyNyplButton: HeaderStore.getState().mobileMyNyplButton,
    };

    this.closeMyNyplDialog = this.closeMyNyplDialog.bind(this);
    this.closeSearchDialog = this.closeSearchDialog.bind(this);
  }

  componentDidMount() {
    HeaderStore.listen(this.onChange.bind(this));
  }

  componentWillUnmount() {
    HeaderStore.unlisten(this.onChange.bind(this));
  }

  onChange() {
    this.setState({
      activeMobileButton: HeaderStore.getState().activeMobileButton,
      searchButtonAction: HeaderStore.getState().searchButtonAction,
      mobileMyNyplButton: HeaderStore.getState().mobileMyNyplButton,
    });
  }

  /**
   * toggleMobileMenuButton(activeButton)
   * Verifies that the activeButton does not
   * match the HeaderStore's current value
   * and set's it as the param activeButton.
   * If it matches, it clears the HeaderStore's
   * current value.
   *
   * @param {String} activeButton
   */
  toggleMobileMenuButton(activeButton) {
    if (activeButton === 'clickSearch') {
      if (HeaderStore.getSearchButtonActionValue() !== activeButton) {
        Actions.searchButtonActionValue(activeButton);
        Actions.setMobileMenuButtonValue('');
        Actions.setMobileMyNyplButtonValue('');
      } else {
        Actions.searchButtonActionValue('');
      }
    } else if (activeButton === 'mobileMenu') {
      if (HeaderStore.getMobileMenuBtnValue() !== activeButton) {
        Actions.setMobileMenuButtonValue(activeButton);
        Actions.searchButtonActionValue('');
        Actions.setMobileMyNyplButtonValue('');
      } else {
        Actions.setMobileMenuButtonValue('');
      }
    } else if (activeButton === 'clickLogIn' || activeButton === 'clickMyAccount') {
      if (HeaderStore.getMobileMyNyplButtonValue() !== activeButton) {
        Actions.setMobileMyNyplButtonValue(activeButton);
        Actions.searchButtonActionValue('');
        Actions.setMobileMenuButtonValue('');
      } else {
        Actions.setMobileMyNyplButtonValue('');
      }
    }

    utils.trackHeader('Click', `Mobile ${activeButton}`);
  }

  /**
   * closeMyNyplDialog()
   * Verifies the current state.mobileMyNyplButton matches
   * 'clickMyNypl' and fires the Action method to reset.
   * This is necessary for the FocusTrap component to execute
   * the proper deactivateMethod for each dialog.
   */
  closeMyNyplDialog() {
    if (this.state.mobileMyNyplButton === 'clickLogIn' ||
      this.state.mobileMyNyplButton === 'clickMyAccount') {
      Actions.setMobileMyNyplButtonValue('');
    }
  }

  /**
   * closeSearchDialog()
   * Verifies the current state.searchButtonAction matches
   * 'clickSearch' and fires the Action method to reset.
   * This is necessary for the FocusTrap component to execute
   * the proper deactivateMethod for each dialog.
   */
  closeSearchDialog() {
    if (this.state.searchButtonAction === 'clickSearch') {
      Actions.searchButtonActionValue('');
    }
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
        <LionLogoIcon ariaHidden className={`${this.props.className}-Logo`} />
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
    const loginIconClass = (this.props.patronName) ? '-loggedIn' : '';
    const loggedInFadeInAnimation = (this.props.patronName) ? ' animated fadeIn' : '';
    const gaAction = (this.props.patronName) ? 'MyAccount' : 'LogIn';
    let icon = (
      <LoginIconSolid
        className={`MobileMyNypl LoginIcon${loginIconClass}${loggedInFadeInAnimation}`}
      />
    );
    let buttonStyles = styles.inactiveMyNyplButton;
    let buttonLabel = 'Open Log In Dialog';
    let dialogWindow = null;

    if (this.state.mobileMyNyplButton === 'clickLogIn' ||
      this.state.mobileMyNyplButton === 'clickMyAccount') {
      myNyplClass = ' active';
      icon = <XIcon ariaHidden fill="#FFF" />;
      buttonStyles = styles.activeMyNyplButton;
      buttonLabel = 'Close Log In Dialog';
      dialogWindow = (
        <FocusTrap
          className={`MobileMyNypl-Wrapper${myNyplClass}`}
          onDeactivate={this.closeMyNyplDialog}
        >
          <MobileMyNypl
            isLoggedIn={this.props.isLoggedIn}
            patronName={this.props.patronName}
            logOutLink={this.props.logOutLink}
          />
        </FocusTrap>
      );
    }

    return (
      <li style={styles.listItem}>
        <ReactTappable
          className={`${this.props.className}-MyNyplButton${myNyplClass}`}
          component="button"
          ref="MobileMyNyplButton"
          style={_extend(styles.myNyplButton, buttonStyles)}
          onTap={() => this.toggleMobileMenuButton(`click${gaAction}`)}
        >
          <span className="visuallyHidden">{buttonLabel}</span>
          {icon}
        </ReactTappable>
        {dialogWindow}
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
          className={`${this.props.className}-Locator`}
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

    if (this.state.searchButtonAction === 'clickSearch') {
      mobileSearchClass = ' active';
      icon = <XIcon ariaHidden fill="#FFF" />;
      buttonStyles = styles.activeSearchButton;
      buttonLabel = 'Close Search Dialog';
      dialogWindow = (
        <FocusTrap
          className={`${this.props.className}-searchDialog`}
          onDeactivate={this.closeSearchDialog}
          initialFocus={`.${this.props.className}-searchForm-legend`}
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
          className={`${this.props.className}-SearchButton${mobileSearchClass}`}
          component="button"
          ref="MobileSearchButton"
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

    if (this.state.activeMobileButton === 'mobileMenu') {
      mobileMenuClass = ' active';
      icon = <XIcon ariaHidden fill="#FFF" />;
      buttonStyles = styles.activeMenuButton;
      buttonLabel = 'Close Menu Dialog';
    }

    return (
      <li style={styles.listItem}>
        <ReactTappable
          className={`${this.props.className}-MenuButton${mobileMenuClass}`}
          component="button"
          ref="MobileMenuButton"
          style={_extend(styles.menuButton, buttonStyles)}
          onTap={() => this.toggleMobileMenuButton('mobileMenu')}
        >
          <span className="visuallyHidden">{buttonLabel}</span>
          {icon}
        </ReactTappable>
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
  lang: React.PropTypes.string,
  className: React.PropTypes.string,
  locatorUrl: React.PropTypes.string,
  nyplRootUrl: React.PropTypes.string,
  alt: React.PropTypes.string,
  isLoggedIn: React.PropTypes.bool,
  patronName: React.PropTypes.string,
  logOutLink: React.PropTypes.string,
};

MobileHeader.defaultProps = {
  lang: 'en',
  className: 'MobileHeader',
  nyplRootUrl: '/',
  alt: 'The New York Public Library',
};

export default MobileHeader;
