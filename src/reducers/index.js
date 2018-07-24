import { combineReducers } from 'redux';

import currentUser from './currentUser';
import flashMessage from './flashMessage';
import projects from './projects';
import durations from './durations';
import userDetails from './userDetails';
import organisations from './organisations';
import issues from './issues';
import repos from './repos';
import authToken from './authToken';


const rootReducer = combineReducers({
  currentUser,
  flashMessage,
  projects,
  durations,
  userDetails,
  organisations,
  issues,
  repos,
  authToken,
});

export default rootReducer;
