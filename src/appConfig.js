const config = {
  appTitle: 'NYPL | React Header Component',
  appName: 'NYPL React Header Component',
  port: 3001,
  webpackDevServerPort: 3000,
  favIconPath: 'http://ux-static.nypl.org.s3-website-us-east-1.amazonaws.com/images/favicon.ico',
  alertsApiUrl: 'https://refinery.nypl.org/api/nypl/ndo/v0.1/content/alerts?filter%5Bscope%5D=all',
  socialMediaLinks: {
    facebook: 'https://www.facebook.com/nypl',
    twitter: 'https://twitter.com/nypl',
    instagram: 'https://instagram.com/nypl',
    tumblr: 'http://nypl.tumblr.com/',
    youtube: 'https://www.youtube.com/user/NewYorkPublicLibrary',
    soundcloud: 'https://soundcloud.com/nypl',
  },
  donationLinks: [
    {
      url: 'https://secure3.convio.net/nypl/site/SPageServer?pagename=donation_form&amt=55&s_src=FRQ16ZZ_TNN&s_subsrc=55',
      amount: '$55',
    },
    {
      url: 'https://secure3.convio.net/nypl/site/SPageServer?pagename=donation_form&amt=115&s_src=FRQ16ZZ_TNN&s_subsrc=115',
      amount: '$115',
    },
    {
      url: 'https://secure3.convio.net/nypl/site/SPageServer?pagename=donation_form&amt=250&s_src=FRQ16ZZ_TNN&s_subsrc=250',
      amount: '$250',
    },
    {
      url: 'https://secure3.convio.net/nypl/site/SPageServer?pagename=donation_form&amt=0&s_src=FRQ16ZZ_TNN&s_subsrc=other',
      amount: 'Other',
    },
  ],
  refineryApi: {
    root: {
      development: 'https://dev-refinery.nypl.org',
      qa: 'https://qa-refinery.nypl.org',
      production: 'https://refinery.nypl.org',
    },
    endpoint: '/api/nypl/ndo/v0.1/site-data/header-items',
    includes: [
      'children',
      'related-mega-menu-panes.current-mega-menu-item.images',
      'related-mega-menu-panes.current-mega-menu-item.related-content.authors.nypl-location',
      'related-mega-menu-panes.current-mega-menu-item.related-content.location',
      'related-mega-menu-panes.default-mega-menu-item.images',
      'related-mega-menu-panes.default-mega-menu-item.related-content.authors.nypl-location',
      'related-mega-menu-panes.default-mega-menu-item.related-content.location'],
    filters: {
      relationships: { parent: 'null' },
    },
  },
  headerClientEnv: {
    production: 'https://header.nypl.org',
    qa: 'https://qa-header.nypl.org',
    development: 'https://dev-header.nypl.org',
  },
  myNyplLinks: {
    catalog: 'https://browse.nypl.org/iii/encore/myaccount',
    classic: 'https://catalog.nypl.org/patroninfo/top',
    moreInfo: 'https://www.nypl.org/online-catalog-changes',
  },
};

export default config;
