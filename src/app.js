import React from 'react';
import nyplHeaderComponent from './components/Header/Header.js';

import ga from 'react-ga';
import {config} from 'dgx-react-ga';
import FeatureFlags from 'dgx-feature-flags';

import './styles/main.scss';

// Use for testing GA events
if (!window.ga) {
  console.log('Analytics not available - loading through React.');
  let gaOpts = { debug: true };
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
React.render(React.createElement(nyplHeaderComponent, {skipNav: {target: 'maincontent'}}), document.getElementById('app'));
