import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component, PropTypes } from 'react';

@connect(
    state => ({
      auth: state.auth
    }),
    dispatch => bindActionCreators({
    }, dispatch))
export default class Home extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired
  }

  render() {
    const { token } = this.props.auth;
    var component;
    if (token) {
      component = <Link to="/logout">Logout</Link>;
    } else {
      component = <Link to="/login">Login</Link>;
    }

    return <div>{component}</div>;
  }
}
