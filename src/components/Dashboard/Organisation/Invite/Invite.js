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
} from 'antd';
import styled from 'styled-components';
import axios from 'axios';

import { successNotify, errorNotify } from '../../../../helpers/messageNotify';
import apiRoutes from '../../../../config/apiRoutes';


const { Content } = Layout;
const { Search } = Input;

const LeftAlignedUL = styled.ul`
  text-align: left;
`;

class Invite extends Component {
  state = {
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
    this.setState({
      isLoadingAddManagers: true,
    });
    try {
      const response = await axios.post(apiRoutes.Organisation.Invite, {
        emails: JSON.stringify(this.state.managersEmail),
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
    this.setState({
      isLoadingAddEmployees: true,
    });
    try {
      const response = await axios.post(apiRoutes.Organisation.Invite, {
        emails: JSON.stringify(this.state.employeesEmail),
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

  render() {
    const { organisations, match } = this.props;

    const organisationID = match.params.id;
    const { isLoadingAddManagers, isLoadingAddEmployees } = this.state;

    const {
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
          <h1>
            Invite Members to&nbsp;
            {
              organisations && organisations
                .filter(organisation => organisation.id === organisationID)
                .map(organisation => (
                  <span key={organisation.id}>{organisation.name}</span>
                ))
            }
          </h1>

          <Row gutter={32}>
            <Col span={12}>
              <h2>Add Managers</h2>
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

              <LeftAlignedUL>
                {
                  managersEmail.map(email => (
                    <li key={email}>{email}</li>
                  ))
                }
              </LeftAlignedUL>
              <Button loading={isLoadingAddManagers} onClick={this.addManagers}>
                Add
              </Button>
            </Col>

            <Col span={12}>
              <h2>Add Employees</h2>

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

              <LeftAlignedUL>
                {
                  employeesEmail.map(email => (
                    <li key={email}>{email}</li>
                  ))
                }
              </LeftAlignedUL>
              <Button loading={isLoadingAddEmployees} onClick={this.addEmployees}>
                Add
              </Button>
            </Col>
          </Row>
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

