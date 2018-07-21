import axios from 'axios';

import apiRoutes from '../config/apiRoutes';
import { userDetailsActions } from '../config/ActionTypes';
import createSuccessMessage from '../helpers/createSuccessMessage';
import createErrorMessage from '../helpers/createErrorMessage';


export const setCurrentUserWakatimeDetails = user => ({
  type: userDetailsActions.VIEW_CURRENT_USER_WAKATIME_DETAILS,
  user,
});

export const viewCurrentUserWakatimeDetails = () => (
  async (dispatch) => {
    try {
      const config = {
        method: 'GET',
      };
      const res = await axios(apiRoutes.Wakatime.CurrentUserWakatimeDetails, config);
      const { success, data, errors } = res.data;

      if (success === true) {
        dispatch(setCurrentUserWakatimeDetails(data));
        return createSuccessMessage();
      }

      return {
        success: false,
        errors,
      };
    } catch (e) {
      return createErrorMessage('Caught errors while fetching user details from WakaTime');
    }
  }
);
