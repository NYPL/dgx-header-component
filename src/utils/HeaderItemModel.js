import {
  isObject as _isObject,
  isArray as _isArray,
  isEmpty as _isEmpty,
  each as _each,
  map as _map,
} from 'underscore';
import ContentModel from './ContentModel.js';

function Model() {
  this.setModelSettings = (opts = {}) => {
    this.urlsAbsolute = opts.urlsAbsolute || false;
  };

  // Build an array of header item models or a single one
  this.build = (data, opts = {}) => {
    if (!data) {
      return;
    }

    this.setModelSettings(opts);

    if (_isArray(data) && data.length > 0) {
      return _map(data, this.headerItemModel);
    } else if (_isObject(data) && !_isEmpty(data)) {
      return this.headerItemModel(data);
    }

    return;
  };

  // The main modeling function
  this.headerItemModel = (data) => {
    const headerItem = {};

    // Top level header-item attributes
    headerItem.id = data.id;
    headerItem.type = data.type;
    headerItem.link = this.urlsAbsolute ?
      data.attributes.link : this.validateUrlObjWithKey(data.attributes.link, 'text');
    headerItem.name = data.attributes.name;
    headerItem.sort = data.attributes.sort;

    // Sub navigation header items
    if (data.children) {
      // The subnavigation is made up of header items as well
      headerItem.subnav = this.mapArrayData(data.children, this.headerItemModel);
    }

    // The features if they are available
    if (data['related-container-slots']) {
      headerItem.features = this.mapArrayData(data['related-container-slots'], this.feature);
    }

    return headerItem;
  };

  // Map a data set to a function.
  this.mapArrayData = (data, fn) => {
    if (!data || !_isArray(data)) {
      return;
    }

    return _map(data, fn);
  };

  // Create the featured slot in the mega menu
  this.feature = data => {
    if (!data) {
      return;
    }

    const feature = {};
    const featuredItem = data['current-item'] ?
        data['current-item'] :
        data['default-item'];

    feature.id = data.id;
    feature.type = data.type;

    feature.featuredItem = this.createFeatureItem(featuredItem);

    return feature;
  };

  this.createFeatureItem = (data) => {
    if (!data) {
      return;
    }

    const featuredItem = {};

    featuredItem.id = data.id;
    featuredItem.type = data.type;
    featuredItem.title = data.attributes.title;
    featuredItem.link = this.urlsAbsolute ?
      data.attributes.url : this.validateUrlObjWithKey(data.attributes.url, 'url');
    featuredItem.category = data.attributes.category;
    featuredItem.description = data.attributes.description;
    featuredItem.date = data.attributes.date;
    featuredItem.location = data.attributes.location;
    featuredItem.person = {
      firstName: data.attributes['person-first-name'],
      lastName: data.attributes['person-last-name'],
      title: data.attributes['person-title'],
    };

    if (data['square-image']) {
      featuredItem.images = ContentModel.image(data['square-image']);
    }

    return featuredItem;
  };

  this.validateUrlObjWithKey = (obj, key) => {
    if (_isObject(obj) && !_isEmpty(obj)) {
      _each(obj, (v, k) => {
        if (k === key && typeof v === 'string') {
          obj[k] = this.convertUrlRelative(v);
        } else {
          this.validateUrlObjWithKey(v, key);
        }
      });
    }

    return obj;
  };

  this.convertUrlRelative = (url) => {
    if (typeof url !== 'string') {
      return '#';
    }

    const regex = new RegExp(/^http(s)?\:\/\/(www.)?nypl.org/i);

    // Test regex matching pattern
    return (regex.test(url)) ? url.replace(regex, '') : url;
  };
}

export default new Model();
