import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';

import routes, { dashboardRoutes, organisationRoutes } from '../config/routes';

import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import Home from './Home';
import Auth from './Auth';
import NotFound from './NotFound';
import CustomFooter from '../Footer';
import FlashMessage from './FlashMessage';
import BasicSetup from './BasicSetup';
import OAuthSetup from './OAuthSetup';
import InviteAuth from './InviteAuth';

import DashboardRoute from './DashboardRoute';
import DashboardHome from './Dashboard/Home';
import Settings from './Dashboard/Settings';
import Logout from './Dashboard/Logout';
import Project from './Dashboard/Project';
import Activity from './Dashboard/Activity';
import OrganisationView from './Dashboard/Organisation/View';
import OrganisationCreate from './Dashboard/Organisation/Create';
import OrganisationInvite from './Dashboard/Organisation/Invite';
import OrganisationStats from './Dashboard/Organisation/Stats';
import Issues from './Dashboard/Issues';
import Repos from './Dashboard/Repos';


const { Content, Footer } = Layout;

const App = () => (
  <Router>
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '0 50px' }}>
        <Layout style={{ padding: '24px 0', margin: '16px 0 0 0', background: '#fff' }}>
          <Content style={{ padding: '0 24px' }}>
            <FlashMessage />
            <Switch>
              <PublicRoute exact path={routes.Home} component={Home} />
              <PublicRoute path={routes.Auth} component={Auth} />

              <PrivateRoute path={routes.BasicSetup} component={BasicSetup} />
              <PrivateRoute path={routes.OAuthSetup} component={OAuthSetup} />

              <DashboardRoute exact path={routes.Dashboard} component={DashboardHome} />
              <DashboardRoute path={dashboardRoutes.Settings} component={Settings} />
              <DashboardRoute path={dashboardRoutes.Logout} component={Logout} />
              <DashboardRoute path={dashboardRoutes.ProjectView} component={Project} />
              <DashboardRoute path={dashboardRoutes.ActivityView} component={Activity} />
              <DashboardRoute
                path={organisationRoutes.OrganisationView}
                component={OrganisationView}
              />
              <DashboardRoute
                path={organisationRoutes.OrganisationCreate}
                component={OrganisationCreate}
              />
              <DashboardRoute
                path={organisationRoutes.OrganisationInvite}
                component={OrganisationInvite}
              />
              <DashboardRoute
                path={organisationRoutes.OrganisationStats}
                component={OrganisationStats}
              />

              <PublicRoute path={routes.InviteAuth} component={InviteAuth} />

              <DashboardRoute path={dashboardRoutes.Issues} component={Issues} />
              <DashboardRoute path={dashboardRoutes.Repos} component={Repos} />

              <Route component={NotFound} />
            </Switch>
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        <CustomFooter />
      </Footer>
    </Layout>
  </Router>
);


export default App;

