import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { ContentModel } from 'dgx-model-data';
import DefaultItem from '../ContentBox/DefaultItem.js';

class MegaMenuFeatureItem extends React.Component {
  render() {
    const feature = this.props.feature;
    const classes = cx({
      'with-image': feature && feature.images,
      'without-image': !feature || !feature.images,
    });
    const contentObj = ContentModel.featureItem(feature, this.props.lang);
    const featuredItem = (
      <DefaultItem
        feature={contentObj}
        className={this.props.className}
        classes={classes}
        navLabel={this.props.navLabel}
      />
    );

    return featuredItem;
  }
}

MegaMenuFeatureItem.propTypes = {
  lang: PropTypes.string,
  className: PropTypes.string,
  feature: PropTypes.object,
  navLabel: PropTypes.string,
};

MegaMenuFeatureItem.defaultProps = {
  lang: 'en',
  className: 'MegaMenu-FeatureItem',
};

export default MegaMenuFeatureItem;
