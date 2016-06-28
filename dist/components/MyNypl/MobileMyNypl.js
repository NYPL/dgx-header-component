'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _utils = require('../../utils/utils.js');

var _utils2 = _interopRequireDefault(_utils);

var _appConfig = require('../../appConfig.js');

var _appConfig2 = _interopRequireDefault(_appConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// Config and Utility


var styles = {
  base: {
    backgroundColor: '#2B2B2B',
    margin: 0,
    padding: 0
  },
  links: {
    display: 'inline-table',
    backgroundColor: '#E43534',
    color: '#FFF',
    padding: 0,
    margin: '60px 0 0 0',
    width: '50%',
    textAlign: 'center',
    textDecoration: 'none'
  },
  label: {
    fontSize: '14px',
    textTransform: 'uppercase',
    display: 'inline-block'
  },
  wrapper: {
    width: '100%',
    display: 'block',
    margin: '0',
    padding: '1.75em 0'
  },
  catalogInfoLink: {
    display: 'block',
    color: '#fff',
    textAlign: 'center',
    padding: '35px',
    fontSize: '18px',
    textTransform: 'uppercase',
    textDecoration: 'underline'
  },
  classicLinkWrapper: {
    borderLeft: '1.25px solid #b92b1a'
  },
  classicLinkLabel: {
    width: '120px'
  },
  catalogLinkWrapper: {
    borderRight: '1.25px solid #b92b1a'
  },
  catalogLinkLabel: {
    width: '102px'
  },
  icon: {
    fontSize: '32px',
    display: 'inline-block',
    color: 'rgba(255, 255, 255, 0.6)'
  }
};

var MobileMyNypl = function (_React$Component) {
  _inherits(MobileMyNypl, _React$Component);

  function MobileMyNypl(props) {
    _classCallCheck(this, MobileMyNypl);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(MobileMyNypl).call(this, props));
  }

  _createClass(MobileMyNypl, [{
    key: 'render',
    value: function render() {
      var catalogLinkClass = 'CatalogLink';
      var classicLinkClass = 'ClassicLink';

      return _react2.default.createElement(
        'div',
        { className: this.props.className, style: styles.base },
        _react2.default.createElement(
          'a',
          {
            href: this.props.catalogLink,
            className: catalogLinkClass,
            style: styles.links,
            onClick: _utils2.default._trackHeader.bind(this, 'Mobile Log In', 'Catalog')
          },
          _react2.default.createElement(
            'span',
            {
              className: catalogLinkClass + '-Wrapper',
              style: [styles.wrapper, styles.catalogLinkWrapper]
            },
            _react2.default.createElement('span', { className: catalogLinkClass + '-Icon nypl-icon-login', style: styles.icon }),
            _react2.default.createElement(
              'span',
              {
                className: catalogLinkClass + '-Label',
                style: [styles.label, styles.catalogLinkLabel]
              },
              'Log into the Catalog'
            )
          )
        ),
        _react2.default.createElement(
          'a',
          {
            href: this.props.classicLink,
            className: classicLinkClass,
            style: styles.links,
            onClick: _utils2.default._trackHeader.bind(this, 'Mobile Log In', 'Classic')
          },
          _react2.default.createElement(
            'span',
            {
              className: classicLinkClass + '-Wrapper',
              style: [styles.wrapper, styles.classicLinkWrapper]
            },
            _react2.default.createElement('span', { className: classicLinkClass + '-Icon nypl-icon-bldg', style: styles.icon }),
            _react2.default.createElement(
              'span',
              {
                className: classicLinkClass + '-Label',
                style: [styles.label, styles.classicLinkLabel]
              },
              'Log into the Classic Catalog'
            )
          )
        ),
        _react2.default.createElement(
          'a',
          {
            className: 'Mobile-Catalog-Info',
            href: this.props.infoLink,
            lang: this.props.lang,
            onClick: _utils2.default._trackHeader.bind(this, 'Mobile Log In', 'Catalog Info'),
            style: [styles.catalogInfoLink]
          },
          'Catalog Info'
        )
      );
    }
  }]);

  return MobileMyNypl;
}(_react2.default.Component);

MobileMyNypl.propTypes = {
  lang: _react2.default.PropTypes.string,
  className: _react2.default.PropTypes.string,
  catalogLink: _react2.default.PropTypes.string,
  classicLink: _react2.default.PropTypes.string,
  infoLink: _react2.default.PropTypes.string
};

MobileMyNypl.defaultProps = {
  lang: 'en',
  className: 'MobileMyNypl',
  catalogLink: _appConfig2.default.myNyplLinks.catalog,
  classicLink: _appConfig2.default.myNyplLinks.classic,
  infoLink: _appConfig2.default.myNyplLinks.moreInfo
};

exports.default = (0, _radium2.default)(MobileMyNypl);