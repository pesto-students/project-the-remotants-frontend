import React from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Row } from 'antd';

import { successNotify, errorNotify } from '../../helpers/messageNotify';
import StyledComponents from '../StyledComponents';
import routes from '../../config/routes';


const { LargeFormItem, LargeButton } = StyledComponents;

class Signup extends React.Component {
  state = {
    isLoading: false,
  }
  onSignup = (e) => {
    e.preventDefault();
    this.setState({
      isLoading: true,
    });
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const email = values.registerEmail;
        const password = values.registerPassword;

        try {
          const response = await this.props.registerUser({
            email,
            password,
          });
          if (response.success === true) {
            successNotify(response.message);
            this.props.history.push(routes.BasicSetup);
          } else {
            this.setState({
              isLoading: false,
            });
            errorNotify(response.errors.name);
          }
        } catch (error) {
          this.setState({
            isLoading: false,
          });
          errorNotify('An error occurred while logging in!');
        }
      } else {
        this.setState({
          isLoading: false,
        });
        errorNotify('An error occurred while registering!');
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { isLoading } = this.state;
    return (
      <Row>
        <Form onSubmit={this.onSignup}>
          <LargeFormItem>
            {getFieldDecorator('registerEmail', {
              rules: [{ required: true, message: 'Please input your email!' }],
            })(<Input data-test="registerEmail" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} type="email" placeholder="Email" />)}
          </LargeFormItem>
          <LargeFormItem>
            {getFieldDecorator('registerPassword', {
              rules: [{ required: true, message: 'Please input your password!' }],
            })(<Input data-test="registerPassword" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />)}
          </LargeFormItem>
          <LargeFormItem>
            <LargeButton data-test="signupButton" loading={isLoading} type="primary" htmlType="submit">
              SIGN UP
            </LargeButton>
          </LargeFormItem>
        </Form>
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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default WrappedNormalSignupForm;
