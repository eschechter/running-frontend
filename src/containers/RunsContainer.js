import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { fetchRuns } from "../actions";

class RunsContainer extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      this.props.fetchRuns(this.props.user.id);
    }
  }

  render() {
    console.log(this.props.runs);
    const runComps = this.props.runs.map(run => <li>{run.length}</li>);
    return (
      <>
        <h1>Welcome: {this.props.user.name}</h1>
        <ul>{runComps}</ul>
        <Route path="/runs/extra" render={() => <h1>Extra route</h1>} />
      </>
    );
  }
}

function msp(state) {
  return {
    user: state.user,
    runs: state.runs
  };
}

function mdp(dispatch) {
  return {
    fetchRuns: userId => fetchRuns(dispatch, userId)()
  };
}

export default connect(
  msp,
  mdp
)(RunsContainer);
