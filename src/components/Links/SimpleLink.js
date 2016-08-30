import React from 'react';
import utils from '../../utils/utils.js';

class SimpleLink extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    utils.trackHeader(this.props.gaAction, this.props.gaLabel);
    this.props.onClick();
  }

  render() {
    return (
      <a
        ref={this.props.ref}
        id={this.props.id}
        className={this.props.className}
        href={this.props.target}
        onClick={this.handleOnClick}
        style={this.props.style}
      >
        {this.props.label}
      </a>
    );
  }
}

SimpleLink.propTypes = {
  id: React.PropTypes.string,
  ref: React.PropTypes.string,
  className: React.PropTypes.string,
  lang: React.PropTypes.string,
  style: React.PropTypes.object,
  target: React.PropTypes.string,
  label: React.PropTypes.string,
  onClick: React.PropTypes.func,
  gaAction: React.PropTypes.string,
  gaLabel: React.PropTypes.string,
};

SimpleLink.defaultProps = {
  className: 'simpleLink',
  label: 'Link',
  lang: 'en',
  target: '#',
  onClick() {},
};

export default SimpleLink;
