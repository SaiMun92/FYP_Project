export default function(state = [], action) {
  switch (action.type) {
    case 'INPUT_COORD':
      return action.data
  }
  return state;
}
