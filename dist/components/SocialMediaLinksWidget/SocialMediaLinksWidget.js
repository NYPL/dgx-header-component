'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _underscore = require('underscore');

var _utils = require('../../utils/utils.js');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// GA Utility


var SocialMediaLinksWidget = function (_React$Component) {
  _inherits(SocialMediaLinksWidget, _React$Component);

  function SocialMediaLinksWidget(props) {
    _classCallCheck(this, SocialMediaLinksWidget);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SocialMediaLinksWidget).call(this, props));

    _this.state = { linkClass: '' };

    _this._handleOnMouseLeave = _this._handleOnMouseLeave.bind(_this);
    _this._handleOnMouseEnter = _this._handleOnMouseEnter.bind(_this);
    _this._trackHeader = _utils2.default._trackHeader.bind(_this);
    return _this;
  }

  _createClass(SocialMediaLinksWidget, [{
    key: '_generateLinksToDisplay',
    value: function _generateLinksToDisplay(list, displayOnlyList) {
      var _this2 = this;

      var socialLinksList = displayOnlyList && displayOnlyList.length ? (0, _underscore.pick)(list, displayOnlyList) : list;

      return (0, _underscore.map)(socialLinksList, function (item, key) {
        var hoverClass = _this2.state.linkClass === key ? 'nypl-icon-' + key + '-circle-hover animateHover fadeInSlow' : 'nypl-icon-' + key + '-circle';

        return _react2.default.createElement(
          'li',
          { key: key, className: _this2.props.className + '-ListItem' },
          _react2.default.createElement('a', {
            href: item,
            onClick: function onClick() {
              return _this2._trackHeader('Click', 'Social Media - ' + key);
            },
            className: _this2.props.className + '-Link ' + hoverClass,
            onMouseEnter: function onMouseEnter() {
              return _this2._handleOnMouseEnter(key);
            },
            onMouseLeave: _this2._handleOnMouseLeave
          })
        );
      });
    }

    /**
     * _handleOnMouseEnter(key)
     * Updates the linkClass state
     * object property with the param key
     *
     * @param {String} key
     */

  }, {
    key: '_handleOnMouseEnter',
    value: function _handleOnMouseEnter(key) {
      this.setState({ linkClass: key });
    }

    /**
     * _handleOnMouseLeave()
     * updates the linkClass state
     * object property to an empty string.
     *
     */

  }, {
    key: '_handleOnMouseLeave',
    value: function _handleOnMouseLeave() {
      this.setState({ linkClass: '' });
    }
  }, {
    key: 'render',
    value: function render() {
      var socialLinks = this._generateLinksToDisplay(this.props.links, this.props.displayOnlyList);

      return _react2.default.createElement(
        'div',
        { className: this.props.className },
        _react2.default.createElement(
          'ul',
          { className: this.props.className + '-List' },
          socialLinks
        )
      );
    }
  }]);

  return SocialMediaLinksWidget;
}(_react2.default.Component);

SocialMediaLinksWidget.propTypes = {
  lang: _react2.default.PropTypes.string,
  className: _react2.default.PropTypes.string,
  links: _react2.default.PropTypes.object,
  displayOnlyList: _react2.default.PropTypes.array
};

SocialMediaLinksWidget.defaultProps = {
  lang: 'en',
  className: 'SocialMediaLinksWidget'
};

exports.default = SocialMediaLinksWidget;