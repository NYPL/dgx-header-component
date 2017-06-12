import React from 'react';
import PropTypes from 'prop-types';
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
  id: PropTypes.string,
  ref: PropTypes.string,
  className: PropTypes.string,
  lang: PropTypes.string,
  style: PropTypes.object,
  target: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
  gaAction: PropTypes.string,
  gaLabel: PropTypes.string,
};

SimpleLink.defaultProps = {
  className: 'simpleLink',
  label: 'Link',
  lang: 'en',
  target: '#',
  onClick() {},
};

export default SimpleLink;
