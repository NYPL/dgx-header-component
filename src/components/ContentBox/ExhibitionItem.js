import React from 'react';

import moment from 'moment';

import utils from '../../utils/utils.js';

class ExhibitionItem extends React.Component {
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
      endDate = moment(feature.eventDates.end),
      exhibitionDate = utils.formatDate(startDate, endDate);

    return (
      <a href={feature.link} className={this.props.className}
        onClick={utils._trackHeader.bind(this, 'FeatureItem', `${this.props.navLabel} - ${feature.headline}`)}>
        <div className={`${this.props.className}-Wrapper`}>
          {img}
          <div className={'FeatureItem-Content ' + classes}>
            <div className='FeatureItem-Content-Tag'>{feature.category}</div>
            <h3 className='FeatureItem-Content-Title'>{feature.headline}</h3>
            <div>
              <p className='FeatureItem-Content-Date'>{exhibitionDate}</p>
              <span>{feature.location.fullName}</span>
            </div>
          </div>
        </div>
      </a>
    );
  }
}

ExhibitionItem.defaultProps = {
  lang: 'en',
  className: 'ExhibitionItem'
};

export default ExhibitionItem;
