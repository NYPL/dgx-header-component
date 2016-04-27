'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var styles = {
  base: {},
  icon: {
    fontSize: '25px',
    verticalAlign: 'middle',
    marginLeft: '5px'
  }
};

var FindUsFeature = (function (_React$Component) {
  _inherits(FindUsFeature, _React$Component);

  function FindUsFeature(props) {
    _classCallCheck(this, FindUsFeature);

    _get(Object.getPrototypeOf(FindUsFeature.prototype), 'constructor', this).call(this, props);
  }

  _createClass(FindUsFeature, [{
    key: 'render',
    value: function render() {
      var locinator = this.props.urlType === 'absolute' ? '//www.nypl.org/locations' : '/locations';

      return _react2['default'].createElement(
        'div',
        { className: this.props.className },
        _react2['default'].createElement(
          'div',
          { className: this.props.className + '-Wrapper' },
          _react2['default'].createElement(
            'div',
            { className: this.props.className + '-Tag' },
            'Locations'
          ),
          _react2['default'].createElement(
            'h2',
            { className: this.props.className + '-Title' },
            'Explore NYPL\'s 92 locations in the Bronx, Manhattan, and Staten Island.'
          ),
          _react2['default'].createElement(
            'a',
            {
              style: styles.base,
              href: locinator,
              className: this.props.className + '-Link'
            },
            'FIND A LOCATION',
            _react2['default'].createElement('span', { style: styles.icon, className: 'nypl-icon-wedge-right icon' })
          )
        )
      );
    }
  }]);

  return FindUsFeature;
})(_react2['default'].Component);

FindUsFeature.propTypes = {
  lang: _react2['default'].PropTypes.string,
  className: _react2['default'].PropTypes.string,
  urlType: _react2['default'].PropTypes.string
};

FindUsFeature.defaultProps = {
  lang: 'en',
  className: 'FindUsFeature'
};

exports['default'] = FindUsFeature;
module.exports = exports['default'];