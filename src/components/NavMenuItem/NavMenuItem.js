import React from 'react';
// import cx from 'classnames';
// Google Analytics Utility Library
import utils from '../../utils/utils.js';
// Alt Store
// import HeaderStore from '../../stores/HeaderStore.js';
// NYPL Dependent React Components
// import MegaMenu from '../MegaMenu/MegaMenu.js';
// import MegaMenuArrow from '../MegaMenu/MegaMenuArrow.js';

const NavMenuItem = ({
  className,
  label,
  lang,
  navId,
  target,
  urlType,
}) => {
  // constructor(props) {
  //   super(props);
  //
  //   this.state = {
  //     activeItem: null,
  //     lastActiveMenuItem: '',
  //   };
  //
  //   this.activateHover = this.activateHover.bind(this);
  //   this.deactivateHover = this.deactivateHover.bind(this);
  // }

  /**
   * Sets the state's lastActiveMenuItem and activeItem after a given time delay.
   */
  // activateHover() {
  //   if (this.props.cookie !== '1') {
  //     this.hoverTimer = setTimeout(() => {
  //       this.setState({
  //         lastActiveMenuItem: this.props.navId,
  //         activeItem: this.props.index,
  //       });
  //     }, 80);
  //   }
  // }

  /**
   * Initially clears the hoverTimer initialized by the activateHover function.
   * Then removes the state's activeItem after a given time delay.
   */
  // deactivateHover() {
  //   if (!this.props.cookie !== '1') {
  //     clearTimeout(this.hoverTimer);
  //
  //     setTimeout(() => {
  //       this.setState({ activeItem: null });
  //     }, 250);
  //   }
  // }

  // render() {
    // const target = this.props.target;
    // const linkClass = cx({
    //   active: this.props.index === this.state.activeItem
    //     || HeaderStore._getLastActiveMenuItem() === this.props.navId,
    // });

    // const cookie = this.props.cookie;

    // const megaMenuArrow = (this.props.subNav && this.props.features && (cookie !== '1')) ?
    //   <MegaMenuArrow
    //     navId={this.props.navId}
    //     index={this.props.index}
    //     currentActiveItem={this.state.activeItem}
    //   /> : null;
    // const megaMenu = (this.props.subNav && this.props.features && (cookie !== '1')) ?
    //   <MegaMenu
    //     label={this.props.label}
    //     lang={this.props.lang}
    //     urlType={this.props.urlType}
    //     items={this.props.subNav}
    //     navId={this.props.navId}
    //     features={this.props.features}
    //     topLink={target}
    //     index={this.props.index}
    //     lastActiveMenuItem={this.state.lastActiveMenuItem}
    //     currentActiveItem={this.state.activeItem}
    //   /> : null;

  const convertUrlRelative = (url) => {
    if (typeof url !== 'string') {
      return '#';
    }
    const regex = new RegExp(/^http(s)?\:\/\/(www.)?nypl.org/i);
    // Test regex matching pattern
    return (regex.test(url)) ? url.replace(regex, '') : url;
  };

  return (
    <li
      id={(navId) ? `${className}-${navId}` : className}
      className={className}
    >
      <a
        href={(urlType === 'absolute') ? target : convertUrlRelative(target)}
        className="NavMenuItem-Link"
        id={(navId) ? `NavMenuItem-Link-${navId}` : 'NavMenuItem-Link'}
        onClick={() => utils._trackHeader('Go to...', `${label[lang].text}`)}
      >
        {label[lang].text}
      </a>
    </li>
  );
  // }
};

NavMenuItem.propTypes = {
  className: React.PropTypes.string,
  label: React.PropTypes.object,
  lang: React.PropTypes.string,
  navId: React.PropTypes.string,
  target: React.PropTypes.string,
  urlType: React.PropTypes.string,
};

NavMenuItem.defaultProps = {
  className: 'NavMenuItem',
  lang: 'en',
  target: '#',
};

export default NavMenuItem;
