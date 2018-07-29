import durations from './durations';

import { durationActions } from '../config/ActionTypes';

describe('durations-reducer: VIEW_CURRENT_USER_DURATIONS', () => {
  // handle initial state
  const initialState = {
    durations: [],
    dateRangeDurations: [],
  };

  test('handle initial state', () => {
    expect(durations(undefined, {})).toEqual(initialState);
  });
  test('handle VIEW_CURRENT_USER_DURATIONS with "data" but no "previousState"', () => {
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
    })).toEqual({
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
      dateRangeDurations: [],
    });
  });

  test('handle VIEW_CURRENT_USER_DURATIONS with no "data" and no "previousState"', () => {
    expect(durations(undefined, {
      type: durationActions.VIEW_CURRENT_USER_DURATIONS,
      durations: [],
    })).toEqual({
      durations: [],
      dateRangeDurations: [],
    });
  });

  test('handle VIEW_CURRENT_USER_DURATIONS with "previousState" and "data"', () => {
    expect(durations({
      durations: [
        {
          project: 'test-project',
          duration: 12345.5,
        },
      ],
      dateRangeDurations: [],
    }, {
      type: durationActions.VIEW_CURRENT_USER_DURATIONS,
      durations: [
        {
          project: 'tested-project',
          duration: 1433,
        },
      ],
    })).toEqual({
      durations: [
        {
          project: 'tested-project',
          duration: 1433,
        },
      ],
      dateRangeDurations: [],
    });
  });

  test('handle VIEW_CURRENT_USER_DURATIONS with "previousState" but no "data"', () => {
    expect(durations({
      durations: [
        {
          project: 'test-project',
          duration: 12345.5,
        },
      ],
      dateRangeDurations: [],
    }, {
      type: durationActions.VIEW_CURRENT_USER_DURATIONS,
      durations: [],
    })).toEqual({
      durations: [],
      dateRangeDurations: [],
    });
  });

  // VIEW_CURRENT_USER_DATE_RANGE_DURATIONS

  test('handle VIEW_CURRENT_USER_DATE_RANGE_DURATIONS with "data" but no "previousState"', () => {
    expect(durations(undefined, {
      type: durationActions.VIEW_CURRENT_USER_DATE_RANGE_DURATIONS,
      dateRangeDurations: [
        {
          project: 'first-project',
          duration: 12345.5,
        },
        {
          project: 'second-project',
          duration: 452345,
        },
      ],
    })).toEqual({
      dateRangeDurations: [
        {
          project: 'first-project',
          duration: 12345.5,
        },
        {
          project: 'second-project',
          duration: 452345,
        },
      ],
      durations: [],
    });
  });

  test('handle VIEW_CURRENT_USER_DATE_RANGE_DURATIONS with no "data" and no "previousState"', () => {
    expect(durations(undefined, {
      type: durationActions.VIEW_CURRENT_USER_DATE_RANGE_DURATIONS,
      dateRangeDurations: [],
    })).toEqual({
      durations: [],
      dateRangeDurations: [],
    });
  });

  test('handle VIEW_CURRENT_USER_DATE_RANGE_DURATIONS with "previousState" and "data"', () => {
    expect(durations({
      dateRangeDurations: [
        {
          project: 'test-project',
          duration: 12345.5,
        },
      ],
      durations: [],
    }, {
      type: durationActions.VIEW_CURRENT_USER_DATE_RANGE_DURATIONS,
      dateRangeDurations: [
        {
          project: 'tested-project',
          duration: 1433,
        },
      ],
    })).toEqual({
      dateRangeDurations: [
        {
          project: 'tested-project',
          duration: 1433,
        },
      ],
      durations: [],
    });
  });

  test('handle VIEW_CURRENT_USER_DATE_RANGE_DURATIONS with "previousState" but no "data"', () => {
    expect(durations({
      dateRangeDurations: [
        {
          project: 'test-project',
          duration: 12345.5,
        },
      ],
      durations: [],
    }, {
      type: durationActions.VIEW_CURRENT_USER_DATE_RANGE_DURATIONS,
      dateRangeDurations: [],
    })).toEqual({
      durations: [],
      dateRangeDurations: [],
    });
  });
});
