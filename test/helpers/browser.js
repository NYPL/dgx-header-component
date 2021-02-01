require('@babel/register')();

const { jsdom } = require('jsdom');

const exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('', { runScripts: "dangerously" });
const { document } = global;
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js',
};

const noop = () => {};
require.extensions[".png"] = noop;

const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
Enzyme.configure({ adapter: new Adapter() });
