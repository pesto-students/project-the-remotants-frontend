import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Layout, Breadcrumb } from 'antd';

import { successNotify } from '../../../helpers/messageNotify';


const { Content } = Layout;

const logout = (logoutUser) => {
  logoutUser();
  successNotify('Logged out successfully!');
};

const Logout = ({ logoutUser }) => (
  <Fragment>
    <Breadcrumb style={{ margin: '16px 0' }}>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
      <Breadcrumb.Item>Logout</Breadcrumb.Item>
    </Breadcrumb>
    <Content style={{
        background: '#fff',
        padding: 24,
        margin: 0,
        minHeight: 480,
      }}
    >
      <button onClick={() => { logout(logoutUser); }}>Logout</button>
    </Content>
  </Fragment>
);

Logout.propTypes = {
  logoutUser: PropTypes.func.isRequired,
};

export default Logout;

