import React from 'react';
import PropTypes from 'prop-types';
import { successNotify } from '../../../helpers/messageNotify';

const logout = (logoutUser) => {
  logoutUser();
  successNotify('Logged out successfully!');
};

const Logout = ({ logoutUser }) => (
  <div>
    <button onClick={() => { logout(logoutUser); }}>Logout</button>
  </div>
);

Logout.propTypes = {
  logoutUser: PropTypes.func.isRequired,
};

export default Logout;

