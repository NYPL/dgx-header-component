import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
// ALT Flux Store/Actions
import HeaderStore from '../../stores/HeaderStore.js';
import Actions from '../../actions/Actions.js';
// Dependent NYPL React Components
import MegaMenuSubNav from './MegaMenuSubNav.js';
import MegaMenuFeatures from './MegaMenuFeatures.js';

class MegaMenu extends React.Component {
  constructor(props) {
    super(props);

    this.watchHoverIntentEnter = this.watchHoverIntentEnter.bind(this);
    this.watchHoverIntentLeave = this.watchHoverIntentLeave.bind(this);
  }

  /**
   * If the lastActiveMenuItem passed as a prop
   * matches the MegaMenu's navId. Then fire the
   * Action to store a reference to the lastActiveMenuItem.
   */
  watchHoverIntentEnter() {
    if (this.props.lastActiveMenuItem === this.props.navId) {
      Actions.setLastActiveMenuItem(this.props.navId);
    }
  }

  /**
   * Sets the Store's lastActiveMenuItem
   * property to an empty string when hovered out.
   */
  watchHoverIntentLeave() {
    Actions.setLastActiveMenuItem('');
  }

  render() {
    // Dynamic class assignment based on activeItem property matching current index.
    const classes = cx(this.props.className, {
      'active animateMegaMenuEnter fadeIn': this.props.index === this.props.currentActiveItem,
      active: HeaderStore.getLastActiveMenuItem() === this.props.navId &&
        this.props.index !== this.props.currentActiveItem,
    });

    return (
      <div
        onMouseEnter={this.watchHoverIntentEnter}
        onMouseLeave={this.watchHoverIntentLeave}
        id={(this.props.navId) ? `MegaMenu-${this.props.navId}` : 'MegaMenu'}
        className={classes}
      >
        <div className={`${this.props.className}-LeftBgWrapper`}></div>
        <div className={`${this.props.className}-Wrapper`}>
          <div className={`${this.props.className}-SubNavWrapper`}>
            <MegaMenuSubNav
              label={this.props.label}
              items={this.props.items}
              lang={this.props.lang}
              topLink={this.props.topLink}
              navId={this.props.navId}
            />
          </div>
          <div className={`${this.props.className}-FeaturesWrapper`}>
            <MegaMenuFeatures
              navId={this.props.navId}
              features={this.props.features}
              urlType={this.props.urlType}
              navLabel={this.props.label[this.props.lang].text}
            />
          </div>
        </div>
      </div>
    );
  }
}

MegaMenu.propTypes = {
  lang: PropTypes.string,
  className: PropTypes.string,
  lastActiveMenuItem: PropTypes.string,
  currentActiveItem: PropTypes.number,
  index: PropTypes.number,
  navId: PropTypes.string,
  label: PropTypes.object,
  features: PropTypes.array,
  items: PropTypes.array,
  topLink: PropTypes.string,
  urlType: PropTypes.string,
};

MegaMenu.defaultProps = {
  lang: 'en',
  className: 'MegaMenu',
};

export default MegaMenu;
