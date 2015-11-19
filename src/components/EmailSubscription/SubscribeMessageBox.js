import React from 'react';

class SubscribeMessageBox extends React.Component {
  // Constructor used in ES6
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div className={this.props.className + ' ' + this.props.status}>
        <div className={this.props.className + '-Eyebrow'}></div>
        <div className={this.props.className + '-Title'}>{this.props.msg}</div>
      </div>
    );
  }
}

SubscribeMessageBox.defaultProps = {
  msg: 'Thank you for subscribing to our email updates.',
  className: 'SubscribeMessageBox'
};

export default SubscribeMessageBox;
