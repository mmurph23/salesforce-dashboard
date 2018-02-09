import STATE from './stateReducer';
import CASES from './casesReducer';
import ACCOUNTS from './accountsReducer';


import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  STATE,
  CASES,
  ACCOUNTS,
  form: formReducer
});

export default rootReducer;
