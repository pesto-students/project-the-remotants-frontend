import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;
const { Sider } = Layout;

const Sidebar = () => (
  <Sider width={200} style={{ background: '#fff' }}>
    <Menu
      mode="inline"
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      style={{ height: '100%', borderRight: 0 }}
    >
      <SubMenu key="sub1" title={<span><Icon type="user" />Profile</span>}>
        <Menu.Item key="1">Settings</Menu.Item>
        <Menu.Item key="2">Organisation</Menu.Item>
        <Menu.Item key="3">
          <Link to="/dashboard/logout">
            Logout
          </Link>
        </Menu.Item>
      </SubMenu>
      <SubMenu key="sub2" title={<span><Icon type="laptop" />Projects</span>}>
        <Menu.Item key="5">View</Menu.Item>
        <Menu.Item key="6">Manage</Menu.Item>
      </SubMenu>
      <SubMenu key="sub3" title={<span><Icon type="notification" />Employees</span>}>
        <Menu.Item key="9">View</Menu.Item>
        <Menu.Item key="10">Manage</Menu.Item>
      </SubMenu>
    </Menu>
  </Sider>
);

export default Sidebar;

