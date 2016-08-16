import React from 'react';
import { extend as _extend } from 'underscore';
import utils from '../../utils/utils.js';

const defaultStyles = {
  backgroundColor: '#E32B31',
  color: '#FFFFFF',
};

const DonateButton = ({ id, className, target, label, gaLabel, style }) => (
  <a
    id={id}
    className={className}
    href={target}
    onClick={() => utils._trackHeader('Donate', gaLabel)}
    style={_extend(style, defaultStyles)}
  >
    {label}
  </a>
);

DonateButton.propTypes = {
  id: React.PropTypes.string,
  className: React.PropTypes.string,
  target: React.PropTypes.string,
  label: React.PropTypes.string,
  style: React.PropTypes.object,
  gaLabel: React.PropTypes.string,
};

DonateButton.defaultProps = {
  label: 'Donate',
  className: 'DonateButton',
  target: 'https://secure3.convio.net/nypl/site/SPageServer?pagename=donation_form&JServSessionIdr003=dwcz55yj27.app304a&s_src=FRQ14ZZ_SWBN',
};

export default DonateButton;
