import expect from 'expect';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import * as actions from '../actions/inviteAuth';
import { SET_CURRENT_USER } from '../config/ActionTypes';
import apiRoutes from '../config/apiRoutes';
import { mockStore } from './setupActionTests';


describe('Test InviteAuth action', () => {
  let mock;
  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
    mock.restore();
  });

  test('test "inviteAuth" action', async () => {
    const requestBody = {
      email: process.env.TEST_USER_EMAIL,
      name: process.env.TEST_USER_NAME,
      username: process.env.TEST_USER_USERNAME,
      password: process.env.TEST_USER_PASSWORD,
      organisation: process.env.TEST_USER_ORGANISATION,
      manager: process.env.TEST_USER_MANAGER,
    };

    const responseData = {
      success: true,
      token: process.env.TEST_USER_TOKEN,
    };

    mock
      .onPost(apiRoutes.InviteAuth, {
        email: requestBody.email,
        name: requestBody.name,
        username: requestBody.username,
        password: requestBody.password,
        organisation: requestBody.organisation,
        manager: requestBody.manager,
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


    await store.dispatch(actions.inviteAuth({
      email: requestBody.email,
      name: requestBody.name,
      username: requestBody.username,
      password: requestBody.password,
      organisation: requestBody.organisation,
      manager: requestBody.manager,
    }));

    expect(store.getActions()).toEqual(expectedActions);
  });
});
