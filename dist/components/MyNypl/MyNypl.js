'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('../../utils/utils.js');

var _utils2 = _interopRequireDefault(_utils);

var _appConfig = require('../../appConfig.js');

var _appConfig2 = _interopRequireDefault(_appConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// Config and Utility Library


var styles = {
  base: {
    backgroundColor: '#1DA1D4',
    padding: '0px',
    width: 'auto'
  },
  display: {
    display: 'block'
  },
  hide: {
    display: 'none'
  },
  catalogInfo: {
    fontSize: '12px',
    color: 'rgba(255, 255, 255, 0.5)',
    fontWeight: '200',
    position: 'absolute',
    bottom: '26px',
    right: '30px',
    textDecoration: 'underline'
  },
  loginButtons: {
    display: 'inline-block',
    border: '2px solid #fff',
    color: 'white',
    padding: '9px 10px 7px',
    fontSize: '12px',
    backgroundColor: '#1DA1D4',
    fontFamily: 'Kievit-Book',
    marginTop: '20px'
  }
};

var MyNypl = function (_React$Component) {
  _inherits(MyNypl, _React$Component);

  function MyNypl(props) {
    _classCallCheck(this, MyNypl);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(MyNypl).call(this, props));
  }

  _createClass(MyNypl, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { id: this.props.id, className: this.props.className },
        _react2.default.createElement(
          'ul',
          { className: this.props.className + '-Login-List' },
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              'a',
              {
                href: this.props.catalogLink,
                style: styles.loginButtons,
                className: this.props.className + '-Catalog-Btn',
                onClick: _utils2.default._trackHeader.bind(this, 'Log In', 'Catalog')
              },
              _react2.default.createElement('span', { className: 'nypl-icon-login icon' }),
              'LOG INTO THE CATALOG'
            )
          ),
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              'a',
              {
                href: this.props.classicLink,
                style: styles.loginButtons,
                className: this.props.className + '-Classic-Btn',
                onClick: _utils2.default._trackHeader.bind(this, 'Log In', 'Classic')
              },
              _react2.default.createElement('span', { className: 'nypl-icon-bldg icon' }),
              'LOG INTO THE CLASSIC CATALOG'
            )
          )
        ),
        _react2.default.createElement(
          'a',
          {
            href: this.props.infoLink,
            className: this.props.className + '-Catalog-Link',
            onClick: _utils2.default._trackHeader.bind(this, 'Log In', 'Catalog Info'),
            style: styles.catalogInfo
          },
          'Catalog Info'
        )
      );
    }
  }]);

  return MyNypl;
}(_react2.default.Component);

MyNypl.propTypes = {
  id: _react2.default.PropTypes.string,
  className: _react2.default.PropTypes.string,
  lang: _react2.default.PropTypes.string,
  catalogLink: _react2.default.PropTypes.string,
  classicLink: _react2.default.PropTypes.string,
  infoLink: _react2.default.PropTypes.string
};

MyNypl.defaultProps = {
  id: 'MyNypl',
  className: 'MyNypl',
  lang: 'en',
  catalogLink: _appConfig2.default.myNyplLinks.catalog,
  classicLink: _appConfig2.default.myNyplLinks.classic,
  infoLink: _appConfig2.default.myNyplLinks.moreInfo
};

exports.default = (0, _radium2.default)(MyNypl);