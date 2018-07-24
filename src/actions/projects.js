import axios from 'axios';

import apiRoutes from '../config/apiRoutes';
import { projectActions } from '../config/ActionTypes';
import createSuccessMessage from '../helpers/createSuccessMessage';
import createErrorMessage from '../helpers/createErrorMessage';


export const setCurrentUserProjects = projects => ({
  type: projectActions.VIEW_CURRENT_USER_PROJECTS,
  projects,
});

export const viewCurrentUserProjects = () => (
  async (dispatch) => {
    try {
      const config = {
        method: 'GET',
      };
      const res = await axios(apiRoutes.Wakatime.Projects, config);
      const { success, data, errors } = res.data;
      const projects = data;
      if (success === true) {
        dispatch(setCurrentUserProjects(projects));
        return createSuccessMessage();
      }

      return {
        success: false,
        errors,
      };
    } catch (e) {
      return createErrorMessage('Caught errors while fetching projects from WakaTime');
    }
  }
);

export const setProjectCommits = (projectID, commits) => ({
  type: projectActions.VIEW_PROJECT_COMMITS,
  projectID,
  commits,
});


export const viewProjectCommits = projectID => (
  async (dispatch) => {
    try {
      const config = {
        method: 'GET',
      };
      const res = await axios(`${apiRoutes.Wakatime.Projects}/${projectID}/commits`, config);
      const { success, data, errors } = res.data;
      if (success === true) {
        dispatch(setProjectCommits(projectID, data.commits));
        return createSuccessMessage();
      }
      return {
        success: false,
        errors,
      };
    } catch (e) {
      return createErrorMessage('Caught errors while fetching commits from WakaTime');
    }
  }
);
