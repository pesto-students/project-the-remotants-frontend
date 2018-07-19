import { flashMessageActions } from '../config/ActionTypes';

export const addFlashMessage = message => ({
  type: flashMessageActions.ADD_FLASH_MESSAGE,
  message,
});

export const deleteFlashMessage = id => ({
  type: flashMessageActions.DELETE_FLASH_MESSAGE,
  id,
});
