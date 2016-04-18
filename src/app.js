import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header/Header.js';
import Actions from './actions/Actions.js';

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
ReactDOM.render(
  <Header skipNav={{target: 'maincontent'}} env="development" urls="absolute" />,
  document.getElementById('app')
);
