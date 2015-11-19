import React from 'react';
import nyplComponent from './components/Header/Header.js';

import ga from 'react-ga';

// Use for testing GA events
if (!window.ga) {
  console.log('Analytics not available - loading through React.');
  let gaOpts = { debug: false };
  // ga.initialize('UA-1420324-3', gaOpts);
}

/* app.jsx
 * Used for local development of React Components
 */
React.render(React.createElement(nyplComponent), document.getElementById('app'));
