import React from 'react';
import Radium from 'radium';

import utils from '../../utils/utils.js';

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
};

Logo.defaultProps = {
  src: '//ux-static.nypl.org/images/NYPL-logo-black-pos.svg',
  target: '/',
  id: 'Logo',
  className: 'Logo'
};

const styles = {
  base: {

  },
  image: {
    maxWidth: '230px'
  },
  icon: {
    display: 'none'
  }
};

export default Radium(Logo);
