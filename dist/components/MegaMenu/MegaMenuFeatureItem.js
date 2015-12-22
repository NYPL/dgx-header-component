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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ContentBoxBlogItemJs = require('../ContentBox/BlogItem.js');

var _ContentBoxBlogItemJs2 = _interopRequireDefault(_ContentBoxBlogItemJs);

var _ContentBoxDefaultItemJs = require('../ContentBox/DefaultItem.js');

var _ContentBoxDefaultItemJs2 = _interopRequireDefault(_ContentBoxDefaultItemJs);

var _ContentBoxEventProgramItemJs = require('../ContentBox/EventProgramItem.js');

var _ContentBoxEventProgramItemJs2 = _interopRequireDefault(_ContentBoxEventProgramItemJs);

var _ContentBoxExhibitionItemJs = require('../ContentBox/ExhibitionItem.js');

var _ContentBoxExhibitionItemJs2 = _interopRequireDefault(_ContentBoxExhibitionItemJs);

var _utilsContentModelJs = require('../../utils/ContentModel.js');

var _utilsContentModelJs2 = _interopRequireDefault(_utilsContentModelJs);

var MegaMenuFeatureItem = (function (_React$Component) {
  // Constructor used in ES6

  function MegaMenuFeatureItem(props) {
    _classCallCheck(this, MegaMenuFeatureItem);

    _get(Object.getPrototypeOf(MegaMenuFeatureItem.prototype), 'constructor', this).call(this, props);
  }

  _inherits(MegaMenuFeatureItem, _React$Component);

  _createClass(MegaMenuFeatureItem, [{
    key: 'render',
    value: function render() {
      // There should always be a featured item, but just in case:
      if (!this.props.feature) {
        return _react2['default'].createElement(_ContentBoxDefaultItemJs2['default'], { className: this.props.className });
      }

      var feature = this.props.feature,
          classes = (0, _classnames2['default'])({
        'with-image': feature && feature.images,
        'without-image': !feature || !feature.images
      }),
          contentObj = _utilsContentModelJs2['default'].featureItem(feature, this.props.lang),
          featuredItem = _react2['default'].createElement(_ContentBoxDefaultItemJs2['default'], { feature: contentObj,
        className: this.props.className,
        classes: classes,
        navLabel: this.props.navLabel });

      if (contentObj.content && contentObj.content.type) {
        switch (contentObj.content.type) {
          case 'blog':
            featuredItem = _react2['default'].createElement(_ContentBoxBlogItemJs2['default'], { feature: contentObj,
              className: this.props.className, classes: classes, navLabel: this.props.navLabel });
            break;
          case 'event-program':
            featuredItem = _react2['default'].createElement(_ContentBoxEventProgramItemJs2['default'], { feature: contentObj,
              className: this.props.className, classes: classes, navLabel: this.props.navLabel });
            break;
          case 'event-exhibition':
            featuredItem = _react2['default'].createElement(_ContentBoxExhibitionItemJs2['default'], { feature: contentObj,
              className: this.props.className, classes: classes, navLabel: this.props.navLabel });
            break;
          default:
            break;
        }
      }

      return featuredItem;
    }
  }]);

  return MegaMenuFeatureItem;
})(_react2['default'].Component);

MegaMenuFeatureItem.defaultProps = {
  lang: 'en',
  className: 'MegaMenu-FeatureItem'
};

exports['default'] = MegaMenuFeatureItem;
module.exports = exports['default'];