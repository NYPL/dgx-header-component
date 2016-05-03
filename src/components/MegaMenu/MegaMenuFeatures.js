import React from 'react';
import { map as _map, isEmpty as _isEmpty } from 'underscore';
import MegaMenuFeatureItem from './MegaMenuFeatureItem.js';
import FindUsWidget from '../FindUsWidget/FindUsWidget.js';
import DonateWidget from '../DonateWidget/DonateWidget.js';
import config from '../../appConfig.js';
// FeatureFlags Module
import FeatureFlags from 'dgx-feature-flags';

class MegaMenuFeatures extends React.Component {
  constructor(props) {
    super(props);
    this.state = { featureFlags: FeatureFlags.store.getState() };
  }

  componentDidMount() {
    FeatureFlags.store.listen(this._onChange.bind(this));
  }

  componentWillUnmount() {
    FeatureFlags.store.unlisten(this._onChange.bind(this));
  }

  _onChange() {
    this.setState({ featureFlags: FeatureFlags.store.getState() });
  }

  _renderFeatureitems(object, opts = {}) {
    if (_isEmpty(object)) {
      return null;
    }

    const {
      donateWidget = false,
      findWidget = false,
    } = opts;
    // Extract the first featured item to pass onto the widgets matching navId
    const widgetFeature = object[0].featuredItem;

    if (this.props.navId === '1d9ea0ec-6ca3-4577-9dd1-e8de1f2a8bb1' && donateWidget) {
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

    if (this.props.navId === 'df621833-4dd1-4223-83e5-6ad7f98ad26a' && findWidget) {
      return (
        <FindUsWidget
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
    if (FeatureFlags.store._isFeatureActive('location-top-link')) {
      return (
        <div className={this.props.className}>
          {this._renderFeatureitems(this.props.features, { donateWidget: true, findWidget: true })}
        </div>
      );
    }

    return (
      <div className={this.props.className}>
        {this._renderFeatureitems(this.props.features, { donateWidget: true })}
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
