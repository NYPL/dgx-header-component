import React from 'react-addons-test-utils';
import ReactDOM from 'react-dom';

jest.dontMock('../SubscribeButton.jsx');

const SubscribeButton = require('../SubscribeButton');
const ReactTestUtils = ReactDOM.TestUtils;

describe('SubscribeButton Component', () => {
  const componentInstance = ReactTestUtils.renderIntoDocument(
    <SubscribeButton label='Subscribe' lang='en' />,
  );

  it('should render', () => {
    expect(componentInstance).toBeDefined();
    expect(componentInstance.refs['SubscribeButton']).toBeDefined();
  });

  it('should render the proper subscribe button', () => {
    const button = ReactTestUtils.scryRenderedDOMComponentsWithTag(componentInstance, 'a');
    console.log(button.length);
  });

});
