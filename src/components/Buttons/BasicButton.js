import React from 'react';

const BasicButton = ({
  id,
  className,
  name,
  onClick,
  onMouseEnter,
  onMouseLeave,
  style,
  label,
}) => (
  <button
    id={id}
    className={className}
    name={name}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    style={style}
  >
    {label}
  </button>
);

BasicButton.propTypes = {
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
  className: 'BasicButton',
  name: 'BasicButton',
  lang: 'en',
};

export default BasicButton;
