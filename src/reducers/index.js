import { combineReducers } from 'redux';

import currentUser from './currentUser';
import flashMessage from './flashMessage';
import projects from './projects';
import durations from './durations';
import userDetails from './userDetails';
import organisations from './organisations';
import issues from './issues';
import repos from './repos';

const rootReducer = combineReducers({
  currentUser,
  flashMessage,
  projects,
  durations,
  userDetails,
  organisations,
  issues,
  repos,
});

export default rootReducer;
