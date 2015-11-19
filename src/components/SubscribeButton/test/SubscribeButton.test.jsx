jest.dontMock('../SubscribeButton.jsx');

import React from 'react/addons';

var SubscribeButton = require('../SubscribeButton.jsx');
var ReactTestUtils = React.addons.TestUtils;

describe('SubscribeButton Component', function() {
	
	var componentInstance = ReactTestUtils.renderIntoDocument(
    <SubscribeButton label='Subscribe' lang='en' />
  );

  it('should render', function() {
  	expect(componentInstance).toBeDefined();
  	expect(componentInstance.refs['SubscribeButton']).toBeDefined();
  });

  it('should render the proper subscribe button', function() {
  	var button = ReactTestUtils.scryRenderedDOMComponentsWithTag(componentInstance, 'a');
  	console.log(button.length);
  });

});
