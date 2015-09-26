import React from 'react';
import {Route} from 'react-router';
import {
    App,
    Home,
    Login,
    Editors,
    RequireAuth
  } from 'containers';

export default function(store) {
  return (
    <Route component={App}>
      <Route path="/" component={Home}/>
      <Route path="/login" component={Login}/>
      <Route component={RequireAuth} onEnter={RequireAuth.onEnter(store, 'editors')}>
        <Route path="/editors" component={Editors}/>
      </Route>
    </Route>
  );
}
