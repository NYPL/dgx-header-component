import React from 'react';
// Add-on Modules to generate FindUs Widget
import FindUsFeature from './FindUsFeature.js';
import MegaMenuFeatureItem from '../MegaMenu/MegaMenuFeatureItem.js';

class FindUsWidget extends React.Component {

  constructor(props) {
    super(props);
  }
  
  render() {
    let feature = this.props.featuredItem;

    return (
      <div className={this.props.className}>
        <FindUsFeature className={this.props.className + '-FindUsFeature'} />
        <MegaMenuFeatureItem feature={feature} navLabel={this.props.navLabel} />
      </div>
    );
  }
}

FindUsWidget.defaultProps = {
  lang: 'en',
  className: 'FindUsWidget'
};

export default FindUsWidget;
