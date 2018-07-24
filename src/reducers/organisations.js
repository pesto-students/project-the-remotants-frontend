import { organisationActions } from '../config/ActionTypes';

const organisationsReducer = (state = null, action) => {
  switch (action.type) {
    case organisationActions.VIEW_CURRENT_USER_ORGANISATIONS:
      return action.organisations;
    case organisationActions.VIEW_CURRENT_ORGANISATION:
      return state.map(organisation => (
        organisation.id === action.organisationID ?
          {
            ...organisation,
            current: 1,
          } :
          {
            ...organisation,
            current: 0,
          }
      ));

    default:
      return state;
  }
};

export default organisationsReducer;
