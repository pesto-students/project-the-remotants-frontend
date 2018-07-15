import flashMessage from './flashMessage';
import { flashMessageConstants } from '../config/ActionTypes';

describe('flashMessage reducer', () => {
  // handle initial state
  test('handle initial state', () => {
    expect(flashMessage(undefined, {})).toEqual({});
  });
  test('handle addFlashMessage with message provided', () => {
    expect(flashMessage({}, {
      type: flashMessageConstants.ADD_FLASH_MESSAGE,
      message: {
        type: 'success',
        text: 'test',
      },
    })).toHaveProperty('text', 'test');
  });
});
