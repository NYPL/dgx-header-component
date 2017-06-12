import React from 'react';
import PropTypes from 'prop-types';
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
      donateWidgetUpcoming = '',
      findWidget = '',
    } = opts;
    // Extract the first featured item to pass onto the widgets matching navId
    const widgetFeature = object[0].featuredItem;

    if (this.props.navId === donateWidget ||
      this.props.navId === donateWidgetUpcoming) {
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
          urlType={this.props.urlType}
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
            donateWidget: 'ca83f064-e0be-4c05-8df3-9fa3b5dd6009',
            donateWidgetUpcoming: '793f73d4-0ed8-458e-87de-896bee17043c',
            findWidget: '1b4916f4-6723-44f0-bfae-112441527c4d',
          }
        )}
      </div>
    );
  }
}

MegaMenuFeatures.propTypes = {
  lang: PropTypes.string,
  className: PropTypes.string,
  features: PropTypes.array,
  navId: PropTypes.string,
  navLabel: PropTypes.string,
};

MegaMenuFeatures.defaultProps = {
  lang: 'en',
  className: 'MegaMenu-Features',
};

export default MegaMenuFeatures;
