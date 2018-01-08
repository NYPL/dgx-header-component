'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _dgxSvgIcons = require('@nypl/dgx-svg-icons');

var _utils = require('../../utils/utils.js');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Logo = function Logo(props) {
  return _react2.default.createElement(
    'a',
    {
      id: props.id,
      className: props.className,
      href: props.target,
      onClick: function onClick() {
        return _utils2.default.trackHeader('Click Logo', '');
      },
      style: props.style
    },
    _react2.default.createElement(_dgxSvgIcons.LionLogoWithText, null),
    _react2.default.createElement(
      'span',
      { className: 'visuallyHidden' },
      props.alt
    )
  );
};

Logo.propTypes = {
  target: _propTypes2.default.string,
  id: _propTypes2.default.string,
  className: _propTypes2.default.string,
  alt: _propTypes2.default.string,
  style: _propTypes2.default.object
};

Logo.defaultProps = {
  target: '/',
  id: 'Logo',
  className: 'Logo',
  alt: 'The New York Public Library'
};

exports.default = Logo;
module.exports = exports['default'];