import React from 'react';
import PropTypes from 'prop-types';
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
    style={{...style, ...defaultStyles}}
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
  className: 'donateButton',
  target: 'https://secure3.convio.net/nypl/site/Donation2?7825.donation=form1&df_id=7825' +
    '&mfc_pref=T&s_src=FRQ18ZZ_TNN',
};

export default DonateButton;
