import React from 'react';
import Radium from 'radium';

import gaUtils from '../../utils/gaUtils.js';

class SimpleButton extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <a
      ref='SimpleButton'
      id={this.props.id}
      className={this.props.className}
      href={this.props.target}
      onClick={this._onClick.bind(this)}
      style={[
        styles.base,
        this.props.style
      ]}>
        {this.props.label}
      </a>
    );
  }

  _onClick() {
    gaUtils._trackEvent(this.props.gaAction, this.props.gaLabel);
    this.props.onClick();
  }
};

SimpleButton.defaultProps = {
  id: 'SimpleButton',
  className: 'SimpleButton',
  label: 'Button',
  lang: 'en',
  target: '#',
  onClick() {}
};

const styles = {
  base: {

  }
};

export default Radium(SimpleButton);