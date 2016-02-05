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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _utilsUtilsJs = require('../../utils/utils.js');

var _utilsUtilsJs2 = _interopRequireDefault(_utilsUtilsJs);

var SocialMediaLinksWidget = (function (_React$Component) {
  _inherits(SocialMediaLinksWidget, _React$Component);

  function SocialMediaLinksWidget(props) {
    _classCallCheck(this, SocialMediaLinksWidget);

    _get(Object.getPrototypeOf(SocialMediaLinksWidget.prototype), 'constructor', this).call(this, props);

    this.state = {
      linkClass: ''
    };
  }

  _createClass(SocialMediaLinksWidget, [{
    key: 'render',
    value: function render() {
      var _this = this;

      var displayOnlyList = this.props.displayOnly,
          socialLinksList = this.props.links,
          socialLinksToDisplay = undefined;

      // Pick the selected links to display (optional)
      if (displayOnlyList && displayOnlyList.length) {
        socialLinksList = _underscore2['default'].pick(socialLinksList, displayOnlyList);
      }

      // Iterate over each object key->value pair and display as a list item
      socialLinksToDisplay = _underscore2['default'].map(socialLinksList, function (item, key) {
        var hoverClass = _this.state.linkClass === key ? 'nypl-icon-' + key + '-circle-hover animateHover fadeInSlow' : 'nypl-icon-' + key + '-circle';

        return _react2['default'].createElement(
          'li',
          { key: key, className: _this.props.className + '-ListItem' },
          _react2['default'].createElement('a', {
            href: item,
            onClick: _utilsUtilsJs2['default']._trackHeader.bind(_this, 'Click', 'Social Media - ' + key),
            className: _this.props.className + '-Link ' + hoverClass,
            onMouseEnter: _this._handleOnMouseEnter.bind(_this, key),
            onMouseLeave: _this._handleOnMouseLeave.bind(_this) })
        );
      });

      return _react2['default'].createElement(
        'div',
        { className: this.props.className },
        _react2['default'].createElement(
          'ul',
          { className: this.props.className + '-List' },
          socialLinksToDisplay
        )
      );
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
  }]);

  return SocialMediaLinksWidget;
})(_react2['default'].Component);

SocialMediaLinksWidget.defaultProps = {
  lang: 'en',
  className: 'SocialMediaLinksWidget'
};

exports['default'] = SocialMediaLinksWidget;
module.exports = exports['default'];