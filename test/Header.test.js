import React from 'react';
import axios from 'axios';

import sinon from 'sinon';
import MockAdapter from 'axios-mock-adapter';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';

// Import the component that is going to be tested
import { Header } from './../src/components/Header/Header.js';

// Import related functions
import utils from './../src/utils/utils.js';
import appConfig from './../src/appConfig.js';

// Import mock up data
import { mockResponseData, mockLoginCookie } from './authApiMockResponse.js';

const mock = new MockAdapter(axios);
const mockApi = `${appConfig.patronApiUrl}eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvd3d3Lm55cGwub3JnIiwic3ViIjoiNjM2NzAyOCIsImF1ZCI6ImFwcF9sb2dpbiIsImlhdCI6MTQ4MjE3NjQ3MCwiZXhwIjoxNDgyMTgwMDcwLCJhdXRoX3RpbWUiOjE0ODIxNzY0NzAsInNjb3BlIjoib3BlbmlkIG9mZmxpbmVfYWNjZXNzIGNvb2tpZSBwYXRyb246cmVhZCJ9.JO7VbOqCC7HyjRmeyHD4zM1Gl0JBk5RdxjAkCp0h6sfVe-xs5FyY7biYqs19k4dUY2DbFYR5IG3xYt9IdhqyMkSnJxtiCY36WN7X_e0eBF2T1_IWKGaBc4JlbroMj5_aNB5W4nQvclrdlb2mV38Q_HGAMUKe8DDeCmAHctEtqGppNl8DC7IvqkekRS_6zgQwsHHW5kJR-f7zUROi4fvFpdNR-I7J4VNWdFIOijb4vXFOOWRLzdY_GHLJdWvSgxhqzwkceA5BScCicAKeHYHo04vabNp5TvPXoR0ypULqTyGYsNnXnUmh2Mu46j3bcNTACEKS97FBx1IfwttBL1ARtQ`;

describe('Header', () => {
  describe('when "nyplIdentityPatron" cookie exists', () => {
    let component;
    let hasNyplIdentityPatronCookie;
    let getNyplIdentityPatronCookie;
    let getPatronData;
    let modelPatronName;

    before(() => {
      hasNyplIdentityPatronCookie = sinon.stub(utils, 'hasCookie')
        .withArgs('nyplIdentityPatron')
        .returns(true);
      getNyplIdentityPatronCookie = sinon.stub(utils, 'getCookie')
        .withArgs('nyplIdentityPatron')
        .returns(mockLoginCookie);
      getPatronData = sinon.spy(utils, 'getLoginData');
      modelPatronName = sinon.spy(utils, 'modelPatronName');

      mock
        .onGet(mockApi)
        .reply(200, mockResponseData);

      component = mount(<Header />);
    });

    after(() => {
      // hasNyplIdentityPatronCookie.restore();
      // getNyplIdentityPatronCookie.restore();
    });

    it('should call the function to check if the cookie "nyplIdentityPatron" exists', () => {
       expect(hasNyplIdentityPatronCookie.calledOnce).to.equal(true);
       hasNyplIdentityPatronCookie.alwaysCalledWithExactly('nyplIdentityPatron');
    });

    it('should call the function to get the value of "nyplIdentityPatron" cookie, ' +
      'if the cookie exists', () => {
      expect(getNyplIdentityPatronCookie.calledOnce).to.equal(true);
      getNyplIdentityPatronCookie.alwaysCalledWithExactly('nyplIdentityPatron');
    });

    it('should call the API endpoint to get logged in patron\'s data with the cookie we got', () => {
      expect(getPatronData.calledOnce).to.equal(true);
      getPatronData.alwaysCalledWithExactly(
        mockLoginCookie,
        result => {
          if (result.data && result.data.data) {
            const patronNameObject = utils.modelPatronName(utils.extractPatronName(result.data));

            this.setState({
              patronName: patronNameObject.name,
              patronInitial: patronNameObject.initial,
              patronDataReceived: true,
            });
          }
        },
        () => {
          this.setLoginCookie();
        }
      );
    });

    it('should update the states of patronName, patronInitial, and patronDataReceived ' +
      'if it recevies a valid response from Auth API', (done) => {
      axios
        .get(mockApi)
        .then((response) => {
          if (response.data && response.data.data) {
            const patronNameObject = utils.modelPatronName(utils.extractPatronName(response.data));

            setTimeout(
              () => {
                expect(patronNameObject.name).to.deep.equal('THERESA');
                expect(patronNameObject.initial).to.deep.equal('TS');
                done();
              }, 1500
            );
          }
        });

      // setTimeout(() => {
      //   expect(modelPatronName.calledOnce).to.equal(true);
      //   expect(component.state().patronName).to.equal('Stewart, Darren');
      //  }, 1500);

          // expect(modelPatronName.calledOnce).to.equal(true);
          // expect(component.state().patronName).to.equal('Stewart, Darren');

        // after(() => {
        //   mock.restore();
        //   spyAxios.restore();
        // });
        // setTimeout(() => {
          // sinon.assert.calledOnce(modelPatronName);
          // expect(component.state().patronName).to.equal('Stewart, Darren');
          // expect(component.state().patronInitial.type()).to.equal('DS');
          // expect(component.state().patronDataReceived).to.equal(true);
        // }, 500);
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
