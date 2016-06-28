import React from 'react';

class BasicButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button
        ref={this.props.ref}
        id={this.props.id}
        className={this.props.className}
        name={this.props.name}
        onClick={this.props.onClick}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
        style={this.props.style}
      >
        {this.props.label}
      </button>
    );
  }
}

BasicButton.propTypes = {
  ref: React.PropTypes.string,
  id: React.PropTypes.string,
  className: React.PropTypes.string,
  name: React.PropTypes.string,
  label: React.PropTypes.object,
  lang: React.PropTypes.string,
  onClick: React.PropTypes.func,
  onMouseEnter: React.PropTypes.func,
  onMouseLeave: React.PropTypes.func,
  style: React.PropTypes.object,
};

BasicButton.defaultProps = {
  ref: 'BasicButton',
  id: 'BasicButton',
  className: 'BasicButton',
  name: 'BasicButton',
  lang: 'en',
  onClick() {},
};

export default BasicButton;
