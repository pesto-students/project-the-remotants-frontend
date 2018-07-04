import { combineReducers } from 'redux';

import auth from './auth';
import currentUser from './currentUser';

const rootReducer = combineReducers({
  auth,
  currentUser,
});

export default rootReducer;
