// Polyfill Promise for legacy browsers
import React from 'react';
import ReactDOM from 'react-dom';
import { config, gaUtils } from 'dgx-react-ga';
import FeatureFlags from 'dgx-feature-flags';
import { Header, navConfig } from './components/Header/Header.js';
import './styles/main.scss';

// Use for testing GA events
if (!window.ga) {
  console.log('Analytics not available - loading through React.');
  const isProd = nodeEnv === 'production';
  const gaOpts = { debug: !isProd, titleCase: false };

  // Passing false to get the dev GA code.
  gaUtils.initialize(config.google.code(isProd), gaOpts);
}

// Used to activate/deactivate AB tests on global namespace.
if (!window.dgxFeatureFlags) {
  window.dgxFeatureFlags = FeatureFlags.utils;
}

/* app.jsx
 * Used for local development of React Components
 */
ReactDOM.render(
  <Header
    skipNav={{ target: 'maincontent' }}
    navData={navConfig.current}
  />,
  document.getElementById('app')
);
