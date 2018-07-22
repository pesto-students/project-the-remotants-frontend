const Auth = '/auth';
const Dashboard = '/dashboard';
const Organisation = `${Dashboard}/organisation`;

const routes = {
  Home: '/',
  Auth,
  Dashboard,
  Register: `${Auth}/register`,
  Login: `${Auth}/login`,
  BasicSetup: '/setup-1',
  OAuthSetup: '/setup-2',
  InviteAuth: '/invite/register',
};

const dashboardSubMenuKeys = {
  Profile: 'profile',
  Projects: 'projects',
  Activity: 'activity',
  Organisation: 'organisation',
};

const dashboardItemKeys = {
  Settings: `${dashboardSubMenuKeys.Profile}/settings`,
  Logout: `${dashboardSubMenuKeys.Profile}/logout`,
  ProjectView: `${dashboardSubMenuKeys.Projects}/view`,
  ActivityView: `${dashboardSubMenuKeys.Activity}/view`,
  OrganisationCreate: `${dashboardSubMenuKeys.Organisation}/new`,
  OrganisationView: `${dashboardSubMenuKeys.Organisation}/view`,
};

const dashboardRoutes = {
  Dashboard,
  Logout: `${Dashboard}/${dashboardItemKeys.Logout}`,
  Settings: `${Dashboard}/${dashboardItemKeys.Settings}`,
  ProjectView: `${Dashboard}/${dashboardItemKeys.ProjectView}`,
  ActivityView: `${Dashboard}/${dashboardItemKeys.ActivityView}`,
};

const organisationRoutes = {
  Organisation,
  OrganisationView: `${Dashboard}/${dashboardItemKeys.OrganisationView}`,
  OrganisationCreate: `${Dashboard}/${dashboardItemKeys.OrganisationCreate}`,
  OrganisationInvite: `${Organisation}/:id/add-members`,
  OrganisationStats: `${Organisation}/:id/stats`,
};


export {
  dashboardSubMenuKeys,
  dashboardItemKeys,
  dashboardRoutes,
  organisationRoutes,
};

export default routes;
