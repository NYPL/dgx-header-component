import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';

import axios from 'axios';

// Import the component that is going to be tested
import Header from './../src/components/Header/Header.js';
// Import mock up data
import authApiMockResponse from './authApiMockResponse.js';
// Import related functions
import utils from './../src/utils/utils.js';

describe('<Header>', () => {
  let component;
  let server;

  const mockApi = '/api/v0.1/auth/patron/tokens/eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvd3d3Lm55cGwub3JnIiwic3ViIjoiNjM2NzAyOCIsImF1ZCI6ImFwcF9sb2dpbiIsImlhdCI6MTQ4MjE3NjQ3MCwiZXhwIjoxNDgyMTgwMDcwLCJhdXRoX3RpbWUiOjE0ODIxNzY0NzAsInNjb3BlIjoib3BlbmlkIG9mZmxpbmVfYWNjZXNzIGNvb2tpZSBwYXRyb246cmVhZCJ9.JO7VbOqCC7HyjRmeyHD4zM1Gl0JBk5RdxjAkCp0h6sfVe-xs5FyY7biYqs19k4dUY2DbFYR5IG3xYt9IdhqyMkSnJxtiCY36WN7X_e0eBF2T1_IWKGaBc4JlbroMj5_aNB5W4nQvclrdlb2mV38Q_HGAMUKe8DDeCmAHctEtqGppNl8DC7IvqkekRS_6zgQwsHHW5kJR-f7zUROi4fvFpdNR-I7J4VNWdFIOijb4vXFOOWRLzdY_GHLJdWvSgxhqzwkceA5BScCicAKeHYHo04vabNp5TvPXoR0ypULqTyGYsNnXnUmh2Mu46j3bcNTACEKS97FBx1IfwttBL1ARtQ';
  // it should make an api call if the access token is available
    // call fetchPatronData and fake the result
    // if the result is expired
  // it should refresh the token if the access token is erxpires
  // it should make the call again if the access token is refreshed

  // the test for the function fetchPatronData
  // 1. it returns 200 and data
  // 2. it returns 401 and expire
  //  2.1 it calls the refresh cookie method
  // 3. it returns other errors

  // 1. the refresh method returns 200
  // 1.1 it calls setLoginCookie()
  // 2. it returns errors

  it('should call the API endpoint to get logged in patron\'s data if its state, loginCookie, is not empty' , () => {
    before(() => {
      component = mount(<Header />);
    });

    component.setState({
      loginCookie: '%7B%22access_token%22%3A%22eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvd3d3Lm55cGwub3JnIiwic3ViIjoiNjM2NzAyOCIsImF1ZCI6ImFwcF9sb2dpbiIsImlhdCI6MTQ4MjE3NjQ3MCwiZXhwIjoxNDgyMTgwMDcwLCJhdXRoX3RpbWUiOjE0ODIxNzY0NzAsInNjb3BlIjoib3BlbmlkIG9mZmxpbmVfYWNjZXNzIGNvb2tpZSBwYXRyb246cmVhZCJ9.JO7VbOqCC7HyjRmeyHD4zM1Gl0JBk5RdxjAkCp0h6sfVe-xs5FyY7biYqs19k4dUY2DbFYR5IG3xYt9IdhqyMkSnJxtiCY36WN7X_e0eBF2T1_IWKGaBc4JlbroMj5_aNB5W4nQvclrdlb2mV38Q_HGAMUKe8DDeCmAHctEtqGppNl8DC7IvqkekRS_6zgQwsHHW5kJR-f7zUROi4fvFpdNR-I7J4VNWdFIOijb4vXFOOWRLzdY_GHLJdWvSgxhqzwkceA5BScCicAKeHYHo04vabNp5TvPXoR0ypULqTyGYsNnXnUmh2Mu46j3bcNTACEKS97FBx1IfwttBL1ARtQ%22expires_in%22%3A3600%2C%22token_type%22%3A%22Bearer%22%2C%22scope%22%3A%22openid+offline_access+cookie+patron%3Aread%22%2C%22refresh_token%22%3A%2202b49603a8a2719389a6c77416b110675067827d%22%7D '
    });

    const spy = sinon.spy(Header, 'fetchPatronData');

    expect(spy.called).to.equal(true);
    Header.fetchPatronData.restore();
  });

  before(() => {
    server = sinon.fakeServer.create();
  });

  it('should set the states of patronName, patronInitial, and patronDataReceived if recevied a ' +
    'valid response from Auth API', (done) => {

    const callback = sinon.spy();

    sinon.spyOn(axios, 'get').andReturn({
      done: (callback) => { callback(data); }
    });


    server.respondWith("GET", mockApi, [
      200, {"Content-Type":"application/json"}, JSON.stringify(data)
    ]);

    after(() => {
      server.restore();
    });
    nock('https://api.nypltech.org')
      .get(mockApi)
      .reply(200, authApiMockResponse);

    component = mount(<Header />);

    setTimeout(() => {
      expect(component.state().patronName).to.equal('Stewart, Darren');
      expect(component.state().patronInitial.type()).to.equal('DS');
      expect(component.state().patronDataReceived).to.equal(true);
      nock.cleanAll();
      done();
    }, 1500);
  });
});

