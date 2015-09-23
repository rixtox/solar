import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component, PropTypes } from 'react';

import { logout } from 'modules/auth';

@connect(
    state => ({
      auth: state.auth
    }),
    dispatch => bindActionCreators({
      logout
    }, dispatch))
export default class Home extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  }

  handleLogout() {
    this.props.logout();
  }

  render() {
    const { token, user } = this.props.auth;
    var component;
    if (token) {
      component = <input
        type="button"
        value={
          "Logout " + (user ? user.nickname : '')
        }
        onClick={() => this.handleLogout()} />;
    } else {
      component = <Link to="/login" state={{redirect: '/'}}>Login</Link>;
    }

    return <div>{component}</div>;
  }
}
