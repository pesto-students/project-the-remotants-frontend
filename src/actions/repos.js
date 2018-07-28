import axios from 'axios';

import { reposActions } from '../config/ActionTypes';
import createSuccessMessage from '../helpers/createSuccessMessage';
import createErrorMessage from '../helpers/createErrorMessage';
import apiRoutes from '../config/apiRoutes';

export const setCurrentUserRepos = repos => ({
  type: reposActions.VIEW_CURRENT_USER_REPOS,
  repos,
});

export const viewCurrentUserRepos = () => (
  async (dispatch) => {
    try {
      const config = {
        method: 'GET',
      };
      const res = await axios(apiRoutes.Github.CurrentUserRepos, config);
      const { success, data, errors } = res.data;
      const repos = data;
      if (success === true) {
        dispatch(setCurrentUserRepos(repos));
        return createSuccessMessage;
      }
      return {
        success: false,
        errors,
      };
    } catch (e) {
      return createErrorMessage('Error fetching repos from Github');
    }
  }
);

export const setRepoPullRequests = (repoName, pullRequests) => ({
  type: reposActions.VIEW_REPO_PR,
  repoName,
  pullRequests,
});

export const viewRepoPullRequests = (owner, repoName) => (
  async (dispatch) => {
    try {
      const config = {
        method: 'GET',
      };
      const res = await axios.get(`${apiRoutes.Github.CurrentUserRepos}/${owner}/${repoName}/pulls`, config);
      const { success, data, errors } = res.data;
      const pullRequests = data;
      if (success === true) {
        dispatch(setRepoPullRequests(repoName, pullRequests));
        return createSuccessMessage();
      }
      return {
        success: false,
        errors,
      };
    } catch (e) {
      return createErrorMessage('Caught an error while fetching pull requests from GitHub');
    }
  }
);
