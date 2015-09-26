import { verify } from 'modules/auth';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import { bindActionCreators } from 'redux';
import React, { Component, PropTypes } from 'react';

import styles from './App.scss';
import fetchData from 'utils/fetchData';
import { Shape as AuthShape } from 'modules/auth';

@connect(
    state => ({
      auth: state.auth
    }),
    dispatch => bindActionCreators({
      verify
    }, dispatch))
@fetchData()
@CSSModules(styles)
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    verify: PropTypes.func.isRequired
  }

  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  fetchData() {
    const { token, user } = this.props.auth;
    if (token && !user) {
      this.props.verify(this.props.auth);
    }
  }

  render() {
    return (
      <div styleName="app">{this.props.children}</div>
    );
  }
}
