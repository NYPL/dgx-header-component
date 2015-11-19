import React from 'react';
import Radium from 'radium';

class InputField extends React.Component {

  // Constructor used in ES6
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <input
      id={this.props.id}
      lang={this.props.lang}
      type={this.props.type} 
      name={this.props.name} 
      value={this.props.value}
      checked={this.props.checked}
      maxLength={this.props.maxLength}
      placeholder={this.props.placeholder}
      className={this.props.className}
      onClick={this.props.onClick}
      onChange={this.props.onChange}
      required={this.props.isRequired || false}
      style={[
        styles.base,
        this.props.style
      ]} />
    );
  }
};

InputField.defaultProps = {
  type: 'text',
  lang: 'en',
  name: 'InputField'
};

const styles = {
  base: {
  }
};

export default Radium(InputField);