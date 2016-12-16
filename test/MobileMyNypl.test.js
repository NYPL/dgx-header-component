import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';

// Import the component that is going to be tested
import MobileMyNypl from './../src/components/MyNypl/MobileMyNypl.js';
// Import related functions
import utils from './../src/utils/utils.js';

describe('MobileMyNypl', () => {
  describe('<MobileMyNypl> as default', () => {
    let component;

    before(() => {
      component = mount(<MobileMyNypl />);
    });

    it('should have a <div> with class name "MobileMyNypl" as a wrapper', () => {
      expect(component.find('.MobileMyNypl').type()).to.equal('div');
    });

    it('should have two <a>. Their class names are "CatalogLink" and "ResearchLink"',
      () => {
        expect(component.find('a')).to.have.length(2);
        expect(component.find('.CatalogLink').type()).to.equal('a');
        expect(component.find('.ResearchLink').type()).to.equal('a');
      }
    );

    it('should have props with default values of isLoggedIn, isOauthLoginActivated, patronName, ' +
      'and logOutLink', () => {
        expect(component.props().isLoggedIn).to.equal(false);
        expect(component.props().isOauthLoginActivated).to.equal(false);
        expect(component.props().patronName).to.equal('');
        expect(component.props().logOutLink).to.equal('');
      }
    );

    it('should have an <a> with class name "CatalogLink". Its text equals to ' +
      '"LOG INTO THE CATALOG"', () => {
      expect(component.find('.CatalogLink').text()).to.equal('LOG INTO THE CATALOG');
    });

    it('should have the <a> with class name "CatalogLink". Its href equals to ' +
      '"https://browse.nypl.org/iii/encore/myaccount"', () => {
      expect(component.find('.CatalogLink').props().href).to.equal(
        'https://browse.nypl.org/iii/encore/myaccount'
      );
    });

    it('should have the <a> with class name "ResearchLink". Its text equals to ' +
      '"LOG INTO THE RESEARCH CATALOG"', () => {
      expect(component.find('.ResearchLink').text()).to.equal('LOG INTO THE RESEARCH CATALOG');
    });

    it('should have the <a> with class name "ResearchLink". Its href equals to ' +
      '"https://browse.nypl.org/iii/encore/myaccount"', () => {
      expect(component.find('.ResearchLink').props().href).to.equal(
        'https://catalog.nypl.org/patroninfo/top'
      );
    });
  });

  describe('<MobileMyNypl> with the props isOauthLoginActivated that is set to be true', () => {
    let component;

    before(() => {
      component = mount(<MobileMyNypl isOauthLoginActivated />);
    });

    it('should have props isOauthLoginActivated equals true',
      () => {
        expect(component.props().isOauthLoginActivated).to.equal(true);
      }
    );

    it('should have the <a> with class name "CatalogLink". Its href equals to ' +
      '"https://isso.nypl.org/auth/login?redirect_uri=https://browse.nypl.org/iii/encore/myaccount"',
      () => {
        expect(component.find('.CatalogLink').props().href).to.equal(
          'https://isso.nypl.org/auth/login?redirect_uri=https://browse.nypl.org/iii/encore/myaccount'
        );
      }
    );

    it('should have the <a> with class name "ResearchLink". Its href equals to ' +
      '"https://isso.nypl.org/auth/login?redirect_uri=https://catalog.nypl.org/patroninfo/top" ',
      () => {
        expect(component.find('.ResearchLink').props().href).to.equal(
          'https://isso.nypl.org/auth/login?redirect_uri=https://catalog.nypl.org/patroninfo/top'
        );
      }
    );
  });

  describe('<MobileMyNypl> with the props isLoggedIn that is set to be true', () => {
    let component;

    before(() => {
      component = mount(
        <MobileMyNypl
          isLoggedIn
          logOutLink={'https://isso.nypl.org/auth/logout?redirect_uri=https://www.nypl.org'}
        />
      );
    });

    it('should have props isOauthLoginActivated and isLoggedIn equals true, and logOutLink equals' +
      'https://isso.nypl.org/auth/logout?redirect_uri=https://www.nypl.org',
      () => {
        expect(component.props().isLoggedIn).to.equal(true);
        expect(component.props().logOutLink).to.equal(
          'https://isso.nypl.org/auth/logout?redirect_uri=https://www.nypl.org'
        )
      }
    );

    it('should have three <a>. Their class names are "CatalogLink",' +
      '"ResearchLink", and "MobileMyNypl-Catalog-Link"', () => {
      expect(component.find('a')).to.have.length(3);
      expect(component.find('.MobileMyNypl-Catalog-Link').type()).to.equal('a');
      expect(component.find('.CatalogLink').type()).to.equal('a');
      expect(component.find('.ResearchLink').type()).to.equal('a');
    });

    it('should have the <a> with class name "CatalogLink". Its text equals to ' +
      '"GO TO THE CATALOG"', () => {
      expect(component.find('.CatalogLink').text()).to.equal('GO TO THE CATALOG');
    });

    it('should have the <a> with class name "ResearchLink". Its text equals to ' +
      '"GO TO THE RESEARCH CATALOG"', () => {
      expect(component.find('.ResearchLink').text()).to.equal('GO TO THE RESEARCH CATALOG');
    });

    it('should have the <a> with class name "CatalogLink". Its href equals to ' +
      '"https://browse.nypl.org/iii/encore/myaccount"', () => {
      expect(component.find('.CatalogLink').props().href).to.equal(
        'https://browse.nypl.org/iii/encore/myaccount'
      );
    });

    it('should have the <a> with class name "ResearchLink". Its href equals to ' +
      '"https://catalog.nypl.org/patroninfo/top"', () => {
      expect(component.find('.ResearchLink').props().href).to.equal(
        'https://catalog.nypl.org/patroninfo/top'
      );
    });

    it('should have the method "renderLogOutLink" to render the proper log out link',
      () => {
        // renderLogOutLink() is one of the methods of <MobileMyNypl />. It locates in render()
        // life cycle and renders HTML elements for log out link.
        const renderedInstance = component.instance().renderLogOutLink();

        expect(renderedInstance.type).to.equal('a');
        expect(renderedInstance.props.href).to.equal(
          'https://isso.nypl.org/auth/logout?redirect_uri=https://www.nypl.org'
        );
        expect(renderedInstance.props.className).to.equal('MobileMyNypl-Catalog-Link');
        expect(renderedInstance.props.children).to.equal('Log Out');

        const onClick = sinon.spy(utils, 'trackHeader');

        component.find('.MobileMyNypl-Catalog-Link').simulate('click');
        expect(onClick.called);

        onClick.restore();
      }
    );
  });

  describe('<MobileMyNypl> with the props patronName that has valid value', () => {
    let component;

    before(() => {
      component = mount(<MobileMyNypl patronName={'Darren Stewart'} />);
    });

    it('should have props patronName equals "Darren Stewart"',
      () => {
        expect(component.props().patronName).to.equal('Darren Stewart');
      }
    );

    it('should have a <div> with class name "MobileMyNypl-Greeting". It has a <p> and its text ' +
      'equals to "HELLO, Darren Stewart"',
      () => {
        expect(component.find('.MobileMyNypl-Greeting').type()).to.equal('div');
        expect(component.find('p')).to.have.length(1);
        expect(component.find('p').text()).to.equal('HELLO, Darren Stewart');
      }
    );
  });
});
