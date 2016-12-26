import { combineReducers } from 'redux';
import Reducer_Map from './reducer_maps';

const rootReducer = combineReducers({
  current_Map: Reducer_Map
});

export default rootReducer;
