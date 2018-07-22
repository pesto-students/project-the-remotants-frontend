import organisations from './organisations';

import { organisationActions } from '../config/ActionTypes';

describe('organisations-reducer: VIEW_CURRENT_USER_ORGANISATIONS', () => {
  // handle initial state
  test('handle initial state', () => {
    expect(organisations(undefined, {})).toEqual(null);
  });
  test('handle "VIEW_CURRENT_USER_ORGANISATIONS" with "data" but no "previousState"', () => {
    expect(organisations(undefined, {
      type: organisationActions.VIEW_CURRENT_USER_ORGANISATIONS,
      organisations: [
        {
          name: 'first-organisation',
        },
        {
          name: 'second-organisation',
        },
      ],
    })).toEqual([
      {
        name: 'first-organisation',
      },
      {
        name: 'second-organisation',
      },
    ]);
  });

  test('handle "VIEW_CURRENT_USER_ORGANISATIONS" with no "data" and no "previousState"', () => {
    expect(organisations(undefined, {
      type: organisationActions.VIEW_CURRENT_USER_ORGANISATIONS,
      organisations: [],
    })).toEqual([]);
  });

  test('handle "VIEW_CURRENT_USER_ORGANISATIONS" with "previousState" and "data"', () => {
    expect(organisations([
      {
        name: 'test-organisation',
      },
    ], {
      type: organisationActions.VIEW_CURRENT_USER_ORGANISATIONS,
      organisations: [
        {
          name: 'tested-organisation',
        },
      ],
    })).toEqual([
      {
        name: 'tested-organisation',
      },
    ]);
  });

  test('handle "VIEW_CURRENT_USER_ORGANISATIONS" with "previousState" but no "data"', () => {
    expect(organisations([
      {
        name: 'test-organisation',
      },
    ], {
      type: organisationActions.VIEW_CURRENT_USER_ORGANISATIONS,
      organisations: [],
    })).toEqual([]);
  });
});
