import { durationActions } from '../config/ActionTypes';

const durationsReducer = (state = [], action) => {
  switch (action.type) {
    case durationActions.VIEW_CURRENT_USER_DURATIONS:
      return action.durations;
    default:
      return state;
  }
};

export default durationsReducer;
