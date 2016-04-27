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

var _utilsUtilsJs = require('../../utils/utils.js');

var _utilsUtilsJs2 = _interopRequireDefault(_utilsUtilsJs);

var DefaultItem = (function (_React$Component) {
  _inherits(DefaultItem, _React$Component);

  function DefaultItem(props) {
    _classCallCheck(this, DefaultItem);

    _get(Object.getPrototypeOf(DefaultItem.prototype), 'constructor', this).call(this, props);
    this._trackHeader = _utilsUtilsJs2['default']._trackHeader.bind(this);
  }

  _createClass(DefaultItem, [{
    key: 'render',
    value: function render() {
      var defaultFeature = {
        category: 'NYPL',
        headline: 'Find more about NYPL',
        desc: 'NYPL Rocks!',
        link: 'http://nypl.org',
        img: null
      };
      var feature = this.props.feature || defaultFeature;
      var classes = this.props.classes || 'without-image';
      var img = feature.imgSrc ? _react2['default'].createElement(
        'div',
        { className: 'FeatureItem-Image ' + classes },
        _react2['default'].createElement('img', { src: feature.imgSrc, alt: '' })
      ) : null;

      return _react2['default'].createElement(
        'a',
        {
          href: feature.link,
          className: this.props.className,
          onClick: _utilsUtilsJs2['default']._trackHeader.bind(this, 'FeatureItem', this.props.navLabel + ' - ' + feature.headline)
        },
        _react2['default'].createElement(
          'div',
          { className: this.props.className + '-Wrapper' },
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
            )
          )
        )
      );
    }
  }]);

  return DefaultItem;
})(_react2['default'].Component);

DefaultItem.propTypes = {
  className: _react2['default'].PropTypes.string,
  lang: _react2['default'].PropTypes.string,
  classes: _react2['default'].PropTypes.string,
  feature: _react2['default'].PropTypes.object,
  navLabel: _react2['default'].PropTypes.string
};

DefaultItem.defaultProps = {
  lang: 'en',
  className: 'FeatureItem'
};

exports['default'] = DefaultItem;
module.exports = exports['default'];