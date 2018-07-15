const Auth = '/auth';
const Dashboard = '/dashboard';

const routes = {
  Home: '/',
  Auth,
  Dashboard,
  Register: `${Auth}/register`,
  Login: `${Auth}/login`,
  Setup: '/setup',
};

const dashboardRoutes = {
  Logout: `${Dashboard}/logout`,
};

export { dashboardRoutes };
export default routes;
