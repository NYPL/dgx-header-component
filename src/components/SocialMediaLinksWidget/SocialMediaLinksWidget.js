import React from 'react';
import cx from 'classnames';
import _ from 'underscore';

import utils from '../../utils/utils.js';

class SocialMediaLinksWidget extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      linkClass: ''
    };
  }
  
  render() {
    let displayOnlyList = this.props.displayOnly,
      socialLinksList = this.props.links,
      socialLinksToDisplay;

    // Pick the selected links to display (optional)
    if (displayOnlyList && displayOnlyList.length) {
      socialLinksList = _.pick(socialLinksList, displayOnlyList);
    }

    // Iterate over each object key->value pair and display as a list item
    socialLinksToDisplay = _.map(socialLinksList, (item, key) => {
      let hoverClass = this.state.linkClass === key ? 
        `nypl-icon-${key}-circle-hover animateHover fadeInSlow` : `nypl-icon-${key}-circle`;
      
      return (
        <li key={key} className={`${this.props.className}-ListItem`}>
          <a 
            href={item}
            onClick={utils._trackHeader.bind(this, 'Click', `Social Media - ${key}`)}
            className={`${this.props.className}-Link ${hoverClass}`} 
            onMouseEnter={this._handleOnMouseEnter.bind(this, key)}
            onMouseLeave={this._handleOnMouseLeave.bind(this)}>
          </a>
        </li>
      );
    });

    return (
      <div className={this.props.className}>
        <ul className={`${this.props.className}-List`}>
          {socialLinksToDisplay}
        </ul>
      </div>
    );
  }

  /**
   * _handleOnMouseEnter(key) 
   * Updates the linkClass state
   * object property with the param key
   *
   * @param {String} key
   */
  _handleOnMouseEnter(key) { 
    this.setState({linkClass: key});
  }

  /**
   * _handleOnMouseLeave() 
   * updates the linkClass state
   * object property to an empty string.
   *
   */
  _handleOnMouseLeave() {
    this.setState({linkClass: ''});
  }
}

SocialMediaLinksWidget.defaultProps = {
  lang: 'en',
  className: 'SocialMediaLinksWidget'
};

export default SocialMediaLinksWidget;
