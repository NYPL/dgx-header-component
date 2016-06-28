'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('../../utils/utils.js');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DonateBox = function (_React$Component) {
  _inherits(DonateBox, _React$Component);

  function DonateBox(props) {
    _classCallCheck(this, DonateBox);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(DonateBox).call(this, props));
  }

  _createClass(DonateBox, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      // Enforce limit to 4 links as per design.
      var donationLinks = this.props.donationLinks.slice(0, 4);
      var donationLinkItems = donationLinks && donationLinks.length ? donationLinks.map(function (item, index) {
        return _react2.default.createElement(
          'li',
          { key: index },
          _react2.default.createElement(
            'a',
            {
              href: item.url,
              onClick: _utils2.default._trackHeader.bind(_this2, 'Donate', 'Menu--' + item.amount)
            },
            item.amount
          )
        );
      }) : null;

      return _react2.default.createElement(
        'div',
        { className: this.props.className },
        _react2.default.createElement(
          'div',
          { className: this.props.className + '-Wrapper' },
          _react2.default.createElement(
            'div',
            { className: this.props.className + '-Tag' },
            this.props.tag
          ),
          _react2.default.createElement(
            'h3',
            { className: this.props.className + '-Title' },
            this.props.title
          ),
          _react2.default.createElement(
            'div',
            { className: this.props.className + '-Desc' },
            this.props.desc
          ),
          _react2.default.createElement(
            'ul',
            { className: this.props.className + '-DonationLinks' },
            donationLinkItems
          )
        )
      );
    }
  }]);

  return DonateBox;
}(_react2.default.Component);

DonateBox.propTypes = {
  className: _react2.default.PropTypes.string,
  lang: _react2.default.PropTypes.string,
  tag: _react2.default.PropTypes.string,
  title: _react2.default.PropTypes.string,
  desc: _react2.default.PropTypes.string,
  donationLinks: _react2.default.PropTypes.array
};

DonateBox.defaultProps = {
  lang: 'en',
  className: 'DonateBox'
};

exports.default = DonateBox;