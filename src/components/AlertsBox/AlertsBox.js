import React from 'react';
import Radium from 'radium';
import _ from 'underscore';

class AlertsBox extends React.Component {

  constructor(props) {
    super(props);
  }
  
  render() {

    let alerts = this.props.alerts,
      alertItems = _.map(alerts, (item, index) => {
        let alertDescription = item.attributes['alert-text'][this.props.lang];

        return (
          <div 
            key={index} 
            className={`${this.props.className}-Item`} 
            dangerouslySetInnerHTML={{__html: alertDescription.text}} />
        );
      });

    return (
      <div 
        className={this.props.className} 
        id={this.props.id} style={[
        styles.base,
        this.props.style
      ]}>
        {alertItems}
      </div>
    );
  }
}

AlertsBox.defaultProps = {
  lang: 'en',
  className: 'AlertsBox',
  id: 'AlertsBox'
};

const styles = {
  base: {

  }
}

export default Radium(AlertsBox);
