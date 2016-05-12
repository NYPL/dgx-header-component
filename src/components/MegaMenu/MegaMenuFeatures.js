import React from 'react';
import { map as _map, isEmpty as _isEmpty } from 'underscore';
import MegaMenuFeatureItem from './MegaMenuFeatureItem.js';
import FindUsWidget from '../FindUsWidget/FindUsWidget.js';
import DonateWidget from '../DonateWidget/DonateWidget.js';
import config from '../../appConfig.js';

class MegaMenuFeatures extends React.Component {
  /**
   * Generates the DOM for the FeatureItems.
   * Optionally, returns the appropriate widget component based off navId match.
   * @param {object[]} - Array containing FeatureItem Object data.
   * @param {Object} param (optional) - Object containing widget properties.
   * @param {string} param.donateWidget (optional) - Widget property with String value.
   * @param {string} param.findWidget (optional) - Widget property with String value.
   * @returns {Object} React DOM.
   */
  renderFeatureitems(object, opts = {}) {
    if (_isEmpty(object)) {
      return null;
    }

    const {
      donateWidget = '',
      findWidget = '',
    } = opts;
    // Extract the first featured item to pass onto the widgets matching navId
    const widgetFeature = object[0].featuredItem;

    if (this.props.navId === donateWidget) {
      return (
        <DonateWidget
          key="donateWidget"
          navId={this.props.navId}
          featuredItem={widgetFeature}
          donationLinks={config.donationLinks}
          navLabel={this.props.navLabel}
        />
      );
    }

    if (this.props.navId === findWidget) {
      return (
        <FindUsWidget
          key="findUsWidget"
          navId={this.props.navId}
          featuredItem={widgetFeature}
          navLabel={this.props.navLabel}
        />
      );
    }

    return _map(object, (item, i) =>
      <MegaMenuFeatureItem
        key={i}
        feature={item.featuredItem}
        navLabel={this.props.navLabel}
      />
    );
  }

  render() {
    return (
      <div className={this.props.className}>
        {this.renderFeatureitems(
          this.props.features,
          {
            donateWidget: '1d9ea0ec-6ca3-4577-9dd1-e8de1f2a8bb1',
            findWidget: 'df621833-4dd1-4223-83e5-6ad7f98ad26a',
          }
        )}
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
