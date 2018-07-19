import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import routes from '../../config/routes';
import Dashboard from '../Dashboard';


const DashboardRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      return (
        isAuthenticated ?
          (
            <Dashboard {...props}>
              <Component {...props} />
            </Dashboard>
          ) :
          (
            <Redirect
              to={{
                pathname: routes.Auth,
                state: { from: props.location },
              }}
            />
          )
      );
    }}
  />
);

DashboardRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  location: PropTypes.shape({}).isRequired,
};

export default DashboardRoute;

