import React from 'react';
import cx from 'classnames';

// ALT Flux Store/Actions
import HeaderStore from '../../stores/Store.js';
import Actions from '../../actions/Actions.js';

// Dependent NYPL React Components
import MegaMenuSubNav from './MegaMenuSubNav.js';
import MegaMenuFeatures from './MegaMenuFeatures.js';

class MegaMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lastActiveMenuItem: HeaderStore.getState().lastActiveMenuItem
    }
  }

  componentDidMount() {
    HeaderStore.listen(this._onChange.bind(this));
  }

  componentWillUnmount() {
    HeaderStore.unlisten(this._onChange.bind(this));
  }

  _onChange() {
    this.setState({
      lastActiveMenuItem: HeaderStore.getState().lastActiveMenuItem
    });
  }

  render() {
    // Dynamic class assignment based on activeItem property matching current index.
    let classes = cx('MegaMenu', {
      'active animateMegaMenuEnter fadeIn': this.props.index === this.props.currentActiveItem,
      'active': HeaderStore._getLastActiveMenuItem() === this.props.navId && this.props.index !== this.props.currentActiveItem
    });

    return (
      <div 
        onMouseEnter={this._watchHoverIntentEnter.bind(this)}
        onMouseLeave={this._watchHoverIntentLeave.bind(this)}
        id={(this.props.navId) ? 'MegaMenu-' + this.props.navId : 'MegaMenu'}
        className={classes}>
        <div className='MegaMenu-LeftBgWrapper'></div>
        <div className='MegaMenu-Wrapper'>
          <div className='MegaMenu-SubNavWrapper'>
            <MegaMenuSubNav
              label={this.props.label} 
              items={this.props.items} 
              lang={this.props.lang}
              topLink={this.props.topLink}
              navId={this.props.navId} />
          </div>
          <div className='MegaMenu-FeaturesWrapper'>
            <MegaMenuFeatures 
              navId={this.props.navId} 
              features={this.props.features} 
              navLabel={this.props.label['en'].text} />
          </div>
        </div>
      </div>
    );
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
}

MegaMenu.defaultProps = {
  lang: 'en'
};

export default MegaMenu;