function loginUser(user, history) {
  return function(dispatch, getState) {
    return fetch("http://localhost:3000/login", {
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
        console.log("getState", getState().runs);
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
    return fetch("http://localhost:3000/retrieve-user", {
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
        console.log("user", user);
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
  return function(dispatch, _) {
    return fetch("http://localhost:3000/sign-up", {
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
        console.log(data);

        history.push("/runs");
        localStorage.setItem("running-token", data.jwt);
        dispatch({ type: "SIGN_UP_USER", payload: data.user });
      });
  };
}

function fetchRuns(dispatch, userId) {
  return function(_, getState) {
    console.log("getState", getState);
    return fetch(`http://localhost:3000/users/${userId}/runs`)
      .then(resp => resp.json())
      .then(runs => {
        console.log(runs);
        dispatch({ type: "FETCH_RUNS", payload: runs });
      });
  };
}

function postRun(dispatch, runMarkers) {}

export { loginUser, retrieveUser, signUp, fetchRuns, postRun };
