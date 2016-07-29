import React from 'react';
import cx from 'classnames';
// Google Analytics Utility Library
import utils from '../../utils/utils.js';
// Alt Store
import HeaderStore from '../../stores/HeaderStore.js';

class NavMenuItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: null,
      lastActiveMenuItem: '',
    };

    this.activateHover = this.activateHover.bind(this);
    this.deactivateHover = this.deactivateHover.bind(this);
  }

  /**
   * Sets the state's lastActiveMenuItem and activeItem after a given time delay.
   */
  activateHover() {
    this.hoverTimer = setTimeout(() => {
      this.setState({
        lastActiveMenuItem: this.props.navId,
        activeItem: this.props.index,
      });
    }, 80);
  }

  /**
   * Initially clears the hoverTimer initialized by the activateHover function.
   * Then removes the state's activeItem after a given time delay.
   */
  deactivateHover() {
    clearTimeout(this.hoverTimer);

    setTimeout(() => {
      this.setState({ activeItem: null });
    }, 250);
  }

  render() {
    const target = this.props.target;
    const linkClass = cx({
      active: this.props.index === this.state.activeItem
        || HeaderStore._getLastActiveMenuItem() === this.props.navId,
    });

    return (
      <li
        id={
          (this.props.navId) ? `${this.props.className}-${this.props.navId}` : this.props.className
        }
        className={this.props.className}
      >
        <span
          className="NavMenuItem-Link"
          id={(this.props.navId) ? `NavMenuItem-Link-${this.props.navId}` : 'NavMenuItem-Link'}
        >
          <a
            href={target}
            className={linkClass}
            onClick={
              () => utils._trackHeader('Go to...', `${this.props.label[this.props.lang].text}`)
            }
          >
            {this.props.label[this.props.lang].text}
          </a>
        </span>
      </li>
    );
  }
}

NavMenuItem.propTypes = {
  lang: React.PropTypes.string,
  root: React.PropTypes.string,
  target: React.PropTypes.string,
  className: React.PropTypes.string,
  hoverTimer: React.PropTypes.func,
  navId: React.PropTypes.string,
  index: React.PropTypes.number,
  label: React.PropTypes.object,
  subNav: React.PropTypes.array,
  features: React.PropTypes.array,
  urlType: React.PropTypes.string,
};

NavMenuItem.defaultProps = {
  target: '#',
  root: '//www.nypl.org/',
  lang: 'en',
  className: 'NavMenuItem',
  hoverTimer: null,
};

export default NavMenuItem;
