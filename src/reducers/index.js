import { combineReducers } from 'redux';

import currentUser from './currentUser';
import flashMessage from './flashMessage';

const rootReducer = combineReducers({
  currentUser,
  flashMessage,
});

export default rootReducer;
