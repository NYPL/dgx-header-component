'use strict';

var _addons = require('react/addons');

var _addons2 = _interopRequireDefault(_addons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.dontMock('../SubscribeButton.jsx');

var SubscribeButton = require('../SubscribeButton.jsx');
var ReactTestUtils = _addons2.default.addons.TestUtils;

describe('SubscribeButton Component', function () {

  var componentInstance = ReactTestUtils.renderIntoDocument(_addons2.default.createElement(SubscribeButton, { label: 'Subscribe', lang: 'en' }));

  it('should render', function () {
    expect(componentInstance).toBeDefined();
    expect(componentInstance.refs['SubscribeButton']).toBeDefined();
  });

  it('should render the proper subscribe button', function () {
    var button = ReactTestUtils.scryRenderedDOMComponentsWithTag(componentInstance, 'a');
    console.log(button.length);
  });
});