import { connectReduxForm } from 'redux-form';
import React, { Component, PropTypes } from 'react';

@connectReduxForm({
  form: 'login',
  fields: ['email', 'password']
})
export default class LoginForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    resetForm: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.resetForm();
  }

  render() {
    const { fields: { email, password }, handleSubmit, onSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Email" {...email} />
        <input type="password" placeholder="Password" {...password} />
        <input type="submit" value="Login" />
      </form>
    );
  }
}
