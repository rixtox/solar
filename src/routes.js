import React from 'react';
import { Route, Redirect } from 'react-router';
import {
    App,
    Home,
    Login,
    Editors,
    Auth
  } from 'containers';

export default function(store) {
  return (
    <Route component={App}>
      <Route path="/" component={Home}/>
      <Route path="/login" component={Login}/>
      <Route path="/logout" component={Auth} onEnter={Auth.logout(store)}/>
      <Route component={Auth} onEnter={Auth.verify(store, 'editors')}>
        <Route path="/editors" component={Editors}/>
        <Route path="/editors/articles/:article_id" component={Editors}/>
      </Route>
    </Route>
  );
}
