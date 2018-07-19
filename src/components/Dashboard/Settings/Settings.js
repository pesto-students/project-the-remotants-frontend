import React, { Component, Fragment } from 'react';
import { Layout, Breadcrumb } from 'antd';


const { Content } = Layout;

class Settings extends Component {
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
            minHeight: 480,
          }}
        >
          Settings
        </Content>
      </Fragment>
    );
  }
}

export default Settings;

