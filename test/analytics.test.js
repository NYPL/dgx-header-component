/* eslint-env mocha */
import sinon from 'sinon';
import { expect } from 'chai';
import React from 'react';
import { mount } from 'enzyme';

import { mockExternalDependencies } from './helpers/mocks';

import { Header, navConfig } from '../src/components/Header/Header';

const utils = require('../src/utils/utils');

describe('Google Analytics', function () {
  let gaEvents = null;
  let component = null;
  let mockAxios = null;
  let mockGa = null;

  before(() => {
    // Mock standard external dependencies:
    mockAxios = mockExternalDependencies();

    mockGa = sinon.stub(utils, 'trackHeader').callsFake((action, label, value) => {
      gaEvents.push({
        category: 'Global Header',
        action,
        label,
        value,
      });
    });
  });

  after(() => {
    mockAxios.restore();
    mockGa.restore();
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

  describe('Mobile', () => {
    describe('MyNypl link', () => {
      it('fires "Click" action, "Mobile clickLogIn" label event for non-logged-in user', (done) => {
        const navButton = component.find('button.header-mobile-myNyplButton');
        expect(navButton).to.be.a('object');

        // We can't use ReactWrapper.simulate('click') here because Tappable
        // doesn't attach to clicks; Have to emulate a touch:
        navButton.simulate('mouseDown');

        setTimeout(() => {
          navButton.simulate('mouseUp');

          expect(gaEvents.length).to.equal(1);
          expect(gaEvents[0]).to.be.a('object');
          expect(gaEvents[0].category).to.equal('Global Header');
          expect(gaEvents[0].action).to.equal('Click');
          expect(gaEvents[0].label).to.equal('Mobile clickLogIn');
          expect(gaEvents[0].value).to.equal(undefined);

          done();
        }, 10);
      });

      it('fires "Click" action, "Mobile clickMyAccount" label event for non-logged-in user', (done) => {
        component.setState({
          patronName: 'Patience',
        });
        const navButton = component.find('button.header-mobile-myNyplButton');
        expect(navButton).to.be.a('object');

        // We can't use ReactWrapper.simulate('click') here because Tappable
        // doesn't attach to clicks; Have to emulate a touch:
        navButton.simulate('mouseDown');

        setTimeout(() => {
          navButton.simulate('mouseUp');

          expect(gaEvents.length).to.equal(1);
          expect(gaEvents[0]).to.be.a('object');
          expect(gaEvents[0].category).to.equal('Global Header');
          expect(gaEvents[0].action).to.equal('Click');
          expect(gaEvents[0].label).to.equal('Mobile clickMyAccount');
          expect(gaEvents[0].value).to.equal(undefined);

          done();
        }, 100);
      });
    });

    describe('Locations link', () => {
      it('fires "Click" action, "Mobile Locations Button" label event', () => {
        const navButton = component.find('a.header-mobile-locator');
        expect(navButton).to.be.a('object');

        navButton.simulate('click');

        expect(gaEvents.length).to.equal(1);
        expect(gaEvents[0]).to.be.a('object');
        expect(gaEvents[0].category).to.equal('Global Header');
        expect(gaEvents[0].action).to.equal('Click');
        expect(gaEvents[0].label).to.equal('Mobile Locations Button');
        expect(gaEvents[0].value).to.equal(undefined);
      });
    });

    /*
     * TODO I can't get these two tests to pass due to FocusTrap throwing
     * "Uncaught Error: `initialFocus` refers to no known node" on nodes
     * that absolutely exist and are known so :shruggie:
     *
    describe('Menu button', () => {
      it('fires "??" action, "Mobile ??" label event for non-logged-in user', (done) => {
        // const wrapper = component.find('.header-mobile').getDOMNode();

        const navButton = component.find('button.header-mobile-menuButton');
        expect(navButton).to.be.a('object');

        // We can't use ReactWrapper.simulate('click') here because Tappable
        // doesn't attach to clicks; Have to emulate a touch:
        navButton.simulate('mouseDown');

        setTimeout(() => {
          navButton.simulate('mouseUp');

          expect(gaEvents.length).to.equal(1);
          expect(gaEvents[0]).to.be.a('object');
          expect(gaEvents[0].category).to.equal('Global Header');
          expect(gaEvents[0].action).to.equal('Click');
          expect(gaEvents[0].label).to.equal('Mobile ??');
          expect(gaEvents[0].value).to.equal(undefined);

          done();
        }, 100);
      });
    });

    describe('Search link', () => {
      it('fires "Click" action, "Mobile clickSearch" label event for non-logged-in user', (done) => {
        // const wrapper = component.find('.header-mobile').getDOMNode();

        const navButton = component.find('button.header-mobile-searchButton');
        expect(navButton).to.be.a('object');

        // We can't use ReactWrapper.simulate('click') here because Tappable
        // doesn't attach to clicks; Have to emulate a touch:
        navButton.simulate('mouseDown');

        setTimeout(() => {
          navButton.simulate('mouseUp');
          component.update();

          expect(gaEvents.length).to.equal(1);
          expect(gaEvents[0]).to.be.a('object');
          expect(gaEvents[0].category).to.equal('Global Header');
          expect(gaEvents[0].action).to.equal('Click');
          expect(gaEvents[0].label).to.equal('Mobile clickSearch');
          expect(gaEvents[0].value).to.equal(undefined);

          done();
        }, 100);
      });
    });
    */
  });

  describe('Desktop', () => {
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
      it('fires event with "Locations" action', () => {
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
      it('fires event with "Get a Library Card" action', () => {
        const navButton = component.find('nav.header-buttons a.libraryCardButton');
        expect(navButton).to.be.a('object');

        navButton.simulate('click');

        expect(gaEvents.length).to.equal(1);
        expect(gaEvents[0]).to.be.a('object');
        expect(gaEvents[0].category).to.equal('Global Header');
        expect(gaEvents[0].action).to.equal('Get a Library Card');
        expect(gaEvents[0].label).to.equal('Header Top Links');
        expect(gaEvents[0].value).to.equal(undefined);
      });
    });

    describe('Get Email Updates link', () => {
      it('fires event with "Click" action, "Subscribe - Open" label', () => {
        const navButton = component.find('nav.header-buttons a.subscribeButton');
        expect(navButton).to.be.a('object');

        navButton.simulate('click');

        expect(gaEvents.length).to.equal(1);
        expect(gaEvents[0]).to.be.a('object');
        expect(gaEvents[0].category).to.equal('Global Header');
        expect(gaEvents[0].action).to.equal('Click');
        expect(gaEvents[0].label).to.equal('Subscribe - Open');
        expect(gaEvents[0].value).to.equal(undefined);
      });
    });

    describe('Donate link', () => {
      it('fires event with "Donate" action', () => {
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
      it('fires event with "Shop" action', () => {
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

    describe('Books/Music/Movies link', () => {
      it('fires event with "Go to..." action, "Books/Music/DVDs" label', () => {
        // This is brittle, but seems like the best way to identify the Books/Music/Movies link:
        const navButton = component.find('nav.header-navMenu-wrapper a.navMenuItem-link[href="/books-music-dvds"]');
        expect(navButton.length).to.equal(1);

        navButton.simulate('click');

        expect(gaEvents.length).to.equal(1);
        expect(gaEvents[0]).to.be.a('object');
        expect(gaEvents[0].category).to.equal('Global Header');
        expect(gaEvents[0].action).to.equal('Go to...');
        expect(gaEvents[0].label).to.equal('Books/Music/DVDs');
        expect(gaEvents[0].value).to.equal(undefined);
      });
    });

    describe('Search link', () => {
      it('fires event with "Search" action, "(Open|Close) Menu" label', (done) => {
        // This is brittle, but seems like the best way to identify the Books/Music/Movies link:
        const navButton = component.find('nav.header-navMenu-wrapper button.header-navMenu-searchButton');
        expect(navButton.length).to.equal(1);

        navButton.simulate('click');

        expect(gaEvents.length).to.equal(1);
        expect(gaEvents[0]).to.be.a('object');
        expect(gaEvents[0].category).to.equal('Global Header');
        expect(gaEvents[0].action).to.equal('Search');
        expect(gaEvents[0].label).to.equal('Open Menu');
        expect(gaEvents[0].value).to.equal(undefined);

        navButton.simulate('click');

        // Close event is sent on a 200ms delay, so wait 201ms:
        setTimeout(() => {
          expect(gaEvents.length).to.equal(2);
          expect(gaEvents[1]).to.be.a('object');
          expect(gaEvents[1].category).to.equal('Global Header');
          expect(gaEvents[1].action).to.equal('Search');
          expect(gaEvents[1].label).to.equal('Close Menu');
          expect(gaEvents[1].value).to.equal(undefined);

          done();
        }, 201);
      });
    });
  });
});
