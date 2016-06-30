import React from 'react';
import { map as _map } from 'underscore';

const AlertsBox = ({ className, id, lang, style, alerts }) => {
  const alertItems = _map(alerts, (item, index) => {
    const alertDescription = item.attributes['alert-text'][lang];
    return (
      <div
        key={index}
        className={`${className}-Item`}
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
  id: React.PropTypes.string,
  className: React.PropTypes.string,
  lang: React.PropTypes.string,
  style: React.PropTypes.object,
  alerts: React.PropTypes.array,
};

AlertsBox.defaultProps = {
  lang: 'en',
  className: 'AlertsBox',
  id: 'AlertsBox',
};

export default AlertsBox;
