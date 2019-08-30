import haversineSum from "./HelperFunctions/haversineSum";

function loginUser(user, history) {
  return function(dispatch, getState) {
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json"
      },
      body: JSON.stringify({
        user
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === "Invalid email or password")
          alert("invalid email or password");
        else {
          history.push("/runs");
          dispatch({ type: "LOGIN_USER", payload: data.user });
          localStorage.setItem("running-token", data.jwt);
        }
      });
  };
}

function retrieveUser(token, history) {
  return function(dispatch) {
    fetch("http://localhost:3000/retrieve-user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json",
        Authorization: token
      }
    })
      .then(res => res.json())
      .then(user => {
        // check for bad user case at some point
        if (user.message === "Invalid email or password")
          alert("invalid token");
        else {
          if (
            document.location.href === "http://localhost:3001/" ||
            document.location.href === "http://localhost:3001/sign-up"
          ) {
            history.push("/runs");
          }
          dispatch({ type: "RETRIEVE_USER", payload: user });
        }
      });
  };
}

function signUp(user, history) {
  return function(dispatch) {
    fetch("http://localhost:3000/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json"
      },
      body: JSON.stringify({
        user: {
          email: user.email,
          password: user.password,
          name: user.name
        }
      })
    })
      .then(res => res.json())
      .then(data => {
        history.push("/runs");
        localStorage.setItem("running-token", data.jwt);
        dispatch({ type: "SIGN_UP_USER", payload: data.user });
      });
  };
}

function fetchRuns() {
  return function(dispatch, getState) {
    fetch(`http://localhost:3000/users/${getState().user.id}/runs`)
      .then(resp => resp.json())
      .then(runs => {
        dispatch({ type: "FETCH_RUNS", payload: runs });
      });
  };
}

function postRun(history) {
  return function(dispatch, getState) {
    if (getState().makeRunMarkers.length < 2) {
      alert("Your route must include at least two points");
    } else {
      fetch("http://localhost:3000/runs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          run: {
            user_id: getState().user.id,
            coordinates: getState().makeRunMarkers.map(longLatArray => {
              return { longitude: longLatArray[0], latitude: longLatArray[1] };
            }),
            length: haversineSum(getState().makeRunMarkers)
          }
        })
      })
        .then(resp => resp.json())
        .then(run => {
          console.log("detailed run", run);
          dispatch({ type: "CLEAR_MARKERS" });
          dispatch({ type: "ADD_RUN", payload: run });
          dispatch({ type: "FETCH_DETAILED_RUN", payload: run });
          history.push("/runs/display");
        });
    }
  };
}

function fetchDetailedRun(history, runId) {
  return function(dispatch) {
    fetch(`http://localhost:3000/runs/${runId}`)
      .then(resp => resp.json())
      .then(run => {
        dispatch({ type: "FETCH_DETAILED_RUN", payload: run });
        history.push("/runs/display");
      });
  };
}

export {
  loginUser,
  retrieveUser,
  signUp,
  fetchRuns,
  postRun,
  fetchDetailedRun
};
