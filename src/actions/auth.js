import axios from 'axios';
import store from 'store';

import setAuthorizationToken from '../helpers/setAuthorizationToken';
import decodeToken from '../helpers/decodeToken';
import { authConstants, SET_CURRENT_USER } from '../config/ActionTypes';
import { BACKEND_URL, LOCAL_STORAGE_KEY } from '../config/constants';

export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user,
});

export const registerUser = ({ email, password }) => (
  async (dispatch) => {
    dispatch({ type: authConstants.AUTH_REQUEST });
    try {
      const res = await axios.post(`${BACKEND_URL}/auth/register`, {
        email,
        password,
      });
      const { success, errors } = res.data;

      if (success === true) {
        dispatch({
          type: authConstants.AUTH_SUCCESS,
        });
      } else {
        dispatch({
          type: authConstants.AUTH_FAILURE,
          payload: {
            errors,
          },
        });
      }
    } catch (e) {
      dispatch({
        type: authConstants.AUTH_FAILURE,
        payload: {
          errors: {
            name: 'Caught error in Registration',
          },
        },
      });
    }
  }
);

export const loginUser = ({ email, password }) => (
  async (dispatch) => {
    dispatch({ type: authConstants.AUTH_REQUEST });
    try {
      const res = await axios.post(`${BACKEND_URL}/auth/login`, {
        email,
        password,
      });
      const { success, errors, token } = res.data;
      if (success === true) {
        store.set(LOCAL_STORAGE_KEY, token);
        dispatch({
          type: authConstants.AUTH_SUCCESS,
        });
        dispatch(setCurrentUser(decodeToken(token)));
        setAuthorizationToken(token);
        return {
          success: true,
        };
      }
      dispatch({
        type: authConstants.AUTH_FAILURE,
        payload: {
          errors,
        },
      });
      return {
        success: false,
      };
    } catch (e) {
      dispatch({
        type: authConstants.AUTH_FAILURE,
        payload: {
          errors: {
            name: 'Caught error in Login',
          },
        },
      });
      return {
        success: false,
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
