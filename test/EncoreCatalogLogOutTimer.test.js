import sinon from 'sinon';
import { expect } from 'chai';

// Import the component that is going to be tested
import EncoreCatalogLogOutTimer from '../src/utils/encoreCatalogLogOutTimer';

// Import related functions
import utils from '../src/utils/utils';
import accountConfig from '../src/accountConfig';

describe('EncoreLogOutTimer', () => {
  let deleteCookieSpy;
  let setCookieSpy;
  let logOutFromEncoreAndCatalogInSpy;
  let hasCookieStub;
  let getCookieStub;
  let mockLastVisitedTime;
  let loadLogoutIframeSpy;
  const isTest = process.env.IS_TEST_ENV || true;

  describe('when cookie "PAT_LOGGED_IN" does not exist', () => {
    before(() => {
      setCookieSpy = sinon.stub(utils, 'setCookie');
      logOutFromEncoreAndCatalogInSpy = sinon.spy(
        EncoreCatalogLogOutTimer,
        'logOutFromEncoreAndCatalogIn',
      );
      loadLogoutIframeSpy = sinon.spy(EncoreCatalogLogOutTimer, 'loadLogoutIframe');
      deleteCookieSpy = sinon.spy(utils, 'deleteCookie');
      hasCookieStub = sinon.stub(utils, 'hasCookie');

      hasCookieStub
        .withArgs('PAT_LOGGED_IN')
        .onCall(0)
        .returns(false)
        .withArgs('nyplIdentityPatron')
        .onCall(0)
        .returns(true)
        .withArgs('VALID_DOMAIN_LAST_VISITED')
        .onCall(0)
        .returns(true);

      // Set the test flag, the third parameter, to true, so Mocha won't wait the timer to end for
      // 30 mins
      EncoreCatalogLogOutTimer.setEncoreLoggedInTimer('browse.nypl.org', Date.now(), isTest);
    });

    after(() => {
      setCookieSpy.restore();
      deleteCookieSpy.restore();
      logOutFromEncoreAndCatalogInSpy.restore();
      loadLogoutIframeSpy.restore();
      utils.hasCookie.restore();
    });

    it('should check if cookie "nyplIdentityPatron" and "VALID_DOMAIN_LAST_VISITED" exist and '
      + 'delete it if it does.', () => {
      expect(logOutFromEncoreAndCatalogInSpy.callCount).to.equal(0);
      expect(deleteCookieSpy.callCount).to.equal(2);
      expect(deleteCookieSpy.calledWith('nyplIdentityPatron')).to.equal(true);
      expect(deleteCookieSpy.calledWith('VALID_DOMAIN_LAST_VISITED')).to.equal(true);
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
      logOutFromEncoreAndCatalogInSpy = sinon.spy(
        EncoreCatalogLogOutTimer,
        'logOutFromEncoreAndCatalogIn',
      );

      hasCookieStub
        .withArgs('PAT_LOGGED_IN')
        .onCall(0)
        .returns(true);

      hasCookieStub
        .withArgs('VALID_DOMAIN_LAST_VISITED')
        .onCall(0)
        .returns(false);

      // Set the test flag, the third parameter, to true, so Mocha won't wait the timer to end for
      // 30 mins
      EncoreCatalogLogOutTimer.setEncoreLoggedInTimer('browse.nypl.org', currentTime, isTest);
    });

    after(() => {
      setCookieSpy.restore();
      logOutFromEncoreAndCatalogInSpy.restore();
      utils.hasCookie.restore();
    });

    it('should set cookie "VALID_DOMAIN_LAST_VISITED".', () => {
      expect(setCookieSpy.callCount).to.equal(1);
      expect(setCookieSpy.calledWith('VALID_DOMAIN_LAST_VISITED', currentTime)).to.equal(true);
    });

    it('should set logOutFromEncoreAndCatalogIn to 30 mins.', () => {
      expect(logOutFromEncoreAndCatalogInSpy.callCount).to.equal(1);
      expect(logOutFromEncoreAndCatalogInSpy.calledWith(encoreLogInExpireDuration)).to.equal(true);
    });
  });

  describe('when "PAT_LOGGED_IN" exists and the visited page is on Catalog\'s domain', () => {
    const encoreLogInExpireDuration = accountConfig.patLoggedInCookieExpiredTime;
    const currentTime = Date.now();

    before(() => {
      hasCookieStub = sinon.stub(utils, 'hasCookie');
      setCookieSpy = sinon.spy(utils, 'setCookie');
      logOutFromEncoreAndCatalogInSpy = sinon.spy(
        EncoreCatalogLogOutTimer,
        'logOutFromEncoreAndCatalogIn',
      );

      hasCookieStub
        .withArgs('PAT_LOGGED_IN')
        .onCall(0)
        .returns(true);

      hasCookieStub
        .withArgs('VALID_DOMAIN_LAST_VISITED')
        .onCall(0)
        .returns(false);

      // Set the test flag, the third parameter, to true, so Mocha won't wait the timer to end for
      // 30 mins
      EncoreCatalogLogOutTimer.setEncoreLoggedInTimer('catalog.nypl.org', currentTime, isTest);
    });

    after(() => {
      setCookieSpy.restore();
      logOutFromEncoreAndCatalogInSpy.restore();
      utils.hasCookie.restore();
    });

    it('should set cookie "VALID_DOMAIN_LAST_VISITED".', () => {
      expect(setCookieSpy.callCount).to.equal(1);
      expect(setCookieSpy.calledWith('VALID_DOMAIN_LAST_VISITED', currentTime)).to.equal(true);
    });

    it('should set logOutFromEncoreAndCatalogIn to 30 mins.', () => {
      expect(logOutFromEncoreAndCatalogInSpy.callCount).to.equal(1);
      expect(logOutFromEncoreAndCatalogInSpy.calledWith(encoreLogInExpireDuration)).to.equal(true);
    });
  });

  describe('when "PAT_LOGGED_IN" and "VALID_DOMAIN_LAST_VISITED" exist and the visited page is NOT on a valid domain '
    + '(neither Encore or Catalog)', () => {
    const encoreLogInExpireDuration = accountConfig.patLoggedInCookieExpiredTime;
    const currentTime = Date.now();

    // Mock the time as it has only passed 1700000 milliseconds
    mockLastVisitedTime = Date.now() - 1700000;

    before(() => {
      hasCookieStub = sinon.stub(utils, 'hasCookie');
      getCookieStub = sinon.stub(utils, 'getCookie');
      logOutFromEncoreAndCatalogInSpy = sinon.spy(
        EncoreCatalogLogOutTimer,
        'logOutFromEncoreAndCatalogIn',
      );

      hasCookieStub
        .withArgs('PAT_LOGGED_IN')
        .onCall(0)
        .returns(true);

      hasCookieStub
        .withArgs('VALID_DOMAIN_LAST_VISITED')
        .returns(true);

      getCookieStub
        .withArgs('VALID_DOMAIN_LAST_VISITED')
        .onCall(0)
        .returns(mockLastVisitedTime);

      EncoreCatalogLogOutTimer.setEncoreLoggedInTimer('somewebsite.nypl.org', currentTime, isTest);
    });

    after(() => {
      utils.getCookie.restore();
      utils.hasCookie.restore();
      logOutFromEncoreAndCatalogInSpy.restore();
    });

    it('should reset EncoreLoggedInTimer to the remaining time before "PAT_LOGGED_IN" is expired',
      () => {
        expect(hasCookieStub.callCount).to.equal(2);
        expect(logOutFromEncoreAndCatalogInSpy.callCount).to.equal(1);
        expect(
          logOutFromEncoreAndCatalogInSpy.calledWith(encoreLogInExpireDuration
            - (currentTime - mockLastVisitedTime)),
        ).to.equal(true);
      });
  });

  describe('when "PAT_LOGGED_IN" exists but "VALID_DOMAIN_LAST_VISITED" does not on an invalid domain'
    + '(i.e. following a login redirect)', () => {
    const encoreLogInExpireDuration = accountConfig.patLoggedInCookieExpiredTime;
    const currentTime = Date.now();

    // Mock the time as it has only passed 1700000 milliseconds
    mockLastVisitedTime = Date.now() - 1700000;

    before(() => {
      hasCookieStub = sinon.stub(utils, 'hasCookie')
        .withArgs('PAT_LOGGED_IN')
        .returns(true)
        .withArgs('VALID_DOMAIN_LAST_VISITED')
        .returns(false);
      logOutFromEncoreAndCatalogInSpy = sinon.spy(
        EncoreCatalogLogOutTimer,
        'logOutFromEncoreAndCatalogIn',
      );

      EncoreCatalogLogOutTimer.setEncoreLoggedInTimer('somewebsite.nypl.org', currentTime, isTest);
    });

    after(() => {
      utils.hasCookie.restore();
      logOutFromEncoreAndCatalogInSpy.restore();
    });

    it('should drop VALID_DOMAIN_LAST_VISITED and set EncoreLoggedInTimer to the full default time',
      () => {
        expect(hasCookieStub.withArgs('PAT_LOGGED_IN').callCount).to.equal(1);
        expect(hasCookieStub.withArgs('VALID_DOMAIN_LAST_VISITED').callCount).to.equal(1);
        expect(logOutFromEncoreAndCatalogInSpy.callCount).to.equal(1);
        expect(
          // Expect logout timer called with full time:
          logOutFromEncoreAndCatalogInSpy.calledWith(accountConfig.patLoggedInCookieExpiredTime)
        ).to.equal(true);
      });
  });

});