//   it('should have a <div> with class name "MyNypl" as a wrapper', () => {
//     expect(component.find('div')).to.have.length(1);
//     expect(component.find('.MyNypl').type()).to.equal('div');
//   });

//   it('should have a <ul> with class name "MyNypl-Login-List" as a wrapper for log in links', () => {
//     expect(component.find('ul')).to.have.length(1);
//     expect(component.find('.MyNypl-Login-List').type()).to.equal('ul');
//   });

//   it('should have two <li> links', () => {
//     expect(component.find('li')).to.have.length(2);
//   });

//   it('should have two <a>. Their class names are "MyNypl-Catalog-Btn" and "MyNypl-Research-Btn"',
//     () => {
//       expect(component.find('a')).to.have.length(2);
//       expect(component.find('.MyNypl-Catalog-Btn').type()).to.equal('a');
//       expect(component.find('.MyNypl-Research-Btn').type()).to.equal('a');
//     }
//   );

//   it('should have props for isLoggedIn, isOauthLoginActivated, and patronName', () => {
//     expect(component.props().isLoggedIn).to.be.defined;
//     expect(component.props().isOauthLoginActivated).to.be.defined;
//     expect(component.props().patronName).to.be.defined;
//   });

//   it('should have an <a> with class name "MyNypl-Catalog-Btn". Its text equals to ' +
//     '"LOG INTO THE CATALOG"', () => {
//     expect(component.find('.MyNypl-Catalog-Btn').text()).to.equal('LOG INTO THE CATALOG');
//   });

//   it('should have the <a> with class name "MyNypl-Catalog-Btn". Its href equals to ' +
//     '"https://browse.nypl.org/iii/encore/myaccount"', () => {
//     expect(component.find('.MyNypl-Catalog-Btn').props().href).to.equal(
//       'https://browse.nypl.org/iii/encore/myaccount'
//     );
//   });

//   it('should have the <a> with class name "MyNypl-Research-Btn". Its text equals to ' +
//     '"LOG INTO THE RESEARCH CATALOG"', () => {
//     expect(component.find('.MyNypl-Research-Btn').text()).to.equal('LOG INTO THE RESEARCH CATALOG');
//   });

//   it('should have the <a> with class name "MyNypl-Research-Btn". Its href equals to ' +
//     '"https://browse.nypl.org/iii/encore/myaccount"', () => {
//     expect(component.find('.MyNypl-Research-Btn').props().href).to.equal(
//       'https://catalog.nypl.org/patroninfo/top'
//     );
//   });
// });

// describe('<MyNypl> with the props isOauthLoginActivated that is set to be true', () => {
//   let component;

//   before(() => {
//     component = shallow(<MyNypl isOauthLoginActivated />);
//   });

