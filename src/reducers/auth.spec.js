import login from './auth';

import { authConstants } from '../config/ActionTypes';

describe('login reducer', () => {
  // handle initial state
  test('handle initial state', () => {
    expect(login(undefined, {})).toEqual({});
  });
  test('handle AUTH_REQUEST', () => {
    expect(login({}, {
      type: authConstants.AUTH_REQUEST,
    })).toEqual({ isLoading: true });
  });

  test('handle AUTH_SUCCESS', () => {
    expect(login({}, {
      type: authConstants.AUTH_SUCCESS,
    })).toEqual({
      isLoading: false,
      success: true,
    });
  });

  test('handle AUTH_FAILURE', () => {
    expect(login({}, {
      type: authConstants.AUTH_FAILURE,
      payload: {
        errors: {
          name: 'Error',
        },
      },
    })).toEqual({
      isLoading: false,
      errors: {
        name: 'Error',
      },
    });
  });
});
