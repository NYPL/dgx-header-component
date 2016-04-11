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

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var styles = {
  base: {}
};

var AlertsBox = (function (_React$Component) {
  _inherits(AlertsBox, _React$Component);

  function AlertsBox(props) {
    _classCallCheck(this, AlertsBox);

    _get(Object.getPrototypeOf(AlertsBox.prototype), 'constructor', this).call(this, props);
  }

  _createClass(AlertsBox, [{
    key: 'render',
    value: function render() {
      var _this = this;

      var alerts = this.props.alerts;
      var alertItems = _underscore2['default'].map(alerts, function (item, index) {
        var alertDescription = item.attributes['alert-text'][_this.props.lang];

        return _react2['default'].createElement('div', {
          key: index,
          className: _this.props.className + '-Item',
          dangerouslySetInnerHTML: { __html: alertDescription.text }
        });
      });

      return _react2['default'].createElement(
        'div',
        {
          className: this.props.className,
          id: this.props.id,
          style: [styles.base, this.props.style]
        },
        alertItems
      );
    }
  }]);

  return AlertsBox;
})(_react2['default'].Component);

AlertsBox.propTypes = {
  id: _react2['default'].PropTypes.string,
  className: _react2['default'].PropTypes.string.isRequired,
  lang: _react2['default'].PropTypes.string,
  style: _react2['default'].PropTypes.object,
  alerts: _react2['default'].PropTypes.object
};

AlertsBox.defaultProps = {
  lang: 'en',
  className: 'AlertsBox',
  id: 'AlertsBox'
};

exports['default'] = (0, _radium2['default'])(AlertsBox);
module.exports = exports['default'];