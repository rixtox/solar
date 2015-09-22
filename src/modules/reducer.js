import { combineReducers } from 'redux';

import auth from './auth';
import { reducer as form } from 'redux-form';

const nop = (state) => (typeof state === 'undefined') ? {} : state;

export default combineReducers({
  auth,
  form,
  history: nop
});
