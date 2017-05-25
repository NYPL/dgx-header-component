import React from 'react';
import PropTypes from 'prop-types';
import utils from '../../utils/utils.js';

const DonateBox = ({
  className,
  tag,
  title,
  desc,
  donationLinks,
}) => {
  // Enforce limit to 4 links as per design.
  const donationLinksList = donationLinks.slice(0, 4);
  const donationLinkItems = (donationLinksList && donationLinksList.length) ?
    donationLinksList.map((item, index) =>
      <li key={index}>
        <a
          href={item.url}
          onClick={() => utils.trackHeader('Donate', `Menu--${item.amount}`)}
        >
          {item.amount}
        </a>
      </li>
    ) : null;

  return (
    <div className={className}>
      <div className={`${className}-Wrapper`}>
        <div className={`${className}-Tag`}>{tag}</div>
        <h3 className={`${className}-Title`}>{title}</h3>
        <div className={`${className}-Desc`}>{desc}</div>
        <ul className={`${className}-DonationLinks`}>
          {donationLinkItems}
        </ul>
      </div>
    </div>
  );
};

DonateBox.propTypes = {
  className: PropTypes.string,
  tag: PropTypes.string,
  title: PropTypes.string,
  desc: PropTypes.string,
  donationLinks: PropTypes.array,
};

DonateBox.defaultProps = {
  className: 'DonateBox',
};

export default DonateBox;
