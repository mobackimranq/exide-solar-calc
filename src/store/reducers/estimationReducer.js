const ESTIMATION_ARRAY = "estimationArray";

const initialState = [];
const storedState =
  JSON.parse(window.localStorage.getItem(ESTIMATION_ARRAY)) || initialState;

function estimationReducer(state = storedState, action) {
  switch (action.type) {
    case "ADD_ESTIMATION":
      const newState = [...state, action.payload];
      window.localStorage.setItem(ESTIMATION_ARRAY, JSON.stringify(newState));
      return newState;
    case "CLEAR":
      window.localStorage.removeItem(ESTIMATION_ARRAY);
      return initialState;
    default:
      return state;
  }
}

export { estimationReducer };
