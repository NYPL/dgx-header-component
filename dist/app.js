'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _componentsHeaderHeaderJs = require('./components/Header/Header.js');

var _componentsHeaderHeaderJs2 = _interopRequireDefault(_componentsHeaderHeaderJs);

var _actionsActionsJs = require('./actions/Actions.js');

var _actionsActionsJs2 = _interopRequireDefault(_actionsActionsJs);

var _reactGa = require('react-ga');

var _reactGa2 = _interopRequireDefault(_reactGa);

var _dgxReactGa = require('dgx-react-ga');

var _dgxFeatureFlags = require('dgx-feature-flags');

var _dgxFeatureFlags2 = _interopRequireDefault(_dgxFeatureFlags);

require('./styles/main.scss');

// Use for testing GA events
if (!window.ga) {
  console.log('Analytics not available - loading through React.');
  var gaOpts = { debug: true };
  // Passing false to get the dev GA code.
  _reactGa2['default'].initialize(_dgxReactGa.config.google.code(false), gaOpts);
}

// Used to activate/deactivate AB tests on global namespace.
if (!window.dgxFeatureFlags) {
  window.dgxFeatureFlags = _dgxFeatureFlags2['default'].utils;
}

// Sets the API path for local testing
_actionsActionsJs2['default'].setClientAppEnv('development');

/* app.jsx
 * Used for local development of React Components
 */
_reactDom2['default'].render(_react2['default'].createElement(_componentsHeaderHeaderJs2['default'], { skipNav: { target: 'maincontent' }, urls: 'absolute' }), document.getElementById('app'));