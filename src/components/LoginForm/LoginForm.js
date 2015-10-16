import CSSModules from 'react-css-modules';
import { connectReduxForm } from 'redux-form';
import React, { Component, PropTypes } from 'react';

import styles from './LoginForm.scss';
import { radioProps } from 'utils/formHelpers';

@connectReduxForm({
  form: 'login',
  fields: ['role', 'email', 'password']
})
@CSSModules(styles)
export default class LoginForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.initializeForm({
      role: 'editors'
    });
  }

  render() {
    const { fields: { email, password }, handleSubmit } = this.props;
    const roleProps = radioProps(this.props, 'role');
    return (
      <form onSubmit={handleSubmit}>
        <div styleName="form-field">
          <label styleName="label" htmlFor="login-email">Email</label>

          <input
            autoFocus
            styleName="input"
            id="login-email"
            type="email"
            placeholder="editor@nebular.me"
            required
            {...email}
          />
        </div>
        <div styleName="form-field">
          <label styleName="label" htmlFor="login-password">Password</label>

          <input
            styleName="input"
            id="login-password"
            type="password"
            placeholder="••••••••"
            required
            {...password}
          />
        </div>
        <div styleName="radio-group">
          <div>
            <input styleName="radio" type="radio" id="login-radio-editors" {...roleProps('editors')} />
            <label styleName="radio-label" htmlFor="login-radio-editors">Editor</label>
          </div>
          <div>
            <input styleName="radio" type="radio" id="login-radio-managers" {...roleProps('managers')} />
            <label styleName="radio-label" htmlFor="login-radio-managers">Manager</label>
          </div>
        </div>
        <div styleName="form-field">
          <input type="submit" styleName="btn" value="Login" />
        </div>
      </form>
    );
  }
}
