import shortid from 'shortid';
import { flashMessageActions } from '../config/ActionTypes';

const flashMessage = (state = {}, action) => {
  switch (action.type) {
    case flashMessageActions.ADD_FLASH_MESSAGE:
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
