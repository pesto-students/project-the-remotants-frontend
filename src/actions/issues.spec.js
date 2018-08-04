import expect from 'expect';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import * as actions from '../actions/issues';
import { issuesActions } from '../config/ActionTypes';
import apiRoutes from '../config/apiRoutes';
import { mockStore } from './setupActionTests';

describe('Test Issues', () => {
  let mock;
  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
    mock.restore();
  });

  const issues = [
    {
      html_url: 'https://github.com/project/issues/26',
      number: 26,
      title: 'major issue',
    },
    {
      html_url: 'https://github.com/project/issues/27',
      number: 27,
      title: 'minor issue',
    },
  ];

  test('test "setCurrentUserIssues"', () => {
    const expectedAction = {
      type: issuesActions.VIEW_CURRENT_USER_ISSUES,
      issues,
    };

    expect(actions.setCurrentUserIssues(issues)).toEqual(expectedAction);
  });

  test('test "viewCurrentUserIssues"', async () => {
    const responseData = {
      success: true,
      data: issues,
    };

    mock
      .onGet(apiRoutes.Github.CurrentUserIssues)
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
        type: issuesActions.VIEW_CURRENT_USER_ISSUES,
        issues,
      },
    ];

    const initialState = [];
    const store = mockStore(initialState);


    await store.dispatch(actions.viewCurrentUserIssues());

    expect(store.getActions()).toEqual(expectedActions);
  });
});
