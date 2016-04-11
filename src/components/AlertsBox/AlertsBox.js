import React from 'react';
import Radium from 'radium';
import _ from 'underscore';

const styles = {
  base: {
  },
};

class AlertsBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const alerts = this.props.alerts;
    const alertItems = _.map(alerts, (item, index) => {
      const alertDescription = item.attributes['alert-text'][this.props.lang];

      return (
        <div
          key={index}
          className={`${this.props.className}-Item`}
          dangerouslySetInnerHTML={{ __html: alertDescription.text }}
        />
      );
    });

    return (
      <div
        className={this.props.className}
        id={this.props.id}
        style={[styles.base, this.props.style]}
      >
        {alertItems}
      </div>
    );
  }
}

AlertsBox.propTypes = {
  id: React.PropTypes.string,
  className: React.PropTypes.string.isRequired,
  lang: React.PropTypes.string,
  style: React.PropTypes.object,
  alerts: React.PropTypes.object,
};

AlertsBox.defaultProps = {
  lang: 'en',
  className: 'AlertsBox',
  id: 'AlertsBox',
};

export default Radium(AlertsBox);
