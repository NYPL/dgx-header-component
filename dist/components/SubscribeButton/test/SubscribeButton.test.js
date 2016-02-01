'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _reactAddons = require('react/addons');

var _reactAddons2 = _interopRequireDefault(_reactAddons);

jest.dontMock('../SubscribeButton.jsx');

var SubscribeButton = require('../SubscribeButton.jsx');
var ReactTestUtils = _reactAddons2['default'].addons.TestUtils;

describe('SubscribeButton Component', function () {

  var componentInstance = ReactTestUtils.renderIntoDocument(_reactAddons2['default'].createElement(SubscribeButton, { label: 'Subscribe', lang: 'en' }));

  it('should render', function () {
    expect(componentInstance).toBeDefined();
    expect(componentInstance.refs['SubscribeButton']).toBeDefined();
  });

  it('should render the proper subscribe button', function () {
    var button = ReactTestUtils.scryRenderedDOMComponentsWithTag(componentInstance, 'a');
    console.log(button.length);
  });
});