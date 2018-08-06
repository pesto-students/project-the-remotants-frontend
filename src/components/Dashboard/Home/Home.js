import React, { Component, Fragment } from 'react';
import { Layout, Breadcrumb } from 'antd';


const { Content } = Layout;

class Home extends Component {
  render() {
    return (
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
          <div data-test="dashboard">
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <h1 style={{ marginBottom: '0' }}>
                Welcome Remotant!
              </h1>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h4 style={{ color: '#777' }}>
                There is a lot to explore! <br />
                { 'Let\'s start with checking out the profile...' }
              </h4>
            </div>
          </div>
        </Content>
      </Fragment>
    );
  }
}


export default Home;

