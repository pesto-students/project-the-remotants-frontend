import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon } from 'antd';

import routes, { dashboardSubMenuKeys, dashboardItemKeys } from '../../../config/routes';
import { successNotify } from '../../../helpers/messageNotify';


const { SubMenu } = Menu;
const { Sider } = Layout;

class Sidebar extends Component {
  onMenuClickHandler = ({ key }) => {
    if (key === dashboardItemKeys.Logout) {
      this.props.logoutUser();
      successNotify('Logged out successfully!');
    } else if (key === dashboardItemKeys.Home) {
      this.props.history.push(`${routes.Dashboard}`);
    } else {
      this.props.history.push(`${routes.Dashboard}/${key}`);
    }
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
          onClick={this.onMenuClickHandler}
        >
          <Menu.Item key={dashboardItemKeys.Home}>
            The Remotants
          </Menu.Item>
          <SubMenu key={dashboardSubMenuKeys.Profile} title={<span><Icon type="user" />Profile</span>}>
            <Menu.Item key={dashboardItemKeys.Settings}>
              Settings
            </Menu.Item>
            <Menu.Item key={dashboardItemKeys.Logout}>
              Logout
            </Menu.Item>
          </SubMenu>
          <SubMenu key={dashboardSubMenuKeys.Projects} title={<span><Icon type="laptop" />Projects</span>}>
            <Menu.Item key={dashboardItemKeys.ProjectView}>View</Menu.Item>
          </SubMenu>
          <SubMenu key={dashboardSubMenuKeys.Activity} title={<span><Icon type="notification" />Coding Activity</span>}>
            <Menu.Item key={dashboardItemKeys.ActivityView}>View</Menu.Item>
          </SubMenu>
          <SubMenu key={dashboardSubMenuKeys.Organisation} title={<span><Icon type="team" />Organisation</span>}>
            <Menu.Item key={dashboardItemKeys.OrganisationCreate}>Create</Menu.Item>
            <Menu.Item key={dashboardItemKeys.OrganisationView}>View</Menu.Item>
          </SubMenu>
          <SubMenu key="github" title={<span><Icon type="github" />GitHub</span>}>
            <Menu.Item key="github/issues" onClick={this.onClickHandler}>Issues</Menu.Item>
            <Menu.Item key="github/pull-requests" onClick={this.onClickHandler}>Pull Requests</Menu.Item>
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
  logoutUser: PropTypes.func.isRequired,
};

export default Sidebar;

