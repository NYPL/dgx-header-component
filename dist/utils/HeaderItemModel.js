'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _underscore = require('underscore');

var _ContentModelJs = require('./ContentModel.js');

var _ContentModelJs2 = _interopRequireDefault(_ContentModelJs);

function Model() {
  var _this = this;

  this.setModelSettings = function () {
    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _this.urlsAbsolute = opts.urlsAbsolute || false;
  };

  // Build an array of header item models or a single one
  this.build = function (data) {
    var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    if (!data) {
      return;
    }

    _this.setModelSettings(opts);

    if ((0, _underscore.isArray)(data) && data.length > 0) {
      return (0, _underscore.map)(data, _this.headerItemModel);
    } else if ((0, _underscore.isObject)(data) && !(0, _underscore.isEmpty)(data)) {
      return _this.headerItemModel(data);
    }

    return;
  };

  // The main modeling function
  this.headerItemModel = function (data) {
    var headerItem = {};

    // Top level header-item attributes
    headerItem.id = data.id;
    headerItem.type = data.type;
    headerItem.link = _this.urlsAbsolute ? data.attributes.link : _this.validateUrlObjWithKey(data.attributes.link, 'text');
    headerItem.name = data.attributes.name;
    headerItem.sort = data.attributes.sort;

    // Sub navigation header items
    if (data.children) {
      // The subnavigation is made up of header items as well
      headerItem.subnav = _this.mapArrayData(data.children, _this.headerItemModel);
    }

    // The features if they are available
    if (data['related-container-slots']) {
      headerItem.features = _this.mapArrayData(data['related-container-slots'], _this.feature);
    }

    return headerItem;
  };

  // Map a data set to a function.
  this.mapArrayData = function (data, fn) {
    if (!data || !(0, _underscore.isArray)(data)) {
      return;
    }

    return (0, _underscore.map)(data, fn);
  };

  // Create the featured slot in the mega menu
  this.feature = function (data) {
    if (!data) {
      return;
    }

    var feature = {};
    var featuredItem = data['current-item'] ? data['current-item'] : data['default-item'];

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
    featuredItem.title = data.attributes.title;
    featuredItem.link = _this.urlsAbsolute ? data.attributes.url : _this.validateUrlObjWithKey(data.attributes.url, 'url');
    featuredItem.category = data.attributes.category;
    featuredItem.description = data.attributes.description;
    featuredItem.date = data.attributes.date;
    featuredItem.location = data.attributes.location;
    featuredItem.person = {
      firstName: data.attributes['person-first-name'],
      lastName: data.attributes['person-last-name'],
      title: data.attributes['person-title']
    };

    if (data['square-image']) {
      featuredItem.images = _ContentModelJs2['default'].image(data['square-image']);
    }

    return featuredItem;
  };

  this.validateUrlObjWithKey = function (obj, key) {
    if ((0, _underscore.isObject)(obj) && !(0, _underscore.isEmpty)(obj)) {
      (0, _underscore.each)(obj, function (v, k) {
        if (k === key && typeof v === 'string') {
          obj[k] = _this.convertUrlRelative(v);
        } else {
          _this.validateUrlObjWithKey(v, key);
        }
      });
    }

    return obj;
  };

  this.convertUrlRelative = function (url) {
    if (typeof url !== 'string') {
      return '#';
    }

    var regex = new RegExp(/^http(s)?\:\/\/(www.)?nypl.org/i);

    // Test regex matching pattern
    return regex.test(url) ? url.replace(regex, '') : url;
  };
}

exports['default'] = new Model();
module.exports = exports['default'];