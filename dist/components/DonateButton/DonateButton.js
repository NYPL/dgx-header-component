'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _underscore = require('underscore');

var _utils = require('../../utils/utils.js');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultStyles = {
  backgroundColor: '#E32B31',
  color: '#FFFFFF'
};

var DonateButton = function DonateButton(_ref) {
  var id = _ref.id,
      className = _ref.className,
      target = _ref.target,
      label = _ref.label,
      gaLabel = _ref.gaLabel,
      style = _ref.style;
  return _react2.default.createElement(
    'a',
    {
      id: id,
      className: className,
      href: target,
      onClick: function onClick() {
        return _utils2.default.trackHeader('Donate', gaLabel);
      },
      style: (0, _underscore.extend)(style, defaultStyles)
    },
    label
  );
};

DonateButton.propTypes = {
  id: _react2.default.PropTypes.string,
  className: _react2.default.PropTypes.string,
  target: _react2.default.PropTypes.string,
  label: _react2.default.PropTypes.string,
  style: _react2.default.PropTypes.object,
  gaLabel: _react2.default.PropTypes.string
};

DonateButton.defaultProps = {
  label: 'Donate',
  className: 'DonateButton',
  target: 'https://secure3.convio.net/nypl/site/SPageServer?pagename=donation_form&JServSessionIdr003=dwcz55yj27.app304a'
};

exports.default = DonateButton;
module.exports = exports['default'];