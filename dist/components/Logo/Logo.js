'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dgxSvgIcons = require('dgx-svg-icons');

var _utilsUtilsJs = require('../../utils/utils.js');

var _utilsUtilsJs2 = _interopRequireDefault(_utilsUtilsJs);

var Logo = function Logo(props) {
  return _react2['default'].createElement(
    'a',
    {
      id: props.id,
      className: props.className,
      href: props.target,
      onClick: function () {
        return _utilsUtilsJs2['default']._trackHeader('Click Logo', '');
      },
      style: props.style
    },
    _react2['default'].createElement(_dgxSvgIcons.LionLogoWithText, null),
    _react2['default'].createElement(
      'span',
      { className: 'visuallyHidden' },
      props.alt
    )
  );
};

Logo.propTypes = {
  target: _react2['default'].PropTypes.string,
  id: _react2['default'].PropTypes.string,
  className: _react2['default'].PropTypes.string,
  alt: _react2['default'].PropTypes.string,
  style: _react2['default'].PropTypes.object
};

Logo.defaultProps = {
  target: '/',
  id: 'Logo',
  className: 'Logo',
  alt: 'The New York Public Library'
};

exports['default'] = Logo;
module.exports = exports['default'];