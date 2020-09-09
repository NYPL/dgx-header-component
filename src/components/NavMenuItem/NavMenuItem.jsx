import React from 'react';
import PropTypes from 'prop-types';
// Google Analytics Utility Library
import utils from '../../utils/utils';

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
        className="navMenuItem-link"
        id={(navId) ? `navMenuItem-link-${navId}` : 'navMenuItem-link'}
        onClick={() => utils.trackHeader('Go to...', `${label[lang].text}`)}
      >
        {label[lang].text}
      </a>
    </li>
  );
};

NavMenuItem.propTypes = {
  className: PropTypes.string,
  label: PropTypes.shape({}),
  lang: PropTypes.string,
  navId: PropTypes.string,
  target: PropTypes.string,
  urlType: PropTypes.string,
};

NavMenuItem.defaultProps = {
  className: 'navMenuItem',
  label: {},
  lang: 'en',
  navId: '',
  target: '#',
  urlType: '',
};

export default NavMenuItem;
