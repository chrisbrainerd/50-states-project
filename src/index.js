import React, { Component } from 'react';
import { render } from 'react-dom';
import 'babel-polyfill';
// import App from './App';

require('react-map-gl/node_modules/mapbox-gl/dist/mapbox-gl.css');

import FakeRouter from './2/FakeRouter';

render(<FakeRouter />, document.getElementById('app'));
