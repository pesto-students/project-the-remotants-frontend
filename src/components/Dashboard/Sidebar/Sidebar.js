import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon } from 'antd';

import routes from '../../../config/routes';


const { SubMenu } = Menu;
const { Sider } = Layout;

class Sidebar extends Component {
  onClickHandler = ({ key }) => {
    this.props.history.push(`${routes.Dashboard}/${key}`);
  }
  render() {
    return (
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['']}
          defaultOpenKeys={['']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <SubMenu key="profile" title={<span><Icon type="user" />Profile</span>}>
            <Menu.Item key="settings" onClick={this.onClickHandler}>
              Settings
            </Menu.Item>
            <Menu.Item key="organisation" onClick={this.onClickHandler}>
                Organisation
            </Menu.Item>
            <Menu.Item key="logout" onClick={this.onClickHandler}>
              Logout
            </Menu.Item>
          </SubMenu>
          <SubMenu key="projects" title={<span><Icon type="laptop" />Projects</span>}>
            <Menu.Item key="projects/view" onClick={this.onClickHandler}>View</Menu.Item>
            <Menu.Item key="project/manage" onClick={this.onClickHandler}>Manage</Menu.Item>
          </SubMenu>
          <SubMenu key="employees" title={<span><Icon type="notification" />Employees</span>}>
            <Menu.Item key="employees/view" onClick={this.onClickHandler}>View</Menu.Item>
            <Menu.Item key="employees/manage" onClick={this.onClickHandler}>Manage</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    );
  }
}

Sidebar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Sidebar;

