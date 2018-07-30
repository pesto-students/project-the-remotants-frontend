import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import {
  Layout,
  Breadcrumb,
  Row,
  Col,
  Form,
  Icon,
  Input,
  Card,
} from 'antd';
import axios from 'axios';

import { successNotify, errorNotify } from '../../../../helpers/messageNotify';
import apiRoutes from '../../../../config/apiRoutes';
import { organisationRoutes } from '../../../../config/routes';
import StyledComponents from '../../../StyledComponents';
import LoadingCard from '../../../LoadingCard';


const { Content } = Layout;
const { TextArea } = Input;
const { LargeFormItem, LargeButton } = StyledComponents;


class Create extends Component {
  state = {
    isPageLoading: true,
    isLoading: false,
  }
  componentDidMount = () => {
    this.setState({
      isPageLoading: false,
    });
  }
  onSubmit = (e) => {
    e.preventDefault();
    this.setState({
      isLoading: true,
    });
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const { name, description } = values;

        try {
          const response = await axios.post(apiRoutes.Organisation.Setup, {
            name,
            description,
          });
          const { success, errors } = response.data;

          if (success === true) {
            successNotify(`"${name}" has been created successfully!`);
            this.props.history.push(organisationRoutes.OrganisationView);
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
  render() {
    const { getFieldDecorator } = this.props.form;
    const { isPageLoading, isLoading } = this.state;
    return (
      <Fragment>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item>Organisation</Breadcrumb.Item>
          <Breadcrumb.Item>Create</Breadcrumb.Item>
        </Breadcrumb>
        <Content style={{
            background: '#fff',
            padding: 24,
            margin: 0,
            minHeight: 480,
            textAlign: 'center',
          }}
        >
          <LoadingCard loading={isPageLoading}>
            <Row type="flex" justify="center" style={{ textAlign: 'center' }}>
              <Col span={18}>
                <h1>Create a New Organisation</h1>
                <Card>
                  <h3 style={{ marginBottom: '50px' }}>Please fill your details</h3>
                  <Form onSubmit={this.onSubmit}>
                    <LargeFormItem>
                      {getFieldDecorator('name', {
                        rules: [{ required: true, message: 'Please input the organisation name!' }],
                      })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="Organisation Name" />)}
                    </LargeFormItem>
                    <LargeFormItem>
                      {getFieldDecorator('description', {
                        rules: [{ required: false, message: 'Please write a brief description!' }],
                      })(<TextArea placeholder="Briefly describe your organisation" autosize={{ minRows: 2 }} />)}
                    </LargeFormItem>
                    <LargeFormItem>
                      <LargeButton loading={isLoading} type="primary" htmlType="submit">
                        Create
                      </LargeButton>
                    </LargeFormItem>
                  </Form>
                </Card>
              </Col>
            </Row>
          </LoadingCard>
        </Content>
      </Fragment>
    );
  }
}


const WrappedCreateOrgForm = Form.create()(Create);

Create.propTypes = {
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func.isRequired,
    validateFields: PropTypes.func.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default WrappedCreateOrgForm;

