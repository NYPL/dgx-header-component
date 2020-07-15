import { jsdom } from 'jsdom';
import { expect } from 'chai';

// Import the component that is going to be tested
import utils from '../src/utils/utils';

describe('Utils', () => {
  before(() => {
    global.document = jsdom('');
  });

  afterEach(() => {
    utils.deleteCookie('TEST_COOKIE');
  });

  describe('setCookie', () => {
    it.skip('should set the cookie with proper name, value, and other settings.', () => {
      utils.setCookie('TEST_COOKIE', 'thisisthetestvalue');

      expect(document.cookie).to.equal('TEST_COOKIE=thisisthetestvalue');
    });
    it('should just terminate the function if no valid name or value passed to the method.', () => {
      utils.setCookie();

      expect(global.document.cookie).to.equal('');
    });
  });
});
