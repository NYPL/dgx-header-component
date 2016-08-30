import React from 'react';
// Google Analytics Utility Library
import utils from '../../utils/utils.js';

const NavMenuItem = ({
  className,
  label,
  lang,
  navId,
  target,
  urlType,
}) => {
  const convertUrlRelative = (url) => {
    if (typeof url !== 'string') {
      return '#';
    }
    const regex = new RegExp(/^http(s)?\:\/\/(www.)?nypl.org/i);
    // Test regex matching pattern
    return (regex.test(url)) ? url.replace(regex, '') : url;
  };

  return (
    <li
      id={(navId) ? `${className}-${navId}` : className}
      className={className}
    >
      <a
        href={(urlType === 'absolute') ? target : convertUrlRelative(target)}
        className="NavMenuItem-Link"
        id={(navId) ? `NavMenuItem-Link-${navId}` : 'NavMenuItem-Link'}
        onClick={() => utils.trackHeader('Go to...', `${label[lang].text}`)}
      >
        {label[lang].text}
      </a>
    </li>
  );
};

NavMenuItem.propTypes = {
  className: React.PropTypes.string,
  label: React.PropTypes.object,
  lang: React.PropTypes.string,
  navId: React.PropTypes.string,
  target: React.PropTypes.string,
  urlType: React.PropTypes.string,
};

NavMenuItem.defaultProps = {
  className: 'NavMenuItem',
  lang: 'en',
  target: '#',
};

export default NavMenuItem;
