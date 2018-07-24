import axios from 'axios';

import apiRoutes from '../config/apiRoutes';
import { organisationActions } from '../config/ActionTypes';
import createSuccessMessage from '../helpers/createSuccessMessage';
import createErrorMessage from '../helpers/createErrorMessage';


export const setCurrentUserOrganisations = organisations => ({
  type: organisationActions.VIEW_CURRENT_USER_ORGANISATIONS,
  organisations,
});

export const viewCurrentUserOrganisations = () => (
  async (dispatch) => {
    try {
      const config = {
        method: 'GET',
      };
      const res = await axios(apiRoutes.Organisation.List, config);
      const { success, data, errors } = res.data;
      const organisations = data;
      if (success === true) {
        dispatch(setCurrentUserOrganisations(organisations));
        return createSuccessMessage();
      }

      return {
        success: false,
        errors,
      };
    } catch (e) {
      return createErrorMessage('Caught errors while fetching organisations');
    }
  }
);

export const viewCurrentOrganisation = orgID => ({
  type: organisationActions.VIEW_CURRENT_ORGANISATION,
  organisationID: orgID,
});

