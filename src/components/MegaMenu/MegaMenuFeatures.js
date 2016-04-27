import React from 'react';
import { map as _map } from 'underscore';
import MegaMenuFeatureItem from './MegaMenuFeatureItem.js';
import DonateWidget from '../DonateWidget/DonateWidget.js';
import config from '../../appConfig.js';

class MegaMenuFeatures extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let currentFeatureItem;
    // The specific header items for Give only have one feature.
    const widgetFeature = this.props.features[0].featuredItem;

    // Donate Widget
    if (this.props.navId === '1d9ea0ec-6ca3-4577-9dd1-e8de1f2a8bb1') {
      currentFeatureItem = (
        <DonateWidget
          navId={this.props.navId}
          featuredItem={widgetFeature}
          donationLinks={config.donationLinks}
          navLabel={this.props.navLabel}
        />
      );
    } else {
      currentFeatureItem = _map(this.props.features, (item, i) =>
        <MegaMenuFeatureItem
          key={i}
          feature={item.featuredItem}
          navLabel={this.props.navLabel}
        />
      );
    }

    return (
      <div className={this.props.className}>
        {currentFeatureItem}
      </div>
    );
  }
}

MegaMenuFeatures.propTypes = {
  lang: React.PropTypes.string,
  className: React.PropTypes.string,
  features: React.PropTypes.array,
  navId: React.PropTypes.string,
  navLabel: React.PropTypes.string,
};

MegaMenuFeatures.defaultProps = {
  lang: 'en',
  className: 'MegaMenu-Features',
};

export default MegaMenuFeatures;
