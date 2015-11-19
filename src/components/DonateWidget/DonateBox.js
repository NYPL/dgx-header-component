import React from 'react';

import utils from '../../utils/utils.js';

class DonateBox extends React.Component {

  constructor(props) {
    super(props);
  }
  
  render() {
    // Enforce limit to 4 links as per design.
    let donationLinks = this.props.donationLinks.slice(0, 4),
      donationLinkItems = (donationLinks && donationLinks.length) ?
        donationLinks.map((item, index) => {
          return (
            <li key={index}>
              <a href={item.url} onClick={utils._trackHeader.bind(this, 'Donate', `Menu--${item.amount}`)}>
                {item.amount}
              </a>
            </li>
          );
        }) : null;

    return (
      <div className={this.props.className}>
        <div className={`${this.props.className}-Wrapper`}>
          <div className={`${this.props.className}-Tag`}>{this.props.tag}</div>
          <h3 className={`${this.props.className}-Title`}>{this.props.title}</h3>
          <div className={`${this.props.className}-Desc`}>{this.props.desc}</div>
          <ul className={`${this.props.className}-DonationLinks`}>
            {donationLinkItems}
          </ul>
        </div>
      </div>
    );
  }
}

DonateBox.defaultProps = {
  lang: 'en',
  className: 'DonateBox'
};

export default DonateBox;
