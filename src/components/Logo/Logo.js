import React from 'react';
import Radium from 'radium';

import gaUtils from '../../utils/gaUtils.js';

class Logo extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <a
      id={this.props.id}
      className={this.props.className}
      href={this.props.target}
      onClick={gaUtils._trackEvent.bind(this, 'Click Logo', '')}
      style={[
        styles.base,
        this.props.style //allows for parent-to-child css styling
      ]}>
        <img src={this.props.src} style={styles.image} />
        <span className='nypl-icon-logo-mark' style={styles.icon}></span>
      </a>
    );
  }
};

Logo.defaultProps = {
  src: '//ux-static.nypl.org/images/NYPL-logo-black-pos.svg',
  target: '//www.nypl.org',
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