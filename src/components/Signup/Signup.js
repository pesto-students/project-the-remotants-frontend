import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button, Row } from 'antd';

const FormItem = Form.Item;

class Signup extends React.Component {
  state = {
    errors: '',
  }
  onSignup = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const email = values.registerEmail;
        const password = values.registerPassword;
        try {
          await this.props.registerUser({ email, password });
        } catch (error) {
          this.setState({
            errors: 'An error occurred while registering!',
          });
        }
      } else {
        this.setState({
          errors: 'An error occurred while registering!',
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
          <Form onSubmit={this.onSignup} className="signup-form">
            <FormItem>
              {getFieldDecorator('registerEmail', {
                rules: [{ required: true, message: 'Please input your email!' }],
              })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} type="email" placeholder="Email" />)}
            </FormItem>
            <FormItem>
              {getFieldDecorator('registerPassword', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />)}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit" className="signup-form-button">
                Sign Up
              </Button>
            </FormItem>
          </Form>
        </Fragment>
      </Row>
    );
  }
}

const WrappedNormalSignupForm = Form.create()(Signup);

Signup.propTypes = {
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func.isRequired,
    validateFields: PropTypes.func.isRequired,
  }).isRequired,
  registerUser: PropTypes.func.isRequired,
};

export default WrappedNormalSignupForm;
