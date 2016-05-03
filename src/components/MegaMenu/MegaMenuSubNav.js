import React from 'react';
import { map as _map, isEmpty as _isEmpty } from 'underscore';
import config from '../../appConfig.js';
import SocialMediaLinksWidget from '../SocialMediaLinksWidget/SocialMediaLinksWidget.js';
import Radium from 'radium';
import utils from '../../utils/utils.js';
// FeatureFlags Module
import FeatureFlags from 'dgx-feature-flags';

const styles = {
  topLink: {
    textDecoration: 'none',
    color: '#FFF',
  },
};

class MegaMenuSubNav extends React.Component {
  constructor(props) {
    super(props);

    this.state = { featureFlags: FeatureFlags.store.getState() };
  }

  componentDidMount() {
    FeatureFlags.store.listen(this._onChange.bind(this));
  }

  componentWillUnmount() {
    FeatureFlags.store.unlisten(this._onChange.bind(this));
  }

  _onChange() {
    this.setState({ featureFlags: FeatureFlags.store.getState() });
  }

  _renderSubNavItems(items) {
    if (_isEmpty(items)) {
      return null;
    }

    return _map(items, (m, i) => {
      const target = m.link[this.props.lang].text || '#';
      return (
        <li key={i}>
          <a
            href={target}
            onClick={
              utils._trackHeader.bind(
                this,
                'Go to...',
                `${this.props.label[this.props.lang].text}--${m.name[this.props.lang].text}`
              )
            }
          >
            {m.name[this.props.lang].text}
          </a>
        </li>
      );
    });
  }

  _renderSocialMediaIcons(navId) {
    return (this.props.navId === navId) ?
      <SocialMediaLinksWidget
        className="MegaMenu-SubNav-SocialMediaWidget"
        links={config.socialMediaLinks}
        displayOnly={['facebook', 'twitter']}
      /> : null;
  }

  render() {
    if (FeatureFlags.store._isFeatureActive('location-top-link')) {
      return (
        <div className="MegaMenu-SubNav">
          <h2>
            <a
              style={styles.topLink}
              href={this.props.topLink}
              onClick={
                utils._trackHeader.bind(
                  this,
                  'Go to...',
                  `SubNav Title--${this.props.label[this.props.lang].text}`
                )
              }
            >
              {this.props.label[this.props.lang].text}
            </a>
          </h2>
          <ul>
            {this._renderSubNavItems(this.props.items)}
          </ul>
          {this._renderSocialMediaIcons('df621833-4dd1-4223-83e5-6ad7f98ad26a')}
        </div>
      );
    }

    return (
      <div className="MegaMenu-SubNav">
        <h2>
          <a
            style={styles.topLink}
            href={this.props.topLink}
            onClick={
              utils._trackHeader.bind(
                this,
                'Go to...',
                `SubNav Title--${this.props.label[this.props.lang].text}`
              )
            }
          >
            {this.props.label[this.props.lang].text}
          </a>
        </h2>
        <ul>
          {this._renderSubNavItems(this.props.items)}
        </ul>
      </div>
    );
  }
}

MegaMenuSubNav.propTypes = {
  lang: React.PropTypes.string,
  topLink: React.PropTypes.string,
  navId: React.PropTypes.string,
  label: React.PropTypes.object,
  items: React.PropTypes.array,
};

MegaMenuSubNav.defaultProps = {
  lang: 'en',
  topLink: '#',
};

export default Radium(MegaMenuSubNav);
