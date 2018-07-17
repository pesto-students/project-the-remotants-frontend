import React from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button, Row } from 'antd';
import axios from 'axios';

import { successNotify, errorNotify } from '../../helpers/messageNotify';
import apiRoutes from '../../config/apiRoutes';


const FormItem = Form.Item;

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
          const response = await axios.post(apiRoutes.Register, {
            email,
            password,
          });
          const { success, errors } = response.data;

          this.setState({
            isLoading: false,
          });

          if (success === true) {
            successNotify('Registration successfull!');
          } else {
            errorNotify(errors.name);
          }
        } catch (error) {
          this.setState({
            isLoading: false,
          });
          errorNotify('An error occurred while registering!');
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
          <FormItem>
            {getFieldDecorator('registerEmail', {
              rules: [{ required: true, message: 'Please input your email!' }],
            })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} type="email" placeholder="Email" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('registerPassword', {
              rules: [{ required: true, message: 'Please input your password!' }],
            })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />)}
          </FormItem>
          <FormItem>
            <Button loading={isLoading} type="primary" htmlType="submit">
              SIGN UP
            </Button>
          </FormItem>
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
};

export default WrappedNormalSignupForm;
