'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('../../utils/utils.js');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DonateBox = function DonateBox(_ref) {
  var className = _ref.className,
      tag = _ref.tag,
      title = _ref.title,
      desc = _ref.desc,
      donationLinks = _ref.donationLinks;

  // Enforce limit to 4 links as per design.
  var donationLinksList = donationLinks.slice(0, 4);
  var donationLinkItems = donationLinksList && donationLinksList.length ? donationLinksList.map(function (item, index) {
    return _react2.default.createElement(
      'li',
      { key: index },
      _react2.default.createElement(
        'a',
        {
          href: item.url,
          onClick: function onClick() {
            return _utils2.default.trackHeader('Donate', 'Menu--' + item.amount);
          }
        },
        item.amount
      )
    );
  }) : null;

  return _react2.default.createElement(
    'div',
    { className: className },
    _react2.default.createElement(
      'div',
      { className: className + '-Wrapper' },
      _react2.default.createElement(
        'div',
        { className: className + '-Tag' },
        tag
      ),
      _react2.default.createElement(
        'h3',
        { className: className + '-Title' },
        title
      ),
      _react2.default.createElement(
        'div',
        { className: className + '-Desc' },
        desc
      ),
      _react2.default.createElement(
        'ul',
        { className: className + '-DonationLinks' },
        donationLinkItems
      )
    )
  );
};

DonateBox.propTypes = {
  className: _react2.default.PropTypes.string,
  tag: _react2.default.PropTypes.string,
  title: _react2.default.PropTypes.string,
  desc: _react2.default.PropTypes.string,
  donationLinks: _react2.default.PropTypes.array
};

DonateBox.defaultProps = {
  className: 'DonateBox'
};

exports.default = DonateBox;
module.exports = exports['default'];