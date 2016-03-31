'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactOnclickout = require('react-onclickout');

var _reactOnclickout2 = _interopRequireDefault(_reactOnclickout);

var _ButtonsSimpleButtonJs = require('../Buttons/SimpleButton.js');

var _ButtonsSimpleButtonJs2 = _interopRequireDefault(_ButtonsSimpleButtonJs);

var _storesHeaderStoreJs = require('../../stores/HeaderStore.js');

var _storesHeaderStoreJs2 = _interopRequireDefault(_storesHeaderStoreJs);

var _actionsActionsJs = require('../../actions/Actions.js');

var _actionsActionsJs2 = _interopRequireDefault(_actionsActionsJs);

var _utilsUtilsJs = require('../../utils/utils.js');

var _utilsUtilsJs2 = _interopRequireDefault(_utilsUtilsJs);

var _appConfigJs = require('../../appConfig.js');

var _appConfigJs2 = _interopRequireDefault(_appConfigJs);

var MyNypl = (function (_React$Component) {
  _inherits(MyNypl, _React$Component);

  function MyNypl(props) {
    _classCallCheck(this, MyNypl);

    _get(Object.getPrototypeOf(MyNypl.prototype), 'constructor', this).call(this, props);

    this.state;
  }

  _createClass(MyNypl, [{
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        { id: this.props.id, className: this.props.className },
        _react2['default'].createElement(
          'ul',
          { className: this.props.className + '-Login-List' },
          _react2['default'].createElement(
            'li',
            null,
            _react2['default'].createElement(
              'a',
              { href: this.props.catalogLink, style: styles.loginButtons,
                className: this.props.className + '-Catalog-Btn',
                onClick: _utilsUtilsJs2['default']._trackHeader.bind(this, 'Log In', 'Catalog') },
              _react2['default'].createElement('span', { className: 'nypl-icon-login icon' }),
              'LOG INTO THE CATALOG'
            )
          ),
          _react2['default'].createElement(
            'li',
            null,
            _react2['default'].createElement(
              'a',
              { href: this.props.classicLink, style: styles.loginButtons,
                className: this.props.className + '-Classic-Btn',
                onClick: _utilsUtilsJs2['default']._trackHeader.bind(this, 'Log In', 'Classic') },
              _react2['default'].createElement('span', { className: 'nypl-icon-bldg icon' }),
              'LOG INTO THE CLASSIC CATALOG'
            )
          )
        ),
        _react2['default'].createElement(
          'a',
          { href: this.props.infoLink,
            className: this.props.className + '-Catalog-Link',
            onClick: _utilsUtilsJs2['default']._trackHeader.bind(this, 'Log In', 'Catalog Info'),
            style: styles.catalogInfo },
          'Catalog Info'
        )
      );
    }
  }]);

  return MyNypl;
})(_react2['default'].Component);

MyNypl.defaultProps = {
  id: 'MyNypl',
  className: 'MyNypl',
  lang: 'en',
  catalogLink: _appConfigJs2['default'].myNyplLinks.catalog,
  classicLink: _appConfigJs2['default'].myNyplLinks.classic,
  infoLink: _appConfigJs2['default'].myNyplLinks.moreInfo
};

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

exports['default'] = (0, _radium2['default'])(MyNypl);
module.exports = exports['default'];