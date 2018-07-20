import { issuesActions } from '../config/ActionTypes';

const issuesReducer = (state = [], action) => {
  switch (action.type) {
    case issuesActions.VIEW_CURRENT_USER_ISSUES:
      return action.issues;

    default:
      return state;
  }
};

export default issuesReducer;
