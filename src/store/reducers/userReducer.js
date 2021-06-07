const USER = "auth";

const initialState = null;
const storedState =
  JSON.parse(window.localStorage.getItem(USER)) || initialState;

function userReducer(state = storedState, { type, payload }) {
  delete state?.photoURL;
  delete state?.isAuthenticated;

  switch (type) {
    case "UPDATE_USER":
      return { ...state, ...payload };
    case "CLEAR":
      return initialState;
    default:
      return state;
  }
}

export { userReducer };
