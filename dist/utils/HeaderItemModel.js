'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _ContentModelJs = require('./ContentModel.js');

var _ContentModelJs2 = _interopRequireDefault(_ContentModelJs);

function Model() {
  var _this = this;

  // Build an array of header item models or a single one
  this.build = function (data) {
    if (!data) {
      return;
    }

    if (_underscore2['default'].isArray(data) && data.length > 0) {
      return _underscore2['default'].map(data, _this.headerItemModel);
    } else if (_underscore2['default'].isObject(data) && !_underscore2['default'].isEmpty(data)) {
      return _this.headerItemModel(data);
    } else {
      return;
    }
  };

  // The main modeling function
  this.headerItemModel = function (data) {
    var headerItem = {};

    // Top level header-item attributes
    headerItem.id = data.id;
    headerItem.type = data.type;
    headerItem.link = data.attributes.link;
    headerItem.name = data.attributes.name;
    headerItem.sort = data.attributes.sort;

    // Sub navigation header items
    if (data.children) {
      // The subnavigation is made up of header items as well
      headerItem.subnav = _this.mapArrayData(data.children, _this.headerItemModel);
    }

    // The features if they are available
    if (data['related-mega-menu-panes']) {
      headerItem.features = _this.mapArrayData(data['related-mega-menu-panes'], _this.feature);
    }

    return headerItem;
  };

  // Map a data set to a function.
  this.mapArrayData = function (data, fn) {
    if (!data || !_underscore2['default'].isArray(data)) {
      return;
    }

    return _underscore2['default'].map(data, fn);
  };

  // Create the featured slot in the mega menu
  this.feature = function (data) {
    if (!data) {
      return;
    }

    var feature = {},
        featuredItem = data['current-mega-menu-item'] ? data['current-mega-menu-item'] : data['default-mega-menu-item'];

    feature.id = data.id;
    feature.type = data.type;

    feature.featuredItem = _this.createFeatureItem(featuredItem);

    return feature;
  };

  this.createFeatureItem = function (data) {
    if (!data) {
      return;
    }

    var featuredItem = {};

    featuredItem.id = data.id;
    featuredItem.type = data.type;
    featuredItem.category = data.attributes.category;
    featuredItem.link = data.attributes.link;
    featuredItem.description = data.attributes.description;
    featuredItem.headline = data.attributes.headline;
    featuredItem.dates = {
      start: data.attributes['display-date-start'],
      end: data.attributes['display-date-end']
    };

    if (data.images) {
      featuredItem.images = _underscore2['default'].map(data.images, _ContentModelJs2['default'].image);
    }

    if (data['related-content']) {
      featuredItem.content = _ContentModelJs2['default'].content(data['related-content']);
    }

    return featuredItem;
  };
}

exports['default'] = new Model();
module.exports = exports['default'];