import expect from 'expect';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import * as actions from '../actions/projects';
import { projectActions } from '../config/ActionTypes';
import apiRoutes from '../config/apiRoutes';
import { mockStore } from './setupActionTests';

describe('Test Projects', () => {
  let mock;
  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
    mock.restore();
  });

  const projects = [
    {
      id: 1,
      name: 'Project 1',
      description: 'Describe project 1',
    },
    {
      id: 2,
      name: 'Project 2',
      description: 'Describe project 2',
    },
  ];

  const projectID = 1;

  const commits = [
    {
      project: 1,
      message: 'Commit message 1',
    },
    {
      project: 2,
      message: 'Commit message 2',
    },
  ];


  test('test "setCurrentUserProjects"', () => {
    const expectedAction = {
      type: projectActions.VIEW_CURRENT_USER_PROJECTS,
      projects,
    };

    expect(actions.setCurrentUserProjects(projects)).toEqual(expectedAction);
  });

  test('test "viewCurrentUserProjects"', async () => {
    const responseData = {
      success: true,
      data: projects,
    };

    mock
      .onGet(apiRoutes.Wakatime.Projects)
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
        type: projectActions.VIEW_CURRENT_USER_PROJECTS,
        projects,
      },
    ];

    const initialState = [];
    const store = mockStore(initialState);


    await store.dispatch(actions.viewCurrentUserProjects());

    expect(store.getActions()).toEqual(expectedActions);
  });


  test('test "setProjectCommits"', () => {
    const expectedAction = {
      type: projectActions.VIEW_PROJECT_COMMITS,
      projectID,
      commits,
    };

    expect(actions.setProjectCommits(projectID, commits)).toEqual(expectedAction);
  });

  test('test "viewProjectCommits"', async () => {
    const responseData = {
      success: true,
      data: {
        commits,
      },
    };

    mock
      .onGet(`${apiRoutes.Wakatime.Projects}/${projectID}/commits`)
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
        type: projectActions.VIEW_PROJECT_COMMITS,
        projectID,
        commits,
      },
    ];

    const initialState = [];
    const store = mockStore(initialState);


    await store.dispatch(actions.viewProjectCommits(projectID));

    expect(store.getActions()).toEqual(expectedActions);
  });
});
