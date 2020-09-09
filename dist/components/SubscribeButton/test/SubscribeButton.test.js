"use strict";

var _reactAddonsTestUtils = _interopRequireDefault(require("react-addons-test-utils"));

var _reactDom = _interopRequireDefault(require("react-dom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

jest.dontMock('../SubscribeButton.jsx');

var SubscribeButton = require('../SubscribeButton');

var ReactTestUtils = _reactDom["default"].TestUtils;
describe('SubscribeButton Component', function () {
  var componentInstance = ReactTestUtils.renderIntoDocument( /*#__PURE__*/_reactAddonsTestUtils["default"].createElement(SubscribeButton, {
    label: "Subscribe",
    lang: "en"
  }));
  it('should render', function () {
    expect(componentInstance).toBeDefined();
    expect(componentInstance.refs['SubscribeButton']).toBeDefined();
  });
  it('should render the proper subscribe button', function () {
    var button = ReactTestUtils.scryRenderedDOMComponentsWithTag(componentInstance, 'a');
    console.log(button.length);
  });
});