import issues from './issues';
import { issuesActions } from '../config/ActionTypes';

describe('issues reducer', () => {
  test('should return the initial state', () => {
    expect(issues(undefined, {})).toEqual([]);
  });

  test('should handle VIEW_CURRENT_USER_ISSUES with no data and no prev state', () => {
    expect(issues(undefined, {
      type: issuesActions.VIEW_CURRENT_USER_ISSUES,
      issues: [],
    })).toEqual([]);
  });

  test('should handle VIEW_CURRENT_USER_ISSUES with data and no prev state', () => {
    expect(issues(undefined, {
      type: issuesActions.VIEW_CURRENT_USER_ISSUES,
      issues: [
        {
          state: 'open',
          title: 'Found a bug',
        },
      ],
    })).toEqual([
      {
        state: 'open',
        title: 'Found a bug',
      },
    ]);
  });

  test('should handle VIEW_CURRENT_USER_ISSUE with prev state and no data', () => {
    expect(issues([
      {
        id: 21125,
        title: 'TensorRT loses defined shapes',
        state: 'open',
      },
    ], {
      type: issuesActions.VIEW_CURRENT_USER_ISSUES,
      issues: [],
    })).toEqual([]);
  });

  test('should handle VIEW_CURRENT_USER_ISSUE with data and prev state', () => {
    expect(issues([
      {
        id: 1,
        node_id: 'MDU6SXNzdWUx',
        url: 'https://api.github.com/repos/octocat/Hello-World/issues/1347',
        repository_url: 'https://api.github.com/repos/octocat/Hello-World',
      },
    ], {
      type: issuesActions.VIEW_CURRENT_USER_ISSUES,
      issues: [
        {
          id: 21150,
          title: 'How can use mobileNet Classification Model in opencv(c++ platform)?',
          url: 'https://github.com/tensorflow/tensorflow/issues/21150',
        },
      ],
    })).toEqual([
      {
        id: 21150,
        title: 'How can use mobileNet Classification Model in opencv(c++ platform)?',
        url: 'https://github.com/tensorflow/tensorflow/issues/21150',
      },
    ]);
  });
});
