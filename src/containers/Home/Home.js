import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login, logout } from 'modules/auth';
import React, { Component, PropTypes } from 'react';

import { LoginForm } from 'components';

@connect(
    state => ({
      auth: state.auth
    }),
    dispatch => bindActionCreators({
      login,
      logout
    }, dispatch))
export default class Home extends Component {
  handleLogin(data) {
    this.props.login('editors', data.email, data.password);
  }

  handleLogout() {
    this.props.logout();
  }

  render() {
    var component;
    if (this.props.auth.token) {
      component = <input
        type="button"
        value={
          "Logout " + (this.props.auth.user ? this.props.auth.user.nickname : '')
        }
        onClick={() => this.handleLogout()} />;
    } else {
      component = <LoginForm onSubmit={data => this.handleLogin(data)}/>;
    }

    return <div>{component}</div>;
  }
}
