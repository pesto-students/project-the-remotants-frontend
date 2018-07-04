import isEmpty from 'lodash/isEmpty';

import { SET_CURRENT_USER } from '../config/ActionTypes';

const initialState = {
  isAuthenticated: false,
  user: '',
};

const currentUser = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user,
      };
    default:
      return state;
  }
};

export default currentUser;
