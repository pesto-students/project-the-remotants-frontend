import React, { Fragment } from 'react';
import { Layout, Breadcrumb } from 'antd';


const { Content } = Layout;

const Home = () => (
  <Fragment>
    <Breadcrumb style={{ margin: '16px 0' }}>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
    </Breadcrumb>
    <Content style={{
        background: '#fff',
        padding: 24,
        margin: 0,
        minHeight: 480,
      }}
    >
      Home
    </Content>
  </Fragment>
);


export default Home;

