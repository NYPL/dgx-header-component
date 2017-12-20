import React from 'react';
import PropTypes from 'prop-types';
import { pick as _pick, map as _map } from 'underscore';
import {
  FaceBookIcon,
  TwitterIcon,
} from 'dgx-svg-icons';

// GA Utility
import utils from '../../utils/utils.js';

const icons = {
  twitter: <TwitterIcon iconId="email-twitter" />,
  facebook: <FaceBookIcon iconId="email-fb" />,
};

class SocialMediaLinksWidget extends React.Component {
  constructor(props) {
    super(props);

    this.state = { linkClass: '' };

    this.handleOnMouseLeave = this.handleOnMouseLeave.bind(this);
    this.handleOnMouseEnter = this.handleOnMouseEnter.bind(this);
    this.trackHeader = utils.trackHeader.bind(this);
  }

  generateLinksToDisplay(list, displayOnlyList) {
    const socialLinksList = (displayOnlyList && displayOnlyList.length) ?
      _pick(list, displayOnlyList) : list;

    return _map(socialLinksList, (item, key) => {
      const hoverClass = this.state.linkClass === key ? 'animateHover fadeInSlow' : '';
      const icon = icons[key];

      return (
        <li key={key} className={`${this.props.className}-listItem`}>
          <a
            href={item}
            onClick={() => this.trackHeader('Click', `Social Media - ${key}`)}
            className={`${this.props.className}-link ${hoverClass}`}
            onMouseEnter={() => this.handleOnMouseEnter(key)}
            onMouseLeave={this.handleOnMouseLeave}
          >
            {icon}
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
  handleOnMouseEnter(key) {
    this.setState({ linkClass: key });
  }

  /**
   * _handleOnMouseLeave()
   * updates the linkClass state
   * object property to an empty string.
   *
   */
  handleOnMouseLeave() {
    this.setState({ linkClass: '' });
  }

  render() {
    const socialLinks = this.generateLinksToDisplay(this.props.links, this.props.displayOnlyList);

    return (
      <div className={this.props.className}>
        <ul className={`${this.props.className}-list`}>
          {socialLinks}
        </ul>
      </div>
    );
  }
}

SocialMediaLinksWidget.propTypes = {
  lang: PropTypes.string,
  className: PropTypes.string,
  links: PropTypes.object,
  displayOnlyList: PropTypes.array,
};

SocialMediaLinksWidget.defaultProps = {
  lang: 'en',
  className: 'socialMediaLinksWidget',
};

export default SocialMediaLinksWidget;
