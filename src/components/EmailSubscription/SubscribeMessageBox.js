import React from 'react';

class SubscribeMessageBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={`${this.props.className} ${this.props.status}`}>
        <div className={`${this.props.className}-Eyebrow`}></div>
        <div className={`${this.props.className}-Title`}>
          {this.props.msg}
        </div>
      </div>
    );
  }
}

SubscribeMessageBox.propTypes = {
  msg: React.PropTypes.string,
  className: React.PropTypes.string,
  status: React.PropTypes.string,
};

SubscribeMessageBox.defaultProps = {
  msg: 'Thank you for subscribing to our email updates.',
  className: 'SubscribeMessageBox',
};

export default SubscribeMessageBox;
