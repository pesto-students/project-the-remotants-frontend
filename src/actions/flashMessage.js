import { flashMessageConstants } from '../config/ActionTypes';

export const addFlashMessage = message => ({
  type: flashMessageConstants.ADD_FLASH_MESSAGE,
  message,
});

export const deleteFlashMessage = id => ({
  type: flashMessageConstants.DELETE_FLASH_MESSAGE,
  id,
});
