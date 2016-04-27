import React from 'react';
import Radium from 'radium';
import utils from '../../utils/utils.js';

const styles = {
  base: {
  },
};

class SimpleButton extends React.Component {
  constructor(props) {
    super(props);
    this._onClick = this._onClick.bind(this);
  }

  _onClick() {
    utils._trackHeader(this.props.gaAction, this.props.gaLabel);
    this.props.onClick();
  }

  render() {
    return (
      <a
        ref={this.props.ref}
        id={this.props.id}
        className={this.props.className}
        href={this.props.target}
        onClick={this._onClick}
        style={[styles.base, this.props.style]}
      >
        {this.props.label}
      </a>
    );
  }
}

SimpleButton.propTypes = {
  id: React.PropTypes.string,
  ref: React.PropTypes.string,
  className: React.PropTypes.string.isRequired,
  lang: React.PropTypes.string,
  style: React.PropTypes.object,
  target: React.PropTypes.string,
  label: React.PropTypes.string,
  onClick: React.PropTypes.func,
  gaAction: React.PropTypes.string,
  gaLabel: React.PropTypes.string,
};

SimpleButton.defaultProps = {
  id: 'SimpleButton',
  ref: 'SimpleButton',
  className: 'SimpleButton',
  label: 'Button',
  lang: 'en',
  target: '#',
  onClick() {},
};

export default Radium(SimpleButton);
