import React from 'react';
import Radium from 'radium';

class DotsLoader extends React.Component {

  // Constructor used in ES6
  constructor(props) {
    super(props);
  }

  render () {
    let dots = [];

    for (let i = 0; i < this.props.dots; i++) {
      dots.push(
        <li key={i} style={styles.dots}></li>
      );
    }

    return (
      <div className={`${this.props.className}-Wrapper`}>
        <span style={styles.text}>Loading</span>
        <ul className={this.props.className} style={styles.list}>
          {dots}
        </ul>
      </div>
    );
  }
};

DotsLoader.defaultProps = {
  className: 'DotsLoader',
  id: 'DotsLoader',
  dots: 3
};

const styles = {
  text: {
    display: 'inline-block',
    fontFamily: 'Kievit-Book, Helvetica, arial',
    color: '#FFF',
    fontSize: '20px',
    margin: '0 5px 0 0'
  },
  list: {
    position: 'relative',
    display: 'inline-block',
    listStyle: 'none',
    verticalAlign: '-1px',
    margin: 0,
    padding: 0,
    fontSize: 0
  },
  dots: {
    margin: 0,
    height: '3px',
    width: '3px',
    borderRadius: '100%',
    border: '2px solid white',
    display: 'inline-block'
  }
};

export default Radium(DotsLoader);