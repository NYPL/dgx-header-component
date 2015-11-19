import Radium from 'radium';
import React from 'react';
import cx from 'classnames';
import appConfig from '../../appConfig.js';

// Header Store
import HeaderStore from '../../stores/Store.js';

// Dependent Components
import SearchButton from '../SearchButton/SearchButton.js';
import NavMenuItem from '../NavMenuItem/NavMenuItem.js';
import NavMenuBottomButtons from '../NavMenuBottomButtons/NavMenuBottomButtons.js';
import DonateButton from '../DonateButton/DonateButton.js';
import StickyMyNyplButton from '../MyNyplButton/StickyMyNyplButton.js';

class NavMenu extends React.Component {

  // Constructor used in ES6
  constructor(props) {
    super(props);
  }

  render () {

    let navItems = (this.props.items && this.props.items.length) ? 
        this.props.items : appConfig.navTopLinks,
      mobileActiveClass = cx({
        'mobileActive': HeaderStore._getMobileMenuBtnValue() === 'mobileMenu'
      }),
      stickyItemsClass = cx('StickyItems', {
        'active': HeaderStore._getIsStickyValue()
      }),
      stickyNavItems =
        <div className={stickyItemsClass}>
          <span className='lineSeparator' style={styles.lineSeparator}></span>
          <StickyMyNyplButton />
          <DonateButton style={styles.donateButton} gaLabel={'Collapsed Donate Button'}/>
        </div>,
      navMenu = navItems.map((item, index) => {
        return (
          <NavMenuItem
            label={item.name}
            lang={this.props.lang}
            target={item.link.en.text}
            navId={item.id}
            features={item.features}
            subNav={item.subnav}
            key={index}
            index={index} />
        );
      });

    return (
      <nav className={this.props.className}>
        <div className={`${this.props.className}-Wrapper ${mobileActiveClass}`}>
          <span className='MobileLogoText nypl-icon-logo-type'></span>
          <ul className={`${this.props.className}-List`} id='NavMenu-List'>
            {navMenu}
          </ul>
          <SearchButton className={`${this.props.className}`} />
          {stickyNavItems}
          <NavMenuBottomButtons className='MobileBottomButtons' />
        </div>
      </nav>
    );
  }
}

NavMenu.defaultProps = {
  lang: 'en',
  className: 'NavMenu'
};

const styles = {
  donateButton: {
    padding: '8px 15px',
    textTransform: 'uppercase',
    borderRadius: '3px',
    fontSize: '12.5px',
    letterSpacing: '.04em'
  },
  lineSeparator: {
    display: 'inline-block',
    margin: '0 0 -10px 0',
    width: '2px',
    height: '30px',
    opacity: '0.65',
    backgroundColor: '#837377'
  }
};

export default Radium(NavMenu);
