/* eslint-env mocha */
import React from 'react';
import axios from 'axios';

import sinon from 'sinon';
import MockAdapter from 'axios-mock-adapter';
import { expect } from 'chai';
import { mount } from 'enzyme';

// Import the component that is going to be tested
import { Header } from './../src/components/Header/Header';

// Import related functions
import utils from './../src/utils/utils';
import appConfig from './../src/appConfig';

// Import mock up data
import {
  mockResponseData,
  mockErrorResponseData,
  mockExpiredResponseData,
  mockLoginCookie,
} from './authApiMockResponse';

const mockPatronApiEndpoint = `${appConfig.patronApiUrl}eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwc` +
  'zpcL1wvd3d3Lm55cGwub3JnIiwic3ViIjoiNjM2NzAyOCIsImF1ZCI6ImFwcF9sb2dpbiIsImlhdCI6MTQ4MjE3NjQ3MC' +
  'wiZXhwIjoxNDgyMTgwMDcwLCJhdXRoX3RpbWUiOjE0ODIxNzY0NzAsInNjb3BlIjoib3BlbmlkIG9mZmxpbmVfYWNjZXN' +
  'zIGNvb2tpZSBwYXRyb246cmVhZCJ9.JO7VbOqCC7HyjRmeyHD4zM1Gl0JBk5RdxjAkCp0h6sfVe-xs5FyY7biYqs19k4d' +
  'UY2DbFYR5IG3xYt9IdhqyMkSnJxtiCY36WN7X_e0eBF2T1_IWKGaBc4JlbroMj5_aNB5W4nQvclrdlb2mV38Q_HGAMUKe' +
  '8DDeCmAHctEtqGppNl8DC7IvqkekRS_6zgQwsHHW5kJR-f7zUROi4fvFpdNR-I7J4VNWdFIOijb4vXFOOWRLzdY_GHLJd' +
  'WvSgxhqzwkceA5BScCicAKeHYHo04vabNp5TvPXoR0ypULqTyGYsNnXnUmh2Mu46j3bcNTACEKS97FBx1IfwttBL1ARtQ';

