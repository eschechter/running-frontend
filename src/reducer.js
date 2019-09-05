import { combineReducers } from "redux";

const defaultState = {
  makeRunMarkers: [],
  runs: [],
  user: {},
  displayedRun: {},
  searchedUsers: [],
  sentFriendRequests: [],
  receivedFriendRequests: [],
  friends: [],
  selectedFriend: {},
  selectedFriendRun: {},
  selectedFriendSelectedRun: {}
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
    case "UPDATE_RUN":
      const unchangedRuns = state.filter(run => run.id !== action.payload.id);
      return [...unchangedRuns, action.payload];
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
    case "COMPLETE_RUN":
      return { ...state, duration: action.payload, completed: true };
    default:
      return state;
  }
}

function searchedUsersReducer(state = defaultState.searchedUsers, action) {
  switch (action.type) {
    case "SEARCH_USERS":
      return action.payload;
    case "REMOVE_USER_FROM_SEARCH":
      return state.filter(user => user.id !== action.payload.id);
    default:
      return state;
  }
}

function sentFriendRequestsReducer(
  state = defaultState.sentFriendRequests,
  action
) {
  switch (action.type) {
    case "FETCH_REQUEST_RECEIVERS":
      return action.payload;
    case "ADD_USER_TO_REQUESTED":
      console.log(action.payload);
      return [...state, action.payload];
    default:
      return state;
  }
}

function receivedFriendRequestsReducer(
  state = defaultState.receivedFriendRequests,
  action
) {
  switch (action.type) {
    case "FETCH_REQUEST_SENDERS":
      return action.payload;
    case "REMOVE_USER_FROM_SENDERS":
      return state.filter(user => user.id !== action.payload.id);
    default:
      return state;
  }
}

function friendsReducer(state = defaultState.friends, action) {
  switch (action.type) {
    case "FETCH_FRIENDS":
      return action.payload;
    case "ADD_USER_TO_FRIENDS":
      console.log(action.payload);
      return [...state, action.payload];
    default:
      return state;
  }
}

function selectedFriendReducer(state = defaultState.selectedFriend, action) {
  switch (action.type) {
    case "GET_FRIEND_DETAIL":
      return action.payload;
    default:
      return state;
  }
}

const appReducer = combineReducers({
  makeRunMarkers: makeRunMarkersReducer,
  runs: runsReducer,
  user: userReducer,
  displayedRun: currentRunReducer,
  searchedUsers: searchedUsersReducer,
  sentFriendRequests: sentFriendRequestsReducer,
  receivedFriendRequests: receivedFriendRequestsReducer,
  friends: friendsReducer,
  selectedFriend: selectedFriendReducer
});

const reducer = (state, action) => {
  if (action.type === "LOGOUT") {
    state = undefined;
  }
  return appReducer(state, action);
};

export default reducer;
