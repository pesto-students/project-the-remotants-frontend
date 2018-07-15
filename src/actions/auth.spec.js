import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import expect from 'expect';

import * as actions from '../actions/auth';
import { SET_CURRENT_USER } from '../config/ActionTypes';
import { BACKEND_URL } from '../config/constants';
import routes from '../config/routes';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Test Authentication', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  test('test login success', async () => {
    const email = 'nikhil@theremotants.com';
    const password = 'nikhil';
    fetchMock
      .getOnce(`${BACKEND_URL}${routes.Login}`, { email, password, headers: { 'content-type': 'application/json' } });

    const expectedActions = [
      {
        type: SET_CURRENT_USER,
        user: email,
      },
    ];
    const store = mockStore({});

    await store.dispatch(actions.loginUser({ email, password }));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
