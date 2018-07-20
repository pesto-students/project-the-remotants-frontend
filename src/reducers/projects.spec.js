import projects from './projects';

import { projectActions } from '../config/ActionTypes';

describe('projects-reducer: VIEW_CURRENT_USER_PROJECTS', () => {
  // handle initial state
  test('handle initial state', () => {
    expect(projects(undefined, {})).toEqual([]);
  });
  test('handle "VIEW_CURRENT_USER_PROJECTS" with "data" but no "previousState"', () => {
    expect(projects(undefined, {
      type: projectActions.VIEW_CURRENT_USER_PROJECTS,
      projects: [
        {
          name: 'first-project',
        },
        {
          name: 'second-project',
        },
      ],
    })).toEqual([
      {
        name: 'first-project',
      },
      {
        name: 'second-project',
      },
    ]);
  });

  test('handle "VIEW_CURRENT_USER_PROJECTS" with no "data" and no "previousState"', () => {
    expect(projects(undefined, {
      type: projectActions.VIEW_CURRENT_USER_PROJECTS,
      projects: [],
    })).toEqual([]);
  });

  test('handle "VIEW_CURRENT_USER_PROJECTS" with "previousState" and "data"', () => {
    expect(projects([
      {
        name: 'test-project',
      },
    ], {
      type: projectActions.VIEW_CURRENT_USER_PROJECTS,
      projects: [
        {
          name: 'tested-project',
        },
      ],
    })).toEqual([
      {
        name: 'tested-project',
      },
    ]);
  });

  test('handle "VIEW_CURRENT_USER_PROJECTS" with "previousState" but no "data"', () => {
    expect(projects([
      {
        name: 'test-project',
      },
    ], {
      type: projectActions.VIEW_CURRENT_USER_PROJECTS,
      projects: [],
    })).toEqual([]);
  });
});


describe('projects-reducer: VIEW_PROJECT_COMMITS', () => {
  // handle initial state
  test('handle initial state', () => {
    expect(projects(undefined, {})).toEqual([]);
  });
  test('handle "VIEW_PROJECT_COMMITS" with "data" but no "previousState"', () => {
    expect(projects([], {
      type: projectActions.VIEW_PROJECT_COMMITS,
      commits: [
        {
          name: 'first-commit',
        },
        {
          name: 'second-commit',
        },
      ],
      projectID: 1,
    })).toEqual([]);
  });

  test('handle "VIEW_PROJECT_COMMITS" with no "data" and no "previousState"', () => {
    expect(projects([], {
      type: projectActions.VIEW_PROJECT_COMMITS,
      commits: [],
      projectID: 0,
    })).toEqual([]);
  });

  test('handle "VIEW_PROJECT_COMMITS" with "previousState" and "data"', () => {
    expect(projects([
      {
        id: 1,
        name: 'test-project',
      },
    ], {
      type: projectActions.VIEW_PROJECT_COMMITS,
      commits: [
        {
          name: 'tested-project',
        },
      ],
      projectID: 1,
    })).toEqual([
      {
        id: 1,
        name: 'test-project',
        commits: [
          {
            name: 'tested-project',
          },
        ],
      },
    ]);
  });

  test('handle "VIEW_PROJECT_COMMITS" with "previousState" but no "data"', () => {
    expect(projects([
      {
        id: 1,
        name: 'test-project',
      },
    ], {
      type: projectActions.VIEW_PROJECT_COMMITS,
      commits: [],
      projectID: 1,
    })).toEqual([
      {
        id: 1,
        name: 'test-project',
        commits: [],
      },
    ]);
  });

  test('handle "VIEW_PROJECT_COMMITS" with "previousState" and "data" but with corrupt projectID', () => {
    expect(projects([
      {
        id: 1,
        name: 'test-project',
      },
    ], {
      type: projectActions.VIEW_PROJECT_COMMITS,
      commits: [
        {
          name: 'tested-project',
        },
      ],
      projectID: 2,
    })).toEqual([
      {
        id: 1,
        name: 'test-project',
      },
    ]);
  });
});
