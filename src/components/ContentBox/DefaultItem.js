import React from 'react';
import PropTypes from 'prop-types';
import utils from '../../utils/utils.js';

class DefaultItem extends React.Component {
  constructor(props) {
    super(props);
    this.trackHeader = utils.trackHeader.bind(this);
    this.extraFeatureDetails = this.extraFeatureDetails.bind(this);
    this.personField = this.personField.bind(this);
    this.imageElem = this.imageElem.bind(this);
    this.featureDetails = this.featureDetails.bind(this);
  }

  extraFeatureDetails(data, className) {
    return data ? (<div className={className}>{data}</div>) : null;
  }

  personField(person) {
    let personStr = `${person.firstName} ${person.lastName}`;
    personStr += (personStr && person.title) ? `, ${person.title}` : '';

    return personStr;
  }

  imageElem(image, classes) {
    return image ?
      (<div className={`FeatureItem-Image ${classes}`}>
        <img src={image.uri} alt="" />
      </div>) : null;
  }

  featureDetails(feature) {
    const person = this.personField(feature.person);
    const {
      date,
      location,
      description,
    } = feature;

    if (description) {
      return this.extraFeatureDetails(description, 'FeatureItem-Content-Desc');
    }

    return (
      <div>
        {this.extraFeatureDetails(date, 'FeatureItem-Content-date')}
        {this.extraFeatureDetails(person, 'FeatureItem-Content-person')}
        {this.extraFeatureDetails(location, 'FeatureItem-Content-location')}
      </div>
    );
  }

  render() {
    if (!this.props.feature) {
      return null;
    }

    const feature = this.props.feature;
    const classes = this.props.classes || 'without-image';
    const image = this.imageElem(feature.image, classes);
    const featureDetails = this.featureDetails(feature);

    return (
      <a
        href={feature.link}
        className={this.props.className}
        onClick={utils.trackHeader
          .bind(this, 'FeatureItem', `${this.props.navLabel} - ${feature.title}`)}
      >
        <div className={`${this.props.className}-Wrapper`}>
          {image}
          <div className={`FeatureItem-Content ${classes}`}>
            <div className="FeatureItem-Content-Tag">{feature.category}</div>
            <h3 className="FeatureItem-Content-Title">{feature.title}</h3>
            {featureDetails}
          </div>
        </div>
      </a>
    );
  }
}

DefaultItem.propTypes = {
  className: PropTypes.string,
  lang: PropTypes.string,
  classes: PropTypes.string,
  feature: PropTypes.object,
  navLabel: PropTypes.string,
};

DefaultItem.defaultProps = {
  lang: 'en',
  className: 'FeatureItem',
};

export default DefaultItem;
