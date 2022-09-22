/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import SearchBox from '../src/components/SearchBox/SearchBox';

describe('SearchBox Component', () => {
  describe('Component with default props', () => {
    let component;

    before(() => {
      component = mount(
        <SearchBox className='SearchBox' />
      );
    });

    it('should render component with default values', () => {
      // Confirm search box empty (can not be set by props anyway)
      expect(component.find('input[type="text"]').prop('value')).to.equal('')
      // Confirm search type radio selects first option ('catalog')
      expect(component.find('input[name="catalogWebsiteSearch"]').length).to.equal(3)
      expect(
        component.find("input[name='catalogWebsiteSearch'] + label").at(0).text()
      ).to.equal("Search the Circulation Catalog");
      expect(
        component.find("input[name='catalogWebsiteSearch'] + label").at(1).text()
      ).to.equal("Search the Research Catalog");
      expect(
        component.find("input[name='catalogWebsiteSearch'] + label").at(2).text()
      ).to.equal("Search NYPL.org");
    });
  });

  describe('Component with custom props', () => {
    let component;

    before(() => {
      component = mount(
        <SearchBox className='SearchBox' placeholder='placeholder text' />
      );
    });

    it('should match the property bannerData to the state bannerData and populate', () => {
      expect(component.find('input[type="text"]').prop('value')).to.equal('')
      expect(component.find('input[type="text"]').prop('placeholder')).to.equal('placeholder text')
    })
  })
})
