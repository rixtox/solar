import { verify } from 'modules/auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component, PropTypes } from 'react';

@connect(
    state => ({
      auth: state.auth
    }),
    dispatch => bindActionCreators({
      verify
    }, dispatch))
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  }

  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  componentDidMount() {
    const { token, user } = this.props.auth;
    if (token && !user) {
      this.props.verify(this.props.auth);
    }
  }

  render() {
    const { token, user } = this.props.auth;
    if (token && !user) {
      return <div/>;
    }
    return (
      <div>{this.props.children}</div>
    );
  }
}
