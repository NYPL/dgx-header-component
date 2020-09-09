import React from 'react';
import PropTypes from 'prop-types';
import { LionLogoWithText } from '@nypl/dgx-svg-icons';
import utils from '../../utils/utils';

const Logo = (props) =>
  <a
    id={props.id}
    className={props.className}
    href={props.target}
    onClick={() => utils.trackHeader('Click Logo', '')}
  >
    <LionLogoWithText focusable={false} />
    <span className="visuallyHidden">{props.alt}</span>
  </a>;

Logo.propTypes = {
  target: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  alt: PropTypes.string,
};

Logo.defaultProps = {
  target: '/',
  id: 'Logo',
  className: 'Logo',
  alt: 'The New York Public Library',
};

export default Logo;
