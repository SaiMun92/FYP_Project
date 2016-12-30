import { combineReducers } from 'redux';
// import Reducer_Map from './reducer_maps';
import Reducer_Data from './reducer_Data';

const rootReducer = combineReducers({
  // current_Map: Reducer_Map,
  data: Reducer_Data
});

export default rootReducer;
