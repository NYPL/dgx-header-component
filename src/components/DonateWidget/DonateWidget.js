import React from 'react';
import DonateBox from './DonateBox.js';
import MegaMenuFeatureItem from '../MegaMenu/MegaMenuFeatureItem.js';

const DonateWidget = ({ className, featuredItem, donationLinks, navLabel }) => (
  <div className={className}>
    <DonateBox
      className={`${className}-DonateBox`}
      tag={'Donate'}
      title={'Donate to the Library'}
      donationLinks={donationLinks}
      desc={'We rely on your generosity to provide books, literacy classes, children\'s ' +
        'story hours, and much more FREE for all New Yorkers.'}
    />
    <MegaMenuFeatureItem
      feature={featuredItem}
      navLabel={navLabel}
    />
  </div>
);

DonateWidget.propTypes = {
  className: React.PropTypes.string,
  featuredItem: React.PropTypes.object,
  donationLinks: React.PropTypes.array,
  navLabel: React.PropTypes.string,
};

DonateWidget.defaultProps = {
  className: 'DonateWidget',
};

export default DonateWidget;
