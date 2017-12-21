/* eslint-env mocha */
import { expect } from 'chai';
import React from 'react';
import { mount } from 'enzyme';

import { Header, navConfig } from '../src/components/Header/Header';

const utils = require('../src/utils/utils');

describe('Google Analytics', function () {
  this.timeout(10000);

  let gaEvents = null;
  let component = null;

  before(() => {
    utils.trackHeader = (action, label, value) => {
      gaEvents.push({
        category: 'Global Header',
        action,
        label,
        value,
      });
    };
  });

  beforeEach(() => {
    gaEvents = [];

    component = mount(React.createElement(Header, {
      skipNav: { target: 'maincontent' },
      navData: navConfig.current,
    }));

    component.setState({
      patronDataReceived: false,
    });
  });

  describe('MyNypl link', () => {
    it('fires "Log In"/"MyNyplButton - Open" event for non-logged-in user', () => {
      const navButton = component.find('nav.header-buttons .myNyplButton-wrapper a');
      expect(navButton).to.be.a('object');

      navButton.simulate('click');

      expect(gaEvents.length).to.equal(1);
      expect(gaEvents[0]).to.be.a('object');
      expect(gaEvents[0].category).to.equal('Global Header');
      expect(gaEvents[0].action).to.equal('Log In');
      expect(gaEvents[0].label).to.equal('MyNyplButton - Open');
      expect(gaEvents[0].value).to.equal(undefined);
    });

    it('fires "My Account"/"MyNyplButton - Open" event for logged-in user', () => {
      component.setState({
        patronDataReceived: true,
      });
      const navButton = component.find('nav.header-buttons .myNyplButton-wrapper a');
      expect(navButton).to.be.a('object');

      navButton.simulate('click');

      expect(gaEvents.length).to.equal(1);
      expect(gaEvents[0]).to.be.a('object');
      expect(gaEvents[0].category).to.equal('Global Header');
      expect(gaEvents[0].action).to.equal('My Account');
      expect(gaEvents[0].label).to.equal('MyNyplButton - Open');
      expect(gaEvents[0].value).to.equal(undefined);
    });
  });

  describe('Locations link', () => {
    it('fires "Locations" event', () => {
      const navButton = component.find('nav.header-buttons a.locationsTopLink');
      expect(navButton).to.be.a('object');

      navButton.simulate('click');

      expect(gaEvents.length).to.equal(1);
      expect(gaEvents[0]).to.be.a('object');
      expect(gaEvents[0].category).to.equal('Global Header');
      expect(gaEvents[0].action).to.equal('Locations');
      expect(gaEvents[0].label).to.equal('Header Top Links');
      expect(gaEvents[0].value).to.equal(undefined);
    });
  });

  describe('Get a Library Card link', () => {
    it('fires no events', () => {
      const navButton = component.find('nav.header-buttons a.subscribeButton');
      expect(navButton).to.be.a('object');

      navButton.simulate('click');

      expect(gaEvents.length).to.equal(0);
    });
  });

  describe('Donate link', () => {
    it('fires no events', () => {
      const navButton = component.find('nav.header-buttons a.donateButton');
      expect(navButton).to.be.a('object');

      navButton.simulate('click');

      expect(gaEvents.length).to.equal(1);
      expect(gaEvents[0]).to.be.a('object');
      expect(gaEvents[0].category).to.equal('Global Header');
      expect(gaEvents[0].action).to.equal('Donate');
      expect(gaEvents[0].label).to.equal('Header Top Links');
      expect(gaEvents[0].value).to.equal(undefined);
    });
  });

  describe('Shop link', () => {
    it('fires no events', () => {
      const navButton = component.find('nav.header-buttons a.shopTopLink');
      expect(navButton).to.be.a('object');

      navButton.simulate('click');

      expect(gaEvents.length).to.equal(1);
      expect(gaEvents[0]).to.be.a('object');
      expect(gaEvents[0].category).to.equal('Global Header');
      expect(gaEvents[0].action).to.equal('Shop');
      expect(gaEvents[0].label).to.equal('Header Top Links');
      expect(gaEvents[0].value).to.equal(undefined);
    });
  });
});
