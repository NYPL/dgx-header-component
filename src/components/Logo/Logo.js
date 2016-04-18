import React from 'react';
import Radium from 'radium';
import utils from '../../utils/utils.js';

const styles = {
  base: {
  },
  image: {
    maxWidth: '230px',
  },
  icon: {
    display: 'none',
  },
};

class Logo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <a
        id={this.props.id}
        className={this.props.className}
        href={this.props.target}
        onClick={utils._trackHeader.bind(this, 'Click Logo', '')}
        style={[styles.base, this.props.style]}
      >
        <img src={this.props.src} style={styles.image} />
        <span className="nypl-icon-logo-mark" style={styles.icon}></span>
      </a>
    );
  }
}
Logo.propTypes = {
  src: React.PropTypes.string,
  target: React.PropTypes.string,
  id: React.PropTypes.string,
  className: React.PropTypes.string,
  style: React.PropTypes.object,
};

Logo.defaultProps = {
  src: '//ux-static.nypl.org/images/NYPL-logo-black-pos.svg',
  target: '//www.nypl.org',
  id: 'Logo',
  className: 'Logo',
};

export default Radium(Logo);
