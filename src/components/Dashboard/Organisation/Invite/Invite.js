import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import {
  Layout,
  Breadcrumb,
  Input,
  Icon,
  Row,
  Col,
  Button,
  List,
} from 'antd';
import axios from 'axios';

import { successNotify, errorNotify } from '../../../../helpers/messageNotify';
import apiRoutes from '../../../../config/apiRoutes';
import LoadingCard from '../../../LoadingCard';


const { Content } = Layout;
const { Search } = Input;

const validateEmail = (email) => {
  // eslint-disable-next-line no-useless-escape
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (emailRegex.test(email)) {
    return true;
  }
  return false;
};

class Invite extends Component {
  state = {
    isPageLoading: true,
    inputManagerEmail: '',
    managersEmail: [],
    inputEmployeeEmail: '',
    employeesEmail: [],
    isLoadingAddManagers: false,
    isLoadingAddEmployees: false,
  }
  componentDidMount = async () => {
    const { organisations } = this.props;
    if (organisations === null) {
      const { success, errors } = await this.props.viewCurrentUserOrganisations();
      if (success === false) {
        errorNotify(errors.name);
      }
    }
    this.setState({
      isPageLoading: false,
    });
  }
  onManagerEmailChange = (e) => {
    this.setState({
      inputManagerEmail: e.target.value,
    });
  }
  onEmployeeEmailChange = (e) => {
    this.setState({
      inputEmployeeEmail: e.target.value,
    });
  }
  addAsManager = (email) => {
    if (!validateEmail(email)) {
      errorNotify('Please enter a valid email');
      return;
    }
    const emailExists = this.state.managersEmail.some(managerEmail => managerEmail === email);
    if (emailExists === false) {
      this.setState(prevState => ({
        managersEmail: [
          ...prevState.managersEmail,
          email,
        ],
      }));
    } else {
      errorNotify('This email already exists');
    }
    this.setState({
      inputManagerEmail: '',
    });
  }
  addAsEmployee = (email) => {
    if (!validateEmail(email)) {
      errorNotify('Please enter a valid email');
      return;
    }
    const emailExists = this.state.employeesEmail.some(employeeEmail => employeeEmail === email);
    if (emailExists === false) {
      this.setState(prevState => ({
        employeesEmail: [
          ...prevState.employeesEmail,
          email,
        ],
      }));
    } else {
      errorNotify('This email already exists');
    }
    this.setState({
      inputEmployeeEmail: '',
    });
  }
  addManagers = async () => {
    const { managersEmail } = this.state;
    if (managersEmail.length === 0) {
      errorNotify('You need to add an email first!');
      return;
    }
    this.setState({
      isLoadingAddManagers: true,
    });
    try {
      const response = await axios.post(apiRoutes.Organisation.Invite, {
        emails: JSON.stringify(managersEmail),
        manager: 1,
        organisationID: this.props.match.params.id,
      });
      const { success, errors } = response.data;

      this.setState({
        isLoadingAddManagers: false,
      });

      if (success === true) {
        successNotify('Invites have been sent to the managers!');
      } else {
        errorNotify(errors.name);
      }
    } catch (error) {
      this.setState({
        isLoadingAddManagers: false,
      });
      errorNotify('An error occurred while inviting managers!');
    }
  }
  addEmployees = async () => {
    const { employeesEmail } = this.state;
    if (employeesEmail.length === 0) {
      errorNotify('You need to add an email first!');
      return;
    }
    this.setState({
      isLoadingAddEmployees: true,
    });
    try {
      const response = await axios.post(apiRoutes.Organisation.Invite, {
        emails: JSON.stringify(employeesEmail),
        manager: 0,
        organisationID: this.props.match.params.id,
      });
      const { success, errors } = response.data;

      this.setState({
        isLoadingAddEmployees: false,
      });

      if (success === true) {
        successNotify('Invites have been sent to the employees!');
      } else {
        errorNotify(errors.name);
      }
    } catch (error) {
      this.setState({
        isLoadingAddEmployees: false,
      });
      errorNotify('An error occurred while inviting employees!');
    }
  }

  clearManagers = () => {
    this.setState({
      managersEmail: [],
    });
  }

  clearEmployees = () => {
    this.setState({
      employeesEmail: [],
    });
  }

  render() {
    const { organisations, match } = this.props;

    const organisationID = match.params.id;
    const { isLoadingAddManagers, isLoadingAddEmployees } = this.state;

    const {
      isPageLoading,
      inputManagerEmail,
      managersEmail,
      inputEmployeeEmail,
      employeesEmail,
    } = this.state;

    return (
      <Fragment>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item>Organisation</Breadcrumb.Item>
          <Breadcrumb.Item>Invite</Breadcrumb.Item>
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
            <Fragment>
              <h2>
                Invite Members to&nbsp;
                {
                  organisations && organisations
                    .filter(organisation => organisation.id === organisationID)
                    .map(organisation => (
                      <span key={organisation.id}>
                        {`"${organisation.name}"`}
                      </span>
                    ))
                }
              </h2>

              <Row gutter={64} style={{ marginTop: '40px' }}>
                <Col span={12}>
                  <h3>Add Managers</h3>
                  <Search
                    placeholder="Input Email"
                    type="email"
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    enterButton="Add as Manager"
                    onSearch={this.addAsManager}
                    onChange={this.onManagerEmailChange}
                    value={inputManagerEmail}
                    required
                  />
                  {
                    (managersEmail.length > 0) &&
                      <List
                        style={{ marginTop: '30px' }}
                        bordered
                        dataSource={managersEmail}
                        renderItem={item => (<List.Item>{item}</List.Item>)}
                      />
                  }
                  <Button
                    loading={isLoadingAddManagers}
                    onClick={this.addManagers}
                    style={{ marginTop: '20px', marginRight: '5px' }}
                  >
                    <Icon type="plus-circle-o" />Add
                  </Button>
                  <Button
                    onClick={this.clearManagers}
                    style={{ marginLeft: '5px' }}
                  >
                    <Icon type="delete" />Clear
                  </Button>
                </Col>

                <Col span={12}>
                  <h3>Add Employees</h3>

                  <Search
                    placeholder="Input Email"
                    type="email"
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    enterButton="Add as Employee"
                    onSearch={this.addAsEmployee}
                    onChange={this.onEmployeeEmailChange}
                    value={inputEmployeeEmail}
                    required
                  />

                  {
                    (employeesEmail.length > 0) &&
                      <List
                        style={{ marginTop: '30px' }}
                        bordered
                        dataSource={employeesEmail}
                        renderItem={item => (<List.Item>{item}</List.Item>)}
                      />
                  }
                  <Button
                    loading={isLoadingAddEmployees}
                    onClick={this.addEmployees}
                    style={{ marginTop: '20px', marginRight: '5px' }}
                  >
                    <Icon type="plus-circle-o" />Add
                  </Button>
                  <Button
                    onClick={this.clearEmployees}
                    style={{ marginLeft: '5px' }}
                  >
                    <Icon type="delete" />Clear
                  </Button>
                </Col>
              </Row>
            </Fragment>
          </LoadingCard>
        </Content>
      </Fragment>
    );
  }
}

Invite.propTypes = {
  organisations: PropTypes.arrayOf(PropTypes.shape({})),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  viewCurrentUserOrganisations: PropTypes.func.isRequired,
};

Invite.defaultProps = {
  organisations: [],
};

export default Invite;

