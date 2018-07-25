import axios from 'axios';

import apiRoutes from '../config/apiRoutes';
import { issuesActions } from '../config/ActionTypes';
import createSuccessMessage from '../helpers/createSuccessMessage';
import createErrorMessage from '../helpers/createErrorMessage';

export const setCurrentUserIssues = issues => ({
  type: issuesActions.VIEW_CURRENT_USER_ISSUES,
  issues,
});

export const viewCurrentUserIssues = () => (
  async (dispatch) => {
    try {
      const config = {
        method: 'GET',
      };
      const res = await axios(apiRoutes.Github.CurrentUserIssues, config);
      const { success, data, errors } = res.data;

      const issues = data;
      if (success === true) {
        dispatch(setCurrentUserIssues(issues));
        return createSuccessMessage();
      }

      return {
        success: false,
        errors,
      };
    } catch (e) {
      return createErrorMessage('Caught error while fetching issues from Github');
    }
  }
);
