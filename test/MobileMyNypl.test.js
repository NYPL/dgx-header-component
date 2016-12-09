import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';

// Import the component that is going to be tested
import MobileMyNypl from './../src/components/MyNypl/MobileMyNypl.js';
// Import related functions
import utils from './../src/utils/utils.js';

describe('<MobileMyNypl> as default', () => {
  let component;

  before(() => {
    component = mount(<MobileMyNypl />);
  });

  it('should have a <div> with class name "MyNypl" as a wrapper', () => {
    expect(component.find('div')).to.have.length(1);
    expect(component.find('.MyNypl').type()).to.equal('div');
  });

  it('should have two <a>. Their class names are "CatalogLink" and "ResearchLink"',
    () => {
      expect(component.find('a')).to.have.length(2);
      expect(component.find('.CatalogLink').type()).to.equal('a');
      expect(component.find('.ResearchLink').type()).to.equal('a');
    }
  );

  it('should have props for isLoggedIn, isOauthLoginActivated, and patronName', () => {
    expect(component.props().isLoggedIn).to.be.defined;
    expect(component.props().isOauthLoginActivated).to.be.defined;
    expect(component.props().patronName).to.be.defined;
  });

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

describe('<MyNypl> with the props isOauthLoginActivated that is set to be true', () => {
  let component;

  before(() => {
    component = shallow(<MobileMyNypl isOauthLoginActivated />);
  });

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
    component = shallow(<MobileMyNypl isLoggedIn />);
  });

  it('should have three <a>. Their class names are "CatalogLink",' +
    '"ResearchLink", and "MobileMyNypl-Catalog-Link"', () => {
    expect(component.find('a')).to.have.length(3);
    expect(component.find('.MobileMyNypl-Catalog-Link').type()).to.equal('a');
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

  it('should have the method "renderLogoutLink" to render the properly log out link',
    () => {
      const renderedInstance = component.instance().renderLogoutLink('https://www.nypl.org');

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
    component = shallow(<MobileMyNypl patronName={'Darren Stewart'} />);
  });

  it('should have a <div> with class name "MobileMyNypl-Greeting". Its text equals to ' +
    '"Hello, Darren Stewart"',
    () => {
      expect(component.find('p')).to.have.length(1);
      expect(component.find('.MyNypl-Patron-Name')).to.be.defined;
      expect(component.find('.MyNypl-Patron-Name').text()).to.equal('HELLO, Darren Stewart');
    }
  );
});
