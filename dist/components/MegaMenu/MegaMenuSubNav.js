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

var _appConfigJs = require('../../appConfig.js');

var _appConfigJs2 = _interopRequireDefault(_appConfigJs);

var _SocialMediaLinksWidgetSocialMediaLinksWidgetJs = require('../SocialMediaLinksWidget/SocialMediaLinksWidget.js');

var _SocialMediaLinksWidgetSocialMediaLinksWidgetJs2 = _interopRequireDefault(_SocialMediaLinksWidgetSocialMediaLinksWidgetJs);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _utilsUtilsJs = require('../../utils/utils.js');

var _utilsUtilsJs2 = _interopRequireDefault(_utilsUtilsJs);

var styles = {
  topLink: {
    textDecoration: 'none',
    color: '#FFF'
  }
};

var MegaMenuSubNav = (function (_React$Component) {
  _inherits(MegaMenuSubNav, _React$Component);

  function MegaMenuSubNav() {
    _classCallCheck(this, MegaMenuSubNav);

    _get(Object.getPrototypeOf(MegaMenuSubNav.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(MegaMenuSubNav, [{
    key: 'renderSubNavItems',

    /**
     * Generates the DOM for the MegaMenu Left SubNavItem elements.
     * @param {items[]} - Array containing SubNavItem object data.
     * @returns {Object} React DOM.
     */
    value: function renderSubNavItems(items) {
      var _this = this;

      if ((0, _underscore.isEmpty)(items)) {
        return null;
      }

      return (0, _underscore.map)(items, function (m, i) {
        var target = m.link[_this.props.lang].text || '#';
        return _react2['default'].createElement(
          'li',
          { key: i },
          _react2['default'].createElement(
            'a',
            {
              href: target,
              onClick: function () {
                return _utilsUtilsJs2['default']._trackHeader('Go to...', _this.props.label[_this.props.lang].text + '--' + m.name[_this.props.lang].text);
              }
            },
            m.name[_this.props.lang].text
          )
        );
      });
    }

    /**
     * Generates the DOM for the SocialMedia link icons only for a matching navId.
     * @param {string} - Navigation UUID as string type.
     * @returns {Object} React DOM.
     */
  }, {
    key: 'renderSocialMediaIcons',
    value: function renderSocialMediaIcons(navId) {
      return this.props.navId === navId ? _react2['default'].createElement(_SocialMediaLinksWidgetSocialMediaLinksWidgetJs2['default'], {
        className: 'MegaMenu-SubNav-SocialMediaWidget',
        links: _appConfigJs2['default'].socialMediaLinks,
        displayOnly: ['facebook', 'twitter']
      }) : null;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2['default'].createElement(
        'div',
        { className: 'MegaMenu-SubNav' },
        _react2['default'].createElement(
          'h2',
          null,
          _react2['default'].createElement(
            'a',
            {
              style: styles.topLink,
              href: this.props.topLink,
              onClick: function () {
                return _utilsUtilsJs2['default']._trackHeader('Go to...', 'SubNav Title--' + _this2.props.label[_this2.props.lang].text);
              }
            },
            this.props.label[this.props.lang].text
          )
        ),
        _react2['default'].createElement(
          'ul',
          null,
          this.renderSubNavItems(this.props.items)
        ),
        this.renderSocialMediaIcons('df621833-4dd1-4223-83e5-6ad7f98ad26a')
      );
    }
  }]);

  return MegaMenuSubNav;
})(_react2['default'].Component);

MegaMenuSubNav.propTypes = {
  lang: _react2['default'].PropTypes.string,
  topLink: _react2['default'].PropTypes.string,
  navId: _react2['default'].PropTypes.string,
  label: _react2['default'].PropTypes.object,
  items: _react2['default'].PropTypes.array
};

MegaMenuSubNav.defaultProps = {
  lang: 'en',
  topLink: '#'
};

exports['default'] = (0, _radium2['default'])(MegaMenuSubNav);
module.exports = exports['default'];