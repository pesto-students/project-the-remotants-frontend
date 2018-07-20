import { combineReducers } from 'redux';

import currentUser from './currentUser';
import flashMessage from './flashMessage';
import projects from './projects';
import durations from './durations';
import userDetails from './userDetails';

const rootReducer = combineReducers({
  currentUser,
  flashMessage,
  projects,
  durations,
  userDetails,
});

export default rootReducer;
