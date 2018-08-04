import expect from 'expect';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import * as actions from '../actions/userDetails';
import { userDetailsActions } from '../config/ActionTypes';
import apiRoutes from '../config/apiRoutes';
import { mockStore } from './setupActionTests';

describe('Test User Details', () => {
  let mock;
  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
    mock.restore();
  });

  const user = {
    name: 'John Doe',
    username: 'John',
  };

  test('test "setCurrentUserWakatimeDetails"', () => {
    const expectedAction = {
      type: userDetailsActions.VIEW_CURRENT_USER_WAKATIME_DETAILS,
      user,
    };

    expect(actions.setCurrentUserWakatimeDetails(user)).toEqual(expectedAction);
  });

  test('test "viewCurrentUserWakatimeDetails"', async () => {
    const responseData = {
      success: true,
      data: user,
    };

    mock
      .onGet(apiRoutes.Wakatime.Details)
      .reply(200, {
        success: responseData.success,
        data: responseData.data,
        errors: null,
        headers: {
          'content-type': 'application/json',
        },
      });

    const expectedActions = [
      {
        type: userDetailsActions.VIEW_CURRENT_USER_WAKATIME_DETAILS,
        user,
      },
    ];

    const initialState = {
      wakatime: {},
      github: {},
    };
    const store = mockStore(initialState);


    await store.dispatch(actions.viewCurrentUserWakatimeDetails());

    expect(store.getActions()).toEqual(expectedActions);
  });


  test('test "setCurrentUserGithubDetails"', () => {
    const expectedAction = {
      type: userDetailsActions.VIEW_CURRENT_USER_GITHUB_DETAILS,
      user,
    };

    expect(actions.setCurrentUserGithubDetails(user)).toEqual(expectedAction);
  });

  test('test "viewCurrentUserGithubDetails"', async () => {
    const responseData = {
      success: true,
      data: user,
    };

    mock
      .onGet(apiRoutes.Github.CurrentUserGithubDetails)
      .reply(200, {
        success: responseData.success,
        data: responseData.data,
        errors: null,
        headers: {
          'content-type': 'application/json',
        },
      });

    const expectedActions = [
      {
        type: userDetailsActions.VIEW_CURRENT_USER_GITHUB_DETAILS,
        user,
      },
    ];

    const initialState = {
      wakatime: {},
      github: {},
    };
    const store = mockStore(initialState);


    await store.dispatch(actions.viewCurrentUserGithubDetails());

    expect(store.getActions()).toEqual(expectedActions);
  });
});
