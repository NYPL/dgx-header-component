import React from 'react';
import PropTypes from 'prop-types';

const SubscribeMessageBox = ({ className, status, msg }) => (
  <div className={`${className} ${status}`}>
    <div className={`${className}-eyebrow`}></div>
    <div className={`${className}-title`}>
      {msg}
    </div>
  </div>
);

SubscribeMessageBox.propTypes = {
  msg: PropTypes.string,
  className: PropTypes.string,
  status: PropTypes.string,
};

SubscribeMessageBox.defaultProps = {
  msg: 'Thank you for subscribing to our email updates.',
  className: 'subscribeMessageBox',
};

export default SubscribeMessageBox;
