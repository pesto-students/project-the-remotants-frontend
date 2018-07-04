import React, { Fragment } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import routes from '../config/routes';

import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import Navbar from './Navbar';
import Home from './Home';
import Auth from './Auth';
import Dashboard from './Dashboard';
import NotFound from './NotFound';

const App = () => (
  <Router>
    <Fragment>
      <Navbar />
      <Switch>
        <PublicRoute exact path={routes.Home} component={Home} />
        <PublicRoute path={routes.Auth} component={Auth} />
        <PrivateRoute path={routes.Dashboard} component={Dashboard} />
        <Route component={NotFound} />
      </Switch>
    </Fragment>
  </Router>
);


export default App;

