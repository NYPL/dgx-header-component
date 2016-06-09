import React from 'react';
import utils from '../../utils/utils.js';

class DefaultItem extends React.Component {
  constructor(props) {
    super(props);
    this._trackHeader = utils._trackHeader.bind(this);
    this.extraFeatureDetails = this.extraFeatureDetails.bind(this);
    this.personField = this.personField.bind(this);
    this.imageElem = this.imageElem.bind(this);
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

  render() {
    if (!this.props.feature) {
      return null;
    }

    const feature = this.props.feature;
    const classes = this.props.classes || 'without-image';
    const image = this.imageElem(feature.image, classes);
    const person = this.personField(feature.person);

    return (
      <a
        href={feature.link}
        className={this.props.className}
        onClick={utils._trackHeader
          .bind(this, 'FeatureItem', `${this.props.navLabel} - ${feature.title}`)}
      >
        <div className={`${this.props.className}-Wrapper`}>
          {image}
          <div className={`FeatureItem-Content ${classes}`}>
            <div className="FeatureItem-Content-Tag">{feature.category}</div>
            <h3 className="FeatureItem-Content-Title">{feature.title}</h3>
            {this.extraFeatureDetails(feature.description, 'FeatureItem-Content-Desc')}
            {this.extraFeatureDetails(feature.date, 'FeatureItem-Content-date')}
            {this.extraFeatureDetails(feature.location, 'FeatureItem-Content-location')}
            {this.extraFeatureDetails(person, 'FeatureItem-Content-person')}
          </div>
        </div>
      </a>
    );
  }
}

DefaultItem.propTypes = {
  className: React.PropTypes.string,
  lang: React.PropTypes.string,
  classes: React.PropTypes.string,
  feature: React.PropTypes.object,
  navLabel: React.PropTypes.string,
};

DefaultItem.defaultProps = {
  lang: 'en',
  className: 'FeatureItem',
};

export default DefaultItem;
