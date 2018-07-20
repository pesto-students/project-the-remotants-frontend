import durations from './durations';

import { durationActions } from '../config/ActionTypes';

describe('durations-reducer: VIEW_CURRENT_USER_DURATIONS', () => {
  // handle initial state
  test('handle initial state', () => {
    expect(durations(undefined, {})).toEqual([]);
  });
  test('handle durations-reducer with "data" but no "previousState"', () => {
    expect(durations(undefined, {
      type: durationActions.VIEW_CURRENT_USER_DURATIONS,
      durations: [
        {
          project: 'first-project',
          duration: 12345.5,
        },
        {
          project: 'second-project',
          duration: 452345,
        },
      ],
    })).toEqual([
      {
        project: 'first-project',
        duration: 12345.5,
      },
      {
        project: 'second-project',
        duration: 452345,
      },
    ]);
  });

  test('handle durations-reducer with no "data" and no "previousState"', () => {
    expect(durations(undefined, {
      type: durationActions.VIEW_CURRENT_USER_DURATIONS,
      durations: [],
    })).toEqual([]);
  });

  test('handle durations-reducer with "previousState" and "data"', () => {
    expect(durations([
      {
        project: 'test-project',
        duration: 12345.5,
      },
    ], {
      type: durationActions.VIEW_CURRENT_USER_DURATIONS,
      durations: [
        {
          project: 'tested-project',
          duration: 1433,
        },
      ],
    })).toEqual([
      {
        project: 'tested-project',
        duration: 1433,
      },
    ]);
  });

  test('handle durations-reducer with "previousState" but no "data"', () => {
    expect(durations([
      {
        project: 'test-project',
        duration: 12345.5,
      },
    ], {
      type: durationActions.VIEW_CURRENT_USER_DURATIONS,
      durations: [],
    })).toEqual([]);
  });
});
