'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _underscore = require('underscore');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AlertsBox = function AlertsBox(_ref) {
  var className = _ref.className,
      id = _ref.id,
      lang = _ref.lang,
      style = _ref.style,
      alerts = _ref.alerts;

  var alertItems = (0, _underscore.map)(alerts, function (item, index) {
    var alertDescription = item.attributes['alert-text'][lang];
    return _react2.default.createElement('div', {
      key: index,
      className: className + '-item',
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
  id: _propTypes2.default.string,
  className: _propTypes2.default.string,
  lang: _propTypes2.default.string,
  style: _propTypes2.default.object,
  alerts: _propTypes2.default.array
};

AlertsBox.defaultProps = {
  lang: 'en',
  className: 'alertsBox',
  id: 'alertsBox'
};

exports.default = AlertsBox;
module.exports = exports['default'];