import React from 'react';
import FindUsFeature from './FindUsFeature.js';
import MegaMenuFeatureItem from '../MegaMenu/MegaMenuFeatureItem.js';

class FindUsWidget extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const feature = this.props.featuredItem;

    return (
      <div className={this.props.className}>
        <FindUsFeature
          urlType={this.props.urlType}
          className={`${this.props.className}-FindUsFeature`}
        />
        <MegaMenuFeatureItem
          feature={feature}
          navLabel={this.props.navLabel}
        />
      </div>
    );
  }
}

FindUsWidget.propTypes = {
  lang: React.PropTypes.string,
  className: React.PropTypes.string,
  featuredItem: React.PropTypes.object,
  navLabel: React.PropTypes.string,
  urlType: React.PropTypes.string,
};

FindUsWidget.defaultProps = {
  lang: 'en',
  className: 'FindUsWidget',
};

export default FindUsWidget;
