import expect from 'expect';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import * as actions from '../actions/organisations';
import { organisationActions } from '../config/ActionTypes';
import apiRoutes from '../config/apiRoutes';
import { mockStore } from './setupActionTests';

describe('Test Organisations', () => {
  let mock;
  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
    mock.restore();
  });

  const organisations = [
    {
      id: 1,
      name: 'Organisation 1',
      description: 'Describe organisation 1',
    },
    {
      id: 2,
      name: 'Organisation 2',
      description: 'Describe organisation 2',
    },
  ];

  test('test "setCurrentUserOrganisations"', () => {
    const expectedAction = {
      type: organisationActions.VIEW_CURRENT_USER_ORGANISATIONS,
      organisations,
    };

    expect(actions.setCurrentUserOrganisations(organisations)).toEqual(expectedAction);
  });

  test('test "viewCurrentUserOrganisations"', async () => {
    const responseData = {
      success: true,
      data: organisations,
    };

    mock
      .onGet(apiRoutes.Organisation.List)
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
        type: organisationActions.VIEW_CURRENT_USER_ORGANISATIONS,
        organisations,
      },
    ];

    const initialState = null;
    const store = mockStore(initialState);


    await store.dispatch(actions.viewCurrentUserOrganisations());

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('test "viewCurrentOrganisation"', () => {
    const expectedAction = {
      type: organisationActions.VIEW_CURRENT_ORGANISATION,
      organisationID: 1,
    };

    expect(actions.viewCurrentOrganisation(1)).toEqual(expectedAction);
  });
});
