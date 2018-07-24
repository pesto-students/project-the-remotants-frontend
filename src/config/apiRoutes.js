import { URLS } from './constants';

const DashboardAPI = `${URLS.BACKEND_URL}/dashboard`;
const OrganisationAPI = `${DashboardAPI}/organisation`;
const WakatimeAPI = `${DashboardAPI}/api/wakatime`;
const GithubAPI = `${DashboardAPI}/api/github`;

const apiRoutes = {
  Register: `${URLS.BACKEND_URL}/auth/register`,
  Login: `${URLS.BACKEND_URL}/auth/login`,
  BasicSetup: `${URLS.BACKEND_URL}/dashboard/setup-1`,
  InviteAuth: `${URLS.BACKEND_URL}/invite/auth`,
  Organisation: {
    Home: OrganisationAPI,
    Setup: `${OrganisationAPI}/setup`,
    List: `${OrganisationAPI}/list`,
    Invite: `${OrganisationAPI}/invite`,
  },
  Wakatime: {
    Projects: `${WakatimeAPI}/users/current/projects`,
    Durations: `${WakatimeAPI}/users/current/durations`,
    Details: `${WakatimeAPI}/users/current`,
    OrganisationMemberStats: `${WakatimeAPI}/users/all`,
    IfTokenExists: `${WakatimeAPI}/users/checkToken`,
  },
  Github: {
    CurrentUserIssues: `${GithubAPI}/user/issues`,
    CurrentUserRepos: `${GithubAPI}/user/repos`,
    IfTokenExists: `${GithubAPI}/users/checkToken`,
  },
};

export default apiRoutes;
