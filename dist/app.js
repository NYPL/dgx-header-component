"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _dgxReactGa = require("dgx-react-ga");

var _dgxFeatureFlags = _interopRequireDefault(require("dgx-feature-flags"));

var _Header = require("./components/Header/Header.js");

require("./styles/main.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Polyfill Promise for legacy browsers
// Use for testing GA events
if (!window.ga) {
  console.log('Analytics not available - loading through React.');
  var isProd = nodeEnv === 'production';
  var gaOpts = {
    debug: !isProd,
    titleCase: false
  }; // Passing false to get the dev GA code.

  _dgxReactGa.gaUtils.initialize(_dgxReactGa.config.google.code(isProd), gaOpts);
} // Used to activate/deactivate AB tests on global namespace.


if (!window.dgxFeatureFlags) {
  window.dgxFeatureFlags = _dgxFeatureFlags.default.utils;
}
/* app.jsx
 * Used for local development of React Components
 */


_reactDom.default.render( /*#__PURE__*/_react.default.createElement(_Header.Header, {
  skipNav: {
    target: 'maincontent'
  },
  navData: _Header.navConfig.current
}), document.getElementById('app'));