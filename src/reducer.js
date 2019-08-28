import { combineReducers } from "redux";
import haversineSum from "./HelperFunctions/haversineSum";

const defaultState = {
  makeRunMarkers: [],
  runs: []
};

function makeRunMarkersReducer(state = defaultState.makeRunMarkers, action) {
  switch (action.type) {
    case "ADD-MARKER":
      return [...state, action.payload];
    case "REMOVE-MARKER":
      return state.slice(0, state.length - 1);
    case "POST":
      if (state.length < 2) {
        alert("Your route must include at least two points");
        return state;
      }
      fetch("http://localhost:3000/runs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          run: {
            user_id: 3,
            coordinates: state.map(longLatArray => {
              return { longitude: longLatArray[0], latitude: longLatArray[1] };
            }),
            length: haversineSum(state)
          }
        })
      });
      return [];
    default:
      return state;
  }
}

function runsReducer(state = defaultState.runs, action) {
  switch (action.type) {
    case "FETCH_RUNS":
      return action.payload;
    default:
      return state;
  }
}

const reducer = combineReducers({
  makeRunMarkers: makeRunMarkersReducer,
  runs: runsReducer
});
export default reducer;
