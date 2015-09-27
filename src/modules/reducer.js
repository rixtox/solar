import { combineReducers } from 'redux';

import auth from './auth';
import editors from './editors';
import articles from './articles';
import { reducer as form } from 'redux-form';

export default combineReducers({
  auth,
  form,
  editors,
  articles
});
