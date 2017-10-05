// Polyfill Promise for legacy browsers
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { ga, config } from 'dgx-react-ga';
import FeatureFlags from 'dgx-feature-flags';
import { Header, navConfig } from './components/Header/Header.js';
import './styles/main.scss';
import a11y from 'react-a11y';

if (loadA11y) {
  a11y(React, { ReactDOM, includeSrcNode: true });
}

// Use for testing GA events
if (!window.ga) {
  console.log('Analytics not available - loading through React.');
  const gaOpts = { debug: true };
  // Passing false to get the dev GA code.
  ga.initialize(config.google.code(false), gaOpts);
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
    location={window.location.href}
  />,
  document.getElementById('app')
);
