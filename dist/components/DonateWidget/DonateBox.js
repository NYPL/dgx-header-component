'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilsUtilsJs = require('../../utils/utils.js');

var _utilsUtilsJs2 = _interopRequireDefault(_utilsUtilsJs);

var DonateBox = function DonateBox(_ref) {
  var className = _ref.className;
  var tag = _ref.tag;
  var title = _ref.title;
  var desc = _ref.desc;
  var donationLinks = _ref.donationLinks;

  // Enforce limit to 4 links as per design.
  var donationLinksList = donationLinks.slice(0, 4);
  var donationLinkItems = donationLinksList && donationLinksList.length ? donationLinksList.map(function (item, index) {
    return _react2['default'].createElement(
      'li',
      { key: index },
      _react2['default'].createElement(
        'a',
        {
          href: item.url,
          onClick: function () {
            return _utilsUtilsJs2['default']._trackHeader('Donate', 'Menu--' + item.amount);
          }
        },
        item.amount
      )
    );
  }) : null;

  return _react2['default'].createElement(
    'div',
    { className: className },
    _react2['default'].createElement(
      'div',
      { className: className + '-Wrapper' },
      _react2['default'].createElement(
        'div',
        { className: className + '-Tag' },
        tag
      ),
      _react2['default'].createElement(
        'h3',
        { className: className + '-Title' },
        title
      ),
      _react2['default'].createElement(
        'div',
        { className: className + '-Desc' },
        desc
      ),
      _react2['default'].createElement(
        'ul',
        { className: className + '-DonationLinks' },
        donationLinkItems
      )
    )
  );
};

DonateBox.propTypes = {
  className: _react2['default'].PropTypes.string,
  tag: _react2['default'].PropTypes.string,
  title: _react2['default'].PropTypes.string,
  desc: _react2['default'].PropTypes.string,
  donationLinks: _react2['default'].PropTypes.array
};

DonateBox.defaultProps = {
  className: 'DonateBox'
};

exports['default'] = DonateBox;
module.exports = exports['default'];