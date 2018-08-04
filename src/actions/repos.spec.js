import expect from 'expect';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import * as actions from '../actions/repos';
import { reposActions } from '../config/ActionTypes';
import apiRoutes from '../config/apiRoutes';
import { mockStore } from './setupActionTests';

describe('Test Repos', () => {
  let mock;
  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
    mock.restore();
  });

  const repos = [
    {
      id: 1,
      name: 'Repo 1',
      description: 'Describe repo 1',
    },
    {
      id: 2,
      name: 'Repo 2',
      description: 'Describe repo 2',
    },
  ];

  const repoName = 'Repo 1';

  const pullRequests = [
    {
      project: 1,
      message: 'Commit message 1',
    },
    {
      project: 2,
      message: 'Commit message 2',
    },
  ];

  const owner = 'ownerName';


  test('test "setCurrentUserRepos"', () => {
    const expectedAction = {
      type: reposActions.VIEW_CURRENT_USER_REPOS,
      repos,
    };

    expect(actions.setCurrentUserRepos(repos)).toEqual(expectedAction);
  });

  test('test "viewCurrentUserRepos"', async () => {
    const responseData = {
      success: true,
      data: repos,
    };

    mock
      .onGet(apiRoutes.Github.CurrentUserRepos)
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
        type: reposActions.VIEW_CURRENT_USER_REPOS,
        repos,
      },
    ];

    const initialState = [];
    const store = mockStore(initialState);


    await store.dispatch(actions.viewCurrentUserRepos());

    expect(store.getActions()).toEqual(expectedActions);
  });


  test('test "setRepoPullRequests"', () => {
    const expectedAction = {
      type: reposActions.VIEW_REPO_PR,
      repoName,
      pullRequests,
    };

    expect(actions.setRepoPullRequests(repoName, pullRequests)).toEqual(expectedAction);
  });

  test('test "viewRepoPullRequests"', async () => {
    const responseData = {
      success: true,
      data: pullRequests,
    };

    mock
      .onGet(`${apiRoutes.Github.CurrentUserRepos}/${owner}/${repoName}/pulls`)
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
        type: reposActions.VIEW_REPO_PR,
        repoName,
        pullRequests,
      },
    ];

    const initialState = [];
    const store = mockStore(initialState);


    await store.dispatch(actions.viewRepoPullRequests(owner, repoName));

    expect(store.getActions()).toEqual(expectedActions);
  });
});
