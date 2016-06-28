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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  base: {
    backgroundColor: '#E43534',
    color: 'white',
    padding: '1em',
    margin: '0'
  }
};

var DonateButton = function (_React$Component) {
  _inherits(DonateButton, _React$Component);

  function DonateButton(props) {
    _classCallCheck(this, DonateButton);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(DonateButton).call(this, props));
  }

  _createClass(DonateButton, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'a',
        {
          id: this.props.id,
          className: this.props.className,
          href: this.props.target,
          lang: this.props.lang,
          onClick: _utils2.default._trackHeader.bind(this, 'Donate', this.props.gaLabel),
          style: [styles.base, this.props.style]
        },
        this.props.label
      );
    }
  }]);

  return DonateButton;
}(_react2.default.Component);

DonateButton.propTypes = {
  id: _react2.default.PropTypes.string,
  className: _react2.default.PropTypes.string,
  target: _react2.default.PropTypes.string,
  label: _react2.default.PropTypes.string,
  lang: _react2.default.PropTypes.string,
  style: _react2.default.PropTypes.object,
  gaLabel: _react2.default.PropTypes.string
};

DonateButton.defaultProps = {
  label: 'Donate',
  lang: 'en',
  id: 'DonateButton',
  className: 'DonateButton',
  target: 'https://secure3.convio.net/nypl/site/SPageServer?pagename=donation_form&JServSessionIdr003=dwcz55yj27.app304a&s_src=FRQ14ZZ_SWBN'
};

exports.default = (0, _radium2.default)(DonateButton);