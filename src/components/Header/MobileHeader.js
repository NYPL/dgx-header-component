import React from 'react';
import Radium from 'radium';
import ReactTappable from 'react-tappable';
import FocusTrap from 'focus-trap-react';
import {
  LionLogoIcon,
  LocatorIcon,
  LoginIcon,
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
import MobileSearchBox from '../SearchBox/MobileSearchBox.js';

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
  },
  listItem: {
    display: 'inline-block',
    padding: 0,
    margin: '0 0 0 4px',
  },
  mobileLogoLink: {
    color: '#000',
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
  },
  myNyplButton: {
    margin: 0,
    padding: '13px',
    display: 'inline-block',
    border: 'none',
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
  },
  activeSearchButton: {
    backgroundColor: '#29A1D2',
  },
  inactiveSearchButton: {
    backgroundColor: '#FFF',
  },
  searchDialog: {
    position: 'absolute',
    margin: 0,
    padding: 0,
    left: 0,
    width: '100%',
    backgroundColor: '#29A1D2',
  },
  menuIcon: {
    fontSize: '31px',
    margin: 0,
    padding: '14px',
    display: 'inline-block',
    color: '#000',
  },
  activeMenuIcon: {
    color: '#FFF',
    backgroundColor: '#2B2B2B',
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
      if (HeaderStore._getSearchButtonActionValue() !== activeButton) {
        Actions.searchButtonActionValue(activeButton);
        Actions.setMobileMenuButtonValue('');
        Actions.setMobileMyNyplButtonValue('');
      } else {
        Actions.searchButtonActionValue('');
      }
    } else if (activeButton === 'mobileMenu') {
      if (HeaderStore._getMobileMenuBtnValue() !== activeButton) {
        Actions.setMobileMenuButtonValue(activeButton);
        Actions.searchButtonActionValue('');
        Actions.setMobileMyNyplButtonValue('');
      } else {
        Actions.setMobileMenuButtonValue('');
      }
    } else if (activeButton === 'clickMyNypl') {
      if (HeaderStore._getMobileMyNyplButtonValue() !== activeButton) {
        Actions.setMobileMyNyplButtonValue(activeButton);
        Actions.searchButtonActionValue('');
        Actions.setMobileMenuButtonValue('');
      } else {
        Actions.setMobileMyNyplButtonValue('');
      }
    }

    utils._trackHeader('Click', `Mobile ${activeButton}`);
  }

  /**
   * closeMyNyplDialog()
   * Verifies the current state.mobileMyNyplButton matches
   * 'clickMyNypl' and fires the Action method to reset.
   * This is necessary for the FocusTrap component to execute
   * the proper deactivateMethod for each dialog.
   */
  closeMyNyplDialog() {
    if (this.state.mobileMyNyplButton === 'clickMyNypl') {
      Actions.setMobileMyNyplButtonValue('');
    }
  }

  closeSearchDialog() {
    if (this.state.searchButtonAction === 'clickSearch') {
      Actions.searchButtonActionValue('');
    }
  }

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

  renderMyNyplButton() {
    let myNyplClass = '';
    let icon = <LoginIcon ariaHidden fill="#000" />;
    let buttonStyles = styles.inactiveMyNyplButton;
    let buttonLabel = 'Open Log In Dialog';
    let dialogWindow = null;

    if (this.state.mobileMyNyplButton === 'clickMyNypl') {
      myNyplClass = ' active';
      icon = <XIcon ariaHidden fill="#FFF" />;
      buttonStyles = styles.activeMyNyplButton;
      buttonLabel = 'Close Log In Dialog';
      dialogWindow = (
        <FocusTrap
          className={`MobileMyNypl-Wrapper${myNyplClass}`}
          onDeactivate={this.closeMyNyplDialog}
        >
          <MobileMyNypl />
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
          onTap={() => this.toggleMobileMenuButton('clickMyNypl')}
        >
          <span className="visuallyHidden">{buttonLabel}</span>
          {icon}
        </ReactTappable>
        {dialogWindow}
      </li>
    );
  }

  renderLocationsLink() {
    const locatorUrl = this.props.locatorUrl || '//www.nypl.org/locations/map?nearme=true';

    return (
      <li style={styles.listItem}>
        <a
          style={styles.locationsLink}
          href={locatorUrl}
          onClick={() => utils._trackHeader('Click', 'Mobile Locations Button')}
          className={`${this.props.className}-Locator`}
          aria-label="NYPL Locations Near Me"
        >
          <span className="visuallyHidden">NYPL Locations Near Me</span>
          <LocatorIcon ariaHidden />
        </a>
      </li>
    );
  }

  renderSearchButton() {
    let mobileSearchClass = '';
    let icon = <SearchIcon ariaHidden />;
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
          <MobileSearchBox
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

  render() {
    const activeButton = this.state.activeMobileButton;
    const mobileMenuClass = (activeButton === 'mobileMenu') ?
      'active nypl-icon-solo-x' : 'nypl-icon-burger-nav';

    return (
      <div className={this.props.className} style={styles.base}>
        {this.renderLogoLink()}
        <ul style={styles.list}>
          {this.renderMyNyplButton()}
          {this.renderLocationsLink()}
          {this.renderSearchButton()}

          <li style={styles.listItem}>
            <ReactTappable onTap={() => this.toggleMobileMenuButton('mobileMenu')}>
              <span
                style={[
                  styles.menuIcon,
                  activeButton === 'mobileMenu' ? styles.activeMenuIcon : '',
                ]}
                className={`${this.props.className}-MenuButton ${mobileMenuClass}`}
                ref="MobileMenuButton"
              >
              </span>
            </ReactTappable>
          </li>
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
};

MobileHeader.defaultProps = {
  lang: 'en',
  className: 'MobileHeader',
  nyplRootUrl: '/',
  alt: 'The New York Public Library',
};

export default Radium(MobileHeader);
