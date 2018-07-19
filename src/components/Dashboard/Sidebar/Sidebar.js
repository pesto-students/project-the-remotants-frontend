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
    const [, , subMenu, item] = this.props.match.path.split('/');
    const menuItem = `${subMenu}/${item}`;
    return (
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={[menuItem]}
          defaultOpenKeys={[subMenu]}
          style={{ height: '100%', borderRight: 0 }}
        >
          <SubMenu key="profile" title={<span><Icon type="user" />Profile</span>}>
            <Menu.Item key="profile/settings" onClick={this.onClickHandler}>
              Settings
            </Menu.Item>
            <Menu.Item key="profile/organisation" onClick={this.onClickHandler}>
                Organisation
            </Menu.Item>
            <Menu.Item key="profile/logout" onClick={this.onClickHandler}>
              Logout
            </Menu.Item>
          </SubMenu>
          <SubMenu key="projects" title={<span><Icon type="laptop" />Projects</span>}>
            <Menu.Item key="projects/view" onClick={this.onClickHandler}>View</Menu.Item>
          </SubMenu>
          <SubMenu key="activity" title={<span><Icon type="notification" />Coding Activity</span>}>
            <Menu.Item key="activity/view" onClick={this.onClickHandler}>View</Menu.Item>
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
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default Sidebar;

