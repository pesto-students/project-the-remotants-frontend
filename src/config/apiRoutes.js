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
    Setup: `${OrganisationAPI}/setup`,
    List: `${OrganisationAPI}/list`,
    Invite: `${OrganisationAPI}/invite`,
  },
  Wakatime: {
    CurrentUserProjects: `${WakatimeAPI}/users/current/projects`,
    CurrentUserDurations: `${WakatimeAPI}/users/current/durations`,
    CurrentUserWakatimeDetails: `${WakatimeAPI}/users/current`,
  },
  Github: {
    CurrentUserIssues: `${GithubAPI}/user/issues`,
    CurrentUserRepos: `${GithubAPI}/user/repos`,
  },
};

export default apiRoutes;
