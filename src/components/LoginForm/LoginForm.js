import CSSModules from 'react-css-modules';
import React, { Component, PropTypes } from 'react';

import styles from './LoginForm.scss';

@CSSModules(styles)
export default class LoginForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  }

  state = {
    email: '',
    password: '',
    role: 'editors'
  }

  onChange = ({target: t}) => {
    this.setState({[t.name]: t.value})
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state);
  }

  onSelectRole = role => () => this.setState({role})

  render() {
    const { role, email, password } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <div styleName="form-field">
          <label styleName="label" htmlFor="login-email">Email</label>

          <input
            name="email"
            autoFocus
            styleName="input"
            id="login-email"
            type="email"
            placeholder={role === 'editors' ? 'editor@nebular.me' : 'manager@nebular.me'}
            required
            value={email}
            onChange={this.onChange}
          />
        </div>
        <div styleName="form-field">
          <label styleName="label" htmlFor="login-password">Password</label>

          <input
            name="password"
            styleName="input"
            id="login-password"
            type="password"
            placeholder="••••••••"
            required
            value={password}
            onChange={this.onChange}
          />
        </div>
        <div styleName="radio-group">
          <div>
            <input
              name="role"
              styleName="radio"
              type="radio"
              id="login-radio-editors"
              checked={role === 'editors'}
              value="editors"
              onChange={this.onSelectRole('editors')}
            />
            <label
              styleName="radio-label"
              htmlFor="login-radio-editors"
              onClick={this.onSelectRole('editors')}>
                Editor
            </label>
          </div>
          <div>
            <input
              name="role"
              styleName="radio"
              type="radio"
              id="login-radio-editors"
              checked={role === 'managers'}
              value="managers"
              onChange={this.onSelectRole('managers')}
            />
            <label
              styleName="radio-label"
              htmlFor="login-radio-managers"
              onClick={this.onSelectRole('managers')}>
                Manager
            </label>
          </div>
        </div>
        <div styleName="form-field">
          <input type="submit" styleName="btn" value="Login" />
        </div>
      </form>
    );
  }
}
