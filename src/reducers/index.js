import { combineReducers } from 'redux';

import currentUser from './currentUser';
import flashMessage from './flashMessage';
import projects from './projects';

const rootReducer = combineReducers({
  currentUser,
  flashMessage,
  projects,
});

export default rootReducer;
