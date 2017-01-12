export const INPUT_COORD = 'INPUT_COORD';
export const INPUT_MAP = 'INPUT_MAP';

export function inputMap(map) {
  return {
    type: INPUT_MAP,
    map
  };
}

export function inputData(data) {
  return {
    type: INPUT_COORD,
    data
  };
}
