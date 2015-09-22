import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { compose, createStore, applyMiddleware } from 'redux';

import reducer from 'modules/reducer';

export function createClientStore(client, initialState) {
  // Setup default middlewares
  const middleware = [thunk, client.middleware];

  // Setup development middlewares
  if (__DEVELOPMENT__) {
    // Use Redux logger
    middleware.unshift(createLogger());
  }

  // Apply middlewares
  var finalCreateStore;

  // Setup Redux development tools
  if (__DEV_TOOLS__) {
    // Redux DevTools store enhancers
    const { devTools, persistState } = require('redux-devtools');
    finalCreateStore = compose(
      applyMiddleware(...middleware),
      // Provides support for DevTools:
      devTools(),
      // Lets you write ?debug_session=<name> in address bar to persist debug sessions
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(createStore);
  } else {
    finalCreateStore = applyMiddleware(...middleware)(createStore);
  }

  // Create Redux store
  const store = finalCreateStore(reducer, initialState);

  // Enable Hot Module Replacement in development mode
  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('modules/reducer', () => {
      store.replaceReducer(require('modules/reducer'));
    });
  }

  return store;
}
