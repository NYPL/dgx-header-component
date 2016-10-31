'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var iconStyles = {
  fontSize: '25px',
  verticalAlign: 'middle',
  marginLeft: '5px'
};

var FindUsFeature = function FindUsFeature(_ref) {
  var className = _ref.className,
      urlType = _ref.urlType;

  var url = urlType === 'absolute' ? '//www.nypl.org/locations' : '/locations';
  return _react2.default.createElement(
    'div',
    { className: className },
    _react2.default.createElement(
      'div',
      { className: className + '-Wrapper' },
      _react2.default.createElement(
        'div',
        { className: className + '-Tag' },
        'Locations'
      ),
      _react2.default.createElement(
        'h2',
        { className: className + '-Title' },
        'Explore NYPL\'s 92 locations in the Bronx, Manhattan, and Staten Island.'
      ),
      _react2.default.createElement(
        'a',
        {
          href: url,
          className: className + '-Link'
        },
        'FIND A LOCATION',
        _react2.default.createElement('span', { style: iconStyles, className: 'nypl-icon-wedge-right icon' })
      )
    )
  );
};

FindUsFeature.propTypes = {
  className: _react2.default.PropTypes.string,
  urlType: _react2.default.PropTypes.string
};

FindUsFeature.defaultProps = {
  className: 'FindUsFeature'
};

exports.default = FindUsFeature;
module.exports = exports['default'];