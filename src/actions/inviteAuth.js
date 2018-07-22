import axios from 'axios';
import store from 'store';

import apiRoutes from '../config/apiRoutes';
import { LOCAL_STORAGE_AUTH } from '../config/constants';
import setAuthorizationToken from '../helpers/setAuthorizationToken';
import decodeToken from '../helpers/decodeToken';
import createSuccessMessage from '../helpers/createSuccessMessage';
import createErrorMessage from '../helpers/createErrorMessage';
import { setCurrentUser } from './auth';

export const inviteAuth = ({
  email,
  name,
  username,
  password,
  organisation,
  manager,
}) => (
  async (dispatch) => {
    try {
      const res = await axios.post(apiRoutes.InviteAuth, {
        email,
        name,
        username,
        password,
        organisation,
        manager,
      });
      const { success, errors, token } = res.data;
      if (success === true) {
        store.set(LOCAL_STORAGE_AUTH, token);
        dispatch(setCurrentUser(decodeToken(token)));
        setAuthorizationToken(token);
        return createSuccessMessage('message', 'Registration successfull!');
      }
      return {
        success: false,
        errors,
      };
    } catch (e) {
      return createErrorMessage('Caught error in Registration');
    }
  }
);
