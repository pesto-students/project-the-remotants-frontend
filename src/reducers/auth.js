import { authConstants } from '../config/ActionTypes';

const registration = (state = {}, action) => {
  switch (action.type) {
    case authConstants.AUTH_REQUEST:
      return { isLoading: true };
    case authConstants.AUTH_SUCCESS:
      return {
        isLoading: false,
        success: true,
      };
    case authConstants.AUTH_FAILURE:
      return { isLoading: false, errors: action.payload.errors };
    default:
      return state;
  }
};

export default registration;
