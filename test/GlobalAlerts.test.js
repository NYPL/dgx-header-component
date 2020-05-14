/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import moment from 'moment';

import config from '../src/appConfig.js';
import GlobalAlerts from '../src/components/GlobalAlerts/GlobalAlerts';

configure({ adapter: new Adapter() });

var mock = null;

describe('GlobalAlerts Component', () => {
  describe('Component with no alerts', () => {
    let component;

    before(() => {
      mock = new MockAdapter(axios);

      // Mock any GET request to configured alerts API:
      mock.onGet(config.alertsApiUrl).reply(200, {
        // No alerts scheduled:
        data: []
      });

      component = mount(
        <GlobalAlerts />
      );
    });

    after(() => {
      mock.restore();
    })

    it('should render no alerts', () => {
      expect(component.find('.globalAlerts-box-item').length).to.equal(0);
    });
  });

  describe('Component with two mock alerts, one relevant', () => {
    let component;

    before(() => {
      mock = new MockAdapter(axios);

      // Mock any GET request to configured alerts API:
      mock.onGet(config.alertsApiUrl).reply(200, {
        data: [
          // Set up one alert due to expire yesterday:
          {
            attributes: {
              'display-date-start': moment().subtract(2, 'd').format(),
              'display-date-end': moment().subtract(1, 'd').format(),
              'alert-text': {
                en: {
                  text: 'More People Reading Less'
                }
              }
            }
          },
          // Set up one alert due to expire tomorrow:
          {
            attributes: {
              'display-date-start': moment().subtract(1, 'd').format(),
              'display-date-end': moment().add(1, 'd').format(),
              'alert-text': {
                en: {
                  text: 'More People Reading More'
                }
              }
            }
          }
        ]
      });

      component = mount(
        <GlobalAlerts />
      );
    });

    after(() => {
      mock.restore();
    })

    it('should render only the single alert valid for current time', () => {
      expect(component.find('.globalAlerts-box-item').length).to.equal(1);
      expect(component.find('.globalAlerts-box-item').text()).to.equal('More People Reading More')
    });

    it('should render a <div> wrapper with @role="complementary"', () => {
      expect(component.find('[role="complementary"]').length).to.equal(1);
    });
  });
});
