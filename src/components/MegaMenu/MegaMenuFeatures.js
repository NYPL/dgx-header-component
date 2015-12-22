import React from 'react';
import MegaMenuFeatureItem from './MegaMenuFeatureItem.js';
import FindUsWidget from '../FindUsWidget/FindUsWidget.js';
import DonateWidget from '../DonateWidget/DonateWidget.js';
import config from '../../appConfig.js';

class MegaMenuFeatures extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);
  }

  render() {
    let currentFeatureItem,
      // The specific header items for Find Us and Give only have one feature.
      widgetFeature = this.props.features[0].featuredItem;

    // Donate Widget
    if (this.props.navId === '1d9ea0ec-6ca3-4577-9dd1-e8de1f2a8bb1') {
      currentFeatureItem = <DonateWidget 
        navId={this.props.navId} 
        featuredItem={widgetFeature} 
        donationLinks={config.donationLinks} navLabel={this.props.navLabel} />;
    } else if (this.props.navId === 'df621833-4dd1-4223-83e5-6ad7f98ad26a') {
      currentFeatureItem = <FindUsWidget navId={this.props.navId} featuredItem={widgetFeature} navLabel={this.props.navLabel} />;
    } else {
      currentFeatureItem = this.props.features.map((item, i) => {
        return (
          <MegaMenuFeatureItem key={i} feature={item.featuredItem} navLabel={this.props.navLabel} />
        );
      });
    }


    return (
      <div className='MegaMenu-Features'>
        {currentFeatureItem}
      </div>
    );
  }
}

MegaMenuFeatures.defaultProps = {
  lang: 'en'
};

export default MegaMenuFeatures;
