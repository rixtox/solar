import {Component} from 'react';

import { logout } from 'modules/auth';

export default class Auth extends Component {
  static verify(store, ensureRole) {
    return (nextState, replaceState) => {
      const { auth: { token, role }} = store.getState();
      if (!token) {
        replaceState({redirect: nextState.location.pathname}, '/login');
      } else if (ensureRole && role !== ensureRole) {
        replaceState(null, `/${role}`);
      }
    };
  }

  static logout(store) {
    return (nextState, replaceState) => {
      store.dispatch(logout());
      replaceState(null, '/');
    };
  }

  render() {
    return this.props.children;
  }
}
