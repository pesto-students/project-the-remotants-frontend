import React from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Row } from 'antd';
import queryString from 'query-string';

import { successNotify, errorNotify } from '../../helpers/messageNotify';
import StyledComponents from '../StyledComponents';
import decodeInviteToken from '../../helpers/decodeInviteToken';
import routes from '../../config/routes';


const { LargeFormItem, LargeButton } = StyledComponents;

class InviteAuth extends React.Component {
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
        const name = values.registerName;
        const username = values.registerUsername;
        const password = values.registerPassword;
        const { organisation, manager } = values;

        try {
          const response = await this.props.inviteAuth({
            email,
            name,
            username,
            password,
            organisation,
            manager,
          });
          if (response.success === true) {
            successNotify(response.message);
            this.props.history.push(routes.OAuthSetup);
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
          errorNotify('An error occurred while registering the invited user!');
        }
      } else {
        this.setState({
          isLoading: false,
        });
        errorNotify('An error occurred while registering the invited user!');
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { isLoading } = this.state;

    const { token } = queryString.parse(this.props.location.search);
    const { email, manager, organisation } = decodeInviteToken(token);

    return (
      <Row style={{ textAlign: 'center' }}>
        <h1>The Remotants</h1>
        <Form onSubmit={this.onSignup}>
          <LargeFormItem>
            {getFieldDecorator('registerEmail', {
              initialValue: email, rules: [{ required: true, message: 'Please input your email!' }],
            })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} type="email" placeholder="Email" disabled />)}
          </LargeFormItem>
          <LargeFormItem>
            {getFieldDecorator('registerName', {
              rules: [{ required: true, message: 'Please input your name!' }],
            })(<Input prefix={<Icon type="smile-o" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="Name" />)}
          </LargeFormItem>
          <LargeFormItem>
            {getFieldDecorator('registerUsername', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(<Input prefix={<Icon type="safety" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="Username" />)}
          </LargeFormItem>
          <LargeFormItem>
            {getFieldDecorator('registerPassword', {
              rules: [{ required: true, message: 'Please input your password!' }],
            })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />)}
          </LargeFormItem>
          <LargeFormItem style={{ display: 'none' }}>
            {getFieldDecorator('organisation', {
              initialValue: organisation, rules: [{ required: true, message: 'Please input your password!' }],
            })(<Input type="hidden" />)}
          </LargeFormItem>
          <LargeFormItem style={{ display: 'none' }}>
            {getFieldDecorator('manager', {
              initialValue: manager, rules: [{ required: true, message: 'Please input your password!' }],
            })(<Input type="hidden" />)}
          </LargeFormItem>
          <LargeFormItem>
            <LargeButton loading={isLoading} type="primary" htmlType="submit">
              SIGN UP
            </LargeButton>
          </LargeFormItem>
        </Form>
      </Row>
    );
  }
}

const WrappedNormalSignupForm = Form.create()(InviteAuth);

InviteAuth.propTypes = {
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func.isRequired,
    validateFields: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  inviteAuth: PropTypes.func.isRequired,
};

export default WrappedNormalSignupForm;
