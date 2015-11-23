'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilsUtilsJs = require('../../utils/utils.js');

var _utilsUtilsJs2 = _interopRequireDefault(_utilsUtilsJs);

var BlogItem = (function (_React$Component) {
  function BlogItem(props) {
    _classCallCheck(this, BlogItem);

    _get(Object.getPrototypeOf(BlogItem.prototype), 'constructor', this).call(this, props);
  }

  _inherits(BlogItem, _React$Component);

  _createClass(BlogItem, [{
    key: 'render',
    value: function render() {
      var feature = this.props.feature,
          classes = this.props.classes,
          img = feature.imgSrc ? _react2['default'].createElement(
        'div',
        { className: 'FeatureItem-Image ' + classes },
        _react2['default'].createElement('img', { src: feature.imgSrc })
      ) : null;

      return _react2['default'].createElement(
        'a',
        { href: feature.link, className: this.props.className,
          onClick: _utilsUtilsJs2['default']._trackHeader.bind(this, 'FeatureItem', '' + this.props.navLabel + ' - ' + feature.headline) },
        _react2['default'].createElement(
          'div',
          { className: '' + this.props.className + '-Wrapper' },
          img,
          _react2['default'].createElement(
            'div',
            { className: 'FeatureItem-Content ' + classes },
            _react2['default'].createElement(
              'div',
              { className: 'FeatureItem-Content-Tag' },
              feature.category
            ),
            _react2['default'].createElement(
              'h3',
              { className: 'FeatureItem-Content-Title' },
              feature.headline
            ),
            _react2['default'].createElement(
              'div',
              { className: 'FeatureItem-Content-Desc' },
              feature.description
            ),
            _react2['default'].createElement(
              'p',
              { className: 'FeatureItem-Content-Author-Name' },
              feature.author.fullName
            ),
            _react2['default'].createElement(
              'span',
              { className: 'FeatureItem-Content-Author-Title' },
              feature.author.title
            )
          )
        )
      );
    }
  }]);

  return BlogItem;
})(_react2['default'].Component);

BlogItem.defaultProps = {
  lang: 'en',
  className: 'BlogItem'
};

exports['default'] = BlogItem;
module.exports = exports['default'];