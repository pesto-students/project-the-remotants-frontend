import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';

import validations from '../../helpers/authValidation';

class Login extends Component {
  state = {
    errors: '',
  }
  onLogin = async (formData) => {
    try {
      const { success } = await this.props.loginUser(formData);
      if (success === true) {
        this.props.history.push('/dashboard');
      }
    } catch (e) {
      this.setState({
        errors: 'An error occurred while logging in!',
      });
    }
  }
  render() {
    return (
      <Fragment>
        {(this.state.errors !== '') && <p>{this.state.errors}</p>}
        <Form
          onSubmit={this.onLogin}
          validate={validations.validateInput}
          render={({
            handleSubmit, form, submitting, pristine,
          }) => (
            <form onSubmit={handleSubmit}>
              <Field name="email">
                {({ input, meta }) => (
                  <div>
                    <input {...input} type="email" placeholder="Enter your email" />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <Field name="password">
                {({ input, meta }) => (
                  <div>
                    <input {...input} type="password" placeholder="Enter your password" />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <div className="buttons">
                <button type="submit" disabled={submitting}>
                  Login
                </button>
                <button
                  type="button"
                  onClick={form.reset}
                  disabled={submitting || pristine}
                >
                  Reset
                </button>
              </div>
            </form>
          )}
        />
      </Fragment>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
