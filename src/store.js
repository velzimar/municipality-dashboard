import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};

const middleware = [thunk];

const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (err) {
    // ignore error
  }
};

// load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined; // reducer will return Redux state, as localstorage is null.
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};
const persist = loadState();

const store = createStore(
  rootReducer,
  //persist,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

store.subscribe(() => {
  saveToLocalStorage(store.getState()); // save current state to localstorage.
});

export default store;
