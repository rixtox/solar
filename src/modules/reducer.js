import { combineReducers } from 'redux';

import auth from './auth';
import editors from './editors';
import articles from './articles';

export default combineReducers({
  auth,
  editors,
  articles
});
