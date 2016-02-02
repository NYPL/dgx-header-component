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

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _utilsUtilsJs = require('../../utils/utils.js');

var _utilsUtilsJs2 = _interopRequireDefault(_utilsUtilsJs);

var DonateButton = (function (_React$Component) {
  _inherits(DonateButton, _React$Component);

  // Constructor used in ES6

  function DonateButton(props) {
    _classCallCheck(this, DonateButton);

    _get(Object.getPrototypeOf(DonateButton.prototype), 'constructor', this).call(this, props);
  }

  _createClass(DonateButton, [{
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'a',
        { id: this.props.id,
          className: this.props.className,
          href: this.props.target,
          lang: this.props.lang,
          onClick: _utilsUtilsJs2['default']._trackHeader.bind(this, 'Donate', this.props.gaLabel),
          style: [styles.base, this.props.style //allows for parent-to-child css styling
          ] },
        this.props.label
      );
    }
  }]);

  return DonateButton;
})(_react2['default'].Component);

;

DonateButton.defaultProps = {
  label: 'Donate',
  lang: 'en',
  id: 'DonateButton',
  className: 'DonateButton',
  target: 'https://secure3.convio.net/nypl/site/SPageServer?pagename=donation_form&JServSessionIdr003=dwcz55yj27.app304a&s_src=FRQ14ZZ_SWBN'
};

var styles = {
  base: {
    backgroundColor: '#E43534',
    color: 'white',
    padding: '1em',
    margin: '0'
  }
};

exports['default'] = (0, _radium2['default'])(DonateButton);
module.exports = exports['default'];