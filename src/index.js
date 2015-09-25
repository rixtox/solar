import './global.scss';
import 'file?name=../[name].[ext]!favicon.ico';
import 'babel/polyfill';
import React from 'react';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import createHistory from 'history/lib/createBrowserHistory';

import routes from 'routes';
import APIClient from 'utils/APIClient';
import { createClientStore } from 'utils/redux';

const history = createHistory();

// Create Redux store with API client and pre-defined middlewares
const client = new APIClient();
const store = createClientStore(client);

// Construct the main app root wrapped with Redux contex provider
var component = <Provider store={ store }>{() =>
  <Router history={ history }>
    { routes( store ) }
  </Router>
}</Provider>;

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
