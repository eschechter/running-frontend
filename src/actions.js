import haversineSum from "./HelperFunctions/haversineSum";

function loginUser(user, history, alertCallback) {
  return function(dispatch) {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
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
        if (data.message === "Invalid email or password") alertCallback();
        else {
          history.push("/homepage");
          dispatch({ type: "LOGIN_USER", payload: data.user });
          localStorage.setItem("running-token", data.jwt);
        }
      })
      .catch(_ => {
        alert("Could not connect to server");
      });
  };
}

function retrieveUser(token, history) {
  return function(dispatch) {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/retrieve-user`, {
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
            document.location.href === process.env.REACT_APP_FRONTEND_URL ||
            document.location.href ===
              `${process.env.REACT_APP_FRONTEND_URL}/sign-up`
          ) {
            history.push("/homepage");
          }
          dispatch({ type: "RETRIEVE_USER", payload: user });
        }
      })
      .catch(_ => {
        alert("Could not connect to server");
        history.push("/");
      });
  };
}

function signUp(user, history, alertCallback) {
  return function(dispatch) {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/sign-up`, {
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
        console.log("data", data);

        if (data.status === 422) {
          alertCallback();
        } else {
          history.push("/homepage");
          localStorage.setItem("running-token", data.jwt);
          dispatch({ type: "SIGN_UP_USER", payload: data.user });
        }
      })
      .catch(_ => alertCallback());
  };
}

function fetchRuns() {
  return function(dispatch, getState) {
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/users/${getState().user.id}/runs`
    )
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
      fetch(`${process.env.REACT_APP_BACKEND_URL}/runs`, {
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
          dispatch({ type: "CLEAR_MARKERS" });
          dispatch({ type: "ADD_RUN", payload: run });
          dispatch({ type: "FETCH_DETAILED_RUN", payload: run });
          history.push("/runs/display");
        });
    }
  };
}

function postFriendRun(history) {
  return function(dispatch, getState) {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/runs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        run: {
          user_id: getState().user.id,
          coordinates: getState().displayedRun.coordinates.map(point => {
            return { longitude: point.x, latitude: point.y };
          }),
          length: getState().displayedRun.length
        }
      })
    })
      .then(resp => resp.json())
      .then(run => {
        dispatch({ type: "ADD_RUN", payload: run });
        dispatch({ type: "FETCH_DETAILED_RUN", payload: run });
        history.push("/runs/display");
      });
  };
}
function fetchRequestSenders() {
  return function(dispatch, getState) {
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/users/${
        getState().user.id
      }/request-senders`
    )
      .then(resp => resp.json())
      .then(users =>
        dispatch({ type: "FETCH_REQUEST_SENDERS", payload: users })
      );
  };
}

function fetchRequestReceivers() {
  return function(dispatch, getState) {
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/users/${
        getState().user.id
      }/request-receivers`
    )
      .then(resp => resp.json())
      .then(users =>
        dispatch({ type: "FETCH_REQUEST_RECEIVERS", payload: users })
      );
  };
}

function fetchFriends() {
  return function(dispatch, getState) {
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/users/${getState().user.id}/friends`
    )
      .then(resp => resp.json())
      .then(users => dispatch({ type: "FETCH_FRIENDS", payload: users }));
  };
}

function fetchDetailedRun(history, runId) {
  return function(dispatch) {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/runs/${runId}`)
      .then(resp => resp.json())
      .then(run => {
        dispatch({ type: "FETCH_DETAILED_RUN", payload: run });
        history.push(`/runs/display/${runId}`);
      });
  };
}

function completeRun(duration) {
  return function(dispatch, getState) {
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/runs/${getState().displayedRun.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accepts: "application/json"
        },
        body: JSON.stringify({
          duration
        })
      }
    )
      .then(resp => resp.json())
      .then(run => {
        dispatch({ type: "COMPLETE_RUN", payload: run.duration });
        dispatch({ type: "UPDATE_RUN", payload: run });
      });
  };
}

function searchUsers(searchTerm) {
  return function(dispatch, getState) {
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/users/${
        getState().user.id
      }/search/${searchTerm}`
    )
      .then(resp => resp.json())
      .then(friends => {
        dispatch({ type: "SEARCH_USERS", payload: friends });
      });
  };
}

function requestFriend(friendUserId) {
  return function(dispatch, getState) {
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/users/request/${
        getState().user.id
      }/${friendUserId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accepts: "application/json"
        }
      }
    )
      .then(resp => resp.json())
      .then(user => {
        dispatch({
          type: "REMOVE_USER_FROM_SEARCH",
          payload: user
        });
        dispatch({
          type: "ADD_USER_TO_REQUESTED",
          payload: user
        });
        dispatch({ type: "ENABLE_BUTTONS" });
      });
  };
}

function acceptFriendRequest(friendUserId) {
  return function(dispatch, getState) {
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/users/complete_request/${
        getState().user.id
      }/${friendUserId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accepts: "application/json"
        }
      }
    )
      .then(resp => resp.json())
      .then(user => {
        dispatch({
          type: "REMOVE_USER_FROM_SENDERS",
          payload: user
        });
        dispatch({ type: "ENABLE_BUTTONS" });
      });
  };
}

export {
  loginUser,
  retrieveUser,
  signUp,
  fetchRuns,
  postRun,
  fetchDetailedRun,
  completeRun,
  fetchRequestSenders,
  fetchRequestReceivers,
  fetchFriends,
  searchUsers,
  requestFriend,
  acceptFriendRequest,
  postFriendRun
};
