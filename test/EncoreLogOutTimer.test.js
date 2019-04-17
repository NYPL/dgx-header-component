import sinon from 'sinon';
import { expect } from 'chai';

// Import the component that is going to be tested
import EncoreLogOutTimer from '../src/utils/encoreLogOutTimer';

// Import related functions
import utils from '../src/utils/utils';
import accountConfig from '../src/accountConfig';

describe('EncoreLogOutTimer', () => {
  let deleteCookieSpy;
  let setCookieSpy;
  let logOutFromEncoreInSpy;
  let hasCookieStub;
  let getCookieStub;
  let mockLastVisitedTime;
  let loadLogoutIframeSpy;
  const isTest = process.env.IS_TEST_ENV || true;

  describe('when cookie "PAT_LOGGED_IN" does not exist', () => {
    before(() => {
      setCookieSpy = sinon.stub(utils, 'setCookie');
      logOutFromEncoreInSpy = sinon.spy(EncoreLogOutTimer, 'logOutFromEncoreIn');
      loadLogoutIframeSpy = sinon.spy(EncoreLogOutTimer, 'loadLogoutIframe');
      deleteCookieSpy = sinon.spy(utils, 'deleteCookie');
      hasCookieStub = sinon.stub(utils, 'hasCookie');

      hasCookieStub
        .withArgs('PAT_LOGGED_IN')
        .onCall(0)
        .returns(false)
        .withArgs('nyplIdentityPatron')
        .onCall(0)
        .returns(true)
        .withArgs('ENCORE_LAST_VISITED')
        .onCall(0)
        .returns(true);

      // Set the test flag, the third parameter, to true, so Mocha won't wait the timer to end for
      // 30 mins
      EncoreLogOutTimer.setEncoreLoggedInTimer('browse.nypl.org', Date.now(), isTest);
    });

    after(() => {
      setCookieSpy.restore();
      deleteCookieSpy.restore();
      logOutFromEncoreInSpy.restore();
      loadLogoutIframeSpy.restore();
      utils.hasCookie.restore();
    });

    it('should check if cookie "nyplIdentityPatron" exists and delete it if it does.', () => {
      expect(logOutFromEncoreInSpy.callCount).to.equal(0);
      expect(deleteCookieSpy.callCount).to.equal(2);
      expect(deleteCookieSpy.calledWith('nyplIdentityPatron')).to.equal(true);
      expect(deleteCookieSpy.calledWith('ENCORE_LAST_VISITED')).to.equal(true);
    });

    it('should load the log out iframe to completely log out the user from Encore.', () => {
      expect(loadLogoutIframeSpy.callCount).to.equal(1);
    });
  });

  describe('when "PAT_LOGGED_IN" exists and the visited page is on Encore\'s domain', () => {
    const encoreLogInExpireDuration = accountConfig.patLoggedInCookieExpiredTime;
    const currentTime = Date.now();

    before(() => {
      hasCookieStub = sinon.stub(utils, 'hasCookie');
      setCookieSpy = sinon.spy(utils, 'setCookie');
      logOutFromEncoreInSpy = sinon.spy(EncoreLogOutTimer, 'logOutFromEncoreIn');

      hasCookieStub
        .withArgs('PAT_LOGGED_IN')
        .onCall(0)
        .returns(true);

      hasCookieStub
        .withArgs('ENCORE_LAST_VISITED')
        .onCall(0)
        .returns(false);

      // Set the test flag, the third parameter, to true, so Mocha won't wait the timer to end for
      // 30 mins
      EncoreLogOutTimer.setEncoreLoggedInTimer('browse.nypl.org', currentTime, isTest);
    });

    after(() => {
      setCookieSpy.restore();
      logOutFromEncoreInSpy.restore();
      utils.hasCookie.restore();
    });

    it('should set cookie "ENCORE_LAST_VISITED".', () => {
      expect(setCookieSpy.callCount).to.equal(1);
      expect(setCookieSpy.calledWith('ENCORE_LAST_VISITED', currentTime)).to.equal(true);
    });

    it('should set logOutFromEncoreIn to 30 mins.', () => {
      expect(logOutFromEncoreInSpy.callCount).to.equal(1);
      expect(logOutFromEncoreInSpy.calledWith(encoreLogInExpireDuration)).to.equal(true);
    });
  });

  describe('when "PAT_LOGGED_IN" exists and the visited page is NOT on Encore\'s domain', () => {
    const encoreLogInExpireDuration = accountConfig.patLoggedInCookieExpiredTime;
    const currentTime = Date.now();

    // Mock the time as it has only passed 1700000 milliseconds
    mockLastVisitedTime = Date.now() - 1700000;

    before(() => {
      hasCookieStub = sinon.stub(utils, 'hasCookie');
      getCookieStub = sinon.stub(utils, 'getCookie');
      logOutFromEncoreInSpy = sinon.spy(EncoreLogOutTimer, 'logOutFromEncoreIn');

      hasCookieStub
        .withArgs('PAT_LOGGED_IN')
        .onCall(0)
        .returns(true);

      getCookieStub
        .withArgs('ENCORE_LAST_VISITED')
        .onCall(0)
        .returns(mockLastVisitedTime);

      EncoreLogOutTimer.setEncoreLoggedInTimer('somewebsite.nypl.org', currentTime, isTest);
    });

    after(() => {
      utils.getCookie.restore();
      utils.hasCookie.restore();
      logOutFromEncoreInSpy.restore();
    });

    it('should reset EncoreLoggedInTimer to the remaining time before "PAT_LOGGED_IN" is expired',
      () => {
        expect(getCookieStub.callCount).to.equal(1);
        expect(logOutFromEncoreInSpy.callCount).to.equal(1);
        expect(
          logOutFromEncoreInSpy.calledWith(encoreLogInExpireDuration
            - (currentTime - mockLastVisitedTime)),
        ).to.equal(true);
      });
  });
});

