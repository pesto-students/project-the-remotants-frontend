import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button, Row } from 'antd';
import './Login.css';

const FormItem = Form.Item;

class Login extends React.Component {
  state = {
    errors: '',
  }
  onLogin = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const email = values.loginEmail;
        const password = values.loginPassword;
        try {
          const { success } = await this.props.loginUser({ email, password });
          if (success === true) {
            this.props.history.push('/dashboard');
          }
        } catch (error) {
          this.setState({
            errors: 'An error occurred while logging in!',
          });
        }
      } else {
        this.setState({
          errors: 'An error occurred while logging in!',
        });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Row >
        <Fragment>
          {(this.state.errors !== '') && <p>{this.state.errors}</p>}
          <Form onSubmit={this.onLogin} className="login-form">
            <FormItem>
              {getFieldDecorator('loginEmail', {
                rules: [{ required: true, message: 'Please input your email!' }],
              })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} type="email" placeholder="Email" />)}
            </FormItem>
            <FormItem>
              {getFieldDecorator('loginPassword', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />)}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
            </FormItem>
          </Form>
        </Fragment>
      </Row>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(Login);

Login.propTypes = {
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func.isRequired,
    validateFields: PropTypes.func.isRequired,
  }).isRequired,
  loginUser: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default WrappedNormalLoginForm;
