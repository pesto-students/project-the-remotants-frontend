import { projectActions } from '../config/ActionTypes';

const projectsReducer = (state = [], action) => {
  switch (action.type) {
    case projectActions.VIEW_CURRENT_USER_PROJECTS:
      return action.projects;

    case projectActions.VIEW_PROJECT_COMMITS:
      return state.map(project => (
        project.id === action.projectID ?
          { ...project, commits: action.commits } :
          project
      ));
    default:
      return state;
  }
};

export default projectsReducer;