describe('logOutFromEncoreIn', () => {
  let hasCookieStub;
  let getCookieStub;
  let deleteCookieSpy;
  let logOutFromEncoreInSpy;
  let loadLogoutIframeSpy;
  const isTest = process.env.IS_TEST_ENV || true;

  describe('when no new Encore pages have been visited shorter than timeout time', () => {
    before(() => {
      hasCookieStub = sinon.stub(utils, 'hasCookie');
      getCookieStub = sinon.stub(utils, 'getCookie');
      deleteCookieSpy = sinon.spy(utils, 'deleteCookie');
      logOutFromEncoreInSpy = sinon.spy(EncoreLogOutTimer, 'logOutFromEncoreIn');
      loadLogoutIframeSpy = sinon.spy(EncoreLogOutTimer, 'loadLogoutIframe');

      const currentTime = Date.now();
      // Mock the time as it has only passed 200000 milliseconds
      const mockLastVisitedTime = currentTime - 170000;

      hasCookieStub
        .withArgs('PAT_LOGGED_IN')
        .returns(true);

      getCookieStub
        .withArgs('ENCORE_LAST_VISITED')
        .returns(mockLastVisitedTime);

      EncoreLogOutTimer.setEncoreLoggedInTimer('somewebsite.nypl.org', currentTime, isTest);
    });

    after(() => {
      utils.hasCookie.restore();
      utils.getCookie.restore();
      deleteCookieSpy.restore();
      logOutFromEncoreInSpy.restore();
      loadLogoutIframeSpy.restore();
    });

    it('should not yet delete cookies "PAT_LOGGED_IN", "ENCORE_LAST_VISITED" and '
    + '"nyplIdentityPatron"',
    (done) => {
      setTimeout(() => {
        expect(logOutFromEncoreInSpy.callCount).to.equal(1);
        expect(deleteCookieSpy.calledWith('PAT_LOGGED_IN')).to.equal(false);
        expect(deleteCookieSpy.calledWith('ENCORE_LAST_VISITED')).to.equal(false);
        expect(deleteCookieSpy.calledWith('nyplIdentityPatron')).to.equal(false);
        expect(loadLogoutIframeSpy.callCount).to.equal(0);
        done();
      }, 100);
    });
  });

  describe('when no new Encore pages have been visited longer than timeout time', () => {
    before(() => {
      hasCookieStub = sinon.stub(utils, 'hasCookie');
      getCookieStub = sinon.stub(utils, 'getCookie');
      deleteCookieSpy = sinon.spy(utils, 'deleteCookie');
      logOutFromEncoreInSpy = sinon.spy(EncoreLogOutTimer, 'logOutFromEncoreIn');
      loadLogoutIframeSpy = sinon.spy(EncoreLogOutTimer, 'loadLogoutIframe');

      const currentTime = Date.now();
      // Mock the time as it has passed 2000000 milliseconds
      const mockLastVisitedTimeLongerThanExp = Date.now() - 2000000;

      hasCookieStub
        .withArgs('PAT_LOGGED_IN')
        .returns(true);

      getCookieStub
        .withArgs('ENCORE_LAST_VISITED')
        .returns(mockLastVisitedTimeLongerThanExp);

      EncoreLogOutTimer.setEncoreLoggedInTimer('somewebsite.nypl.org', currentTime, isTest);
    });

    after(() => {
      utils.hasCookie.restore();
      utils.getCookie.restore();
      deleteCookieSpy.restore();
      logOutFromEncoreInSpy.restore();
      loadLogoutIframeSpy.restore();
    });

    it('should delete cookies "PAT_LOGGED_IN", "ENCORE_LAST_VISITED" and "nyplIdentityPatron"',
      // Use async here because the original code has setTimeout as well
      (done) => {
        expect(logOutFromEncoreInSpy.callCount).to.equal(1);
        setTimeout(() => {
          expect(deleteCookieSpy.calledWith('PAT_LOGGED_IN')).to.equal(true);
          expect(deleteCookieSpy.calledWith('ENCORE_LAST_VISITED')).to.equal(true);
          expect(deleteCookieSpy.calledWith('nyplIdentityPatron')).to.equal(true);
          expect(loadLogoutIframeSpy.callCount).to.equal(1);
          done();
        }, 100);
      });
  });
});
