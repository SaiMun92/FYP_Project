export default function(state = null, action) {
  switch(action.type) {
    case 'INPUT_MAP':
      return {
        lat: action.lat,
        lng: action.lng
      }
    default:
      return {
        lat: 1.359803,
        lng: 103.837521
      }
  }
}
