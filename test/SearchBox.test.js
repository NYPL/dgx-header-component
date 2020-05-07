/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import SearchBox from '../src/components/SearchBox/SearchBox';

configure({ adapter: new Adapter() });

describe('SearchBox Component', () => {
  describe('Component with default props', () => {
    let component;

    before(() => {
      component = mount(
        <SearchBox className="SearchBox" />,
      );
    });

    it('should render component with default values', () => {
      // Confirm search box empty (can not be set by props anyway)
      expect(component.find('input[type="text"]').prop('value')).to.equal('');
      // Confirm search type radio selects first option ('catalog')
      expect(component.find('input[name="catalogWebsiteSearch"]').length).to.equal(2);
      expect(component.find('input[name="catalogWebsiteSearch"]').first().prop('checked')).to.equal(true)
      expect(component.find('input[name="catalogWebsiteSearch"]').last().prop('checked')).to.equal(false)
    });
  });

  describe('Component with custom props', () => {
    let component;

    before(() => {
      component = mount(
        <SearchBox className="SearchBox" placeholder="placeholder text" />
      );
    });

    it('should match the property bannerData to the state bannerData and populate', () => {
      expect(component.find('input[type="text"]').prop('value')).to.equal('')
      expect(component.find('input[type="text"]').prop('placeholder')).to.equal('placeholder text')
    });
  });
});
