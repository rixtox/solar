import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { login, logout } from 'modules/auth';

@connect(
    state => ({user: state.auth.user, token: state.auth.token}),
    dispatch => bindActionCreators({login, logout}, dispatch))
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    token: PropTypes.string,
    logout: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired
  }

  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  handleLogout(event) {
    event.preventDefault();
    this.props.logout();
  }

  render() {
    const {user} = this.props;
    return (
      <div>{this.props.children}</div>
    );
  }
}
