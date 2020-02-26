'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var authServerDomain = 'http://dev-oauth-app.us-east-1.amazonaws.com/auth';

var config = {
  appTitle: 'NYPL | React Header Component',
  appName: 'NYPL React Header Component',
  port: 3001,
  webpackDevServerPort: 3000,
  favIconPath: '//d2znry4lg8s0tq.cloudfront.net/images/favicon.ico',
  alertsApiUrl: 'https://refinery.nypl.org/api/nypl/ndo/v0.1/content/alerts?filter%5Bscope%5D=all',
  fundraising: {
    apiUrl: 'https://platform.nypl.org/api/v0.1/fundraising-banner',
    experimentName: 'FundraisingFall2017',
    primaryBgImage: '//d2znry4lg8s0tq.cloudfront.net/fundraising/snowflake_wht_bg.png',
    secondaryBgImage: '//d2znry4lg8s0tq.cloudfront.net/fundraising/snowflake_teal_bg.png',
    cookieExpInSeconds: '86400' // 24hrs
  },
  socialMediaLinks: {
    facebook: 'https://www.facebook.com/nypl',
    twitter: 'https://twitter.com/nypl',
    instagram: 'https://instagram.com/nypl',
    tumblr: 'http://nypl.tumblr.com/',
    youtube: 'https://www.youtube.com/user/NewYorkPublicLibrary',
    soundcloud: 'https://soundcloud.com/nypl'
  },
  donationLinks: [{
    url: 'https://secure3.convio.net/nypl/site/SPageServer?pagename=donation_form&amt=55&s_src=FRQ16ZZ_TNN&s_subsrc=55',
    amount: '$55'
  }, {
    url: 'https://secure3.convio.net/nypl/site/SPageServer?pagename=donation_form&amt=115&s_src=FRQ16ZZ_TNN&s_subsrc=115',
    amount: '$115'
  }, {
    url: 'https://secure3.convio.net/nypl/site/SPageServer?pagename=donation_form&amt=250&s_src=FRQ16ZZ_TNN&s_subsrc=250',
    amount: '$250'
  }, {
    url: 'https://secure3.convio.net/nypl/site/SPageServer?pagename=donation_form&amt=0&s_src=FRQ16ZZ_TNN&s_subsrc=other',
    amount: 'Other'
  }],
  loginMyNyplLinks: {
    catalog: authServerDomain + '/login?redirect_uri=https://browse.nypl.org/iii/encore/myaccount',
    research: authServerDomain + '/login?redirect_uri=https://catalog.nypl.org/patroninfo/top',
    tokenRefreshLink: authServerDomain + '/refresh',
    logOutLink: authServerDomain + '/logout'
  },
  myNyplLinks: {
    catalog: 'https://browse.nypl.org/iii/encore/myaccount',
    research: 'https://catalog.nypl.org/patroninfo/top'
  },
  patronApiUrl: 'https://platform.nypl.org/api/v0.1/auth/patron/tokens/'
};

exports.default = config;
module.exports = exports['default'];