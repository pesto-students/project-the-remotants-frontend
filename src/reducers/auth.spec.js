import authentication from './auth';

import { authConstants } from '../config/ActionTypes';

describe('Authentication reducer', () => {
  // handle initial state
  test('handle initial state', () => {
    expect(authentication(undefined, {})).toEqual({});
  });
  test('handle AUTH_REQUEST', () => {
    expect(authentication({}, {
      type: authConstants.AUTH_REQUEST,
    })).toEqual({ isLoading: true });
  });

  test('handle AUTH_SUCCESS', () => {
    expect(authentication({}, {
      type: authConstants.AUTH_SUCCESS,
    })).toEqual({
      isLoading: false,
      success: true,
    });
  });

  test('handle AUTH_FAILURE', () => {
    expect(authentication({}, {
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
