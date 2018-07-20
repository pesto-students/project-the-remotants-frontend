import { URLS } from './constants';

const WakatimeAPI = `${URLS.BACKEND_URL}/dashboard/api/wakatime`;
const apiRoutes = {
  Register: `${URLS.BACKEND_URL}/auth/register`,
  Login: `${URLS.BACKEND_URL}/auth/login`,
  BasicSetup: `${URLS.BACKEND_URL}/dashboard/setup-1`,
  Wakatime: {
    CurrentUserProjects: `${WakatimeAPI}/users/current/projects`,
    CurrentUserDurations: `${WakatimeAPI}/users/current/durations`,
    CurrentUserWakatimeDetails: `${WakatimeAPI}/users/current`,
  },
};

export default apiRoutes;
