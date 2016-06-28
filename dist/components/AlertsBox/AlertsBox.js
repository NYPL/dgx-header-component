'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _underscore = require('underscore');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  base: {}
};

var AlertsBox = function (_React$Component) {
  _inherits(AlertsBox, _React$Component);

  function AlertsBox(props) {
    _classCallCheck(this, AlertsBox);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(AlertsBox).call(this, props));
  }

  _createClass(AlertsBox, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var alerts = this.props.alerts;
      var alertItems = (0, _underscore.map)(alerts, function (item, index) {
        var alertDescription = item.attributes['alert-text'][_this2.props.lang];

        return _react2.default.createElement('div', {
          key: index,
          className: _this2.props.className + '-Item',
          dangerouslySetInnerHTML: { __html: alertDescription.text }
        });
      });

      return _react2.default.createElement(
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
}(_react2.default.Component);

AlertsBox.propTypes = {
  id: _react2.default.PropTypes.string,
  className: _react2.default.PropTypes.string.isRequired,
  lang: _react2.default.PropTypes.string,
  style: _react2.default.PropTypes.object,
  alerts: _react2.default.PropTypes.array
};

AlertsBox.defaultProps = {
  lang: 'en',
  className: 'AlertsBox',
  id: 'AlertsBox'
};

exports.default = (0, _radium2.default)(AlertsBox);