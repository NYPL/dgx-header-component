'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
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

var DotsLoader = function DotsLoader(_ref) {
  var className = _ref.className,
      dots = _ref.dots;

  var renderDots = function renderDots(amount) {
    var dotsList = [];
    for (var i = 0; i < amount; i++) {
      dotsList.push(_react2.default.createElement('li', { key: i, style: styles.dots }));
    }
    return dotsList;
  };

  return _react2.default.createElement(
    'div',
    { className: className + '-wrapper' },
    _react2.default.createElement(
      'span',
      { style: styles.text },
      'Loading'
    ),
    _react2.default.createElement(
      'ul',
      { className: className, style: styles.list },
      renderDots(dots)
    )
  );
};

DotsLoader.propTypes = {
  className: _propTypes2.default.string,
  dots: _propTypes2.default.number
};

DotsLoader.defaultProps = {
  className: 'DotsLoader',
  dots: 3
};

exports.default = DotsLoader;
module.exports = exports['default'];