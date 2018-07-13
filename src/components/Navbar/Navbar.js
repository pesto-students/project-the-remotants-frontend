import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Menu, Icon, Button } from 'antd';


class NavBar extends React.Component {
  render() {
    const { currentUser: { isAuthenticated, user }, logoutUser } = this.props;
    return (
      <Menu
        mode="horizontal"
        style={{ marginBottom: '50px' }}
      >
        {
          isAuthenticated === false &&
          <Menu.Item key="home">
            <Icon type="home" />
            <NavLink style={{ display: 'inline' }} to="/">
              Home
            </NavLink>
          </Menu.Item>
        }
        {
          isAuthenticated ?
            <Menu.Item key="logout">
              <Icon type="logout" />
              <Button onClick={logoutUser}>
                Logout ({ user })
              </Button>
            </Menu.Item> :
            <Menu.Item key="SignUpOrLogin">
              <Icon type="login" />
              <NavLink style={{ display: 'inline' }} to="/auth">
                Signup/Login
              </NavLink>
            </Menu.Item>
        }
        <Menu.Item key="dashboard">
          <Icon type="dashboard" />
          <NavLink style={{ display: 'inline' }} to="/dashboard">
            Dashboard
          </NavLink>
        </Menu.Item>
      </Menu>
    );
  }
}

NavBar.propTypes = {
  currentUser: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.string.isRequired,
  }).isRequired,
  logoutUser: PropTypes.func.isRequired,
};

export default NavBar;
