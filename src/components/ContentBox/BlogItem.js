import React from 'react';

import gaUtils from '../../utils/gaUtils.js';

class BlogItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let feature = this.props.feature,
      classes = this.props.classes,
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
            <p className='FeatureItem-Content-Author-Name'>{feature.author.fullName}</p>
            <span className='FeatureItem-Content-Author-Title'>{feature.author.title}</span>
          </div>
        </div>
      </a>
    );
  }
}

BlogItem.defaultProps = {
  lang: 'en',
  className: 'BlogItem'
};

export default BlogItem;
