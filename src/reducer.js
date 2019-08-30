import { combineReducers } from "redux";

const defaultState = {
  makeRunMarkers: [],
  runs: [],
  user: {},
  displayedRun: {}
};

function makeRunMarkersReducer(state = defaultState.makeRunMarkers, action) {
  switch (action.type) {
    case "ADD_MARKER":
      return [...state, action.payload];
    case "REMOVE_MARKER":
      return state.slice(0, state.length - 1);
    case "CLEAR_MARKERS":
      return [];
    default:
      return state;
  }
}

function runsReducer(state = defaultState.runs, action) {
  switch (action.type) {
    case "FETCH_RUNS":
      return action.payload;
    case "ADD_RUN":
      return [...state, action.payload];
    default:
      return state;
  }
}

function userReducer(state = defaultState.user, action) {
  switch (action.type) {
    case "LOGIN_USER":
      return action.payload;
    case "RETRIEVE_USER":
      return action.payload;
    case "SIGN_UP_USER":
      return action.payload;
    default:
      return state;
  }
}

function currentRunReducer(state = defaultState.displayedRun, action) {
  switch (action.type) {
    case "FETCH_DETAILED_RUN":
      return action.payload;
    default:
      return state;
  }
}

const appReducer = combineReducers({
  makeRunMarkers: makeRunMarkersReducer,
  runs: runsReducer,
  user: userReducer,
  displayedRun: currentRunReducer
});

const reducer = (state, action) => {
  if (action.type === "LOGOUT") {
    state = undefined;
  }
  return appReducer(state, action);
};

export default reducer;
