import axios from 'axios';

import setAuthorizationToken from '../helpers/setAuthorizationToken';
import decodeToken from '../helpers/decodeToken';
import { authConstants, SET_CURRENT_USER } from '../config/ActionTypes';
import { BACKEND_URL } from '../config/constants';

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user,
  };
}

export function registerUser({ email, password }) {
  return async (dispatch) => {
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
            name: e,
          },
        },
      });
    }
  };
}

export function loginUser({ email, password }) {
  return async (dispatch) => {
    dispatch({ type: authConstants.AUTH_REQUEST });
    try {
      const res = await axios.post(`${BACKEND_URL}/auth/login`, {
        email,
        password,
      });
      const { success, errors, token } = res.data;
      if (success === true) {
        localStorage.setItem('the-remotants', JSON.stringify(token));
        setAuthorizationToken(token);
        dispatch({
          type: authConstants.AUTH_SUCCESS,
        });
        dispatch(setCurrentUser(decodeToken(token)));
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
            name: e.message,
          },
        },
      });
      return {
        success: false,
      };
    }
  };
}

export function logoutUser() {
  return (dispatch) => {
    localStorage.removeItem('the-remotants');
    setAuthorizationToken(false);
    dispatch(setCurrentUser(''));
  };
}
