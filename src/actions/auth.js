import axios from 'axios';
import store from 'store';

import setAuthorizationToken from '../helpers/setAuthorizationToken';
import decodeToken from '../helpers/decodeToken';
import { SET_CURRENT_USER } from '../config/ActionTypes';
import { BACKEND_URL, LOCAL_STORAGE_KEY } from '../config/constants';
import routes from '../config/routes';

export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user,
});

export const loginUser = ({ email, password }) => (
  async (dispatch) => {
    try {
      const res = await axios.post(`${BACKEND_URL}${routes.Login}`, {
        email,
        password,
      });
      const { success, errors, token } = res.data;
      if (success === true) {
        store.set(LOCAL_STORAGE_KEY, token);
        dispatch(setCurrentUser(decodeToken(token)));
        setAuthorizationToken(token);
        return {
          success: true,
          message: 'Login successfull!',
        };
      }
      return {
        success: false,
        errors,
      };
    } catch (e) {
      return {
        success: false,
        errors: {
          name: 'Caught error in Login',
        },
      };
    }
  }
);

export const logoutUser = () => (
  (dispatch) => {
    store.remove(LOCAL_STORAGE_KEY);
    setAuthorizationToken('');
    dispatch(setCurrentUser(''));
  }
);
