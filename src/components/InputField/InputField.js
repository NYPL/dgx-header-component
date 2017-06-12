import React from 'react';
import PropTypes from 'prop-types';

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
  ariaLabel: PropTypes.string,
  type: PropTypes.string,
  lang: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  checked: PropTypes.bool,
  maxLength: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  isRequired: PropTypes.bool,
  style: PropTypes.object,
};

InputField.defaultProps = {
  type: 'text',
  lang: 'en',
  name: 'InputField',
};

export default InputField;
