import React from 'react';
import { LionLogoWithText } from 'dgx-svg-icons';
import utils from '../../utils/utils.js';

const Logo = (props) =>
  <a
    id={props.id}
    className={props.className}
    href={props.target}
    onClick={() => utils.trackHeader('Click Logo', '')}
    style={props.style}
  >
    <LionLogoWithText />
    <span className="visuallyHidden">{props.alt}</span>
  </a>;

Logo.propTypes = {
  target: React.PropTypes.string,
  id: React.PropTypes.string,
  className: React.PropTypes.string,
  alt: React.PropTypes.string,
  style: React.PropTypes.object,
};

Logo.defaultProps = {
  target: '/',
  id: 'Logo',
  className: 'Logo',
  alt: 'The New York Public Library',
};

export default Logo;
