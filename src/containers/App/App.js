import { verify } from 'modules/auth';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import { bindActionCreators } from 'redux';
import React, { Component, PropTypes } from 'react';

import styles from './App.scss';

@connect(
    state => ({
      auth: state.auth
    }),
    dispatch => bindActionCreators({
      verify
    }, dispatch))
@CSSModules(styles)
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
      <div styleName="app">{this.props.children}</div>
    );
  }
}
