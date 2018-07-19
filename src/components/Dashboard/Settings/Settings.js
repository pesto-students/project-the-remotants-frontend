import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Layout, Breadcrumb } from 'antd';

import apiRoutes from '../../../config/apiRoutes';


const { Content } = Layout;

class Settings extends Component {
  componentDidMount = async () => {
    const config = {
      method: 'GET',
    };
    const res = await axios(apiRoutes.Wakatime.CurrentUserProjects, config);
    console.log(res.data);
  }

  render() {
    return (
      <Fragment>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item>Settings</Breadcrumb.Item>
        </Breadcrumb>
        <Content style={{
          background: '#fff',
          padding: 24,
          margin: 0,
          minHeight: 280,
          }}
        >
          Settings
        </Content>
      </Fragment>
    );
  }
}

export default Settings;

