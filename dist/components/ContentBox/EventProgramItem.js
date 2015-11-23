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

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _utilsUtilsJs = require('../../utils/utils.js');

var _utilsUtilsJs2 = _interopRequireDefault(_utilsUtilsJs);

var EventProgramItem = (function (_React$Component) {
  function EventProgramItem(props) {
    _classCallCheck(this, EventProgramItem);

    _get(Object.getPrototypeOf(EventProgramItem.prototype), 'constructor', this).call(this, props);
  }

  _inherits(EventProgramItem, _React$Component);

  _createClass(EventProgramItem, [{
    key: 'render',
    value: function render() {
      var feature = this.props.feature,
          classes = this.props.classes,
          img = feature.imgSrc ? _react2['default'].createElement(
        'div',
        { className: 'FeatureItem-Image ' + classes },
        _react2['default'].createElement('img', { src: feature.imgSrc })
      ) : null,
          startDate = (0, _moment2['default'])(feature.eventDates.start),
          endDate = (0, _moment2['default'])(feature.eventDates.end);

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
              null,
              _react2['default'].createElement(
                'p',
                { className: 'FeatureItem-Content-Date' },
                startDate.format('hA | ddd, MMMM Do')
              ),
              _react2['default'].createElement(
                'span',
                null,
                feature.location.fullName
              )
            )
          )
        )
      );
    }
  }]);

  return EventProgramItem;
})(_react2['default'].Component);

EventProgramItem.defaultProps = {
  lang: 'en',
  className: 'EventProgramItem'
};

exports['default'] = EventProgramItem;
module.exports = exports['default'];