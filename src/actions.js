function loginUser(dispatch, user, history) {
  return function() {
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
        console.log("data", data);
        if (data.message === "Invalid email or password")
          alert("invalid email or password");
        else {
          dispatch({ type: "LOGIN_USER", payload: data });
          localStorage.setItem("running-token", data.jwt);
          history.push("/runs");
        }
      });
  };
}

function retrieveUser(dispatch, token, history) {
  return function() {
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
          dispatch({ type: "RETRIEVE_USER", payload: user });
          history.push("/runs");
        }
      });
  };
}

function signUp(dispatch, user, history) {
  return function() {
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
        localStorage.setItem("running-token", data.jwt);
        dispatch({ type: "SIGN_UP_USER", payload: data });
        history.push("/runs");
      });
  };
}

export { loginUser, retrieveUser, signUp };
