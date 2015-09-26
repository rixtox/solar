import {Component} from 'react';

export default class RequireLogin extends Component {
  static onEnter(store, ensureRole) {
    return (nextState, replaceState) => {
      const { auth: { token, role }} = store.getState();
      if (!token) {
        replaceState({redirect: nextState.location.pathname}, '/login');
      } else if (ensureRole && role !== ensureRole) {
        replaceState(null, `/${role}`);
      }
    };
  }

  render() {
    return this.props.children;
  }
}
