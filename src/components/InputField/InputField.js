import React from 'react';
import Radium from 'radium';

const styles = {
  base: {
  },
};

class InputField extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <input
        aria-label={this.props.ariaLabel}
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
        style={[styles.base, this.props.style]}
      />
    );
  }
}

InputField.propTypes = {
  ariaLabel: React.PropTypes.string,
  type: React.PropTypes.string,
  lang: React.PropTypes.string,
  id: React.PropTypes.string,
  name: React.PropTypes.string,
  value: React.PropTypes.string,
  checked: React.PropTypes.bool,
  maxLength: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  className: React.PropTypes.string,
  onClick: React.PropTypes.func,
  onChange: React.PropTypes.func,
  required: React.PropTypes.bool,
  isRequired: React.PropTypes.bool,
  style: React.PropTypes.object,
};

InputField.defaultProps = {
  ariaLabel: '',
  type: 'text',
  lang: 'en',
  name: 'InputField',
};

export default Radium(InputField);
