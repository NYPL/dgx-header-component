import React from 'react';
import PropTypes from 'prop-types';
import { extend as _extend } from 'underscore';
import utils from '../../utils/utils';

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
  style: PropTypes.shape({}),
  gaLabel: PropTypes.string,
};

DonateButton.defaultProps = {
  id: '',
  label: 'Donate',
  className: 'donateButton',
  target: 'https://secure3.convio.net/nypl/site/Donation2?7825.donation=form1&df_id=7825' +
    '&mfc_pref=T&s_src=FRQ18ZZ_TNN',
  style: {},
  gaLabel: '',
};

export default DonateButton;
