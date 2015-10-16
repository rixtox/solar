import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import { bindActionCreators } from 'redux';
import React, { Component, PropTypes } from 'react';
import { PropTypes as RouterPropTypes } from 'react-router';

import { login } from 'modules/auth';
import { LoginForm } from 'components';
import styles from './Login.scss';

@connect(
    state => ({
      auth: state.auth
    }),
    dispatch => bindActionCreators({
      login
    }, dispatch))
@CSSModules(styles)
export default class Home extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    history: RouterPropTypes.history,
    auth: PropTypes.object.isRequired
  }

  redirect = (this.props.location.state && this.props.location.state.redirect) || '/';

  componentWillMount() {
    this.verify(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.verify(nextProps);
  }

  verify(props) {
    const { history, auth, location } = props;
    if (auth.token) {
      let redirect = '/';
      if (location.state && location.state.redirect) {
        redirect = location.state.redirect;
      } else if (auth.role) {
        redirect = `/${auth.role}`;
      }
      history.pushState(null, redirect);
    }
  }

  render() {
    return (
      <div styleName="fullpage">
        <div>
          <div styleName="title">Nebular Portal</div>
          <LoginForm onSubmit={this.props.login}/>
        </div>
      </div>
    );
  }
}
