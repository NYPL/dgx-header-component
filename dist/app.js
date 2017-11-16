'use strict';

require('babel-polyfill');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _dgxReactGa = require('dgx-react-ga');

var _dgxFeatureFlags = require('dgx-feature-flags');

var _dgxFeatureFlags2 = _interopRequireDefault(_dgxFeatureFlags);

var _Header = require('./components/Header/Header.js');

require('./styles/main.scss');

var _reactA11y = require('react-a11y');

var _reactA11y2 = _interopRequireDefault(_reactA11y);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Polyfill Promise for legacy browsers
if (loadA11y) {
  (0, _reactA11y2.default)(_react2.default, { ReactDOM: _reactDom2.default, includeSrcNode: true });
}

// Use for testing GA events
if (!window.ga) {
  console.log('Analytics not available - loading through React.');
  var isProd = nodeEnv === 'production';
  var gaOpts = { debug: !isProd, titleCase: false };

  // Passing false to get the dev GA code.
  _dgxReactGa.gaUtils.initialize(_dgxReactGa.config.google.code(isProd), gaOpts);
}

// Used to activate/deactivate AB tests on global namespace.
if (!window.dgxFeatureFlags) {
  window.dgxFeatureFlags = _dgxFeatureFlags2.default.utils;
}
_dgxFeatureFlags2.default.utils.activateFeature('FundraisingFall2017');
/* app.jsx
 * Used for local development of React Components
 */
_reactDom2.default.render(_react2.default.createElement(_Header.Header, {
  skipNav: { target: 'maincontent' },
  navData: _Header.navConfig.current
}), document.getElementById('app'));