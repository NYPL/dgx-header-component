import React from 'react';
import PropTypes from 'prop-types';
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
    onClick={() => utils.trackHeader('Donate', gaLabel)}
    style={_extend(style, defaultStyles)}
  >
    {label}
  </a>
);

DonateButton.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  target: PropTypes.string,
  label: PropTypes.string,
  style: PropTypes.object,
  gaLabel: PropTypes.string,
};

DonateButton.defaultProps = {
  label: 'Donate',
  className: 'DonateButton',
  target: 'https://secure3.convio.net/nypl/site/SPageServer?pagename=donation_form&JServSessionIdr003=dwcz55yj27.app304a',
};

export default DonateButton;
