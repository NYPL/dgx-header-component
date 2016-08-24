'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var DotsLoader = function (_React$Component) {
  _inherits(DotsLoader, _React$Component);

  function DotsLoader(props) {
    _classCallCheck(this, DotsLoader);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(DotsLoader).call(this, props));
  }

  _createClass(DotsLoader, [{
    key: 'render',
    value: function render() {
      var dots = [];

      for (var i = 0; i < this.props.dots; i++) {
        dots.push(_react2.default.createElement('li', { key: i, style: styles.dots }));
      }

      return _react2.default.createElement(
        'div',
        { className: this.props.className + '-Wrapper' },
        _react2.default.createElement(
          'span',
          { style: styles.text },
          'Loading'
        ),
        _react2.default.createElement(
          'ul',
          { className: this.props.className, style: styles.list },
          dots
        )
      );
    }
  }]);

  return DotsLoader;
}(_react2.default.Component);

DotsLoader.propTypes = {
  className: _react2.default.PropTypes.string,
  id: _react2.default.PropTypes.string,
  dots: _react2.default.PropTypes.number
};

DotsLoader.defaultProps = {
  className: 'DotsLoader',
  id: 'DotsLoader',
  dots: 3
};

exports.default = (0, _radium2.default)(DotsLoader);
module.exports = exports['default'];