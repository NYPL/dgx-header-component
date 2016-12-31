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
import {
  mockResponseData,
  mockErrorResponseData,
  mockExpiredResponseData,
  mockLoginCookie
} from './authApiMockResponse.js';

const mock = new MockAdapter(axios);
const mockApi = `${appConfig.patronApiUrl}eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvd3d3Lm55cGwub3JnIiwic3ViIjoiNjM2NzAyOCIsImF1ZCI6ImFwcF9sb2dpbiIsImlhdCI6MTQ4MjE3NjQ3MCwiZXhwIjoxNDgyMTgwMDcwLCJhdXRoX3RpbWUiOjE0ODIxNzY0NzAsInNjb3BlIjoib3BlbmlkIG9mZmxpbmVfYWNjZXNzIGNvb2tpZSBwYXRyb246cmVhZCJ9.JO7VbOqCC7HyjRmeyHD4zM1Gl0JBk5RdxjAkCp0h6sfVe-xs5FyY7biYqs19k4dUY2DbFYR5IG3xYt9IdhqyMkSnJxtiCY36WN7X_e0eBF2T1_IWKGaBc4JlbroMj5_aNB5W4nQvclrdlb2mV38Q_HGAMUKe8DDeCmAHctEtqGppNl8DC7IvqkekRS_6zgQwsHHW5kJR-f7zUROi4fvFpdNR-I7J4VNWdFIOijb4vXFOOWRLzdY_GHLJdWvSgxhqzwkceA5BScCicAKeHYHo04vabNp5TvPXoR0ypULqTyGYsNnXnUmh2Mu46j3bcNTACEKS97FBx1IfwttBL1ARtQ`;

