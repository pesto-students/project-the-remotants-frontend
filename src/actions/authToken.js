import axios from 'axios';

import apiRoutes from '../config/apiRoutes';
import { accessTokenActions } from '../config/ActionTypes';
import createSuccessMessage from '../helpers/createSuccessMessage';
import createErrorMessage from '../helpers/createErrorMessage';


export const setWakatimeTokenStatus = exists => ({
  type: accessTokenActions.IF_WAKATIME_TOKEN_EXISTS,
  exists,
});

export const ifWakatimeTokenExists = () => (
  async (dispatch) => {
    try {
      const config = {
        method: 'GET',
      };
      const res = await axios(apiRoutes.Wakatime.IfTokenExists, config);
      const { success, errors } = res.data;
      const exists = success;

      if (success !== undefined) {
        dispatch(setWakatimeTokenStatus(exists));
        return createSuccessMessage('exists', exists);
      }

      dispatch(setWakatimeTokenStatus(false));
      return {
        success: false,
        errors,
      };
    } catch (e) {
      return createErrorMessage('Caught errors while fetching access token from server');
    }
  }
);


export const setGithubTokenStatus = exists => ({
  type: accessTokenActions.IF_GITHUB_TOKEN_EXISTS,
  exists,
});

export const ifGithubTokenExists = () => (
  async (dispatch) => {
    try {
      const config = {
        method: 'GET',
      };
      const res = await axios(apiRoutes.Github.IfTokenExists, config);
      const { success, errors } = res.data;
      const exists = success;

      if (success !== undefined) {
        dispatch(setGithubTokenStatus(exists));
        return createSuccessMessage('exists', exists);
      }

      dispatch(setGithubTokenStatus(false));
      return {
        success: false,
        errors,
      };
    } catch (e) {
      return createErrorMessage('Caught errors while fetching access token from server');
    }
  }
);
