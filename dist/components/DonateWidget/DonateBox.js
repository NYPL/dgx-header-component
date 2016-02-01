'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilsUtilsJs = require('../../utils/utils.js');

var _utilsUtilsJs2 = _interopRequireDefault(_utilsUtilsJs);

var DonateBox = (function (_React$Component) {
  _inherits(DonateBox, _React$Component);

  function DonateBox(props) {
    _classCallCheck(this, DonateBox);

    _get(Object.getPrototypeOf(DonateBox.prototype), 'constructor', this).call(this, props);
  }

  _createClass(DonateBox, [{
    key: 'render',
    value: function render() {
      var _this = this;

      // Enforce limit to 4 links as per design.
      var donationLinks = this.props.donationLinks.slice(0, 4),
          donationLinkItems = donationLinks && donationLinks.length ? donationLinks.map(function (item, index) {
        return _react2['default'].createElement(
          'li',
          { key: index },
          _react2['default'].createElement(
            'a',
            { href: item.url, onClick: _utilsUtilsJs2['default']._trackHeader.bind(_this, 'Donate', 'Menu--' + item.amount) },
            item.amount
          )
        );
      }) : null;

      return _react2['default'].createElement(
        'div',
        { className: this.props.className },
        _react2['default'].createElement(
          'div',
          { className: this.props.className + '-Wrapper' },
          _react2['default'].createElement(
            'div',
            { className: this.props.className + '-Tag' },
            this.props.tag
          ),
          _react2['default'].createElement(
            'h3',
            { className: this.props.className + '-Title' },
            this.props.title
          ),
          _react2['default'].createElement(
            'div',
            { className: this.props.className + '-Desc' },
            this.props.desc
          ),
          _react2['default'].createElement(
            'ul',
            { className: this.props.className + '-DonationLinks' },
            donationLinkItems
          )
        )
      );
    }
  }]);

  return DonateBox;
})(_react2['default'].Component);

DonateBox.defaultProps = {
  lang: 'en',
  className: 'DonateBox'
};

exports['default'] = DonateBox;
module.exports = exports['default'];