describe('Header', () => {
  describe('when "nyplIdentityPatron" cookie exists', () => {
    let component;

    // functions in Header.js
    let setLoginCookie;
    let fetchPatronData;

    // functions in utils.js
    let hasNyplIdentityPatronCookie;
    let getNyplIdentityPatronCookie;
    let getPatronData;
    let modelPatronName;

    before(() => {
      // functions in Header.js
      setLoginCookie = sinon.spy(Header.prototype, 'setLoginCookie');
      fetchPatronData = sinon.spy(Header.prototype, 'fetchPatronData');

      // functions in utils.js
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
      mock.reset();
      setLoginCookie.restore();
      fetchPatronData.restore();
      getPatronData.restore();
      modelPatronName.restore();

      // hasNyplIdentityPatronCookie.restore();
    });

    // it('should call the function to check if the cookie "nyplIdentityPatron" exists', () => {
    //   expect(setLoginCookie.calledOnce).to.equal(true);
    //   expect(hasNyplIdentityPatronCookie.calledOnce).to.equal(true);
    //   hasNyplIdentityPatronCookie.alwaysCalledWithExactly('nyplIdentityPatron');
    // });

    // it('should call the function to get the value of "nyplIdentityPatron" cookie, ' +
    //   'if the cookie exists', () => {
    //   expect(getNyplIdentityPatronCookie.calledOnce).to.equal(true);
    //   getNyplIdentityPatronCookie.alwaysCalledWithExactly('nyplIdentityPatron');
    // });

    // it('should call the API endpoint to get logged in patron\'s data with the cookie we got', () => {
    //   expect(fetchPatronData.calledOnce).to.equal(true);
    //   expect(getPatronData.calledOnce).to.equal(true);
    //   getPatronData.alwaysCalledWithExactly(
    //     mockLoginCookie,
    //     result => {
    //       if (result.data && result.data.data) {
    //         const patronNameObject = utils.modelPatronName(utils.extractPatronName(result.data));

    //         this.setState({
    //           patronName: patronNameObject.name,
    //           patronInitial: patronNameObject.initial,
    //           patronDataReceived: true,
    //         });
    //       }
    //     },
    //     () => {
    //       this.setLoginCookie();
    //     }
    //   );
    // });

    // it('should update the states of patronName, patronInitial, and patronDataReceived ' +
    //   'if it recevies a valid response from Auth API', (done) => {
    //   axios
    //     .get(mockApi)
    //     .then((response) => {
    //       if (response.data && response.data.data) {
    //         const patronNameObject = utils.modelPatronName(utils.extractPatronName(response.data));

    //         component.setState({
    //           patronName: patronNameObject.name,
    //           patronInitial: patronNameObject.initial,
    //           patronDataReceived: true,
    //         });

    //         setTimeout(
    //           () => {
    //             expect(component.state().patronName).to.deep.equal('SMITH, THERESA');
    //             expect(component.state().patronInitial).to.deep.equal('TS');
    //             expect(component.state().patronDataReceived).to.deep.equal(true);
    //             done();
    //           }, 1500
    //         );
    //       }
    //     });
    // });
  });

  describe('when "nyplIdentityPatron" cookie exists but the API call to get patron\'s data failes',
    () => {
      let component;

      before(() => {
        mock
          .onGet(mockApi)
          .reply(400, mockErrorResponseData);

        component = mount(<Header />);
      });

      after(() => {
        mock.reset();
      });

      it('should throw error if the call to get patron\'s data faild, and the states of ' +
        'patronName, patronInitial, and patronDataReceived should remain default values', (done) => {
        axios
          .get(mockApi)
          .then((response) => {
            if (response.data && response.data.data) {
              const patronNameObject = utils.modelPatronName(utils.extractPatronName(response.data));

              component.setState({
                patronName: patronNameObject.name,
                patronInitial: patronNameObject.initial,
                patronDataReceived: true,
              });
            }
          })
          .catch(response => {
            if (response instanceof Error) {
              console.warn(response.message);
            } else {
              // The request was made, but the server responded with a status code
              // that falls out of the range of 2xx
              console.warn(response.status);
              console.warn(response.headers);
              console.warn(response.config);

              setTimeout(
                () => {
                  expect(component.state().patronName).to.deep.equal('');
                  expect(component.state().patronInitial).to.deep.equal('');
                  expect(component.state().patronDataReceived).to.deep.equal(false);
                  done();
                }, 1500
              );
            }
          });
        }
      );
    }
  );

  describe('when "nyplIdentityPatron" cookie exists but its access token is expired',
    () => {
      let setLoginCookie;
      let fetchPatronData;
      let component;
      let getPatronData;
      let refreshAccessToken;
      let logOut;

      before(() => {
        setLoginCookie = sinon.spy(Header.prototype, 'setLoginCookie');
        fetchPatronData = sinon.spy(Header.prototype, 'fetchPatronData');

        getPatronData = sinon.spy(utils, 'getLoginData');
        refreshAccessToken = sinon.spy(utils, 'refreshAccessToken');
        logOut = sinon.spy(utils, 'logOut');

        mock
          .onGet(mockApi)
          .reply(401, mockExpiredResponseData)
          .onGet('/refresh')
          .reply(200)
          .onGet('/refreshError')
          .reply(400);

        component = mount(<Header />);
      });

      after(() => {
        mock.reset();
      });

      it('should call the cookie refresh API endpoint', (done) => {
        axios
          .get(mockApi)
          .then((response) => {
            if (response.data && response.data.data) {
              const patronNameObject = utils.modelPatronName(utils.extractPatronName(response.data));

              component.setState({
                patronName: patronNameObject.name,
                patronInitial: patronNameObject.initial,
                patronDataReceived: true,
              });
            }
          })
          .catch(response => {
            if (response instanceof Error) {
              console.warn(response.message);
            } else {
              // The request was made, but the server responded with a status code
              // that falls out of the range of 2xx
              console.warn(response.status);
              console.warn(response.headers);
              console.warn(response.config);

              // If the cookie for getting log in Data is expired
              if (response.data.statusCode === 401 && response.data.expired === true) {
                utils.refreshAccessToken(
                  '/refresh',
                  () => {
                    const patronNameObject = utils.modelPatronName(utils.extractPatronName(mockResponseData));

                    component.setState({
                      patronName: patronNameObject.name,
                      patronInitial: patronNameObject.initial,
                      patronDataReceived: true,
                    });
                  },
                  logOut
                );
              }
              setTimeout(() => {
                expect(refreshAccessToken.calledOnce).to.equal(true);
                expect(component.state().patronName).to.deep.equal('SMITH, THERESA');
                expect(component.state().patronInitial).to.deep.equal('TS');
                expect(component.state().patronDataReceived).to.deep.equal(true);
                done();
              }, 1500);
            }
          });
        }
      );

      it('should log the patron out, if calling the refesh link fails', (done) => {
        axios
          .get(mockApi)
          .then((response) => {
            if (response.data && response.data.data) {
              const patronNameObject = utils.modelPatronName(utils.extractPatronName(response.data));

              component.setState({
                patronName: patronNameObject.name,
                patronInitial: patronNameObject.initial,
                patronDataReceived: true,
              });
            }
          })
          .catch(response => {
            if (response instanceof Error) {
              console.warn(response.message);
            } else {
              // The request was made, but the server responded with a status code
              // that falls out of the range of 2xx
              console.warn(response.status);
              console.warn(response.headers);
              console.warn(response.config);
              // If the cookie for getting log in Data is expired
              if (response.data.statusCode === 401 && response.data.expired === true) {
                utils.refreshAccessToken(
                  '/refreshError',
                  () => {
                    const patronNameObject = utils.modelPatronName(utils.extractPatronName(mockResponseData));

                    component.setState({
                      patronName: patronNameObject.name,
                      patronInitial: patronNameObject.initial,
                      patronDataReceived: true,
                    });
                  },
                  logOut
                );
              }
              setTimeout(() => {
                expect(logOut.calledOnce).to.equal(true);
                done();
              }, 1500);
            }
          });
      });
    }
  );
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
