'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('../../utils/utils.js');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NavMenuItem = function NavMenuItem(_ref) {
  var className = _ref.className,
      label = _ref.label,
      lang = _ref.lang,
      navId = _ref.navId,
      target = _ref.target,
      urlType = _ref.urlType;

  var convertUrlRelative = function convertUrlRelative(url) {
    if (typeof url !== 'string') {
      return '#';
    }
    var regex = new RegExp(/^http(s)?\:\/\/(www.)?nypl.org/i);
    // Test regex matching pattern
    return regex.test(url) ? url.replace(regex, '') : url;
  };

  return _react2.default.createElement(
    'li',
    {
      id: navId ? className + '-' + navId : className,
      className: className
    },
    _react2.default.createElement(
      'a',
      {
        href: urlType === 'absolute' ? target : convertUrlRelative(target),
        className: 'NavMenuItem-Link',
        id: navId ? 'NavMenuItem-Link-' + navId : 'NavMenuItem-Link',
        onClick: function onClick() {
          return _utils2.default.trackHeader('Go to...', '' + label[lang].text);
        }
      },
      label[lang].text
    )
  );
};
// Google Analytics Utility Library


NavMenuItem.propTypes = {
  className: _react2.default.PropTypes.string,
  label: _react2.default.PropTypes.object,
  lang: _react2.default.PropTypes.string,
  navId: _react2.default.PropTypes.string,
  target: _react2.default.PropTypes.string,
  urlType: _react2.default.PropTypes.string
};

NavMenuItem.defaultProps = {
  className: 'NavMenuItem',
  lang: 'en',
  target: '#'
};

exports.default = NavMenuItem;
module.exports = exports['default'];