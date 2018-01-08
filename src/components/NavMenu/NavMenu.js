import React from 'react';
import PropTypes from 'prop-types';
import {
  map as _map,
  filter as _filter,
  isEmpty as _isEmpty,
  contains as _contains,
  isArray as _isArray,
} from 'underscore';
import { LionLogoWithText } from '@nypl/dgx-svg-icons';

// Dependent Components
import SearchButton from '../SearchButton/SearchButton';
import NavMenuItem from '../NavMenuItem/NavMenuItem';
import NavMenuBottomButtons from '../NavMenuMobileButtons/NavMenuMobileButtons';

class NavMenu extends React.Component {
  /**
   * Generates the DOM for the NavItems with appropriate class.
   * Optionally, removes any NavItems if a match is found from the exceptionList.
   * @param {items[]} - Array containing NavMenu item Objects.
   * @param {exceptionList[]} (optional) - Array containing NavId strings.
   * @returns {Object} React DOM.
   */
  renderNavMenu(items, exceptionList) {
    let navItems = items;

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
        key={index}
      />
    );
  }

  render() {
    const mobileActiveClass = this.props.mobileActive ? 'mobileActive' : '';

    return (
      <div className={this.props.className}>
        <nav
          className={`${this.props.className}-wrapper ${mobileActiveClass}`}
          aria-label="Main Navigation"
        >
          <LionLogoWithText ariaHidden />
          <ul className={`${this.props.className}-list`} id="navMenu-List">
            {this.renderNavMenu(this.props.items)}
          </ul>
          <SearchButton
            className={this.props.className}
          />
          <NavMenuBottomButtons
            className="mobileBottomButtons"
            libraryCardLink={
              (this.props.urlType === 'absolute') ? '//www.nypl.org/library-card' : '/library-card'
            }
          />
        </nav>
      </div>
    );
  }
}

NavMenu.propTypes = {
  lang: PropTypes.string,
  className: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  urlType: PropTypes.string,
  mobileActive: PropTypes.bool,
};

NavMenu.defaultProps = {
  lang: 'en',
  className: 'navMenu',
  urlType: 'relative',
  mobileActive: false,
};

export default NavMenu;
