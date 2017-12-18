import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  text: {
    display: 'inline-block',
    fontFamily: 'Kievit-Book, Helvetica, arial',
    color: '#FFF',
    fontSize: '20px',
    margin: '0 5px 0 0',
  },
  list: {
    position: 'relative',
    display: 'inline-block',
    listStyle: 'none',
    verticalAlign: '-1px',
    margin: 0,
    padding: 0,
    fontSize: 0,
  },
  dots: {
    margin: 0,
    height: '3px',
    width: '3px',
    borderRadius: '100%',
    border: '2px solid white',
    display: 'inline-block',
  },
};

const DotsLoader = ({ className, dots }) => {
  const renderDots = (amount) => {
    const dotsList = [];
    for (let i = 0; i < amount; i++) {
      dotsList.push(
        <li key={i} style={styles.dots}></li>
      );
    }
    return dotsList;
  };

  return (
    <div className={`${className}-wrapper`}>
      <span style={styles.text}>Loading</span>
      <ul className={className} style={styles.list}>
        {renderDots(dots)}
      </ul>
    </div>
  );
};

DotsLoader.propTypes = {
  className: PropTypes.string,
  dots: PropTypes.number,
};

DotsLoader.defaultProps = {
  className: 'DotsLoader',
  dots: 3,
};

export default DotsLoader;
