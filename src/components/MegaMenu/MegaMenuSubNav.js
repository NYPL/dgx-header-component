import React from 'react';
import _ from 'underscore';
import Radium from 'radium';

import config from '../../appConfig.js';
import SocialMediaLinksWidget from '../SocialMediaLinksWidget/SocialMediaLinksWidget.js';
import gaUtils from '../../utils/gaUtils.js';

class MegaMenuSubNav extends React.Component {

  // Constructor used in ES6
  constructor(props) {
    super(props);
  }

  render() {

    let items = _.map(this.props.items, (m, i) => {
        let target = m.link.en.text;

        if (typeof target === 'undefined') {
          // In reality target should never be undefined, but
          // this is plugging some holes in the fake data
          target = '#';
        } else if (!/^http/.exec(target)) {
          target = '//nypl.org/' + target;
        }
        
        return (
          <li key={i}>
            <a href={target} onClick={gaUtils._trackEvent.bind(this, 'Go to...', `${this.props.label[this.props.lang].text}--${m.name[this.props.lang]['text']}`)}>
              {m.name[this.props.lang]['text']}
            </a>
          </li>
        );
      });

    // Assign widget to the FindUs Menu Item by ID match
    let socialMediaWidget = (this.props.navId === 'df621833-4dd1-4223-83e5-6ad7f98ad26a') ?
      <SocialMediaLinksWidget 
        className={'MegaMenu-SubNav-SocialMediaWidget'}
        links={config.socialMediaLinks} 
        displayOnly={['facebook', 'twitter']} /> : null;

    return (
      <div className='MegaMenu-SubNav'>
        <h2>
          <a style={styles.topLink} href={this.props.topLink}>
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