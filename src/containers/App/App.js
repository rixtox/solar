import { verify } from 'modules/auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component, PropTypes } from 'react';

@connect(
    state => ({
      role: state.auth.role,
      token: state.auth.token
    }),
    dispatch => bindActionCreators({
      verify
    }, dispatch))
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    token: PropTypes.string,
  }

  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  componentDidMount() {
    if (this.props.token) {
      this.props.verify(this.props.role, this.props.token);
    }
  }

  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
}
