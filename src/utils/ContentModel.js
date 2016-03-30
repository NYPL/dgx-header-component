import _ from 'underscore';

function ContentModel() {  
  // Function to get image object.
  this.image = data => {
    if (!data) {
      return;
    }

    let image = {};

    image.id = data.id;
    image.type = data.type;
    image.created = data.attributes['date-created'];
    image.uri = data.attributes.uri['full-uri'];

    return image;
  };

  // Function used to get any type of content - blog, events, node, etc.
  this.content = data => {
    if (!data) {
      return;
    }

    let content = {};

    content.id = data.id;
    content.type = data.type;

    content.uri = data.attributes.uri['full-uri'];

    if (data.type === 'blog') {
      this.blog(content, data)
    }

    if (data.type === 'event-program' || data.type === 'event-exhibition') {
      this.eventExhibition(content, data);
    }

    return content;
  };

  this.blog = (content, data) => {
    content.title = data.attributes.title;
    content.body = data.attributes.body;

    content.authors = _.map(data.authors, this.authors);
  };

  this.authors = data => {
    let authors = {};

    authors.id = data.id;
    authors.type = data.type;
    authors.email = data.attributes.email;
    authors.title = data.attributes.title;
    authors.unit = data.attributes.unit;
    authors.fullName = data.attributes['full-name'];
    authors.firstName = data.attributes['first-name'];
    authors.lastName = data.attributes['last-name'];

    if (data['nypl-location']) {
      authors.location = this.location(data['nypl-location']);
    }

    return authors;
  };

  this.eventExhibition = (content, data) => {
    content.dates = {
      start: data.attributes['start-date'],
      end: data.attributes['end-date'],
    };
    content.name = data.attributes.name;
    content.description = data.attributes.description;
    content.spaceName = data.attributes['space-name'];

    if (data['nypl-location']) {
      content.location = this.location(data.location);
    }
  };

  this.location = data => {
    let location = {};

    location.type = data.type;
    location.id = data.id;
    location.fullName = data.attributes['full-name'];
    location.symbol = data.attributes.symbol;
    location.slug = data.attributes.slug;

    return location;
  };

  this.featureItem = (data, lang) => {
    const item = {};

    item.headline = data.headline ? data.headline[lang].text : '';
    item.category = data.category ? data.category[lang].text : '';
    item.imgSrc = data.images ? data.images[0].uri : '';
    // Assuming that the text is already trimmed we should redo this:
    item.description = data.description ? data.description[lang].text.substring(0, '175') : '';
    item.link = data.link ? data.link[lang].text : '';

    return item;
  };
}

export default new ContentModel();
