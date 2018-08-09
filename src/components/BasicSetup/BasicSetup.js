import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Row, Col, Card, Button } from 'antd';
import axios from 'axios';

import { successNotify, errorNotify } from '../../helpers/messageNotify';
import routes from '../../config/routes';
import apiRoutes from '../../config/apiRoutes';
import StyledComponents from '../StyledComponents';


const {
  UppercaseH1,
  UppercaseH3,
  LargeFormItem,
  LargeButton,
} = StyledComponents;

class BasicSetup extends Component {
  state = {
    isLoading: false,
  }
  onSubmit = (e) => {
    e.preventDefault();
    this.setState({
      isLoading: true,
    });
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const { name, username } = values;

        try {
          const response = await axios.post(apiRoutes.BasicSetup, {
            name,
            username,
          });
          const { success, errors } = response.data;

          if (success === true) {
            successNotify('Submitted successfully!');
            this.props.history.push(routes.OAuthSetup);
          } else {
            this.setState({
              isLoading: false,
            });
            errorNotify(errors.name);
          }
        } catch (error) {
          this.setState({
            isLoading: false,
          });
          errorNotify('An error occurred while submitting the form!');
        }
      } else {
        this.setState({
          isLoading: false,
        });
        errorNotify('An error occurred while submitting the form!');
      }
    });
  }
  onContinueHandler = () => {
    this.props.history.push(routes.OAuthSetup);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { isLoading } = this.state;
    return (
      <Row data-test="onBoarding1" type="flex" justify="center" style={{ textAlign: 'center' }}>
        <Col xs={24} sm={24} md={18} lg={10}>
          <UppercaseH1>On Boarding: Step 1</UppercaseH1>
          <Card style={{ marginTop: '50px' }}>
            <UppercaseH3 style={{ marginBottom: '50px' }}>Please fill your details</UppercaseH3>
            <Form onSubmit={this.onSubmit}>
              <LargeFormItem>
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: 'Please input your name!' }],
                })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="Name" />)}
              </LargeFormItem>
              <LargeFormItem>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: 'Please input your unique username!' }],
                })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="Username" />)}
              </LargeFormItem>
              <LargeFormItem>
                <LargeButton loading={isLoading} type="primary" htmlType="submit">
                  SUBMIT
                </LargeButton>
              </LargeFormItem>
            </Form>
            <Row style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '3em' }}>
              <Button type="danger" onClick={this.onContinueHandler}>
                Continue<Icon type="right" />
              </Button>
            </Row>
          </Card>
        </Col>
      </Row>
    );
  }
}

const WrappedSetupForm = Form.create()(BasicSetup);

BasicSetup.propTypes = {
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func.isRequired,
    validateFields: PropTypes.func.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default WrappedSetupForm;
