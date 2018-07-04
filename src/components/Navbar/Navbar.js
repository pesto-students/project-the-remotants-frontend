import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const NavBar = ({ currentUser: { isAuthenticated, user }, logoutUser }) => (
  <ul>
    {
      isAuthenticated === false &&
        <li>
          <NavLink to="/">
            Home
          </NavLink>
        </li>
    }
    {
      isAuthenticated ?
        <button onClick={logoutUser}>
          Logout ({ user })
        </button> :
        <li>
          <NavLink to="/auth">
            Signup/Login
          </NavLink>
        </li>
    }
    <li>
      <NavLink to="/dashboard">
        Dashboard
      </NavLink>
    </li>
  </ul>
);

NavBar.propTypes = {
  currentUser: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.string.isRequired,
  }).isRequired,
  logoutUser: PropTypes.func.isRequired,
};

export default NavBar;
