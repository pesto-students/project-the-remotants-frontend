import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Layout, Alert } from 'antd';

import routes, { dashboardRoutes, organisationRoutes } from '../config/routes';

import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import Home from './Home';
import Auth from './Auth';
import NotFound from './NotFound';
import CustomFooter from '../Footer';
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
import OrganisationTrackUser from './Dashboard/Organisation/Track';
import OrganisationStats from './Dashboard/Organisation/Stats';
import Issues from './Dashboard/Issues';
import Repos from './Dashboard/Repos';


const { Content, Footer } = Layout;

const ResponsiveAlertDescription = () => (
  <span>
    We are working on enhancing your experience. It&apos;s gonna be&nbsp;
    {
      <span style={{ fontSize: '1.1em', fontWeight: '600' }}>legen wait for it dary...</span>
    }
  </span>
);

const ResponsiveAlert = () => (
  <Alert
    message="This website is best viewed on desktops"
    description={<ResponsiveAlertDescription />}
    type="warning"
    showIcon
    closable
  />
);

class App extends Component {
  constructor(props) {
    super(props);

    const isDesktop = this.deviceIsDesktop();

    this.state = {
      isDesktop,
    };
  }

  deviceIsDesktop = () => {
    const deviceWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

    const desktopBreakpoint = 1224;

    if (deviceWidth < desktopBreakpoint) {
      return false;
    }
    return true;
  }

  render() {
    const { isDesktop } = this.state;

    return (
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          {
            (isDesktop === false) && <ResponsiveAlert />
          }
          <Content style={{ padding: '0 10%' }}>
            <Layout style={{
                padding: '24px 0',
                margin: '16px 0 0 0',
                background: '#fff',
                minHeight: 'calc(100vh - 82px)',
              }}
            >
              <Content style={{ padding: '0 24px' }}>
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
                    exact
                    path={organisationRoutes.OrganisationStats}
                    component={OrganisationStats}
                  />
                  <DashboardRoute
                    path={organisationRoutes.OrganisationTrackUser}
                    component={OrganisationTrackUser}
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
  }
}


export default App;

