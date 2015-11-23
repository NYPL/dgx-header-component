import React from 'react';
import nyplComponent from './components/Header/Header.js';

import ga from 'react-ga';
import {config} from 'dgx-react-ga';

import './styles/main.scss';

// Use for testing GA events
if (!window.ga) {
  console.log('Analytics not available - loading through React.');
  let gaOpts = { debug: true };
  // Passing false to get the dev GA code.
  ga.initialize(config.google.code(false), gaOpts);
}

/* app.jsx
 * Used for local development of React Components
 */
React.render(React.createElement(nyplComponent), document.getElementById('app'));
