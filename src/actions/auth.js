import axios from 'axios';
import store from 'store';

import setAuthorizationToken from '../helpers/setAuthorizationToken';
import decodeToken from '../helpers/decodeToken';
import { SET_CURRENT_USER } from '../config/ActionTypes';
import { LOCAL_STORAGE_AUTH, LOCAL_STORAGE_GITHUB, LOCAL_STORAGE_WAKATIME } from '../config/constants';
import apiRoutes from '../config/apiRoutes';
import createSuccessMessage from '../helpers/createSuccessMessage';
import createErrorMessage from '../helpers/createErrorMessage';

export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user,
});

export const loginUser = ({ email, password }) => (
  async (dispatch) => {
    try {
      const res = await axios.post(apiRoutes.Login, {
        email,
        password,
      });
      const { success, errors, token } = res.data;

      if (success === true) {
        store.set(LOCAL_STORAGE_AUTH, token);
        dispatch(setCurrentUser(decodeToken(token)));
        setAuthorizationToken(token);
        return createSuccessMessage('message', 'Login successfull!');
      }
      return {
        success: false,
        errors,
      };
    } catch (e) {
      return createErrorMessage('Caught error in Login');
    }
  }
);

export const registerUser = ({ email, password }) => (
  async (dispatch) => {
    try {
      const res = await axios.post(apiRoutes.Register, {
        email,
        password,
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

export const logoutUser = () => (
  (dispatch) => {
    store.remove(LOCAL_STORAGE_AUTH);
    store.remove(LOCAL_STORAGE_GITHUB);
    store.remove(LOCAL_STORAGE_WAKATIME);
    setAuthorizationToken('');
    dispatch(setCurrentUser(''));
  }
);
