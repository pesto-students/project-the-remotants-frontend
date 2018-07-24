import axios from 'axios';

import apiRoutes from '../config/apiRoutes';
import { durationActions } from '../config/ActionTypes';
import createSuccessMessage from '../helpers/createSuccessMessage';
import createErrorMessage from '../helpers/createErrorMessage';


export const setCurrentUserDurations = durations => ({
  type: durationActions.VIEW_CURRENT_USER_DURATIONS,
  durations,
});

export const viewCurrentUserDurations = date => (
  async (dispatch) => {
    try {
      const config = {
        method: 'GET',
      };
      const res = await axios(`${apiRoutes.Wakatime.Durations}?date=${date}`, config);
      const { success, data, errors } = res.data;

      if (success === true) {
        dispatch(setCurrentUserDurations(data));
        return createSuccessMessage();
      }

      return {
        success: false,
        errors,
      };
    } catch (e) {
      return createErrorMessage('Caught errors while fetching durations from WakaTime');
    }
  }
);
