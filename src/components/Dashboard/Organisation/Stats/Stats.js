import React, { Fragment, Component } from 'react';
// import PropTypes from 'prop-types';
import {
  Layout,
  Breadcrumb,
} from 'antd';

const { Content } = Layout;

class Stats extends Component {
  render() {
    return (
      <Fragment>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item>Organisation</Breadcrumb.Item>
          <Breadcrumb.Item>Stats</Breadcrumb.Item>
        </Breadcrumb>
        <Content style={{
            background: '#fff',
            padding: 24,
            margin: 0,
            minHeight: 480,
            textAlign: 'center',
          }}
        >
          <h1>See Stats</h1>
        </Content>
      </Fragment>
    );
  }
}

export default Stats;

