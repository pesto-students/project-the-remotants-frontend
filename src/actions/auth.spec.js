import expect from 'expect';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import * as actions from '../actions/auth';
import { SET_CURRENT_USER } from '../config/ActionTypes';
import apiRoutes from '../config/apiRoutes';
import { mockStore } from './setupActionTests';

describe('Test Authentication', () => {
  let mock;
  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
    mock.restore();
  });

  test('test "setCurrentUser"', () => {
    const user = {
      email: process.env.TEST_USER_EMAIL,
    };
    const expectedAction = {
      type: SET_CURRENT_USER,
      user,
    };

    expect(actions.setCurrentUser(user)).toEqual(expectedAction);
  });

  test('test "Login Success"', async () => {
    const requestBody = {
      email: process.env.TEST_USER_EMAIL,
      password: process.env.TEST_USER_PASSWORD,
    };

    const responseData = {
      success: true,
      token: process.env.TEST_USER_TOKEN,
    };

    mock
      .onPost(apiRoutes.Login, {
        email: requestBody.email,
        password: requestBody.password,
      }).reply(200, {
        success: responseData.success,
        token: responseData.token,
        errors: null,
        headers: {
          'content-type': 'application/json',
        },
      });

    const expectedActions = [
      {
        type: SET_CURRENT_USER,
        user: requestBody.email,
      },
    ];

    const initialState = {
      isAuthenticated: false,
      user: '',
    };
    const store = mockStore(initialState);


    await store.dispatch(actions.loginUser({
      email: requestBody.email,
      password: requestBody.password,
    }));

    expect(store.getActions()).toEqual(expectedActions);
  });

  test('test "Signup Success"', async () => {
    const requestBody = {
      email: process.env.TEST_USER_EMAIL,
      password: process.env.TEST_USER_PASSWORD,
    };

    const responseData = {
      success: true,
      token: process.env.TEST_USER_TOKEN,
    };

    mock
      .onPost(apiRoutes.Register, {
        email: requestBody.email,
        password: requestBody.password,
      }).reply(200, {
        success: responseData.success,
        token: responseData.token,
        errors: null,
        headers: {
          'content-type': 'application/json',
        },
      });

    const expectedActions = [
      {
        type: SET_CURRENT_USER,
        user: requestBody.email,
      },
    ];

    const initialState = {
      isAuthenticated: false,
      user: '',
    };
    const store = mockStore(initialState);


    await store.dispatch(actions.registerUser({
      email: requestBody.email,
      password: requestBody.password,
    }));

    expect(store.getActions()).toEqual(expectedActions);
  });
});
