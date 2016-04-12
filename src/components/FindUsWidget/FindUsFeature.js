import React from 'react';

const styles = {
  base: {},
  icon: {
    fontSize: '25px',
    verticalAlign: 'middle',
    marginLeft: '5px',
  },
};

class FindUsFeature extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const locinator = '//www.nypl.org/locations';

    return (
      <div className={this.props.className}>
        <div className={`${this.props.className}-Wrapper`}>
          <div className={`${this.props.className}-Tag`}>
            Locations
          </div>
          <h2 className={`${this.props.className}-Title`}>
            Explore NYPL&apos;s 92 locations in the Bronx, Manhattan, and Staten Island.
          </h2>
          <a
            style={styles.base}
            href={locinator}
            className={`${this.props.className}-Link`}
          >
            FIND A LOCATION
            <span style={styles.icon} className="nypl-icon-wedge-right icon"></span>
          </a>
        </div>
      </div>
    );
  }
}

FindUsFeature.propTypes = {
  lang: React.PropTypes.string,
  className: React.PropTypes.string,
};

FindUsFeature.defaultProps = {
  lang: 'en',
  className: 'FindUsFeature',
};

export default FindUsFeature;