describe('Header', () => {
  describe('cookie "nyplIdentityPatron"', () => {
    const patronApiCall = (component = {}, refreshApi = '/refresh', refreshFailCb = {}) => {
      axios
        .get(mockPatronApiEndpoint)
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
        .catch((response) => {
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
                refreshApi,
                () => {
                  const patronNameObject = utils.modelPatronName(
                    utils.extractPatronName(mockResponseData)
                  );

                  component.setState({
                    patronName: patronNameObject.name,
                    patronInitial: patronNameObject.initial,
                    patronDataReceived: true,
                  });
                },
                refreshFailCb,
              );
            }
          }
        });
    };

    let mock = null;

    before(() => {
      mock = new MockAdapter(axios);
    });

    after(() => {
      mock.restore();
    });

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

        // mock up of the API call to get patron's data
        mock
          .onGet(mockPatronApiEndpoint)
          .reply(200, mockResponseData);

        component = mount(<Header />);
      });

      after(() => {
        mock.reset();
        // stubs don't have restore(), the way to restore them is go back to the original functions.
        // However, if the sutbs only use the methods that belong to spies, restore() will work.
        utils.hasCookie.restore();
        utils.getCookie.restore();
        setLoginCookie.restore();
        fetchPatronData.restore();
        getPatronData.restore();
        modelPatronName.restore();
      });

      it('should call the function to check if the cookie "nyplIdentityPatron" exists', () => {
        expect(setLoginCookie.calledOnce).to.equal(true);
        expect(hasNyplIdentityPatronCookie.calledOnce).to.equal(true);
        hasNyplIdentityPatronCookie.alwaysCalledWithExactly('nyplIdentityPatron');
      });

      it('should call the function to get the value of "nyplIdentityPatron" cookie, ' +
        'if the cookie exists', () => {
        expect(getNyplIdentityPatronCookie.calledOnce).to.equal(true);
        getNyplIdentityPatronCookie.alwaysCalledWithExactly('nyplIdentityPatron');
      });

      it('should call the API endpoint to get logged in patron\'s data with the cookie we got',
        () => {
          expect(fetchPatronData.calledOnce).to.equal(true);
          expect(getPatronData.calledOnce).to.equal(true);
          expect(getPatronData.alwaysCalledWith(mockLoginCookie)).to.equal(true);
        }
      );

      it('should update the states of patronName, patronInitial, and patronDataReceived ' +
        'if it recevies a valid response from Auth API', (done) => {
        patronApiCall(component);
        setTimeout(
          () => {
            expect(component.state().patronName).to.deep.equal('SMITH, THERESA');
            expect(component.state().patronInitial).to.deep.equal('TS');
            expect(component.state().patronDataReceived).to.deep.equal(true);
            done();
          }, 1500
        );
      });
    });

    describe('when "nyplIdentityPatron" cookie exists but the API call to get patron\'s data fails',
      () => {
        let component;

        before(() => {
          mock
            .onGet(mockPatronApiEndpoint)
            .reply(400, mockErrorResponseData);

          component = mount(<Header />);
        });

        after(() => {
          mock.reset();
        });

        it('should throw error if the call to get patron\'s data failed, and then the states of ' +
          'patronName, patronInitial, and patronDataReceived should remain their default values',
          (done) => {
            patronApiCall(component);
            setTimeout(
              () => {
                expect(component.state().patronName).to.deep.equal('');
                expect(component.state().patronInitial).to.deep.equal('');
                expect(component.state().patronDataReceived).to.deep.equal(false);
                done();
              }, 1500
            );
          }
        );
      }
    );

    describe('when "nyplIdentityPatron" cookie exists but its access token is expired',
      () => {
        let component;
        let refreshAccessToken;
        // functions in utils.js
        let deleteNyplIdentityPatronCookie;

        before(() => {
          refreshAccessToken = sinon.spy(utils, 'refreshAccessToken');
          // functions in utils.js
          deleteNyplIdentityPatronCookie = sinon.stub(utils, 'deleteCookie')
            .withArgs('nyplIdentityPatron')
            .returns(true);

          mock
            .onGet(mockPatronApiEndpoint)
            .reply(401, mockExpiredResponseData)
            .onGet('/refresh')
            .reply(200)
            .onGet('/refreshError')
            .reply(400);

          component = mount(<Header />);
        });

        after(() => {
          mock.reset();
          refreshAccessToken.restore();
          utils.deleteCookie.restore();
        });

        it('should call the cookie refresh API endpoint', (done) => {
          patronApiCall(component, '/refresh', deleteNyplIdentityPatronCookie);
          setTimeout(() => {
            expect(refreshAccessToken.calledOnce).to.equal(true);
            expect(component.state().patronName).to.deep.equal('SMITH, THERESA');
            expect(component.state().patronInitial).to.deep.equal('TS');
            expect(component.state().patronDataReceived).to.deep.equal(true);
            done();
          }, 1500);
        });

        it('should delete "nyplIdentityPatron" cookie, if calling the refesh link fails', (done) => {
          patronApiCall(component, '/refreshError', deleteNyplIdentityPatronCookie);
          setTimeout(() => {
            expect(deleteNyplIdentityPatronCookie.calledOnce).to.equal(true);
            done();
          }, 1500);
        });
      }
    );
  });

  describe('handleEncoreLoggedInTimer', () => {
    describe('when cookie "PAT_LOGGED_IN" does not exist', () => {
      let component,
        setCookieSpy,
        handleEncoreLoggedInTimerSpy,
        logOutEncoreInSpy,
        hasCookieStub;

      before(() => {
        setCookieSpy = sinon.stub(utils, 'setCookie');
        handleEncoreLoggedInTimerSpy = sinon.spy(Header.prototype, 'handleEncoreLoggedInTimer');
        logOutEncoreInSpy = sinon.spy(Header.prototype, 'logOutEncoreIn');
        hasCookieStub = sinon.stub(utils, 'hasCookie');

        hasCookieStub
          .withArgs('PAT_LOGGED_IN')
          .onCall(0)
          .returns(false);

        component = mount(<Header />);
      });

      after(() => {
        setCookieSpy.restore();
        handleEncoreLoggedInTimerSpy.restore();
        logOutEncoreInSpy.restore();
        utils.hasCookie.restore();
        component.unmount();
      });

      it('should do nothing.', () => {
        expect(handleEncoreLoggedInTimerSpy.callCount).to.equal(1);
        expect(setCookieSpy.callCount).to.equal(0);
        expect(logOutEncoreInSpy.callCount).to.equal(0);
      });
    });

    describe('when "PAT_LOGGED_IN" exists and the visited page is on Encore\'s domain', () => {
      let component,
        setCookieSpy,
        logOutEncoreInSpy,
        hasCookieStub,
        currentTime;

      const encoreLogInExpireDuration = 1800000;

      before(() => {
        hasCookieStub = sinon.stub(utils, 'hasCookie');
        setCookieSpy = sinon.spy(utils, 'setCookie');
        logOutEncoreInSpy = sinon.spy(Header.prototype, 'logOutEncoreIn');

        hasCookieStub
          .withArgs('PAT_LOGGED_IN')
          .onCall(0)
          .returns(true);

        hasCookieStub
          .withArgs('ENCORE_LAST_VISITED')
          .onCall(0)
          .returns(false);

        component = mount(<Header currentLocation={{ hostname: 'browse.nypl.org' }} />);
        currentTime = component.state().currentTime;
      });

      after(() => {
        setCookieSpy.restore();
        logOutEncoreInSpy.restore();
        utils.hasCookie.restore();
        component.unmount();
      });

      it('should set cookie "ENCORE_LAST_VISITED".', () => {
        expect(setCookieSpy.callCount).to.equal(1);
        expect(setCookieSpy.calledWith('ENCORE_LAST_VISITED', currentTime)).to.equal(true);
      });

      it('should set logOutEncoreIn to 30 mins.', () => {
        expect(logOutEncoreInSpy.callCount).to.equal(1);
        expect(logOutEncoreInSpy.calledWith(encoreLogInExpireDuration)).to.equal(true);
      });
    });

    describe('when "PAT_LOGGED_IN" exists and the visited page is NOT on Encore\'s domain', () => {
      let component,
        hasCookieStub,
        getCookieStub,
        logOutEncoreInSpy,
        currentTime,
        mockLastVisitedTime;

      const encoreLogInExpireDuration = 1800000;
      mockLastVisitedTime = Date.now() - 1700000;

      before(() => {
        hasCookieStub = sinon.stub(utils, 'hasCookie');
        getCookieStub = sinon.stub(utils, 'getCookie');
        logOutEncoreInSpy = sinon.spy(Header.prototype, 'logOutEncoreIn');

        hasCookieStub
          .withArgs('PAT_LOGGED_IN')
          .onCall(0)
          .returns(true);

        getCookieStub
          .withArgs('ENCORE_LAST_VISITED')
          .onCall(0)
          .returns(mockLastVisitedTime);

        component = mount(<Header currentLocation={{ hostname: 'somewebsite.nypl.org' }} />);
        currentTime = component.state().currentTime;
      });

      after(() => {
        utils.getCookie.restore();
        utils.hasCookie.restore();
        logOutEncoreInSpy.restore();
        component.unmount();
      });

      it('should reset EncoreLoggedInTimer to the remaining time before "PAT_LOGGED_IN" is expired', () => {
        expect(getCookieStub.callCount).to.equal(1);
        expect(logOutEncoreInSpy.callCount).to.equal(1);
        expect(logOutEncoreInSpy.calledWith(encoreLogInExpireDuration - (currentTime - mockLastVisitedTime))).to.equal(true);
      });
    });
  });

  describe('logOutEncoreIn', () => {
    describe('when no new Encore pages have been visited longer than timeout time', () => {
      let component,
        hasCookieStub,
        getCookieStub,
        deleteCookieSpy,
        logOutEncoreInSpy,
        currentTime,
        mockLastVisitedTime,
        mockLastVisitedTimeLongerThanExp;

      mockLastVisitedTime = Date.now() - 200000;
      mockLastVisitedTimeLongerThanExp = Date.now() - 2000000;

      before(() => {
        hasCookieStub = sinon.stub(utils, 'hasCookie');
        getCookieStub = sinon.stub(utils, 'getCookie');
        deleteCookieSpy = sinon.spy(utils, 'deleteCookie');
        logOutEncoreInSpy = sinon.spy(Header.prototype, 'logOutEncoreIn');

        hasCookieStub
          .withArgs('PAT_LOGGED_IN')
          .returns(true);

        getCookieStub
          .withArgs('ENCORE_LAST_VISITED')
          .onCall(0)
          .returns(mockLastVisitedTime)
          .onCall(1)
          .returns(mockLastVisitedTimeLongerThanExp);
      });

      beforeEach(() => {
        component = mount(<Header currentLocation={{ hostname: 'somewebsite.nypl.org' }} />);
        currentTime = component.state().currentTime;
      });

      afterEach(() => {
        deleteCookieSpy.reset();
        component.unmount();
      });

      after(() => {
        utils.hasCookie.restore();
        utils.getCookie.restore();
        deleteCookieSpy.restore();
        Header.prototype.logOutEncoreIn.restore();
      });
        
      it('should not yet delete cookies "PAT_LOGGED_IN", "ENCORE_LAST_VISITED" and "nyplIdentityPatron"', () => {
        expect(logOutEncoreInSpy.callCount).to.equal(1);
        expect(deleteCookieSpy.calledWith('PAT_LOGGED_IN')).to.equal(false);
        expect(deleteCookieSpy.calledWith('ENCORE_LAST_VISITED')).to.equal(false);
        expect(deleteCookieSpy.calledWith('nyplIdentityPatron')).to.equal(false);
      });

      it('should delete cookies "PAT_LOGGED_IN", "ENCORE_LAST_VISITED" and "nyplIdentityPatron"', (done) => {
        expect(logOutEncoreInSpy.callCount).to.equal(2);
        setTimeout(() => {
          expect(deleteCookieSpy.calledWith('PAT_LOGGED_IN')).to.equal(true);
          expect(deleteCookieSpy.calledWith('ENCORE_LAST_VISITED')).to.equal(true);
          expect(deleteCookieSpy.calledWith('nyplIdentityPatron')).to.equal(true);
          done();
        }, 100);
      });
    });
  });
});
