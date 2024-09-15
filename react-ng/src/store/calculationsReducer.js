const initialState = {
  a: 'A',
  b: 'B',
  c: 'C',
  x: 'X',
  y: 'Y',
  z: 'Z',
  history: [],
  counter: 0,
};

const calculationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_A':
      return {...state, a: action.payload};
    case 'SET_B':
      return {...state, b: action.payload};
    case 'SET_C':
      return {...state, c: action.payload};
    case 'SET_X':
      return {...state, x: action.payload};
    case 'SET_Y':
      return {...state, y: action.payload};
    case 'SET_Z':
      return {...state, z: action.payload};
    // Добавьте другие типы действий по аналогии
    default:
      return state;
  }
};

export default calculationsReducer;
