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
      const {
        success,
        data,
        errors,
      } = res.data;

      if (success === true) {
        dispatch(setCurrentUserDurations(data, []));
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

export const setCurrentUserDateRangeDurations = dateRangeDurations => ({
  type: durationActions.VIEW_CURRENT_USER_DATE_RANGE_DURATIONS,
  dateRangeDurations,
});

export const viewCurrentUserDateRangeDurations = (start, end) => (
  async (dispatch) => {
    try {
      const config = {
        method: 'GET',
      };
      const res = await axios(`${apiRoutes.Wakatime.DateRangeDurations}?start=${start}&end=${end}`, config);
      const {
        success,
        data,
        errors,
      } = res.data;
      if (success === true) {
        dispatch(setCurrentUserDateRangeDurations(data));
        return createSuccessMessage();
      }

      return {
        success: false,
        errors,
      };
    } catch (e) {
      return createErrorMessage(`Caught errors while fetching date-range durations from WakaTime ${e}`);
    }
  }
);
