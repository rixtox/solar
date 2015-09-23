import React from 'react';
import {Route} from 'react-router';
import {
    App,
    Home,
    Login
  } from 'containers';

export default function(store) {
  return (
    <Route component={App}>
      <Route path="/" component={Home}/>
      <Route path="/login" component={Login}/>
    </Route>
  );
}
