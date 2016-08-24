'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _underscore = require('underscore');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AlertsBox = function AlertsBox(_ref) {
  var className = _ref.className;
  var id = _ref.id;
  var lang = _ref.lang;
  var style = _ref.style;
  var alerts = _ref.alerts;

  var alertItems = (0, _underscore.map)(alerts, function (item, index) {
    var alertDescription = item.attributes['alert-text'][lang];
    return _react2.default.createElement('div', {
      key: index,
      className: className + '-Item',
      dangerouslySetInnerHTML: { __html: alertDescription.text }
    });
  });

  return _react2.default.createElement(
    'div',
    {
      className: className,
      id: id,
      style: style
    },
    alertItems
  );
};

AlertsBox.propTypes = {
  id: _react2.default.PropTypes.string,
  className: _react2.default.PropTypes.string,
  lang: _react2.default.PropTypes.string,
  style: _react2.default.PropTypes.object,
  alerts: _react2.default.PropTypes.array
};

AlertsBox.defaultProps = {
  lang: 'en',
  className: 'AlertsBox',
  id: 'AlertsBox'
};

exports.default = AlertsBox;
module.exports = exports['default'];