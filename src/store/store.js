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

store.subscribe(() => {
  const data = store.getState();
  const { user, calculationsArray } = data;
  let uploadData = {};
  if (user !== null) {
    const { displayName, phone, email, location } = user;
    uploadData = { ...uploadData, name: displayName, phone, email, location };
  }
  if (calculationsArray.length) {
    const calculation = calculationsArray.slice(-1)[0];
    const {
      load,
      loadDuration,
      dependency,
      location: projectLocation,
      inverterType,
    } = calculation?.input;

    uploadData = {
      ...uploadData,
      load,
      loadDuration,
      dependency,
      projectLocation,
      inverterType,
    };
  }

  console.log(JSON.stringify(uploadData));
});

export { store };
