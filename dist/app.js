'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _componentsHeaderHeaderJs = require('./components/Header/Header.js');

var _componentsHeaderHeaderJs2 = _interopRequireDefault(_componentsHeaderHeaderJs);

var _reactGa = require('react-ga');

var _reactGa2 = _interopRequireDefault(_reactGa);

// Use for testing GA events
if (!window.ga) {
  console.log('Analytics not available - loading through React.');
  var gaOpts = { debug: false };
  // ga.initialize('UA-1420324-3', gaOpts);
}

/* app.jsx
 * Used for local development of React Components
 */
_react2['default'].render(_react2['default'].createElement(_componentsHeaderHeaderJs2['default']), document.getElementById('app'));