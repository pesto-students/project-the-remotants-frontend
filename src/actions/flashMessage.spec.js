import expect from 'expect';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import * as actions from '../actions/flashMessage';
import { flashMessageActions } from '../config/ActionTypes';

describe('Test Flash Message actions', () => {
  let mock;
  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
    mock.restore();
  });


  test('test "addFlashMessage"', () => {
    const message = 'This is a flash message';

    const expectedAction = {
      type: flashMessageActions.ADD_FLASH_MESSAGE,
      message,
    };

    expect(actions.addFlashMessage(message)).toEqual(expectedAction);
  });

  test('test "deleteFlashMessage"', () => {
    const id = 2;

    const expectedAction = {
      type: flashMessageActions.DELETE_FLASH_MESSAGE,
      id,
    };

    expect(actions.deleteFlashMessage(id)).toEqual(expectedAction);
  });
});
