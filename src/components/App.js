import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';

import routes from '../config/routes';

import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import Home from './Home';
import Auth from './Auth';
import Dashboard from './Dashboard';
import NotFound from './NotFound';
import CustomFooter from '../Footer';
import FlashMessage from './FlashMessage';
import BasicSetup from './BasicSetup';
import OAuthSetup from './OAuthSetup';


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
              <PrivateRoute path={routes.Dashboard} component={Dashboard} />
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

