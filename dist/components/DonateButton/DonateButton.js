'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _underscore = require('underscore');

var _utilsUtilsJs = require('../../utils/utils.js');

var _utilsUtilsJs2 = _interopRequireDefault(_utilsUtilsJs);

var defaultStyles = {
  backgroundColor: '#E43534',
  color: '#FFFFFF'
};

var DonateButton = function DonateButton(_ref) {
  var id = _ref.id;
  var className = _ref.className;
  var target = _ref.target;
  var label = _ref.label;
  var gaLabel = _ref.gaLabel;
  var style = _ref.style;
  return _react2['default'].createElement(
    'a',
    {
      id: id,
      className: className,
      href: target,
      onClick: function () {
        return _utilsUtilsJs2['default']._trackHeader('Donate', gaLabel);
      },
      style: (0, _underscore.extend)(style, defaultStyles)
    },
    label
  );
};

DonateButton.propTypes = {
  id: _react2['default'].PropTypes.string,
  className: _react2['default'].PropTypes.string,
  target: _react2['default'].PropTypes.string,
  label: _react2['default'].PropTypes.string,
  style: _react2['default'].PropTypes.object,
  gaLabel: _react2['default'].PropTypes.string
};

DonateButton.defaultProps = {
  label: 'Donate',
  className: 'DonateButton',
  target: 'https://secure3.convio.net/nypl/site/SPageServer?pagename=donation_form&JServSessionIdr003=dwcz55yj27.app304a&s_src=FRQ14ZZ_SWBN'
};

exports['default'] = DonateButton;
module.exports = exports['default'];