import React from 'react';
import PropTypes from 'prop-types';
import {
  map as _map,
  filter as _filter,
  isEmpty as _isEmpty,
  contains as _contains,
  isArray as _isArray,
} from 'underscore';
// Header Store/Actions
import HeaderStore from '../../stores/HeaderStore.js';
import Actions from '../../actions/Actions.js';
// Dependent Components
import SearchButton from '../SearchButton/SearchButton.js';
import NavMenuItem from '../NavMenuItem/NavMenuItem.js';
import NavMenuBottomButtons from '../NavMenuMobileButtons/NavMenuMobileButtons.js';
import DonateButton from '../DonateButton/DonateButton.js';

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
    color: '#837377',
    backgroundColor: '#837377',
  },
};

class NavMenu extends React.Component {
  constructor(props) {
    super(props);
    this.handleEscKey = this.handleEscKey.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleEscKey, false);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscKey, false);
  }

  handleEscKey(e) {
    if (e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) {
      this.closeMobileNavMenuDialog();
    }
  }

  /**
   * closeMobileNavMenuDialog()
   * Verifies that the HeaderStore's mobileMenuButtonValue equals
   * 'mobileMenu' then resets value with appropriate Action.
   * Used in FocusTrap onDeactivate callback for A11Y users.
   */
  closeMobileNavMenuDialog() {
    if (HeaderStore.getMobileMenuBtnValue() === 'mobileMenu') {
      Actions.setMobileMenuButtonValue('');
    }
  }

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
    const mobileActiveClass = HeaderStore.getMobileMenuBtnValue() === 'mobileMenu' ?
      ' mobileActive' : '';

    return (
      <div className={this.props.className}>
        <nav
          className={`${this.props.className}-Wrapper${mobileActiveClass}`}
          role="navigation"
          aria-label="Main Navigation"
        >
          <span className="MobileLogoText nypl-icon-logo-type" aria-hidden="true"></span>
          <ul className={`${this.props.className}-List`} id="NavMenu-List">
            {this.renderNavMenu(this.props.items)}
          </ul>
          <SearchButton
            className={this.props.className}
          />
          <NavMenuBottomButtons
            className="MobileBottomButtons"
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
  items: PropTypes.array,
  urlType: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  patronInitial: PropTypes.string,
  patronName: PropTypes.string,
  logOutLink: PropTypes.string,
  gaAction: PropTypes.string,
};

NavMenu.defaultProps = {
  lang: 'en',
  className: 'NavMenu',
};

export default NavMenu;
