import shortid from 'shortid';
import { flashMessageConstants } from '../config/ActionTypes';

const flashMessage = (state = {}, action) => {
  switch (action.type) {
    case flashMessageConstants.ADD_FLASH_MESSAGE:
      return {
        id: shortid.generate(),
        type: action.message.type,
        text: action.message.text,
      };
    default:
      return state;
  }
};

export default flashMessage;
