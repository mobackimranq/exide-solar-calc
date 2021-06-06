const USER = "auth";

const initialState = [];
const storedState =
  JSON.parse(window.localStorage.getItem(USER)) || initialState;

function userReducer(state = storedState, action) {
  delete state?.photoURL;
  delete state?.isAuthenticated;

  switch (action.type) {
    case "UPDATE_USER":
      return { ...state, ...action.payload };
    case "CLEAR":
      return initialState;
    default:
      return state;
  }
}

export { userReducer };
