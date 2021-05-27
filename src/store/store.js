import { createStore, combineReducers } from "redux";

function calculationReducer(state = [], action) {
  switch (action.type) {
    case "ADD_CALCULATION":
      return [...state, action.payload];
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  calculationsArray: calculationReducer,
});

const store = createStore(rootReducer);

export { store };
