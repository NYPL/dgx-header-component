import React from 'react';
import cx from 'classnames';
import BlogItem from '../ContentBox/BlogItem.js';
import DefaultItem from '../ContentBox/DefaultItem.js';
import EventProgramItem from '../ContentBox/EventProgramItem.js';
import ExhibitionItem from '../ContentBox/ExhibitionItem.js';

import ContentModel from '../../utils/ContentModel.js';

class MegaMenuFeatureItem extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);
  }
  
	render() {
    // There should always be a featured item, but just in case:
    if (!this.props.feature) {
      return <DefaultItem className={this.props.className} />;
    }

    let feature = this.props.feature,
			classes = cx({
        'with-image': feature && feature.images,
        'without-image': !feature || !feature.images
      }),
      contentObj = ContentModel.featureItem(feature, this.props.lang),
      featuredItem = <DefaultItem feature={contentObj}
        className={this.props.className}
        classes={classes}
        navLabel={this.props.navLabel} />;

    if (contentObj.content && contentObj.content.type) {
      switch (contentObj.content.type) {
        // case 'blog':
        // console.log(contentObj);
        //   featuredItem = <BlogItem feature={contentObj}
        //     className={this.props.className} classes={classes} navLabel={this.props.navLabel} />;
        //   break;
        case 'event-program':
          featuredItem = <EventProgramItem feature={contentObj}
            className={this.props.className} classes={classes} navLabel={this.props.navLabel} />;
          break;
        case 'event-exhibition':
          featuredItem = <ExhibitionItem feature={contentObj}
            className={this.props.className} classes={classes} navLabel={this.props.navLabel} />;
          break;
        default:
          break;
      }
    }

		return featuredItem;
	}
}

MegaMenuFeatureItem.defaultProps = {
	lang: 'en',
	className: 'MegaMenu-FeatureItem'
};

export default MegaMenuFeatureItem;
