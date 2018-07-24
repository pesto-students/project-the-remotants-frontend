import { accessTokenActions } from '../config/ActionTypes';

const initialState = {
  wakatime: true,
  github: true,
};

const authTokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case accessTokenActions.IF_WAKATIME_TOKEN_EXISTS:
      return ({
        wakatime: !!action.exists,
        github: state.github,
      });
    case accessTokenActions.IF_GITHUB_TOKEN_EXISTS:
      return ({
        wakatime: state.wakatime,
        github: !!action.exists,
      });
    default:
      return state;
  }
};

export default authTokenReducer;
