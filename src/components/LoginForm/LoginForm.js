import { connectReduxForm } from 'redux-form';
import React, { Component, PropTypes } from 'react';

import radioProps from 'utils/radioProps';

@connectReduxForm({
  form: 'login',
  fields: ['role', 'email', 'password']
})
export default class LoginForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.resetForm();
  }

  render() {
    const { fields: { role, email, password }, handleSubmit, handleChange } = this.props;
    const roleProps = radioProps(this.props, 'role');
    return (
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Email" {...email} />
        <input type="password" placeholder="Password" {...password} />
        <input type="radio" id="radio-editors" {...role} {...roleProps('editors')} />
        <label htmlFor="radio-editors">Editor</label>
        <input type="radio" id="radio-managers" {...role} {...roleProps('managers')} />
        <label htmlFor="radio-managers">Manager</label>
        <input type="submit" value="Login" />
      </form>
    );
  }
}
