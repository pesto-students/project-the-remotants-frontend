import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import routes from '../../config/routes';


const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      return (
        isAuthenticated ?
          <Component {...props} /> :
          <Redirect
            to={{
              pathname: routes.Auth,
              state: { from: props.location },
            }}
          />
      );
    }}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  location: PropTypes.shape({}).isRequired,
};

export default PrivateRoute;

