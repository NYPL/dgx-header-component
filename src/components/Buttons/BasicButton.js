// The button component that doesn't activate any link, only interaction and submission
// Import React libraries
import React from 'react';

class BasicButton extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <button
      ref='BasicButton'
      id={this.props.id}
      className={this.props.className}
      name={this.props.name}
      onClick={this.props.onClick}
      onMouseEnter={this.props.onMouseEnter}
      onMouseLeave={this.props.onMouseLeave}
      style={[
        styles.base,
        this.props.style
      ]}>
        {this.props.label}
      </button>
    );
  }
};

BasicButton.defaultProps = {
  id: 'BasicButton',
  className: 'BasicButton',
  name: 'BasicButton',
  label: 'Basic Button',
  lang: 'en',
  onClick() {}
};

const styles = {
  base: {
  }
};

// Export the component
export default BasicButton;