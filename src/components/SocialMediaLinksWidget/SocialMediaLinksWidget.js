import React from 'react';
import { pick as _pick, map as _map } from 'underscore';
// GA Utility
import utils from '../../utils/utils.js';

class SocialMediaLinksWidget extends React.Component {
  constructor(props) {
    super(props);

    this.state = { linkClass: '' };

    this._handleOnMouseLeave = this._handleOnMouseLeave.bind(this);
    this._handleOnMouseEnter = this._handleOnMouseEnter.bind(this);
    this._trackHeader = utils._trackHeader.bind(this);
  }

  _generateLinksToDisplay(list, displayOnlyList) {
    const socialLinksList = (displayOnlyList && displayOnlyList.length) ?
      _pick(list, displayOnlyList) : list;

    return _map(socialLinksList, (item, key) => {
      const hoverClass = this.state.linkClass === key ?
        `nypl-icon-${key}-circle-hover animateHover fadeInSlow` : `nypl-icon-${key}-circle`;

      return (
        <li key={key} className={`${this.props.className}-ListItem`}>
          <a
            href={item}
            onClick={() => this._trackHeader('Click', `Social Media - ${key}`)}
            className={`${this.props.className}-Link ${hoverClass}`}
            onMouseEnter={() => this._handleOnMouseEnter(key)}
            onMouseLeave={this._handleOnMouseLeave}
          >
          </a>
        </li>
      );
    });
  }

  /**
   * _handleOnMouseEnter(key)
   * Updates the linkClass state
   * object property with the param key
   *
   * @param {String} key
   */
  _handleOnMouseEnter(key) {
    this.setState({ linkClass: key });
  }

  /**
   * _handleOnMouseLeave()
   * updates the linkClass state
   * object property to an empty string.
   *
   */
  _handleOnMouseLeave() {
    this.setState({ linkClass: '' });
  }

  render() {
    const socialLinks = this._generateLinksToDisplay(this.props.links, this.props.displayOnlyList);

    return (
      <div className={this.props.className}>
        <ul className={`${this.props.className}-List`}>
          {socialLinks}
        </ul>
      </div>
    );
  }
}

SocialMediaLinksWidget.propTypes = {
  lang: React.PropTypes.string,
  className: React.PropTypes.string,
  links: React.PropTypes.object,
  displayOnlyList: React.PropTypes.array,
};

SocialMediaLinksWidget.defaultProps = {
  lang: 'en',
  className: 'SocialMediaLinksWidget',
};

export default SocialMediaLinksWidget;
