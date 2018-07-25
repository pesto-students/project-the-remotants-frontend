import repos from './repos';
import { reposActions } from '../config/ActionTypes';

describe('repos reducer: VIEW_CURRENT_USER_REPOS', () => {
  test('should return the initial state', () => {
    expect(repos(undefined, {})).toEqual([]);
  });

  test('should handle VIEW_CURRENT_USER_REPOS with no data and no prev state', () => {
    expect(repos(undefined, {
      type: reposActions.VIEW_CURRENT_USER_REPOS,
      repos: [],
    })).toEqual([]);
  });

  test('should handle VIEW_CURRENT_USER_REPOS with data and no prev state', () => {
    expect(repos(undefined, {
      type: reposActions.VIEW_CURRENT_USER_REPOS,
      repos: [
        {
          private: false,
          html_url: 'https://github.com/octocat/Hello-World',
          description: 'This your first repo!',
        },
      ],
    })).toEqual([
      {
        private: false,
        html_url: 'https://github.com/octocat/Hello-World',
        description: 'This your first repo!',
      },
    ]);
  });

  test('should handle VIEW_CURRENT_USER_REPOS with no data and prev state', () => {
    expect(repos(
      [
        {
          private: false,
          html_url: 'https://github.com/octocat/Hello-World',
          description: 'This your first repo!',
        },
      ],
      {
        type: reposActions.VIEW_CURRENT_USER_REPOS,
        repos: [],
      },
    )).toEqual([]);
  });

  test('should handle VIEW_CURRENT_USER_REPOS with data and prev state', () => {
    expect(repos(
      [
        {
          private: false,
          html_url: 'https://github.com/octocat/Hello-World',
          description: 'This your first repo!',
        },
      ],
      {
        type: reposActions.VIEW_CURRENT_USER_REPOS,
        repos: [
          {
            id: 1296269,
            node_id: 'MDEwOlJlcG9zaXRvcnkxMjk2MjY5',
            name: 'Hello-World',
          },
        ],
      },
    )).toEqual([
      {
        id: 1296269,
        node_id: 'MDEwOlJlcG9zaXRvcnkxMjk2MjY5',
        name: 'Hello-World',
      },
    ]);
  });
});

describe('repo-pull request reducer: VIEW_REPO_PR', () => {
  test('should return the initial state', () => {
    expect(repos(undefined, {})).toEqual([]);
  });

  test('handle VIEW_REPO_PR with data and no prev state', () => {
    expect(repos(undefined, {
      type: reposActions.VIEW_REPO_PR,
      pullRequests: [
        {
          number: 1347,
          state: 'open',
          title: 'new-feature',
          body: 'Please pull these awesome changes',
        },
      ],
      repoName: 'HelloWorld',
    })).toEqual([]);
  });

  test('handle VIEW_REPO_PR with no data and no prev data', () => {
    expect(repos(undefined, {
      type: reposActions.VIEW_REPO_PR,
      pullRequests: [],
      repoName: '',
    })).toEqual([]);
  });

  test('handle VIEW_REPO_PR with data and prev state', () => {
    expect(repos([
      {
        id: 1,
        name: 'HelloWorld',
        private: false,
      },
      {
        id: 3,
        name: 'unique',
      },
    ], {
      type: reposActions.VIEW_REPO_PR,
      pullRequests: [
        {
          number: 1347,
          state: 'open',
          title: 'new-feature',
          body: 'Please pull these awesome changes',
        },
      ],
      repoName: 'HelloWorld',
    })).toEqual([
      {
        id: 1,
        name: 'HelloWorld',
        private: false,
        pullRequests: [
          {
            number: 1347,
            state: 'open',
            title: 'new-feature',
            body: 'Please pull these awesome changes',
          },
        ],
      },
      {
        id: 3,
        name: 'unique',
      },
    ]);
  });

  test('should handle VIEW_REPO_PR with an unmatching repoName', () => {
    expect(repos([
      {
        id: 1,
        name: 'HelloWorld',
        private: false,
      },
      {
        id: 3,
        name: 'unique',
      },
    ], {
      type: reposActions.VIEW_REPO_PR,
      pullRequests: [
        {
          number: 1347,
          state: 'open',
          title: 'new-feature',
          body: 'Please pull these awesome changes',
        },
      ],
      repoName: 'Unmatchable',
    }))
      .toEqual([
        {
          id: 1,
          name: 'HelloWorld',
          private: false,
        },
        {
          id: 3,
          name: 'unique',
        },
      ]);
  });
});
