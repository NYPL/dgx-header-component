import Radium from 'radium';
import React from 'react';
import cx from 'classnames';
import appConfig from '../../appConfig.js';
// Header Store
import HeaderStore from '../../stores/HeaderStore.js';
// Dependent Components
import SearchButton from '../SearchButton/SearchButton.js';
import NavMenuItem from '../NavMenuItem/NavMenuItem.js';
import NavMenuBottomButtons from '../NavMenuBottomButtons/NavMenuBottomButtons.js';
import DonateButton from '../DonateButton/DonateButton.js';
import StickyMyNyplButton from '../MyNyplButton/StickyMyNyplButton.js';

const styles = {
  donateButton: {
    padding: '8px 15px',
    textTransform: 'uppercase',
    fontSize: '12.5px',
    letterSpacing: '.04em',
  },
  lineSeparator: {
    display: 'inline-block',
    margin: '0 0 -10px 0',
    width: '2px',
    height: '30px',
    backgroundColor: '#837377',
  },
};

class NavMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const navItems = (this.props.items && this.props.items.length) ?
      this.props.items : appConfig.navTopLinks;
    const mobileActiveClass = cx({
      mobileActive: HeaderStore._getMobileMenuBtnValue() === 'mobileMenu',
    });
    const stickyItemsClass = cx('StickyItems', {
      active: HeaderStore._getIsStickyValue(),
    });
    const stickyNavItems = (
      <div className={stickyItemsClass}>
        <span className="lineSeparator" style={styles.lineSeparator}></span>
        <StickyMyNyplButton />
        <DonateButton
          id="Collapsed-DonateButton"
          style={styles.donateButton}
          gaLabel="Collapsed Donate Button"
        />
      </div>
    );
    const navMenu = navItems.map((item, index) =>
      <NavMenuItem
        label={item.name}
        lang={this.props.lang}
        target={item.link.en.text}
        urlType={this.props.urlType}
        navId={item.id}
        features={item.features}
        subNav={item.subnav}
        key={index}
        index={index}
      />
    );

    return (
      <nav className={this.props.className}>
        <div className={`${this.props.className}-Wrapper ${mobileActiveClass}`}>
          <span className="MobileLogoText nypl-icon-logo-type"></span>
          <ul className={`${this.props.className}-List`} id="NavMenu-List">
            {navMenu}
          </ul>
          <SearchButton className={`${this.props.className}`} />
          {stickyNavItems}
          <NavMenuBottomButtons className="MobileBottomButtons" />
        </div>
      </nav>
    );
  }
}

NavMenu.propTypes = {
  lang: React.PropTypes.string,
  className: React.PropTypes.string,
  items: React.PropTypes.array,
  urlType: React.PropTypes.string,
};

NavMenu.defaultProps = {
  lang: 'en',
  className: 'NavMenu',
};

export default Radium(NavMenu);
