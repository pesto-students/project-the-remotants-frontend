import { userDetailsActions } from '../config/ActionTypes';


const initialState = {
  wakatime: {},
  github: {},
};

const userDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case userDetailsActions.VIEW_CURRENT_USER_WAKATIME_DETAILS:
      return (
        {
          wakatime: action.user,
          github: state.github,
        }
      );
    default:
      return state;
  }
};

export default userDetailsReducer;