//   it('should have the <a> with class name "MyNypl-Catalog-Btn". Its href equals to ' +
//     '"https://isso.nypl.org/auth/login?redirect_uri=https://browse.nypl.org/iii/encore/myaccount"',
//     () => {
//       expect(component.find('.MyNypl-Catalog-Btn').props().href).to.equal(
//         'https://isso.nypl.org/auth/login?redirect_uri=https://browse.nypl.org/iii/encore/myaccount'
//       );
//     }
//   );

//   it('should have the <a> with class name "MyNypl-Research-Btn". Its href equals to ' +
//     '"https://isso.nypl.org/auth/login?redirect_uri=https://catalog.nypl.org/patroninfo/top" ',
//     () => {
//       expect(component.find('.MyNypl-Research-Btn').props().href).to.equal(
//         'https://isso.nypl.org/auth/login?redirect_uri=https://catalog.nypl.org/patroninfo/top'
//       );
//     }
//   );
// });

// describe('<MyNypl> with the props isLoggedIn that is set to be true', () => {
//   let component;

//   before(() => {
//     component = shallow(
//       <MyNypl
//         isLoggedIn
//         logOutLink={'https://isso.nypl.org/auth/logout?redirect_uri=https://www.nypl.org'}
//       />
//     );
//   });

//   it('should have three <a>. Their class names are "MyNypl-Catalog-Btn",' +
//     '"MyNypl-Research-Btn", and "MyNypl-Catalog-Link"', () => {
//     expect(component.find('a')).to.have.length(3);
//     expect(component.find('.MyNypl-Catalog-Link').type()).to.equal('a');
//   });

//   it('should have the <a> with class name "MyNypl-Catalog-Btn". Its text equals to ' +
//     '"GO TO THE CATALOG"', () => {
//     expect(component.find('.MyNypl-Catalog-Btn').text()).to.equal('GO TO THE CATALOG');
//   });

//   it('should have the <a> with class name "MyNypl-Research-Btn". Its text equals to ' +
//     '"GO TO THE RESEARCH CATALOG"', () => {
//     expect(component.find('.MyNypl-Research-Btn').text()).to.equal('GO TO THE RESEARCH CATALOG');
//   });

//   it('should have the <a> with class name "MyNypl-Catalog-Btn". Its href equals to ' +
//     '"https://browse.nypl.org/iii/encore/myaccount"', () => {
//     expect(component.find('.MyNypl-Catalog-Btn').props().href).to.equal(
//       'https://browse.nypl.org/iii/encore/myaccount'
//     );
//   });

//   it('should have the <a> with class name "MyNypl-Research-Btn". Its href equals to ' +
//     '"https://catalog.nypl.org/patroninfo/top"', () => {
//     expect(component.find('.MyNypl-Research-Btn').props().href).to.equal(
//       'https://catalog.nypl.org/patroninfo/top'
//     );
//   });

//   it('should have the method "renderLogOutLink" to render the properly log out link',
//     () => {
//       const renderedInstance = component.instance().renderLogOutLink();

//       expect(renderedInstance.type).to.equal('a');
//       expect(renderedInstance.props.href).to.equal(
//         'https://isso.nypl.org/auth/logout?redirect_uri=https://www.nypl.org'
//       );
//       expect(renderedInstance.props.className).to.equal('MyNypl-Catalog-Link');
//       expect(renderedInstance.props.children).to.equal('Log Out');

//       const onClick = sinon.spy(utils, 'trackHeader');

//       component.find('.MyNypl-Catalog-Link').simulate('click');
//       expect(onClick.called);

//       onClick.restore();
//     }
//   );
// });

// describe('<MyNypl> with the props patronName that has valid value', () => {
//   let component;

//   before(() => {
//     component = shallow(<MyNypl patronName={'Darren Stewart'} />);
//   });

//   it('should have a <p> with class name "MyNypl-Patron-Name". Its text equals to ' +
//     '"Hello, Darren Stewart"',
//     () => {
//       expect(component.find('p')).to.have.length(1);
//       expect(component.find('.MyNypl-Patron-Name')).to.be.defined;
//       expect(component.find('.MyNypl-Patron-Name').text()).to.equal('HELLO, Darren Stewart');
//     }
//   );
// });
