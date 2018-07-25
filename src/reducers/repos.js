import { reposActions } from '../config/ActionTypes';

const reposReducer = (state = [], action) => {
  switch (action.type) {
    case reposActions.VIEW_CURRENT_USER_REPOS:
      return action.repos;

    case reposActions.VIEW_REPO_PR:
      return state.map(repo => (
        repo.name === action.repoName ?
          { ...repo, pullRequests: action.pullRequests } :
          repo
      ));

    default:
      return state;
  }
};

export default reposReducer;
