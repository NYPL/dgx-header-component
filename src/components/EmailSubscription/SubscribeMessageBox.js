import React from 'react';

const SubscribeMessageBox = ({ className, status, msg }) => (
  <div className={`${className} ${status}`}>
    <div className={`${className}-Eyebrow`}></div>
    <div className={`${className}-Title`}>
      {msg}
    </div>
  </div>
);

SubscribeMessageBox.propTypes = {
  msg: React.PropTypes.string,
  className: React.PropTypes.string,
  status: React.PropTypes.string,
};

SubscribeMessageBox.defaultProps = {
  msg: 'Thank you for subscribing to our email updates.',
  className: 'SubscribeMessageBox',
};

export default SubscribeMessageBox;
