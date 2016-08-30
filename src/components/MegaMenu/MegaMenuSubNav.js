import React from 'react';
import { map as _map, isEmpty as _isEmpty } from 'underscore';
import config from '../../appConfig.js';
import SocialMediaLinksWidget from '../SocialMediaLinksWidget/SocialMediaLinksWidget.js';
import utils from '../../utils/utils.js';

const styles = {
  topLink: {
    textDecoration: 'none',
    color: '#FFF',
  },
};

class MegaMenuSubNav extends React.Component {
  /**
   * Generates the DOM for the MegaMenu Left SubNavItem elements.
   * @param {items[]} - Array containing SubNavItem object data.
   * @returns {Object} React DOM.
   */
  renderSubNavItems(items) {
    if (_isEmpty(items)) {
      return null;
    }

    return _map(items, (m, i) => {
      const target = m.link[this.props.lang].text || '#';
      return (
        <li key={i}>
          <a
            href={target}
            onClick={() =>
              utils.trackHeader(
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

  /**
   * Generates the DOM for the SocialMedia link icons only for a matching navId.
   * @param {string} - Navigation UUID as string type.
   * @returns {Object} React DOM.
   */
  renderSocialMediaIcons(navId) {
    return (this.props.navId === navId) ?
      <SocialMediaLinksWidget
        className="MegaMenu-SubNav-SocialMediaWidget"
        links={config.socialMediaLinks}
        displayOnly={['facebook', 'twitter']}
      /> : null;
  }

  render() {
    return (
      <div className="MegaMenu-SubNav">
        <h2>
          <a
            style={styles.topLink}
            href={this.props.topLink}
            onClick={() =>
              utils.trackHeader(
                'Go to...',
                `SubNav Title--${this.props.label[this.props.lang].text}`
              )
            }
          >
            {this.props.label[this.props.lang].text}
          </a>
        </h2>
        <ul>
          {this.renderSubNavItems(this.props.items)}
        </ul>
        {this.renderSocialMediaIcons('df621833-4dd1-4223-83e5-6ad7f98ad26a')}
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

export default MegaMenuSubNav;
