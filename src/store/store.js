import { createStore, combineReducers } from "redux";
import { calculationReducer } from "./reducers/calculationReducer";
import { estimationReducer } from "./reducers/estimationReducer";
import { userReducer } from "./reducers/userReducer";

const rootReducer = combineReducers({
  calculationsArray: calculationReducer,
  estimationsArray: estimationReducer,
  user: userReducer,
});

const store = createStore(rootReducer);

store.subscribe(() => console.log(JSON.stringify(store.getState())));

export { store };
