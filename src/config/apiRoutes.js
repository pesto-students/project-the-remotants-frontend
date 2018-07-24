import { URLS } from './constants';

const DashboardAPI = `${URLS.BACKEND_URL}/dashboard`;
const OrganisationAPI = `${DashboardAPI}/organisation`;
const WakatimeAPI = `${DashboardAPI}/api/wakatime`;

const apiRoutes = {
  Register: `${URLS.BACKEND_URL}/auth/register`,
  Login: `${URLS.BACKEND_URL}/auth/login`,
  BasicSetup: `${URLS.BACKEND_URL}/dashboard/setup-1`,
  InviteAuth: `${URLS.BACKEND_URL}/invite/auth`,
  Organisation: {
    Setup: `${OrganisationAPI}/setup`,
    List: `${OrganisationAPI}/list`,
    Invite: `${OrganisationAPI}/invite`,
  },
  Wakatime: {
    CurrentUserProjects: `${WakatimeAPI}/users/current/projects`,
    CurrentUserDurations: `${WakatimeAPI}/users/current/durations`,
    CurrentUserWakatimeDetails: `${WakatimeAPI}/users/current`,
  },
};

export default apiRoutes;
