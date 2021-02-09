import { combineReducers } from 'redux';

import searchReducer from './componentReducers/searchReducer';
import alertReducer from './componentReducers/alertReducer';
import dropDownReducer from './componentReducers/dropDownReducer';
import inputReducer from './componentReducers/inputReducer';

const rootReducer = combineReducers({
    search: searchReducer,
    alert: alertReducer,
    dropDown: dropDownReducer,
    input: inputReducer,
  });

export default rootReducer;