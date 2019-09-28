import React, { Component } from 'react';
import { render } from 'react-dom';
import 'babel-polyfill';
import App from './App';

import FakeRouter from './2/FakeRouter';

render(<FakeRouter />, document.getElementById('app'));
