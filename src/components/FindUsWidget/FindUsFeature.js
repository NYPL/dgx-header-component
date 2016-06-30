import React from 'react';

const iconStyles = {
  fontSize: '25px',
  verticalAlign: 'middle',
  marginLeft: '5px',
};

const FindUsFeature = ({ className, urlType }) => {
  const url = (urlType === 'absolute') ? '//www.nypl.org/locations' : '/locations';
  return (
    <div className={className}>
      <div className={`${className}-Wrapper`}>
        <div className={`${className}-Tag`}>
          Locations
        </div>
        <h2 className={`${className}-Title`}>
          Explore NYPL&apos;s 92 locations in the Bronx, Manhattan, and Staten Island.
        </h2>
        <a
          href={url}
          className={`${className}-Link`}
        >
          FIND A LOCATION
          <span style={iconStyles} className="nypl-icon-wedge-right icon"></span>
        </a>
      </div>
    </div>
  );
};

FindUsFeature.propTypes = {
  className: React.PropTypes.string,
  urlType: React.PropTypes.string,
};

FindUsFeature.defaultProps = {
  className: 'FindUsFeature',
};

export default FindUsFeature;
