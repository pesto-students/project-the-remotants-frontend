import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import expect from 'expect';

import * as actions from '../actions/auth';
import { authConstants, SET_CURRENT_USER } from '../config/ActionTypes';
import { BACKEND_URL } from '../config/constants';
import routes from '../config/routes';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Test Authentication', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  test('test registration success', async () => {
    const email = `test${Math.random() * 100}@gmail.com`;
    const password = '123';
    fetchMock
      .getOnce(`${BACKEND_URL}${routes.Register}`, { email, password, headers: { 'content-type': 'application/json' } });

    const expectedActions = [
      { type: authConstants.AUTH_REQUEST },
      { type: authConstants.AUTH_SUCCESS },
    ];
    const store = mockStore({});

    await store.dispatch(actions.registerUser({ email, password }));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('test registration failure', async () => {
    const email = 'nikhil@theremotants.com';
    const password = '123';
    fetchMock
      .getOnce(`${BACKEND_URL}${routes.Register}`, { email, password, headers: { 'content-type': 'application/json' } });

    const expectedActions = [
      { type: authConstants.AUTH_REQUEST },
      {
        type: authConstants.AUTH_FAILURE,
        payload: {
          errors:
          {
            name: 'User exists',
          },
        },
      },
    ];
    const store = mockStore({});

    await store.dispatch(actions.registerUser({ email, password }));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('test login success', async () => {
    const email = 'nikhil@theremotants.com';
    const password = 'nikhil';
    fetchMock
      .getOnce(`${BACKEND_URL}${routes.Login}`, { email, password, headers: { 'content-type': 'application/json' } });

    const expectedActions = [
      { type: authConstants.AUTH_REQUEST },
      { type: authConstants.AUTH_SUCCESS },
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
