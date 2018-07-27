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

    case userDetailsActions.VIEW_CURRENT_USER_GITHUB_DETAILS:
      return (
        {
          wakatime: state.wakatime,
          github: action.user,
        }
      );
    default:
      return state;
  }
};

export default userDetailsReducer;
