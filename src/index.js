import React from 'react';

class nyplComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={this.props.className} id={this.props.id}>
        Hello World!
      </div>
    );
  }
};

nyplComponent.defaultProps = {
  id: 'nyplComponent',
  className: 'nyplComponent',
  lang: 'en'
};

export default nyplComponent;
