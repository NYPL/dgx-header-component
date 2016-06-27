import Radium from 'radium';
import React from 'react';
import cx from 'classnames';
import {
  map as _map,
  filter as _filter,
  isEmpty as _isEmpty,
  contains as _contains,
  isArray as _isArray,
} from 'underscore';
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

  /**
   * Generates the DOM for the Sticky Items that will
   * display when the Header is in sticky mode.
   * Adds the appropriate class based off the sticky value.
   * @returns {Object} React DOM.
   */
  renderStickyNavItems() {
    const stickyClass = cx('StickyItems', { active: HeaderStore._getIsStickyValue() });

    return (
      <div className={stickyClass}>
        <span className="lineSeparator" style={styles.lineSeparator}></span>
        <StickyMyNyplButton />
        <DonateButton
          id="Collapsed-DonateButton"
          style={styles.donateButton}
          gaLabel="Collapsed Donate Button"
        />
      </div>
    );
  }

  /**
   * Generates the DOM for the NavItems with appropriate class.
   * Optionally, removes any NavItems if a match is found from the exceptionList.
   * @param {items[]} - Array containing NavMenu item Objects.
   * @param {exceptionList[]} (optional) - Array containing NavId strings.
   * @returns {Object} React DOM.
   */
  renderNavMenu(items, exceptionList) {
    let navItems = _isEmpty(items) ? appConfig.navTopLinks : items;

    if (_isArray(exceptionList) && !_isEmpty(exceptionList)) {
      navItems = _filter(navItems, (item) => item.id && !_contains(exceptionList, item.id));
    }

    return _map(navItems, (item, index) =>
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
  }

  render() {
    const mobileActiveClass = cx({
      mobileActive: HeaderStore._getMobileMenuBtnValue() === 'mobileMenu',
    });
    // Ensure removal of FindUs UUID
    return (
      <nav className={this.props.className}>
        <div className={`${this.props.className}-Wrapper ${mobileActiveClass}`}>
          <span className="MobileLogoText nypl-icon-logo-type"></span>
          <ul className={`${this.props.className}-List`} id="NavMenu-List">
            {this.renderNavMenu(this.props.items, ['df621833-4dd1-4223-83e5-6ad7f98ad26a'])}
          </ul>
          <SearchButton className={`${this.props.className}`} />
          {this.renderStickyNavItems()}
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
