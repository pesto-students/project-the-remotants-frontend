import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Signup from '../Signup';
import Login from '../Login';

const Auth = ({ auth: { errors }, ...rest }) => (
  <Fragment>
    {
      errors &&
      <div>
        {
          Object.values(errors).map(error => (
            <p key={error.replace(/ /g, '').toLowerCase()}>{error}</p>
          ))
        }
      </div>
    }
    <div>
      <h2>Register here</h2>
      <Signup {...rest} />
    </div>
    <div>
      <h2>Login here</h2>
      <Login {...rest} />
    </div>
  </Fragment>
);

Auth.propTypes = {
  auth: PropTypes.shape({
    errors: PropTypes.shape({}),
  }).isRequired,
};

export default Auth;

