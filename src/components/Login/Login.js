import React from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Row } from 'antd';

import { successNotify, errorNotify } from '../../helpers/messageNotify';
import routes from '../../config/routes';
import StyledComponents from '../StyledComponents';


const { LargeFormItem, LargeButton } = StyledComponents;

class Login extends React.Component {
  state = {
    isLoading: false,
  };
  onLogin = (e) => {
    e.preventDefault();
    this.setState({
      isLoading: true,
    });
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const email = values.loginEmail;
        const password = values.loginPassword;
        try {
          const response = await this.props.loginUser({ email, password });
          if (response.success === true) {
            successNotify(response.message);
            this.props.history.push(routes.Dashboard);
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
        errorNotify('An error occurred while logging in!');
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { isLoading } = this.state;
    return (
      <Row>
        <Form onSubmit={this.onLogin}>
          <LargeFormItem>
            {getFieldDecorator('loginEmail', {
              rules: [{ required: true, message: 'Please input your email!' }],
            })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} type="email" placeholder="Email" />)}
          </LargeFormItem>
          <LargeFormItem>
            {getFieldDecorator('loginPassword', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />)}
          </LargeFormItem>
          <LargeFormItem>
            <LargeButton loading={isLoading} type="primary" htmlType="submit">
              LOG IN
            </LargeButton>
          </LargeFormItem>
        </Form>
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
