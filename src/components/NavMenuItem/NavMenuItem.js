import React from 'react';
import cx from 'classnames';
// Google Analytics Utility Library
import utils from '../../utils/utils.js';
// Alt Store
import HeaderStore from '../../stores/HeaderStore.js';
// NYPL Dependent React Components
import MegaMenu from '../MegaMenu/MegaMenu.js';
import MegaMenuArrow from '../MegaMenu/MegaMenuArrow.js';

class NavMenuItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: null,
      lastActiveMenuItem: '',
    };

    this._activateHover = this._activateHover.bind(this);
    this._deactivateHover = this._deactivateHover.bind(this);
  }

  render() {
    const target = this.props.target;
    const linkClass = cx({
      'active': this.props.index === this.state.activeItem
        || HeaderStore._getLastActiveMenuItem() === this.props.navId
      });
    const megaMenuArrow = (this.props.subNav && this.props.features) ?
      <MegaMenuArrow
          navId={this.props.navId}
          index={this.props.index}
          currentActiveItem={this.state.activeItem}
      /> : null;
    const megaMenu = (this.props.subNav && this.props.features) ?
      <MegaMenu
        label={this.props.label}
        lang={this.props.lang}
        urlType={this.props.urlType}
        items={this.props.subNav}
        navId={this.props.navId}
        features={this.props.features}
        topLink={target}
        index={this.props.index}
        lastActiveMenuItem={this.state.lastActiveMenuItem}
        currentActiveItem={this.state.activeItem}
      /> : null;

    return (
      <li
        id={(this.props.navId) ? `${this.props.className}-${this.props.navId}` : this.props.className}
        className={this.props.className}
      >
        <span
          onMouseEnter={this._activateHover}
          onMouseLeave={this._deactivateHover}
          className={'NavMenuItem-Link'}
          id={(this.props.navId) ? 'NavMenuItem-Link-' + this.props.navId : 'NavMenuItem-Link'}
        >
          <a
            href={target}
            className={linkClass}
            onClick={utils._trackHeader.bind(this, 'Go to...', `${this.props.label['en'].text}`)}
          >
            {this.props.label[this.props.lang].text}
          </a>
          {megaMenuArrow}
        </span>
        {megaMenu}
      </li>
    );
  }

  /**
   * _activateHover()
   * Sets the state's lastActiveMenuItem
   * & activeItem after set time.
   */
  _activateHover() {

    this.hoverTimer = setTimeout(() => {
      this.setState({lastActiveMenuItem: this.props.navId});
      this.setState({activeItem: this.props.index});
    }, 80);
  }

  /**
   * _deactivateHover()
   * Initially clears thhe hoverTimer.
   * Then removes the state's activeItem
   * after set time.
   */
  _deactivateHover() {
    // Will clear the set timer that activates the menu
    // from executing
    clearTimeout(this.hoverTimer);

    setTimeout(() => {
      this.setState({activeItem: null});
    }, 250);
  }
}

NavMenuItem.defaultProps = {
  target: '#',
  root: '//www.nypl.org/',
  lang: 'en',
  className: 'NavMenuItem',
  hoverTimer: null,
};

export default NavMenuItem;
