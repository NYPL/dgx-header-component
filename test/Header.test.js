import React from 'react';
import axios from 'axios';

import sinon from 'sinon';
import MockAdapter from 'axios-mock-adapter';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';

// Import the component that is going to be tested
import Header from './../src/components/Header/Header.js';

// Import related functions
import utils from './../src/utils/utils.js';
import appConfig from './../src/appConfig.js';

// Import mock up data
import authApiMockResponse from './authApiMockResponse.js';

const mock = new MockAdapter(axios);
const mockApi = `${appConfig.patronApiUrl}eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvd3d3Lm55cGwub3JnIiwic3ViIjoiNjM2NzAyOCIsImF1ZCI6ImFwcF9sb2dpbiIsImlhdCI6MTQ4MjE3NjQ3MCwiZXhwIjoxNDgyMTgwMDcwLCJhdXRoX3RpbWUiOjE0ODIxNzY0NzAsInNjb3BlIjoib3BlbmlkIG9mZmxpbmVfYWNjZXNzIGNvb2tpZSBwYXRyb246cmVhZCJ9.JO7VbOqCC7HyjRmeyHD4zM1Gl0JBk5RdxjAkCp0h6sfVe-xs5FyY7biYqs19k4dUY2DbFYR5IG3xYt9IdhqyMkSnJxtiCY36WN7X_e0eBF2T1_IWKGaBc4JlbroMj5_aNB5W4nQvclrdlb2mV38Q_HGAMUKe8DDeCmAHctEtqGppNl8DC7IvqkekRS_6zgQwsHHW5kJR-f7zUROi4fvFpdNR-I7J4VNWdFIOijb4vXFOOWRLzdY_GHLJdWvSgxhqzwkceA5BScCicAKeHYHo04vabNp5TvPXoR0ypULqTyGYsNnXnUmh2Mu46j3bcNTACEKS97FBx1IfwttBL1ARtQ`;

describe('Header', () => {
  describe('During componentDidMount', () => {
    let component;

    it('should call the API endpoint to get logged in patron\'s data if its state, loginCookie, is not empty' , () => {
      // before(() => {
      //   component = mount(<Header />);
      // });

      // component.setState({
      //   loginCookie: '%7B%22access_token%22%3A%22eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvd3d3Lm55cGwub3JnIiwic3ViIjoiNjM2NzAyOCIsImF1ZCI6ImFwcF9sb2dpbiIsImlhdCI6MTQ4MjE3NjQ3MCwiZXhwIjoxNDgyMTgwMDcwLCJhdXRoX3RpbWUiOjE0ODIxNzY0NzAsInNjb3BlIjoib3BlbmlkIG9mZmxpbmVfYWNjZXNzIGNvb2tpZSBwYXRyb246cmVhZCJ9.JO7VbOqCC7HyjRmeyHD4zM1Gl0JBk5RdxjAkCp0h6sfVe-xs5FyY7biYqs19k4dUY2DbFYR5IG3xYt9IdhqyMkSnJxtiCY36WN7X_e0eBF2T1_IWKGaBc4JlbroMj5_aNB5W4nQvclrdlb2mV38Q_HGAMUKe8DDeCmAHctEtqGppNl8DC7IvqkekRS_6zgQwsHHW5kJR-f7zUROi4fvFpdNR-I7J4VNWdFIOijb4vXFOOWRLzdY_GHLJdWvSgxhqzwkceA5BScCicAKeHYHo04vabNp5TvPXoR0ypULqTyGYsNnXnUmh2Mu46j3bcNTACEKS97FBx1IfwttBL1ARtQ%22expires_in%22%3A3600%2C%22token_type%22%3A%22Bearer%22%2C%22scope%22%3A%22openid+offline_access+cookie+patron%3Aread%22%2C%22refresh_token%22%3A%2202b49603a8a2719389a6c77416b110675067827d%22%7D '
      // });

      // const spy = sinon.spy(Header, 'fetchPatronData');

      // expect(spy.called).to.equal(true);
      // Header.fetchPatronData.restore();
    });

    before(() => {
      server = sinon.fakeServer.create();
    });

    it('should update the states of patronName, patronInitial, and patronDataReceived ' +
      'if it recevies a valid response from Auth API', (done) => {
      let component;
      let spyAxios;

      before(() => {
        mock
          .onGet(mockApi)
          .reply(200, authApiMockResponse);

        spyAxios = sinon.spy(axios, 'get');

        component = mount(<Header />);
      });

      after(() => {
        spyAxios.restore();
        mock.reset();
      });

      setTimeout(() => {
        expect(component.state().patronName).to.equal('Stewart, Darren');
        expect(component.state().patronInitial.type()).to.equal('DS');
        expect(component.state().patronDataReceived).to.equal(true);
        nock.cleanAll();
        done();
      }, 1500);
    });

    it('should throw error if the call to get patron\'s data faild, and the states of ' +
      'patronName, patronInitial, and patronDataReceived should remain default values', () => {

      }
    );

    it('should call the cookie refresh API endpoint if the response indicates that the cookie is ' +
      'expired from the call for patron\'s data', () => {

      }
    );

    it('should log the patron out, if calling the refesh link fails', () => {

    });
  });
});


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
