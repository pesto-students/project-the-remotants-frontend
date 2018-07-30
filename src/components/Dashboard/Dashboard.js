import React, { Component } from 'react';
import { Layout } from 'antd';
import PropTypes from 'prop-types';

import Sidebar from './Sidebar';


class Dashboard extends Component {
  render() {
    return (
      <Layout style={{ minHeight: 'calc(100vh - 130px)' }}>
        <Sidebar {...this.props} />
        <Layout style={{ padding: '0 24px 24px' }}>
          { this.props.children }
        </Layout>
      </Layout>
    );
  }
}

Dashboard.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.shape({}).isRequired,
};

export default Dashboard;
