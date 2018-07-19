const Auth = '/auth';
const Dashboard = '/dashboard';

const routes = {
  Home: '/',
  Auth,
  Dashboard,
  Register: `${Auth}/register`,
  Login: `${Auth}/login`,
  BasicSetup: '/setup-1',
  OAuthSetup: '/setup-2',
};

const dashboardRoutes = {
  Logout: `${Dashboard}/logout`,
  Settings: `${Dashboard}/settings`,
};

export { dashboardRoutes };
export default routes;
