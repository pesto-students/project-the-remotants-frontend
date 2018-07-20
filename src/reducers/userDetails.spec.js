import userDetails from './userDetails';

import { userDetailsActions } from '../config/ActionTypes';

describe('userDetails-reducer: VIEW_CURRENT_USER_WAKATIME_DETAILS', () => {
  // handle initial state
  test('handle initial state', () => {
    expect(userDetails(undefined, {})).toEqual({
      wakatime: {},
      github: {},
    });
  });
  test('handle VIEW_CURRENT_USER_WAKATIME_DETAILS with "data" but no "previousState"', () => {
    expect(userDetails(undefined, {
      type: userDetailsActions.VIEW_CURRENT_USER_WAKATIME_DETAILS,
      user: {
        name: 'John Doe',
        email: 'johndoe@gmail.com',
      },
    })).toEqual({
      wakatime: {
        name: 'John Doe',
        email: 'johndoe@gmail.com',
      },
      github: {},
    });
  });

  test('handle VIEW_CURRENT_USER_WAKATIME_DETAILS with no "data" and no "previousState"', () => {
    expect(userDetails(undefined, {
      type: userDetailsActions.VIEW_CURRENT_USER_WAKATIME_DETAILS,
      user: {},
    })).toEqual({
      wakatime: {},
      github: {},
    });
  });

  test('handle VIEW_CURRENT_USER_WAKATIME_DETAILS with "previousState" and "data"', () => {
    expect(userDetails({
      wakatime: {
        name: 'WakaTime Doe',
      },
      github: {
        name: 'GitHub Doe',
      },
    }, {
      type: userDetailsActions.VIEW_CURRENT_USER_WAKATIME_DETAILS,
      user: {
        name: 'John Doe',
        email: 'johndoe@gmail.com',
      },
    })).toEqual({
      wakatime: {
        name: 'John Doe',
        email: 'johndoe@gmail.com',
      },
      github: {
        name: 'GitHub Doe',
      },
    });
  });

  test('handle VIEW_CURRENT_USER_WAKATIME_DETAILS with "previousState" but no "data"', () => {
    expect(userDetails({
      wakatime: {
        name: 'John Doe',
        email: 'johndoe@gmail.com',
      },
      github: {
        name: 'GitHub Doe',
      },
    }, {
      type: userDetailsActions.VIEW_CURRENT_USER_WAKATIME_DETAILS,
      user: {},
    })).toEqual({
      wakatime: {},
      github: {
        name: 'GitHub Doe',
      },
    });
  });
});
