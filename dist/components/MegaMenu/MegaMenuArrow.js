'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _HeaderStore = require('../../stores/HeaderStore.js');

var _HeaderStore2 = _interopRequireDefault(_HeaderStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// ALT Flux Store/Actions


var MegaMenuArrow = function (_React$Component) {
  _inherits(MegaMenuArrow, _React$Component);

  function MegaMenuArrow(props) {
    _classCallCheck(this, MegaMenuArrow);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(MegaMenuArrow).call(this, props));
  }

  _createClass(MegaMenuArrow, [{
    key: 'render',
    value: function render() {
      // Dynamic class assignment based on activeItem property matching current index.
      var classes = (0, _classnames2.default)('NavMenuItem-Arrow nypl-icon-arrow-meganav-large', {
        'active animateMegaMenuArrowEnter fadeIn': this.props.index === this.props.currentActiveItem,
        active: _HeaderStore2.default._getLastActiveMenuItem() === this.props.navId && this.props.index !== this.props.currentActiveItem
      });

      return _react2.default.createElement('span', { className: 'NavMenuItem-Arrow-' + this.props.navId + ' ' + classes });
    }
  }]);

  return MegaMenuArrow;
}(_react2.default.Component);

MegaMenuArrow.propTypes = {
  lang: _react2.default.PropTypes.string,
  index: _react2.default.PropTypes.number,
  currentActiveItem: _react2.default.PropTypes.number,
  navId: _react2.default.PropTypes.string
};

MegaMenuArrow.defaultProps = {
  lang: 'en'
};

exports.default = MegaMenuArrow;
module.exports = exports['default'];