describe('logOutFromEncoreAndCatalogIn', () => {
  let hasCookieStub;
  let getCookieStub;
  let deleteCookieSpy;
  let logOutFromEncoreAndCatalogInSpy;
  let loadLogoutIframeSpy;
  const isTest = process.env.IS_TEST_ENV || true;

  describe('when no new pages on a valid domain have been visited shorter than timeout time',
    () => {
      before(() => {
        hasCookieStub = sinon.stub(utils, 'hasCookie');
        getCookieStub = sinon.stub(utils, 'getCookie');
        deleteCookieSpy = sinon.spy(utils, 'deleteCookie');
        logOutFromEncoreAndCatalogInSpy = sinon.spy(
          EncoreCatalogLogOutTimer,
          'logOutFromEncoreAndCatalogIn',
        );
        loadLogoutIframeSpy = sinon.spy(EncoreCatalogLogOutTimer, 'loadLogoutIframe');

        const currentTime = Date.now();
        // Mock the time as it has only passed 200000 milliseconds
        const mockLastVisitedTime = currentTime - 170000;

        hasCookieStub
          .withArgs('PAT_LOGGED_IN')
          .returns(true);

        getCookieStub
          .withArgs('VALID_DOMAIN_LAST_VISITED')
          .returns(mockLastVisitedTime);

        EncoreCatalogLogOutTimer.setEncoreLoggedInTimer('somewebsite.nypl.org', currentTime, isTest);
      });

      after(() => {
        utils.hasCookie.restore();
        utils.getCookie.restore();
        deleteCookieSpy.restore();
        logOutFromEncoreAndCatalogInSpy.restore();
        loadLogoutIframeSpy.restore();
      });

      it('should not yet delete cookies "PAT_LOGGED_IN", "VALID_DOMAIN_LAST_VISITED" and '
      + '"nyplIdentityPatron"',
      (done) => {
        setTimeout(() => {
          expect(logOutFromEncoreAndCatalogInSpy.callCount).to.equal(1);
          expect(deleteCookieSpy.calledWith('PAT_LOGGED_IN')).to.equal(false);
          expect(deleteCookieSpy.calledWith('VALID_DOMAIN_LAST_VISITED')).to.equal(false);
          expect(deleteCookieSpy.calledWith('nyplIdentityPatron')).to.equal(false);
          expect(loadLogoutIframeSpy.callCount).to.equal(0);
          done();
        }, 100);
      });
    });

  describe('when no pages on a valid domain have been visited longer than timeout time', () => {
    before(() => {
      hasCookieStub = sinon.stub(utils, 'hasCookie');
      getCookieStub = sinon.stub(utils, 'getCookie');
      deleteCookieSpy = sinon.spy(utils, 'deleteCookie');
      logOutFromEncoreAndCatalogInSpy = sinon.spy(
        EncoreCatalogLogOutTimer,
        'logOutFromEncoreAndCatalogIn',
      );
      loadLogoutIframeSpy = sinon.spy(EncoreCatalogLogOutTimer, 'loadLogoutIframe');

      const currentTime = Date.now();
      // Mock the time as it has passed 2000000 milliseconds
      const mockLastVisitedTimeLongerThanExp = Date.now() - 2000000;

      hasCookieStub
        .withArgs('PAT_LOGGED_IN')
        .returns(true);

      hasCookieStub
        .withArgs('VALID_DOMAIN_LAST_VISITED')
        .returns(true);

      getCookieStub
        .withArgs('VALID_DOMAIN_LAST_VISITED')
        .returns(mockLastVisitedTimeLongerThanExp);

      EncoreCatalogLogOutTimer.setEncoreLoggedInTimer('somewebsite.nypl.org', currentTime, isTest);
    });

    after(() => {
      utils.hasCookie.restore();
      utils.getCookie.restore();
      deleteCookieSpy.restore();
      logOutFromEncoreAndCatalogInSpy.restore();
      loadLogoutIframeSpy.restore();
    });

    it('should delete cookies "PAT_LOGGED_IN", "VALID_DOMAIN_LAST_VISITED" and "nyplIdentityPatron"',
      // Use async here because the original code has setTimeout as well
      (done) => {
        expect(logOutFromEncoreAndCatalogInSpy.callCount).to.equal(1);
        setTimeout(() => {
          expect(deleteCookieSpy.calledWith('PAT_LOGGED_IN')).to.equal(true);
          expect(deleteCookieSpy.calledWith('VALID_DOMAIN_LAST_VISITED')).to.equal(true);
          expect(deleteCookieSpy.calledWith('nyplIdentityPatron')).to.equal(true);
          expect(loadLogoutIframeSpy.callCount).to.equal(1);
          done();
        }, 100);
      });
  });
});
