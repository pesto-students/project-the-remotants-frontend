import React, { Fragment } from 'react';
import Signup from '../Signup';
import Login from '../Login';

const Auth = props => (
  <Fragment>
    <div>
      <h2>Register here</h2>
      <Signup {...props} />
    </div>
    <div>
      <h2>Login here</h2>
      <Login {...props} />
    </div>
  </Fragment>
);

export default Auth;

