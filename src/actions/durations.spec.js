import expect from 'expect';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import * as actions from '../actions/durations';
import { durationActions } from '../config/ActionTypes';
import apiRoutes from '../config/apiRoutes';
import { mockStore } from './setupActionTests';

describe('Test Durations', () => {
  let mock;
  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
    mock.restore();
  });

  const durations = [
    {
      name: 'Project 1',
      total_seconds: 1642,
    },
    {
      name: 'Project 2',
      total_seconds: 786,
    },
  ];

  test('test "setCurrentUserDurations"', () => {
    const expectedAction = {
      type: durationActions.VIEW_CURRENT_USER_DURATIONS,
      durations,
    };

    expect(actions.setCurrentUserDurations(durations)).toEqual(expectedAction);
  });

  test('test "viewCurrentUserDurations"', async () => {
    const responseData = {
      success: true,
      data: durations,
    };

    const date = '2018-08-01';

    mock
      .onGet(`${apiRoutes.Wakatime.Durations}?date=${date}`).reply(200, {
        success: responseData.success,
        data: responseData.data,
        errors: null,
        headers: {
          'content-type': 'application/json',
        },
      });

    const expectedActions = [
      {
        type: durationActions.VIEW_CURRENT_USER_DURATIONS,
        durations,
      },
    ];

    const initialState = {
      durations: [],
      dateRangeDurations: [],
    };
    const store = mockStore(initialState);


    await store.dispatch(actions.viewCurrentUserDurations(date));

    expect(store.getActions()).toEqual(expectedActions);
  });


  test('test "setCurrentUserDateRangeDurations"', () => {
    const expectedAction = {
      type: durationActions.VIEW_CURRENT_USER_DATE_RANGE_DURATIONS,
      dateRangeDurations: durations,
    };

    expect(actions.setCurrentUserDateRangeDurations(durations)).toEqual(expectedAction);
  });

  test('test "viewCurrentUserDateRangeDurations"', async () => {
    const responseData = {
      success: true,
      data: durations,
    };

    const start = '2018-08-01';
    const end = '2018-08-06';

    mock
      .onGet(`${apiRoutes.Wakatime.DateRangeDurations}?start=${start}&end=${end}`)
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
        type: durationActions.VIEW_CURRENT_USER_DATE_RANGE_DURATIONS,
        dateRangeDurations: durations,
      },
    ];

    const initialState = {
      durations: [],
      dateRangeDurations: [],
    };
    const store = mockStore(initialState);


    await store.dispatch(actions.viewCurrentUserDateRangeDurations(start, end));

    expect(store.getActions()).toEqual(expectedActions);
  });
});
