import { combineReducers } from 'redux';

import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';
import friends from './friends';

export default combineReducers({
  alert,
  auth,
  post,
  profile,
  friends
});
