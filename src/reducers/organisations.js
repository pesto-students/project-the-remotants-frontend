import { organisationActions } from '../config/ActionTypes';

const organisationsReducer = (state = null, action) => {
  switch (action.type) {
    case organisationActions.VIEW_CURRENT_USER_ORGANISATIONS:
      return action.organisations;
    default:
      return state;
  }
};

export default organisationsReducer;
