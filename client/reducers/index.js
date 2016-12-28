import { combineReducers } from 'redux';
import Reducer_Map from './reducer_maps';
import Reducer_Polyline from './reducer_polyline';

const rootReducer = combineReducers({
  current_Map: Reducer_Map,
  polyline: Reducer_Polyline
});

export default rootReducer;
