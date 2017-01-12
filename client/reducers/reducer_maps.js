import { INPUT_MAP } from '../actions/index';

export default function(state = {}, action) {
  switch(action.type) {
    case INPUT_MAP:
      return action.map
    }
    return state;
}
