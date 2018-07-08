import currentUser from './currentUser';

import { SET_CURRENT_USER } from '../config/ActionTypes';

describe('currentUser reducer', () => {
  // handle initial state
  test('handle initial state', () => {
    expect(currentUser(undefined, {})).toEqual({
      isAuthenticated: false,
      user: '',
    });
  });
  test('handle setCurrentUser with user provided', () => {
    expect(currentUser({}, {
      type: SET_CURRENT_USER,
      user: 'admin@theremotants.com',
    })).toEqual({
      isAuthenticated: true,
      user: 'admin@theremotants.com',
    });
  });

  test('handle setCurrentUser with user not provided', () => {
    expect(currentUser({}, {
      type: SET_CURRENT_USER,
      user: '',
    })).toEqual({
      isAuthenticated: false,
      user: '',
    });
  });
});
