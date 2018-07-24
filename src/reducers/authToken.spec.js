import authToken from './authToken';

import { accessTokenActions } from '../config/ActionTypes';

describe('authToken-reducer: IF_WAKATIME_TOKEN_EXISTS', () => {
  test('handle initial state', () => {
    expect(authToken(undefined, {})).toEqual({
      wakatime: true,
      github: true,
    });
  });
  test('handle IF_WAKATIME_TOKEN_EXISTS with "data" but no "previousState"', () => {
    expect(authToken(undefined, {
      type: accessTokenActions.IF_WAKATIME_TOKEN_EXISTS,
      exists: false,
    })).toEqual({
      wakatime: false,
      github: true,
    });
  });

  test('handle IF_WAKATIME_TOKEN_EXISTS with no "data" and no "previousState"', () => {
    expect(authToken(undefined, {
      type: accessTokenActions.IF_WAKATIME_TOKEN_EXISTS,
      exists: undefined,
    })).toEqual({
      wakatime: false,
      github: true,
    });
  });

  test('handle IF_WAKATIME_TOKEN_EXISTS with "previousState" and "data"', () => {
    expect(authToken({
      wakatime: false,
      github: true,
    }, {
      type: accessTokenActions.IF_WAKATIME_TOKEN_EXISTS,
      exists: true,
    })).toEqual({
      wakatime: true,
      github: true,
    });
  });


  test('handle IF_GITHUB_TOKEN_EXISTS with "data" but no "previousState"', () => {
    expect(authToken(undefined, {
      type: accessTokenActions.IF_GITHUB_TOKEN_EXISTS,
      exists: false,
    })).toEqual({
      wakatime: true,
      github: false,
    });
  });

  test('handle IF_GITHUB_TOKEN_EXISTS with no "data" and no "previousState"', () => {
    expect(authToken(undefined, {
      type: accessTokenActions.IF_GITHUB_TOKEN_EXISTS,
      exists: undefined,
    })).toEqual({
      wakatime: true,
      github: false,
    });
  });

  test('handle IF_GITHUB_TOKEN_EXISTS with "previousState" and "data"', () => {
    expect(authToken({
      wakatime: true,
      github: false,
    }, {
      type: accessTokenActions.IF_GITHUB_TOKEN_EXISTS,
      exists: true,
    })).toEqual({
      wakatime: true,
      github: true,
    });
  });
});
