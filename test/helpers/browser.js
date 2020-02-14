require('babel-register')();

const jsdom = require("jsdom");
const enzyme = require("enzyme");
const Adapter = require("enzyme-adapter-react-16");

enzyme.configure({ adapter: new Adapter() });

const doc = jsdom.jsdom('');
const win = doc.defaultView;

global["document"] = doc;
global["window"] = win;

Object.keys(window).forEach((key) => {
  if (!(key in global)) {
    global[key] = window[key];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

documentRef = document;
