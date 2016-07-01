import React from 'react';
import FindUsFeature from './FindUsFeature.js';
import MegaMenuFeatureItem from '../MegaMenu/MegaMenuFeatureItem.js';

const FindUsWidget = ({ className, featuredItem, navLabel, urlType }) => (
  <div className={className}>
    <FindUsFeature
      className={`${className}-FindUsFeature`}
      urlType={urlType}
    />
    <MegaMenuFeatureItem
      feature={featuredItem}
      navLabel={navLabel}
    />
  </div>
);

FindUsWidget.propTypes = {
  className: React.PropTypes.string,
  featuredItem: React.PropTypes.object,
  navLabel: React.PropTypes.string,
  urlType: React.PropTypes.string,
};

FindUsWidget.defaultProps = {
  className: 'FindUsWidget',
};

export default FindUsWidget;
