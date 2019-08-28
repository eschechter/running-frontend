import React from "react";
import "./App.css";
import { withRouter, Route } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
  return (
    <div className="App">
      <Route path="/login" render={() => <Login />} />
      <Route path="/sign-up" render={() => <SignUp />} />
    </div>
  );
}

export default App;
