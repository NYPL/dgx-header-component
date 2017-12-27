'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _underscore = require('underscore');

var _dgxSvgIcons = require('@nypl/dgx-svg-icons');

var _utils = require('../../utils/utils.js');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// GA Utility


var icons = {
  twitter: _react2.default.createElement(_dgxSvgIcons.TwitterIcon, { iconId: 'email-twitter' }),
  facebook: _react2.default.createElement(_dgxSvgIcons.FaceBookIcon, { iconId: 'email-fb' })
};

var SocialMediaLinksWidget = function (_React$Component) {
  _inherits(SocialMediaLinksWidget, _React$Component);

  function SocialMediaLinksWidget(props) {
    _classCallCheck(this, SocialMediaLinksWidget);

    var _this = _possibleConstructorReturn(this, (SocialMediaLinksWidget.__proto__ || Object.getPrototypeOf(SocialMediaLinksWidget)).call(this, props));

    _this.state = { linkClass: '' };

    _this.handleOnMouseLeave = _this.handleOnMouseLeave.bind(_this);
    _this.handleOnMouseEnter = _this.handleOnMouseEnter.bind(_this);
    _this.trackHeader = _utils2.default.trackHeader.bind(_this);
    return _this;
  }

  _createClass(SocialMediaLinksWidget, [{
    key: 'generateLinksToDisplay',
    value: function generateLinksToDisplay(list, displayOnlyList) {
      var _this2 = this;

      var socialLinksList = displayOnlyList && displayOnlyList.length ? (0, _underscore.pick)(list, displayOnlyList) : list;

      return (0, _underscore.map)(socialLinksList, function (item, key) {
        var hoverClass = _this2.state.linkClass === key ? 'animateHover fadeInSlow' : '';
        var icon = icons[key];

        return _react2.default.createElement(
          'li',
          { key: key, className: _this2.props.className + '-listItem' },
          _react2.default.createElement(
            'a',
            {
              href: item,
              onClick: function onClick() {
                return _this2.trackHeader('Click', 'Social Media - ' + key);
              },
              className: _this2.props.className + '-link ' + hoverClass,
              onMouseEnter: function onMouseEnter() {
                return _this2.handleOnMouseEnter(key);
              },
              onMouseLeave: _this2.handleOnMouseLeave
            },
            icon
          )
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
    key: 'handleOnMouseEnter',
    value: function handleOnMouseEnter(key) {
      this.setState({ linkClass: key });
    }

    /**
     * _handleOnMouseLeave()
     * updates the linkClass state
     * object property to an empty string.
     *
     */

  }, {
    key: 'handleOnMouseLeave',
    value: function handleOnMouseLeave() {
      this.setState({ linkClass: '' });
    }
  }, {
    key: 'render',
    value: function render() {
      var socialLinks = this.generateLinksToDisplay(this.props.links, this.props.displayOnlyList);

      return _react2.default.createElement(
        'div',
        { className: this.props.className },
        _react2.default.createElement(
          'ul',
          { className: this.props.className + '-list' },
          socialLinks
        )
      );
    }
  }]);

  return SocialMediaLinksWidget;
}(_react2.default.Component);

SocialMediaLinksWidget.propTypes = {
  lang: _propTypes2.default.string,
  className: _propTypes2.default.string,
  links: _propTypes2.default.object,
  displayOnlyList: _propTypes2.default.array
};

SocialMediaLinksWidget.defaultProps = {
  lang: 'en',
  className: 'socialMediaLinksWidget'
};

exports.default = SocialMediaLinksWidget;
module.exports = exports['default'];