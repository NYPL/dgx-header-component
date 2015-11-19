import React from 'react';
import moment from 'moment';

import gaUtils from '../../utils/gaUtils.js';

class EventProgramItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let feature = this.props.feature,
      classes = this.props.classes,
      img = feature.imgSrc ?
        <div className={'FeatureItem-Image ' + classes}>
          <img src={feature.imgSrc} />
        </div> : null,
      startDate = moment(feature.eventDates.start),
      endDate = moment(feature.eventDates.end);

    return (
      <a href={feature.link} className={this.props.className}
        onClick={gaUtils._trackEvent.bind(this, 'FeatureItem', `${this.props.navLabel} - ${feature.headline}`)}>
        <div className={`${this.props.className}-Wrapper`}>
          {img}
          <div className={'FeatureItem-Content ' + classes}>
            <div className='FeatureItem-Content-Tag'>{feature.category}</div>
            <h3 className='FeatureItem-Content-Title'>{feature.headline}</h3>
            <div>
              <p className='FeatureItem-Content-Date'>{startDate.format('hA | ddd, MMMM Do')}</p>
              <span>{feature.location.fullName}</span>
            </div>
          </div>
        </div>
      </a>
    );
  }
}

EventProgramItem.defaultProps = {
  lang: 'en',
  className: 'EventProgramItem'
};

export default EventProgramItem;
