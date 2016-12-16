import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';

// Import the component that is going to be tested
import MyNypl from './../src/components/MyNypl/MyNypl.js';
// Import related functions
import utils from './../src/utils/utils.js';

describe('MyNypl', () => {
  describe('<MyNypl> as default', () => {
    let component;

    before(() => {
      component = mount(<MyNypl />);
    });

    it('should have a <div> with class name "MyNypl" as a wrapper', () => {
      expect(component.find('div')).to.have.length(1);
      expect(component.find('.MyNypl').type()).to.equal('div');
    });

    it('should have a <ul> with class name "MyNypl-Login-List" as a wrapper for log in links',
      () => {
        expect(component.find('ul')).to.have.length(1);
        expect(component.find('.MyNypl-Login-List').type()).to.equal('ul');
      }
    );

    it('should have two <li> links', () => {
      expect(component.find('li')).to.have.length(2);
    });

    it('should have two <a>. Their class names are "MyNypl-Catalog-Btn" and "MyNypl-Research-Btn"',
      () => {
        expect(component.find('a')).to.have.length(2);
        expect(component.find('.MyNypl-Catalog-Btn').type()).to.equal('a');
        expect(component.find('.MyNypl-Research-Btn').type()).to.equal('a');
      }
    );

    it('should have props with default values of isLoggedIn, isOauthLoginActivated, patronName, ' +
      'and logOutLink', () => {
        expect(component.props().isLoggedIn).to.equal(false);
        expect(component.props().isOauthLoginActivated).to.equal(false);
        expect(component.props().patronName).to.equal('');
        expect(component.props().logOutLink).to.equal('https://isso.nypl.org/auth/logout');
      }
    );

    it('should have an <a> with class name "MyNypl-Catalog-Btn". Its text equals to ' +
      '"LOG INTO THE CATALOG"', () => {
      expect(component.find('.MyNypl-Catalog-Btn').text()).to.equal('LOG INTO THE CATALOG');
    });

    it('should have the <a> with class name "MyNypl-Catalog-Btn". Its href equals to ' +
      '"https://browse.nypl.org/iii/encore/myaccount"', () => {
      expect(component.find('.MyNypl-Catalog-Btn').props().href).to.equal(
        'https://browse.nypl.org/iii/encore/myaccount'
      );
    });

    it('should have the <a> with class name "MyNypl-Research-Btn". Its text equals to ' +
      '"LOG INTO THE RESEARCH CATALOG"', () => {
      expect(component.find('.MyNypl-Research-Btn').text()).to.equal('LOG INTO THE RESEARCH CATALOG');
    });

    it('should have the <a> with class name "MyNypl-Research-Btn". Its href equals to ' +
      '"https://browse.nypl.org/iii/encore/myaccount"', () => {
      expect(component.find('.MyNypl-Research-Btn').props().href).to.equal(
        'https://catalog.nypl.org/patroninfo/top'
      );
    });
  });

  describe('<MyNypl> with the props isOauthLoginActivated that is set to be true', () => {
    let component;

    before(() => {
      component = mount(<MyNypl isOauthLoginActivated />);
    });

    it('should have props isOauthLoginActivated equals true',
      () => {
        expect(component.props().isOauthLoginActivated).to.equal(true);
      }
    );

    it('should have the <a> with class name "MyNypl-Catalog-Btn". Its href equals to ' +
      '"https://isso.nypl.org/auth/login?redirect_uri=https://browse.nypl.org/iii/encore/myaccount"',
      () => {
        expect(component.find('.MyNypl-Catalog-Btn').props().href).to.equal(
          'https://isso.nypl.org/auth/login?redirect_uri=https://browse.nypl.org/iii/encore/myaccount'
        );
      }
    );

    it('should have the <a> with class name "MyNypl-Research-Btn". Its href equals to ' +
      '"https://isso.nypl.org/auth/login?redirect_uri=https://catalog.nypl.org/patroninfo/top" ',
      () => {
        expect(component.find('.MyNypl-Research-Btn').props().href).to.equal(
          'https://isso.nypl.org/auth/login?redirect_uri=https://catalog.nypl.org/patroninfo/top'
        );
      }
    );
  });

  describe('<MyNypl> with the props isLoggedIn that is set to be true', () => {
    let component;

    before(() => {
      component = mount(
        <MyNypl
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

    it('should have three <a>. Their class names are "MyNypl-Catalog-Btn",' +
      '"MyNypl-Research-Btn", and "MyNypl-Catalog-Link"', () => {
      expect(component.find('a')).to.have.length(3);
      expect(component.find('.MyNypl-Catalog-Link').type()).to.equal('a');
      expect(component.find('.MyNypl-Catalog-Btn').type()).to.equal('a');
      expect(component.find('.MyNypl-Research-Btn').type()).to.equal('a');
    });

    it('should have the <a> with class name "MyNypl-Catalog-Btn". Its text equals to ' +
      '"GO TO THE CATALOG"', () => {
      expect(component.find('.MyNypl-Catalog-Btn').text()).to.equal('GO TO THE CATALOG');
    });

    it('should have the <a> with class name "MyNypl-Research-Btn". Its text equals to ' +
      '"GO TO THE RESEARCH CATALOG"', () => {
      expect(component.find('.MyNypl-Research-Btn').text()).to.equal('GO TO THE RESEARCH CATALOG');
    });

    it('should have the <a> with class name "MyNypl-Catalog-Btn". Its href equals to ' +
      '"https://browse.nypl.org/iii/encore/myaccount"', () => {
      expect(component.find('.MyNypl-Catalog-Btn').props().href).to.equal(
        'https://browse.nypl.org/iii/encore/myaccount'
      );
    });

    it('should have the <a> with class name "MyNypl-Research-Btn". Its href equals to ' +
      '"https://catalog.nypl.org/patroninfo/top"', () => {
      expect(component.find('.MyNypl-Research-Btn').props().href).to.equal(
        'https://catalog.nypl.org/patroninfo/top'
      );
    });

    it('should have the method "renderLogOutLink" to render the proper log out link',
      () => {
        // renderLogOutLink() is one of the methods of <MobileMyNypl />. It locates in the render()
        // life cycle and renders HTML elements for log out link.
        const renderedInstance = component.instance().renderLogOutLink();

        expect(renderedInstance.type).to.equal('a');
        expect(renderedInstance.props.href).to.equal(
          'https://isso.nypl.org/auth/logout?redirect_uri=https://www.nypl.org'
        );
        expect(renderedInstance.props.className).to.equal('MyNypl-Catalog-Link');
        expect(renderedInstance.props.children).to.equal('Log Out');

        const onClick = sinon.spy(utils, 'trackHeader');

        component.find('.MyNypl-Catalog-Link').simulate('click');
        expect(onClick.called);

        onClick.restore();
      }
    );
  });

  describe('<MyNypl> with the props patronName that has valid value', () => {
    let component;

    before(() => {
      component = mount(<MyNypl patronName={'Darren Stewart'} />);
    });

    it('should have props patronName equals "Darren Stewart"',
      () => {
        expect(component.props().patronName).to.equal('Darren Stewart');
      }
    );

    it('should have a <p> with class name "MyNypl-Patron-Name". Its text equals to ' +
      '"HELLO, Darren Stewart"',
      () => {
        expect(component.find('p')).to.have.length(1);
        expect(component.find('.MyNypl-Patron-Name')).to.be.defined;
        expect(component.find('.MyNypl-Patron-Name').text()).to.equal('HELLO, Darren Stewart');
      }
    );
  });
});
