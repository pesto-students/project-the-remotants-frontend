import expect from 'expect';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import * as actions from '../actions/authToken';
import { accessTokenActions } from '../config/ActionTypes';
import apiRoutes from '../config/apiRoutes';
import { mockStore } from './setupActionTests';

describe('Test CHECK_WAKATIME_AUTH_TOKEN_EXISTS', () => {
  let mock;
  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
    mock.restore();
  });

  test('test "setWakatimeTokenStatus"', () => {
    const expectedAction = {
      type: accessTokenActions.IF_WAKATIME_TOKEN_EXISTS,
      exists: true,
    };

    expect(actions.setWakatimeTokenStatus(true)).toEqual(expectedAction);
  });

  test('test "ifWakatimeTokenExists"', async () => {
    const responseData = {
      success: true,
    };

    mock
      .onGet(apiRoutes.Wakatime.IfTokenExists)
      .reply(200, {
        success: responseData.success,
        errors: null,
        headers: {
          'content-type': 'application/json',
        },
      });

    const expectedActions = [
      {
        type: accessTokenActions.IF_WAKATIME_TOKEN_EXISTS,
        exists: responseData.success,
      },
    ];

    const initialState = {
      wakatime: true,
      github: true,
    };

    const store = mockStore(initialState);


    await store.dispatch(actions.setWakatimeTokenStatus(responseData.success));

    expect(store.getActions()).toEqual(expectedActions);
  });
});


describe('Test CHECK_GITHUB_AUTH_TOKEN_EXISTS', () => {
  let mock;
  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
    mock.restore();
  });

  test('test "setGithubTokenStatus"', () => {
    const expectedAction = {
      type: accessTokenActions.IF_GITHUB_TOKEN_EXISTS,
      exists: true,
    };

    expect(actions.setGithubTokenStatus(true)).toEqual(expectedAction);
  });

  test('test "ifGithubTokenExists"', async () => {
    const responseData = {
      success: true,
    };

    mock
      .onGet(apiRoutes.Github.IfTokenExists)
      .reply(200, {
        success: responseData.success,
        errors: null,
        headers: {
          'content-type': 'application/json',
        },
      });

    const expectedActions = [
      {
        type: accessTokenActions.IF_GITHUB_TOKEN_EXISTS,
        exists: responseData.success,
      },
    ];

    const initialState = {
      wakatime: true,
      github: true,
    };

    const store = mockStore(initialState);


    await store.dispatch(actions.setGithubTokenStatus(responseData.success));

    expect(store.getActions()).toEqual(expectedActions);
  });
});
