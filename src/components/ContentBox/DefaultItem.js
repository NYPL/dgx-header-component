import React from 'react';

import gaUtils from '../../utils/gaUtils.js';

class DefaultItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let defaultFeature = {
        category: 'NYPL',
        headline: 'Find more about NYPL',
        desc: 'NYPL Rocks!',
        link: 'http://nypl.org',
        img: null
      },
      feature = this.props.feature || defaultFeature,
      classes = this.props.classes || 'without-image',
      img = feature.imgSrc ?
        <div className={'FeatureItem-Image ' + classes}>
          <img src={feature.imgSrc} />
        </div> : null;

    return (
      <a href={feature.link} className={this.props.className}
        onClick={gaUtils._trackEvent.bind(this, 'FeatureItem', `${this.props.navLabel} - ${feature.headline}`)}>
        <div className={`${this.props.className}-Wrapper`}>
          {img}
          <div className={'FeatureItem-Content ' + classes}>
            <div className='FeatureItem-Content-Tag'>{feature.category}</div>
            <h3 className='FeatureItem-Content-Title'>{feature.headline}</h3>
            <div className='FeatureItem-Content-Desc'>{feature.description}</div>
          </div>
        </div>
      </a>
    );
  }
}

DefaultItem.defaultProps = {
  lang: 'en',
  className: 'FeatureItem'
};

export default DefaultItem;
