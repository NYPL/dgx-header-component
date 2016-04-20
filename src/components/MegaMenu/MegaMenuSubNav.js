import React from 'react';
import _ from 'underscore';
import Radium from 'radium';

import config from '../../appConfig.js';
import SocialMediaLinksWidget from '../SocialMediaLinksWidget/SocialMediaLinksWidget.js';
import utils from '../../utils/utils.js';

class MegaMenuSubNav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const items = _.map(this.props.items, (m, i) => {
      const target = m.link[this.props.lang].text || '#';
      return (
        <li key={i}>
          <a href={target}
            onClick={utils._trackHeader.bind(
              this,
              'Go to...',
              `${this.props.label[this.props.lang].text}--${m.name[this.props.lang]['text']}`)
            }
          >
            {m.name[this.props.lang]['text']}
          </a>
        </li>
      );
    });

    // Assign widget to the FindUs Menu Item by ID match
    const socialMediaWidget = (this.props.navId === 'df621833-4dd1-4223-83e5-6ad7f98ad26a') ?
      <SocialMediaLinksWidget
        className={'MegaMenu-SubNav-SocialMediaWidget'}
        links={config.socialMediaLinks}
        displayOnly={['facebook', 'twitter']}
      /> : null;

    return (
      <div className="MegaMenu-SubNav">
        <h2>
          <a style={styles.topLink} href={this.props.topLink}
            onClick={utils._trackHeader.bind(
              this, 'Go to...', `SubNav Title--${this.props.label[this.props.lang].text}`)
            }
          >
            {this.props.label[this.props.lang].text}
          </a>
        </h2>
        <ul>{items}</ul>
        {socialMediaWidget}
      </div>
    );
  }
}

MegaMenuSubNav.defaultProps = {
  lang: 'en',
  topLink: '#'
};

const styles = {
  topLink: {
    textDecoration: 'none',
    color: '#FFF'
  }
};

export default Radium(MegaMenuSubNav);
