import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd';
import { Switch } from 'react-router-dom';

import PrivateRoute from '../PrivateRoute';
import Sidebar from './Sidebar';
import Logout from './Logout';
import Settings from './Settings';
import NotFound from '../NotFound';
import { dashboardRoutes } from '../../config/routes';


const { Content } = Layout;

class Dashboard extends Component {
  render() {
    return (
      <Layout>
        <Sidebar />
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          </Breadcrumb>
          <Content style={{
            background: '#fff',
            padding: 24,
            margin: 0,
            minHeight: 280,
            }}
          >
            <Switch>
              <PrivateRoute path={dashboardRoutes.Settings} component={Settings} />
              <PrivateRoute path={dashboardRoutes.Logout} component={Logout} />
              <PrivateRoute component={NotFound} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Dashboard;
