/* eslint-env mocha */
import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { mount } from 'enzyme';

// Import the component that is going to be tested
import MobileMyNypl from '../src/components/MyNypl/MobileMyNypl.js';
// Import related functions
import utils from '../src/utils/utils.js';
// Import the configs of the log in links
import configs from '../src/appConfig.js';

const {
  myNyplLinks: {
    catalog,
    research,
    logOutLink,
  },
} = configs;

describe('MobileMyNypl', () => {
  describe('<MobileMyNypl> as default', () => {
    let onClick;
    let component;

    before(() => {
      component = mount(<MobileMyNypl />);
    });

    beforeEach(() => {
      onClick = sinon.spy(utils, 'trackHeader');
    });

    afterEach(() => {
      onClick.restore();
    });

    it('should have a <div> with class name "MobileMyNypl" as a wrapper', () => {
      expect(component.find('div.mobileMyNypl').type()).to.equal('div');
    });

    it('should have two <a>. Their class names are "CatalogLink" and "ResearchLink"',
      () => {
        expect(component.find('a')).to.have.length(2);
        expect(component.find('.catalogLink').type()).to.equal('a');
        expect(component.find('.researchLink').type()).to.equal('a');
      }
    );

    it('should have props with default values of isLoggedIn, patronName, ' +
      'and logOutLink', () => {
      expect(component.props().isLoggedIn).to.equal(false);
      expect(component.props().patronName).to.equal('');
    });

    // Temporary (?) skip because cookie login is not supported in Vega
    // and "log in" should not be displayed in the UI.
    it.skip('should have an <a> with class name "CatalogLink". Its text equals ' +
      '"Log in to your accountLOG INTO THE CATALOG"', () => {
      expect(component.find('.catalogLink').text())
        .to.equal('Log in to your accountLOG INTO THE CATALOG');
    });

    // Temporary (?) skip because cookie login is not supported in Vega
    // and "log in" should not be displayed in the UI.
    it.skip('should have the <a> with class name "CatalogLink". Its href equals ' +
      '"https://beta-oauth.nypl.org/auth/login?redirect_uri=https://browse.nypl.org/iii/encore/myaccount"',
      () => {
        expect(component.find('.catalogLink').props().href).to.equal(
          catalog
        );
      }
    );

    // Temporary (?) skip because cookie login is not supported in Vega
    // and "log in" should not be displayed in the UI.
    it.skip('should have the <a> with class name "ResearchLink". Its text equals ' +
      '"NYPL Building IconLOG INTO THE RESEARCH CATALOG"', () => {
      expect(component.find('.researchLink').text())
        .to.equal('NYPL Building IconLOG INTO THE RESEARCH CATALOG');
    });

    // Temporary (?) skip because cookie login is not supported in Vega
    // and "log in" should not be displayed in the UI.
    it.skip('should have the <a> with class name "ResearchLink". Its href equals to ' +
      '"https://beta-oauth.nypl.org/auth/login?redirect_uri=https://catalog.nypl.org/patroninfo/top"',
      () => {
        expect(component.find('.researchLink').props().href).to.equal(
          research
        );
      }
    );

    // Temporary (?) skip because cookie login is not supported in Vega
    // and "log in" should not be displayed in the UI.
    it.skip('should call GA event tracker when "CatalogLink" is clicked', () => {
      component.find('.catalogLink').simulate('click');
      expect(onClick.calledOnce).to.equal(true);
      expect(onClick.calledWith('Mobile Log In', 'Catalog')).to.equal(true);
    });

    // Temporary (?) skip because cookie login is not supported in Vega
    // and "log in" should not be displayed in the UI.
    it.skip('should call GA event tracker when "ResearchLink" is clicked', () => {
      component.find('.researchLink').simulate('click');
      expect(onClick.calledOnce).to.equal(true);
      expect(onClick.calledWith('Mobile Log In', 'Research')).to.equal(true);
    });
  });

  describe('<MobileMyNypl> with the prop isLoggedIn that is set to be true', () => {
    let onClick;
    let component;

    before(() => {
      component = mount(
        <MobileMyNypl isLoggedIn />
      );
    });

    beforeEach(() => {
      onClick = sinon.spy(utils, 'trackHeader');
    });

    afterEach(() => {
      onClick.restore();
    });

    // Temporary (?) skip because the logout link will not display.
    it.skip('should have props isLoggedIn equals true and logOutLink equals' +
      '"https://beta-oauth.nypl.org/auth/logout"',
      () => {
        expect(component.props().isLoggedIn).to.equal(true);
        expect(component.props().logOutLink).to.equal(
          logOutLink
        );
      }
    );

    it('should have two <a>. Their class names are "CatalogLink", "ResearchLink"', () => {
      expect(component.find('a')).to.have.length(2);
      expect(component.find('.catalogLink').type()).to.equal('a');
      expect(component.find('.researchLink').type()).to.equal('a');
    });

    // Temporary (?) skip because cookie login is not supported in Vega
    // and "log in" should not be displayed in the UI.
    it.skip('should have the <a> with class name "CatalogLink". Its text equals ' +
      '"Log in to your accountGO TO THE CATALOG"', () => {
      expect(component.find('.catalogLink').text())
        .to.equal('Log in to your accountGO TO THE CATALOG');
    });

    // Temporary (?) skip because cookie login is not supported in Vega
    // and "log in" should not be displayed in the UI.
    it.skip('should have the <a> with class name "ResearchLink". Its text equals ' +
      '"NYPL Building IconGO TO THE RESEARCH CATALOG"', () => {
      expect(component.find('.researchLink').text())
        .to.equal('NYPL Building IconGO TO THE RESEARCH CATALOG');
    });

    it('should have the <a> with class name "CatalogLink". Its href equals ' +
      '"https://browse.nypl.org/iii/encore/myaccount"', () => {
      expect(component.find('.catalogLink').props().href).to.equal(
        'https://browse.nypl.org/iii/encore/myaccount'
      );
    });

    it('should have the <a> with class name "ResearchLink". Its href equals ' +
      '"https://catalog.nypl.org/patroninfo/top"', () => {
      expect(component.find('.researchLink').props().href).to.equal(
        'https://catalog.nypl.org/patroninfo/top'
      );
    });

    it('should call GA event tracker when "CatalogLink" is clicked', () => {
      component.find('.catalogLink').simulate('click');
      expect(onClick.calledOnce).to.equal(true);
      expect(onClick.calledWith('Mobile Go To', 'Catalog')).to.equal(true);
    });

    it('should call GA event tracker when "ResearchLink" is clicked', () => {
      component.find('.researchLink').simulate('click');
      expect(onClick.calledOnce).to.equal(true);
      expect(onClick.calledWith('Mobile Go To', 'Research')).to.equal(true);
    });

    // Temporary (?) skip because cookie login is not supported in Vega
    // and "log in" should not be displayed in the UI.
    it.skip('should have the method "renderLogOutLink" to render the proper log out link',
      () => {
        // renderLogOutLink() is one of the methods of <MobileMyNypl />. It locates in render()
        // life cycle and renders HTML elements for log out link.
        const renderedInstance = component.instance().renderLogOutLink();

        expect(renderedInstance.type).to.equal('a');
        expect(renderedInstance.props.href).to.equal(
          logOutLink
        );
        expect(renderedInstance.props.className).to.equal('mobileMyNypl-catalog-link');
        expect(renderedInstance.props.children).to.equal('LOG OUT');

        component.find('.mobileMyNypl-catalog-link').simulate('click');
        expect(onClick.calledOnce).to.equal(true);
        expect(onClick.calledWith('My Account', 'Log Out')).to.equal(true);
      }
    );
  });

  describe('<MobileMyNypl> with the prop isLoggedIn that is set to be true and the value of ' +
    'logOutLink is passed',
    () => {
      let component;

      before(() => {
        component = mount(
          <MobileMyNypl
            isLoggedIn
            logOutLink={`${logOutLink}?redirect_uri=https://www.nypl.org`}
          />
        );
      });

      it('should have prop isLoggedIn equals true, and logOutLink equals ' +
        '"https://beta-oauth.nypl.org/auth/logout?redirect_uri=https://www.nypl.org"',
        () => {
          expect(component.props().isLoggedIn).to.equal(true);
          expect(component.props().logOutLink).to.equal(
            `${logOutLink}?redirect_uri=https://www.nypl.org`
          );
        }
      );

      it('should have two <a>. Their class names are "CatalogLink", "ResearchLink"', () => {
        expect(component.find('a')).to.have.length(2);
        expect(component.find('.catalogLink').type()).to.equal('a');
        expect(component.find('.researchLink').type()).to.equal('a');
      });

      it('should have the <a> with class name "CatalogLink". Its text equals to ' +
        '"Log in to your accountGO TO THE CATALOG"', () => {
        expect(component.find('.catalogLink')
          .text()).to.equal('Log in to your accountGO TO THE CATALOG');
      });

      it.skip('should have the <a> with class name "ResearchLink". Its text equals to ' +
        '"NYPL Building IconGO TO THE RESEARCH CATALOG"', () => {
        expect(component.find('.researchLink').text())
          .to.equal('NYPL Building IconGO TO THE RESEARCH CATALOG');
      });

      it('should have the <a> with class name "CatalogLink". Its href equals to ' +
        '"https://browse.nypl.org/iii/encore/myaccount"', () => {
        expect(component.find('.catalogLink').props().href).to.equal(
          'https://browse.nypl.org/iii/encore/myaccount'
        );
      });

      it('should have the <a> with class name "ResearchLink". Its href equals to ' +
        '"https://catalog.nypl.org/patroninfo/top"', () => {
        expect(component.find('.researchLink').props().href).to.equal(
          'https://catalog.nypl.org/patroninfo/top'
        );
      });

      // Temporary (?) skip because cookie login is not supported in Vega
      // and "log in" should not be displayed in the UI.
      it.skip('should have the method "renderLogOutLink" to render the proper log out link',
        () => {
          // renderLogOutLink() is one of the methods of <MobileMyNypl />. It locates in render()
          // life cycle and renders HTML elements for log out link.
          const renderedInstance = component.instance().renderLogOutLink();

          expect(renderedInstance.type).to.equal('a');
          expect(renderedInstance.props.href).to.equal(
            `${logOutLink}?redirect_uri=https://www.nypl.org`
          );
          expect(renderedInstance.props.className).to.equal('mobileMyNypl-catalog-link');
          expect(renderedInstance.props.children).to.equal('LOG OUT');

          const onClick = sinon.spy(utils, 'trackHeader');

          component.find('.mobileMyNypl-catalog-link').simulate('click');
          expect(onClick.calledOnce).to.equal(true);
          expect(onClick.calledWith('My Account', 'Log Out')).to.equal(true);

          onClick.restore();
        }
      );
    }
  );

  // Temporary (?) skip because cookie login is not supported in Vega
  // and "log in" should not be displayed in the UI.
  describe.skip('<MobileMyNypl> with the props patronName that has valid value but isLoggedIn is false',
    () => {
      let component;

      before(() => {
        component = mount(<MobileMyNypl patronName={'Darren Stewart'} />);
      });

      it('should have props patronName equals "Darren Stewart"',
        () => {
          expect(component.props().patronName).to.equal('Darren Stewart');
        }
      );

      it('should not render the <p> for patron greeting',
        () => {
          expect(component.find('p')).to.have.length(0);
        }
      );
    }
  );
  // Temporary (?) skip because cookie login is not supported in Vega
      // and "log in" should not be displayed in the UI.
  describe.skip('<MobileMyNypl> with the props patronName that has valid value and isLoggedIn is true',
    () => {
      let component;

      before(() => {
        component = mount(<MobileMyNypl isLoggedIn patronName={'Stewart, Darren'} />);
      });

      it('should have props patronName equals "Stewart, Darren"',
        () => {
          expect(component.props().patronName).to.equal('Stewart, Darren');
        }
      );

      it('should have a <div> with class name "MobileMyNypl-Greeting". It has two <p>' +
        'and their texts equal to "You are logged in as:" and "Stewart, Darren"',
        () => {
          expect(component.find('.mobileMyNypl-greeting').type()).to.equal('div');
          expect(component.find('p')).to.have.length(2);
          expect(component.find('.login-indication').text()).to.equal('You are logged in as:');
          expect(component.find('.login-name').text()).to.equal('Stewart, Darren');
        }
      );
    }
  );
});
