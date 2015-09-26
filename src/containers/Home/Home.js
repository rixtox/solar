import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component, PropTypes } from 'react';

import { logout } from 'modules/auth';
import fetchData from 'utils/fetchData';
import { Shape as AuthShape } from 'modules/auth';

@connect(
    state => ({
      auth: state.auth
    }),
    dispatch => bindActionCreators({
      logout
    }, dispatch))
@fetchData()
export default class Home extends Component {
  static propTypes = {
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
