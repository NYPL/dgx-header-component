import fs from 'fs';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

/**
 * Override all axios calls, returning basic 200 responses to standard known endpoints
 *
 * @returns {MockAdapter} Adapter (see https://www.npmjs.com/package/axios-mock-adapter )
 */
function mockExternalDependencies() {
  const mock = new MockAdapter(axios);
  mock
    .onGet('https://refinery.nypl.org/api/nypl/ndo/v0.1/content/alerts?filter%5Bscope%5D=all')
    .reply(200, fs.readFileSync('./test/data/refinery-alerts.json'));
  mock
    .onGet('https://mailinglistapi.nypl.org')
    .reply(200, fs.readFileSync('./test/data/mailinglistapi.html'));
  return mock;
}

export default { mockExternalDependencies };
