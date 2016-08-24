'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ContentModel() {
  var _this = this;

  // Function to get image object.
  this.image = function (data) {
    if (!data) {
      return;
    }

    var image = {};

    image.id = data.id;
    image.type = data.type;
    try {
      var _data$attributes = data.attributes;
      var _data$attributes$date = _data$attributes['date-created'];
      var dateCreated = _data$attributes$date === undefined ? '' : _data$attributes$date;
      var _data$attributes$uri$ = _data$attributes.uri['full-uri'];
      var uri = _data$attributes$uri$ === undefined ? '' : _data$attributes$uri$;


      image.created = dateCreated;
      image.uri = uri;
    } catch (e) {
      image.created = '';
      image.uri = '';
    }

    return image;
  };

  // Function used to get any type of content - blog, events, node, etc.
  this.content = function (data) {
    if (!data) {
      return;
    }

    var content = {};

    content.id = data.id;
    content.type = data.type;

    content.uri = data.attributes.uri['full-uri'];

    if (data.type === 'blog') {
      _this.blog(content, data);
    }

    if (data.type === 'event-program' || data.type === 'event-exhibition') {
      _this.eventExhibition(content, data);
    }

    return content;
  };

  this.blog = function (content, data) {
    content.title = data.attributes.title;
    content.body = data.attributes.body;

    content.authors = _underscore2.default.map(data.authors, _this.authors);
  };

  this.authors = function (data) {
    var authors = {};

    authors.id = data.id;
    authors.type = data.type;
    authors.email = data.attributes.email;
    authors.title = data.attributes.title;
    authors.unit = data.attributes.unit;
    authors.fullName = data.attributes['full-name'];
    authors.firstName = data.attributes['first-name'];
    authors.lastName = data.attributes['last-name'];

    if (data['nypl-location']) {
      authors.location = _this.location(data['nypl-location']);
    }

    return authors;
  };

  this.eventExhibition = function (content, data) {
    content.dates = {
      start: data.attributes['start-date'],
      end: data.attributes['end-date']
    };
    content.name = data.attributes.name;
    content.description = data.attributes.description;
    content.spaceName = data.attributes['space-name'];

    if (data['nypl-location']) {
      content.location = _this.location(data.location);
    }
  };

  this.location = function (data) {
    var location = {};

    location.type = data.type;
    location.id = data.id;
    location.fullName = data.attributes['full-name'];
    location.symbol = data.attributes.symbol;
    location.slug = data.attributes.slug;

    return location;
  };

  this.featureItem = function (data) {
    var lang = arguments.length <= 1 || arguments[1] === undefined ? 'en' : arguments[1];

    if (!data) {
      return {
        title: '',
        link: '',
        category: '',
        description: '',
        date: '',
        location: '',
        person: {},
        image: ''
      };
    }

    var item = {
      title: data.title ? data.title[lang].text : '',
      link: data.link || '',
      category: data.category ? data.category[lang].text : '',
      description: data.description && data.description[lang] ? data.description[lang].text : '',
      date: data.date ? data.date[lang].text : '',
      location: data.location || '',
      person: data.person || '',
      image: data.images || {}
    };

    return item;
  };
}

exports.default = new ContentModel();
module.exports = exports['default'];