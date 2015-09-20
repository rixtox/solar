import 'babel/polyfill';
import React from 'react';
import { Router } from 'react-router';
import { Provider } from 'react-redux';

import routes from './routes'; // TODO
import cookie from './utils/cookie';
import APIClient from './utils/APIClient';
import { createClientStore } from './utils/redux';

// Create Redux store with API client and pre-defined middlewares
// Initialze store with saved cookie
const client = new APIClient();
const store = createClientStore(client, {
  auth: {
    token: cookie.get('token') || ''
  }
});

// Construct the main app root wrapped with Redux contex provider
var component = (
  <Provider store={store}>{() =>
    <Router>{routes}</Router>
  }</Provider>
);

// While compiling in development environment, or explicitly enabling devtools,
// include redux-devtools and wrap the main app root together with DebugPanel
if (__DEV_TOOLS__) {
  const { DevTools, DebugPanel } = require('redux-devtools/lib/react');
  const DiffMonitor = require('redux-devtools-diff-monitor');
  component = (<div>
    {component}
    <DebugPanel top right bottom>
      <DevTools store={store} monitor={DiffMonitor}/>
    </DebugPanel>
  </div>);
}

// Mount and render main app root on body element
React.render(component, document.body);
