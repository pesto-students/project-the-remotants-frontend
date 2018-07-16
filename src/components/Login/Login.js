import React from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button, Row } from 'antd';
import './Login.css';

import { successNotify, errorNotify } from '../../helpers/messageNotify';
import routes from '../../config/routes';


const FormItem = Form.Item;

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
            this.props.history.push(routes.Setup);
          } else {
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
            <Button loading={isLoading} type="primary" htmlType="submit">
              LOG IN
            </Button>
          </FormItem>
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
