import React from 'react';
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

    this.state = { lastActiveMenuItem: HeaderStore.getState().lastActiveMenuItem };

    this._watchHoverIntentEnter = this._watchHoverIntentEnter.bind(this);
    this._watchHoverIntentLeave = this._watchHoverIntentLeave.bind(this);
  }

  componentDidMount() {
    HeaderStore.listen(this._onChange.bind(this));
  }

  componentWillUnmount() {
    HeaderStore.unlisten(this._onChange.bind(this));
  }

  _onChange() {
    this.setState({
      lastActiveMenuItem: HeaderStore.getState().lastActiveMenuItem,
    });
  }

  /**
   * _watchHoverIntentEnter()
   * If the lastActiveMenuItem passed as a prop
   * matches the MegaMenu's navId. Then fire the
   * Action to store a reference to thhe lastActiveMenuItem.
   */
  _watchHoverIntentEnter() {
    if (this.props.lastActiveMenuItem === this.props.navId) {
      Actions.setLastActiveMenuItem(this.props.navId);
    }
  }

  /**
   * _watchHoverIntentLeave()
   * Sets the Store's lastActiveMenuItem
   * property to an empty string when
   * hovered out.
   */
  _watchHoverIntentLeave() {
    Actions.setLastActiveMenuItem('');
  }
  render() {
    // Dynamic class assignment based on activeItem property matching current index.
    const classes = cx(this.props.className, {
      'active animateMegaMenuEnter fadeIn': this.props.index === this.props.currentActiveItem,
      active: HeaderStore._getLastActiveMenuItem() === this.props.navId &&
        this.props.index !== this.props.currentActiveItem,
    });

    return (
      <div
        onMouseEnter={this._watchHoverIntentEnter}
        onMouseLeave={this._watchHoverIntentLeave}
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
  lang: React.PropTypes.string,
  className: React.PropTypes.string,
  lastActiveMenuItem: React.PropTypes.string,
  currentActiveItem: React.PropTypes.number,
  index: React.PropTypes.number,
  navId: React.PropTypes.string,
  label: React.PropTypes.object,
  features: React.PropTypes.array,
  items: React.PropTypes.array,
  topLink: React.PropTypes.string,
  urlType: React.PropTypes.string,
};

MegaMenu.defaultProps = {
  lang: 'en',
  className: 'MegaMenu',
};

export default MegaMenu;
