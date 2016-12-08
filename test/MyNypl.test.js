import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';

// Import the component that is going to be tested
import MyNypl from './../src/components/MyNypl/MyNypl.js';

describe('MyNypl', () => {
  let component;

  before(() => {
     component = shallow(<MyNypl />);
  });

  it('should have a <div> with class name "MyNypl" as a wrapper', () => {
    expect(component.find('div')).to.have.length(1);
    expect(component.find('.MyNypl').name()).to.equal('div');
  });

  it('should have a <ul> with class name "MyNypl-Login-List" as a wrapper for log in links', () => {
    expect(component.find('ul')).to.have.length(1);
    expect(component.find('.MyNypl-Login-List').name()).to.equal('ul');
  });

  it('should have two <li> links', () => {
    expect(component.find('li')).to.have.length(2);
  });

  it('should have two <a> with class names, "MyNypl-Catalog-Btn" and ' +
    '"MyNypl-Research-Btn"', () => {
    expect(component.find('a')).to.have.length(2);
    expect(component.find('.MyNypl-Catalog-Btn').name()).to.equal('a');
    expect(component.find('.MyNypl-Research-Btn').name()).to.equal('a');
  });

  it('should have props for isLoggedIn, isOauthLoginActivated, and patronName', () => {
    expect(component.props().isLoggedIn).to.be.defined;
    expect(component.props().isOauthLoginActivated).to.be.defined;
    expect(component.props().patronName).to.be.defined;
  });

  it('should have the <a> with class name "MyNypl-Catalog-Btn" to have the text equals to ' +
    '"LOG INTO THE CATALOG" as defalut', () => {
    expect(component.find('.MyNypl-Catalog-Btn').text()).to.equal('LOG INTO THE CATALOG');
  });

  it('should have the <a> with class name "MyNypl-Catalog-Btn" to have the href equals to ' +
    '"https://browse.nypl.org/iii/encore/myaccount" as defalut', () => {
    expect(component.find('.MyNypl-Catalog-Btn').props().href).to.equal(
      'https://browse.nypl.org/iii/encore/myaccount'
    );
  });

  it('should have the <a> with class name "MyNypl-Research-Btn" to have the text equals to ' +
    '"LOG INTO THE RESEARCH CATALOG" as defalut', () => {
    expect(component.find('.MyNypl-Research-Btn').text()).to.equal('LOG INTO THE RESEARCH CATALOG');
  });

  it('should have the <a> with class name "MyNypl-Research-Btn" to have the href equals to ' +
    '"https://browse.nypl.org/iii/encore/myaccount" as defalut', () => {
    expect(component.find('.MyNypl-Research-Btn').props().href).to.equal(
      'https://catalog.nypl.org/patroninfo/top'
    );
  });

  // Set isOauthLoginActivated props to be true

  it('should have the <a> with class name "MyNypl-Catalog-Btn" to have the href equals to ' +
    '"https://isso.nypl.org/auth/login?redirect_uri=https://browse.nypl.org/iii/encore/myaccount" ' +
    'if this.props.isOauthLoginActivated is true', () => {
    component.setProps({ isOauthLoginActivated: true });
    expect(component.find('.MyNypl-Catalog-Btn').props().href).to.equal(
      'https://isso.nypl.org/auth/login?redirect_uri=https://browse.nypl.org/iii/encore/myaccount'
    );
  });

  it('should have the <a> with class name "MyNypl-Research-Btn" to have the href equals to ' +
    '"https://isso.nypl.org/auth/login?redirect_uri=https://catalog.nypl.org/patroninfo/top" ' +
    'if this.props.isOauthLoginActivated is true', () => {
    expect(component.find('.MyNypl-Research-Btn').props().href).to.equal(
      'https://isso.nypl.org/auth/login?redirect_uri=https://catalog.nypl.org/patroninfo/top'
    );
  });

  // Set isLoggedIn props to be true

  it('should have three <a> with class names, "MyNypl-Catalog-Btn",' +
    '"MyNypl-Research-Btn", and "MyNypl-Catalog-Link", if this.props.isLoggedIn is true', () => {
    component.setProps({ isLoggedIn: true });
    expect(component.find('a')).to.have.length(3);
    expect(component.find('.MyNypl-Catalog-Link').name()).to.equal('a');
  });

  it('should have the <a> with class name "MyNypl-Catalog-Link" to have the text equals to ' +
    '"Log Out", if this.props.isLoggedIn is true', () => {
    expect(component.find('.MyNypl-Catalog-Link').text()).to.equal('Log Out');
  });

  it('should have the <a> with class name "MyNypl-Catalog-Btn" to have the text equals to ' +
    '"GO TO THE CATALOG", if this.props.isLoggedIn is true', () => {
    expect(component.find('.MyNypl-Catalog-Btn').text()).to.equal('GO TO THE CATALOG');
  });

  it('should have the <a> with class name "MyNypl-Research-Btn" to have the text equals to ' +
    '"GO TO THE RESEARCH CATALOG", if this.props.isLoggedIn is true', () => {
    expect(component.find('.MyNypl-Research-Btn').text()).to.equal('GO TO THE RESEARCH CATALOG');
  });

  it('should have the <a> with class name "MyNypl-Catalog-Btn" to have the href equals to ' +
    '"https://browse.nypl.org/iii/encore/myaccount" if this.props.isLoggedIn is true', () => {
    expect(component.find('.MyNypl-Catalog-Btn').props().href).to.equal(
      'https://browse.nypl.org/iii/encore/myaccount'
    );
  });

  it('should have the <a> with class name "MyNypl-Research-Btn" to have the href equals to ' +
    '"https://catalog.nypl.org/patroninfo/top" if this.props.isLoggedIn is true', () => {
    expect(component.find('.MyNypl-Research-Btn').props().href).to.equal(
      'https://catalog.nypl.org/patroninfo/top'
    );
  });

  //Set a value for props patronName

  it('should have a <p> with class name "MyNypl-Patron-Name" for patron greeting texts,' +
    'if this.props.patronName is not an emptpy string', () => {
    component.setProps({ patronName: 'Mike Stewart' });
    expect(component.find('p')).to.have.length(1);
    expect(component.find('.MyNypl-Patron-Name')).to.be.defined;
  });

});
