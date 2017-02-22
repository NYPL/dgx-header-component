/* eslint-env mocha */
import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { mount } from 'enzyme';

// Import the component that is going to be tested
import MobileMyNypl from './../src/components/MyNypl/MobileMyNypl.js';
// Import related functions
import utils from './../src/utils/utils.js';

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
      expect(component.find('.MobileMyNypl').type()).to.equal('div');
    });

    it('should have two <a>. Their class names are "CatalogLink" and "ResearchLink"',
      () => {
        expect(component.find('a')).to.have.length(2);
        expect(component.find('.CatalogLink').type()).to.equal('a');
        expect(component.find('.ResearchLink').type()).to.equal('a');
      }
    );

    it('should have props with default values of isLoggedIn, patronName, ' +
      'and logOutLink', () => {
      expect(component.props().isLoggedIn).to.equal(false);
      expect(component.props().patronName).to.equal('');
      expect(component.props().logOutLink).to.equal('https://isso.nypl.org/auth/logout');
    });

    it('should have an <a> with class name "CatalogLink". Its text equals ' +
      '"LOG INTO THE CATALOG"', () => {
      expect(component.find('.CatalogLink').text()).to.equal('LOG INTO THE CATALOG');
    });

    it('should have the <a> with class name "CatalogLink". Its href equals ' +
      '"https://isso.nypl.org/auth/login?redirect_uri=https://browse.nypl.org/iii/encore/myaccount"',
      () => {
        expect(component.find('.CatalogLink').props().href).to.equal(
          'https://isso.nypl.org/auth/login?redirect_uri=https://browse.nypl.org/iii/encore/myaccount'
        );
      }
    );

    it('should have the <a> with class name "ResearchLink". Its text equals ' +
      '"LOG INTO THE RESEARCH CATALOG"', () => {
      expect(component.find('.ResearchLink').text()).to.equal('LOG INTO THE RESEARCH CATALOG');
    });

    it('should have the <a> with class name "ResearchLink". Its href equals to ' +
      '"https://isso.nypl.org/auth/login?redirect_uri=https://catalog.nypl.org/patroninfo/top"',
      () => {
        expect(component.find('.ResearchLink').props().href).to.equal(
          'https://isso.nypl.org/auth/login?redirect_uri=https://catalog.nypl.org/patroninfo/top'
        );
      }
    );

    it('should call GA event tracker when "CatalogLink" is clicked', () => {
      component.find('.CatalogLink').simulate('click');
      expect(onClick.calledOnce).to.equal(true);
      expect(onClick.calledWith('Mobile Log In', 'Catalog')).to.equal(true);
    });

    it('should call GA event tracker when "ResearchLink" is clicked', () => {
      component.find('.ResearchLink').simulate('click');
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

    it('should have props isLoggedIn equals true and logOutLink equals' +
      '"https://isso.nypl.org/auth/logout"',
      () => {
        expect(component.props().isLoggedIn).to.equal(true);
        expect(component.props().logOutLink).to.equal(
          'https://isso.nypl.org/auth/logout'
        );
      }
    );

    it('should have three <a>. Their class names are "CatalogLink",' +
      '"ResearchLink", and "MobileMyNypl-Catalog-Link"', () => {
      expect(component.find('a')).to.have.length(3);
      expect(component.find('.MobileMyNypl-Catalog-Link').type()).to.equal('a');
      expect(component.find('.CatalogLink').type()).to.equal('a');
      expect(component.find('.ResearchLink').type()).to.equal('a');
    });

    it('should have the <a> with class name "CatalogLink". Its text equals ' +
      '"GO TO THE CATALOG"', () => {
      expect(component.find('.CatalogLink').text()).to.equal('GO TO THE CATALOG');
    });

    it('should have the <a> with class name "ResearchLink". Its text equals ' +
      '"GO TO THE RESEARCH CATALOG"', () => {
      expect(component.find('.ResearchLink').text()).to.equal('GO TO THE RESEARCH CATALOG');
    });

    it('should have the <a> with class name "CatalogLink". Its href equals ' +
      '"https://browse.nypl.org/iii/encore/myaccount"', () => {
      expect(component.find('.CatalogLink').props().href).to.equal(
        'https://browse.nypl.org/iii/encore/myaccount'
      );
    });

    it('should have the <a> with class name "ResearchLink". Its href equals ' +
      '"https://catalog.nypl.org/patroninfo/top"', () => {
      expect(component.find('.ResearchLink').props().href).to.equal(
        'https://catalog.nypl.org/patroninfo/top'
      );
    });

    it('should call GA event tracker when "CatalogLink" is clicked', () => {
      component.find('.CatalogLink').simulate('click');
      expect(onClick.calledOnce).to.equal(true);
      expect(onClick.calledWith('Mobile Go To', 'Catalog')).to.equal(true);
    });

    it('should call GA event tracker when "ResearchLink" is clicked', () => {
      component.find('.ResearchLink').simulate('click');
      expect(onClick.calledOnce).to.equal(true);
      expect(onClick.calledWith('Mobile Go To', 'Research')).to.equal(true);
    });

    it('should have the method "renderLogOutLink" to render the proper log out link',
      () => {
        // renderLogOutLink() is one of the methods of <MobileMyNypl />. It locates in render()
        // life cycle and renders HTML elements for log out link.
        const renderedInstance = component.instance().renderLogOutLink();

        expect(renderedInstance.type).to.equal('a');
        expect(renderedInstance.props.href).to.equal(
          'https://isso.nypl.org/auth/logout'
        );
        expect(renderedInstance.props.className).to.equal('MobileMyNypl-Catalog-Link');
        expect(renderedInstance.props.children).to.equal('LOG OUT');

        component.find('.MobileMyNypl-Catalog-Link').simulate('click');
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
            logOutLink={'https://isso.nypl.org/auth/logout?redirect_uri=https://www.nypl.org'}
          />
        );
      });

      it('should have prop isLoggedIn equals true, and logOutLink equals ' +
        '"https://isso.nypl.org/auth/logout?redirect_uri=https://www.nypl.org"',
        () => {
          expect(component.props().isLoggedIn).to.equal(true);
          expect(component.props().logOutLink).to.equal(
            'https://isso.nypl.org/auth/logout?redirect_uri=https://www.nypl.org'
          );
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
          expect(renderedInstance.props.children).to.equal('LOG OUT');

          const onClick = sinon.spy(utils, 'trackHeader');

          component.find('.MobileMyNypl-Catalog-Link').simulate('click');
          expect(onClick.calledOnce).to.equal(true);
          expect(onClick.calledWith('My Account', 'Log Out')).to.equal(true);

          onClick.restore();
        }
      );
    }
  );

  describe('<MobileMyNypl> with the props patronName that has valid value but isLoggedIn is false',
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

  describe('<MobileMyNypl> with the props patronName that has valid value and isLoggedIn is true',
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
          expect(component.find('.MobileMyNypl-Greeting').type()).to.equal('div');
          expect(component.find('p')).to.have.length(2);
          expect(component.find('.Login-Indication').text()).to.equal('You are logged in as:');
          expect(component.find('.Login-Name').text()).to.equal('Stewart, Darren');
        }
      );
    }
  );
});