'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

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
  id: _propTypes2.default.string,
  className: _propTypes2.default.string,
  target: _propTypes2.default.string,
  label: _propTypes2.default.string,
  style: _propTypes2.default.object,
  gaLabel: _propTypes2.default.string
};

DonateButton.defaultProps = {
  label: 'Donate',
  className: 'donateButton',
  target: 'https://secure3.convio.net/nypl/site/Donation2?7825.donation=form1&df_id=7825' + '&mfc_pref=T&s_src=FRQ18ZZ_TNN'
};

exports.default = DonateButton;
module.exports = exports['default'];