import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import {
  Layout,
  Breadcrumb,
  Tabs,
  Menu,
} from 'antd';

import { errorNotify } from '../../../../helpers/messageNotify';
import { organisationRoutes } from '../../../../config/routes';
import Manager from './Manager';
import Employee from './Employee';
import LoadingCard from '../../../LoadingCard';


const { Content } = Layout;
const { TabPane } = Tabs;


class Track extends Component {
  state = {
    isPageLoading: true,
    tabInitialVal: 'managers',
    currentManagerID: undefined,
    currentEmployeeID: undefined,
  }
  componentDidMount = async () => {
    const { match: { params: { id } } } = this.props;
    const viewAllOrganisationsResponse = await this.props.viewCurrentUserOrganisations();
    if (viewAllOrganisationsResponse.success === false) {
      errorNotify(viewAllOrganisationsResponse.errors.name);
    } else {
      const viewCurrentOrganisationResponse = await this.props.viewCurrentOrganisation(id);
      this.setState({
        isPageLoading: false,
      });
      if (viewCurrentOrganisationResponse.success === false) {
        errorNotify(viewCurrentOrganisationResponse.errors.name);
      }
    }
  }
  onCustomMenuClickHandler = () => {
    const { currentManagerID, currentEmployeeID } = this.state;
    const { match: { params: { id } } } = this.props;
    if (currentManagerID === undefined && currentEmployeeID !== undefined) {
      this.props.history.push(`${organisationRoutes.Organisation}/${id}/track-members/${currentEmployeeID}`);
    } else if (currentManagerID !== undefined && currentEmployeeID === undefined) {
      this.props.history.push(`${organisationRoutes.Organisation}/${id}/track-members/${currentManagerID}`);
    } else {
      errorNotify('There is some error!');
    }
  };
  setCurrentManagerID = (id) => {
    this.setState({
      currentManagerID: id,
      currentEmployeeID: undefined,
    });
  }
  setCurrentEmployeeID = (id) => {
    this.setState({
      currentManagerID: undefined,
      currentEmployeeID: id,
    });
  }
  CustomMenu = (
    <Menu onClick={this.onCustomMenuClickHandler}>
      <Menu.Item key="track">
        Track Activity
      </Menu.Item>
    </Menu>
  )
  render() {
    const { organisations } = this.props;
    let currentOrganisation;
    if (organisations) {
      currentOrganisation = organisations.filter(organisation => organisation.current === 1);
    }

    const { isPageLoading } = this.state;

    return (
      <Fragment>
        <Breadcrumb style={{ margin: '6px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item>Organisation</Breadcrumb.Item>
          <Breadcrumb.Item>Track</Breadcrumb.Item>
        </Breadcrumb>
        <Content style={{
            background: '#fff',
            padding: 24,
            margin: 0,
            minHeight: 480,
          }}
        >
          <Tabs defaultActiveKey={this.state.tabInitialVal}>
            <TabPane tab="Managers" key="managers">
              <LoadingCard loading={isPageLoading}>
                <Manager
                  currentOrganisation={currentOrganisation}
                  customMenu={this.CustomMenu}
                  setCurrentManagerID={this.setCurrentManagerID}
                />
              </LoadingCard>
            </TabPane>
            <TabPane tab="Employees" key="employees">
              <LoadingCard loading={isPageLoading}>
                <Employee
                  currentOrganisation={currentOrganisation}
                  customMenu={this.CustomMenu}
                  setCurrentEmployeeID={this.setCurrentEmployeeID}
                />
              </LoadingCard>
            </TabPane>
          </Tabs>
        </Content>
      </Fragment>
    );
  }
}

Track.propTypes = {
  viewCurrentOrganisation: PropTypes.func.isRequired,
  viewCurrentUserOrganisations: PropTypes.func.isRequired,
  organisations: PropTypes.arrayOf(PropTypes.shape({})),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

Track.defaultProps = {
  organisations: [],
};

export default Track;

