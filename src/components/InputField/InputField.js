import React from 'react';

const InputField = ({
  id,
  className,
  lang,
  type,
  name,
  value,
  checked,
  maxLength,
  placeholder,
  onClick,
  onChange,
  isRequired,
  style,
  ariaLabel,
}) => (
  <input
    id={id}
    className={className}
    lang={lang}
    type={type}
    name={name}
    value={value}
    checked={checked}
    maxLength={maxLength}
    placeholder={placeholder}
    onClick={onClick}
    onChange={onChange}
    required={isRequired}
    aria-required={isRequired}
    aria-label={ariaLabel}
    style={style}
  />
);

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
  type: 'text',
  lang: 'en',
  name: 'InputField',
};

export default InputField;
