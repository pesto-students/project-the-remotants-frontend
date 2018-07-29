import { durationActions } from '../config/ActionTypes';

const initialState = {
  durations: [],
  dateRangeDurations: [],
};

const durationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case durationActions.VIEW_CURRENT_USER_DURATIONS:
      return {
        ...state,
        durations: action.durations,
      };
    case durationActions.VIEW_CURRENT_USER_DATE_RANGE_DURATIONS:
      return {
        ...state,
        dateRangeDurations: action.dateRangeDurations,
      };
    default:
      return state;
  }
};

export default durationsReducer;
