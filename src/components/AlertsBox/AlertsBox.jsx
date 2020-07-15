import React from 'react';
import PropTypes from 'prop-types';
import { map as _map } from 'underscore';

const AlertsBox = ({
  className, id, lang, style, alerts,
}) => {
  const alertItems = _map(alerts, (item, index) => {
    const alertDescription = item.attributes['alert-text'][lang];
    return (
      <div
        key={index}
        className={`${className}-item`}
        dangerouslySetInnerHTML={{ __html: alertDescription.text }}
      />
    );
  });

  return (
    <div
      className={className}
      id={id}
      style={style}
    >
      {alertItems}
    </div>
  );
};

AlertsBox.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  lang: PropTypes.string,
  style: PropTypes.object,
  alerts: PropTypes.arrayOf(PropTypes.object),
};

AlertsBox.defaultProps = {
  lang: 'en',
  className: 'alertsBox',
  id: 'alertsBox',
  style: {},
  alerts: [],
};

export default AlertsBox;
