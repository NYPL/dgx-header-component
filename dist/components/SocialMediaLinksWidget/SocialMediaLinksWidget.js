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

var _underscore = require('underscore');

// GA Utility

var _utilsUtilsJs = require('../../utils/utils.js');

var _utilsUtilsJs2 = _interopRequireDefault(_utilsUtilsJs);

var SocialMediaLinksWidget = (function (_React$Component) {
  _inherits(SocialMediaLinksWidget, _React$Component);

  function SocialMediaLinksWidget(props) {
    _classCallCheck(this, SocialMediaLinksWidget);

    _get(Object.getPrototypeOf(SocialMediaLinksWidget.prototype), 'constructor', this).call(this, props);

    this.state = { linkClass: '' };

    this._handleOnMouseLeave = this._handleOnMouseLeave.bind(this);
    this._handleOnMouseEnter = this._handleOnMouseEnter.bind(this);
    this._trackHeader = _utilsUtilsJs2['default']._trackHeader.bind(this);
  }

  _createClass(SocialMediaLinksWidget, [{
    key: '_generateLinksToDisplay',
    value: function _generateLinksToDisplay(list, displayOnlyList) {
      var _this = this;

      var socialLinksList = displayOnlyList && displayOnlyList.length ? (0, _underscore.pick)(list, displayOnlyList) : list;

      return (0, _underscore.map)(socialLinksList, function (item, key) {
        var hoverClass = _this.state.linkClass === key ? 'nypl-icon-' + key + '-circle-hover animateHover fadeInSlow' : 'nypl-icon-' + key + '-circle';

        return _react2['default'].createElement(
          'li',
          { key: key, className: _this.props.className + '-ListItem' },
          _react2['default'].createElement('a', {
            href: item,
            onClick: function () {
              return _this._trackHeader('Click', 'Social Media - ' + key);
            },
            className: _this.props.className + '-Link ' + hoverClass,
            onMouseEnter: function () {
              return _this._handleOnMouseEnter(key);
            },
            onMouseLeave: _this._handleOnMouseLeave
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

      return _react2['default'].createElement(
        'div',
        { className: this.props.className },
        _react2['default'].createElement(
          'ul',
          { className: this.props.className + '-List' },
          socialLinks
        )
      );
    }
  }]);

  return SocialMediaLinksWidget;
})(_react2['default'].Component);

SocialMediaLinksWidget.propTypes = {
  lang: _react2['default'].PropTypes.string,
  className: _react2['default'].PropTypes.string,
  links: _react2['default'].PropTypes.object,
  displayOnlyList: _react2['default'].PropTypes.array
};

SocialMediaLinksWidget.defaultProps = {
  lang: 'en',
  className: 'SocialMediaLinksWidget'
};

exports['default'] = SocialMediaLinksWidget;
module.exports = exports['default'];