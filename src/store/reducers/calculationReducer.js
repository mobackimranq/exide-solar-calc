const CALCULATION_ARRAY = "calculationsArray";

const initialState = [];
const storedState =
  JSON.parse(window.localStorage.getItem(CALCULATION_ARRAY)) || initialState;

function calculationReducer(state = storedState, action) {
  switch (action.type) {
    case "ADD_CALCULATION":
      const newState = [...state, action.payload];
      {
        const filteredCalcArr = newState.filter((calc) => calc.result != null);
        window.localStorage.setItem(
          CALCULATION_ARRAY,
          JSON.stringify(filteredCalcArr)
        );
      }
      return newState;
    case "CLEAR":
      window.localStorage.removeItem(CALCULATION_ARRAY);
      return initialState;
    default:
      return state;
  }
}

export { calculationReducer };
