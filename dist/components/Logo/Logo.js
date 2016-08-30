'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dgxSvgIcons = require('dgx-svg-icons');

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
  target: _react2.default.PropTypes.string,
  id: _react2.default.PropTypes.string,
  className: _react2.default.PropTypes.string,
  alt: _react2.default.PropTypes.string,
  style: _react2.default.PropTypes.object
};

Logo.defaultProps = {
  target: '/',
  id: 'Logo',
  className: 'Logo',
  alt: 'The New York Public Library'
};

exports.default = Logo;
module.exports = exports['default'];