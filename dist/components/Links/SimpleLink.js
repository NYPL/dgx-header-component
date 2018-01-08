'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require('../../utils/utils.js');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SimpleLink = function (_React$Component) {
  _inherits(SimpleLink, _React$Component);

  function SimpleLink(props) {
    _classCallCheck(this, SimpleLink);

    var _this = _possibleConstructorReturn(this, (SimpleLink.__proto__ || Object.getPrototypeOf(SimpleLink)).call(this, props));

    _this.handleOnClick = _this.handleOnClick.bind(_this);
    return _this;
  }

  _createClass(SimpleLink, [{
    key: 'handleOnClick',
    value: function handleOnClick() {
      _utils2.default.trackHeader(this.props.gaAction, this.props.gaLabel);
      this.props.onClick();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'a',
        {
          ref: this.props.ref,
          id: this.props.id,
          className: this.props.className,
          href: this.props.target,
          onClick: this.handleOnClick,
          style: this.props.style
        },
        this.props.label
      );
    }
  }]);

  return SimpleLink;
}(_react2.default.Component);

SimpleLink.propTypes = {
  id: _propTypes2.default.string,
  ref: _propTypes2.default.string,
  className: _propTypes2.default.string,
  lang: _propTypes2.default.string,
  style: _propTypes2.default.object,
  target: _propTypes2.default.string,
  label: _propTypes2.default.string,
  onClick: _propTypes2.default.func,
  gaAction: _propTypes2.default.string,
  gaLabel: _propTypes2.default.string
};

SimpleLink.defaultProps = {
  className: 'simpleLink',
  label: 'Link',
  lang: 'en',
  target: '#',
  onClick: function onClick() {}
};

exports.default = SimpleLink;
module.exports = exports['default'];