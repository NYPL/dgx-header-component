import React from 'react';
import Radium from 'radium';
import ReactTappable from 'react-tappable';
import { LionLogoIcon } from 'dgx-svg-icons';
// ALT FLUX
import HeaderStore from '../../stores/HeaderStore.js';
import Actions from '../../actions/Actions.js';
import utils from '../../utils/utils.js';

const styles = {
  base: {
    position: 'relative',
    height: '59px',
    textAlign: 'right',
  },
  mobileLogo: {
    color: '#000',
    position: 'absolute',
    left: 10,
    top: 8,
    textDecoration: 'none',
    ':hover': {
      color: '#000',
    },
    ':visited': {
      color: '#000',
    },
  },
  myNyplIcon: {
    fontSize: '31px',
    margin: 0,
    padding: '14px',
    display: 'inline-block',
    color: '#000',
  },
  locatorIcon: {
    fontSize: '31px',
    margin: 0,
    padding: '14px',
    display: 'inline-block',
    color: '#000',
  },
  searchIcon: {
    fontSize: '31px',
    margin: 0,
    padding: '14px',
    display: 'inline-block',
    color: '#000',
  },
  menuIcon: {
    fontSize: '31px',
    margin: 0,
    padding: '14px',
    display: 'inline-block',
    color: '#000',
  },
  activeSearchIcon: {
    color: '#FFF',
    backgroundColor: '#29A1D2',
  },
  activeMenuIcon: {
    color: '#FFF',
    backgroundColor: '#2B2B2B',
  },
  activeMyNyplIcon: {
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

    this.handleMenuBtnPress = this.handleMenuBtnPress.bind(this);
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
   * toggleMobileMenu(activeButton)
   * Verifies that the activeButton does not
   * match the HeaderStore's current value
   * and set's it as the param activeButton.
   * If it matches, it clears the HeaderStore's
   * current value.
   *
   * @param {String} activeButton
   */
  toggleMobileMenu(activeButton) {
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
        Actions.toggleMyNyplVisible(true);
        Actions.setMobileMyNyplButtonValue(activeButton);
        Actions.searchButtonActionValue('');
        Actions.setMobileMenuButtonValue('');
      } else {
        Actions.setMobileMyNyplButtonValue('');
        Actions.toggleMyNyplVisible(false);
      }
    }

    utils._trackHeader('Click', `Mobile ${activeButton}`);
  }

  /**
   * handleMenuBtnPress()
   * Calls toggleMobileMenu()
   * with the 'mobileMenu' as a param
   */
  handleMenuBtnPress(activeButton) {
    this.toggleMobileMenu(activeButton);
  }

  render() {
    const activeButton = this.state.activeMobileButton;
    const searchButtonAction = this.state.searchButtonAction;
    const mobileMyNyplButton = this.state.mobileMyNyplButton;
    const locatorUrl = this.props.locatorUrl || '//www.nypl.org/locations/map?nearme=true';
    const mobileSearchClass = (searchButtonAction === 'clickSearch') ?
      'active nypl-icon-solo-x' : 'nypl-icon-magnifier-thin';
    const mobileMenuClass = (activeButton === 'mobileMenu') ?
      'active nypl-icon-solo-x' : 'nypl-icon-burger-nav';
    const mobileMyNyplClass = (mobileMyNyplButton === 'clickMyNypl') ?
      'active nypl-icon-solo-x' : 'nypl-icon-login';

    return (
      <div className={this.props.className} style={styles.base}>
        <a
          style={styles.mobileLogo}
          href={this.props.nyplRootUrl}
        >
          <LionLogoIcon className={`${this.props.className}-Logo`} />
          <span className="visuallyHidden">{this.props.alt}</span>
        </a>

        <ReactTappable onTap={() => this.handleMenuBtnPress('clickMyNypl')}>
          <span
            style={[
              styles.myNyplIcon,
              mobileMyNyplButton === 'clickMyNypl' ? styles.activeMyNyplIcon : '',
            ]}
            className={`${this.props.className}-MyNyplButton ${mobileMyNyplClass}`}
            ref="MobileMyNyplButton"
          >
          </span>
        </ReactTappable>

        <a
          style={styles.locatorIcon}
          href={locatorUrl}
          onClick={() => utils._trackHeader('Click', 'Mobile Locations Button')}
          className={`${this.props.className}-Locator nypl-icon-locator-large`}
        >
        </a>

        <ReactTappable onTap={() => this.handleMenuBtnPress('clickSearch')}>
          <span
            style={[
              styles.searchIcon,
              searchButtonAction === 'clickSearch' ? styles.activeSearchIcon : '',
            ]}
            className={`${this.props.className}-SearchButton ${mobileSearchClass}`}
            ref="MobileSearchButton"
          >
            <div className="visuallyHidden">Search</div>
          </span>
        </ReactTappable>

        <ReactTappable onTap={() => this.handleMenuBtnPress('mobileMenu')}>
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
