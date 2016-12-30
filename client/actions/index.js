// export const INPUT_MAP = 'INPUT_MAP';
export const INPUT_COORD = 'INPUT_COORD';

// export function inputMap(lat, lng) {
//   return {
//     type: INPUT_MAP,
//     lat: lat,
//     lng: lng
//   };
// }

export function inputData(data) {
  return {
    type: INPUT_COORD,
    data
  };
}
