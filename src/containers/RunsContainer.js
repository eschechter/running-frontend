import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, withRouter } from "react-router-dom";
import { fetchRuns } from "../actions";
import NewRunMap from "../components/NewRunMap";

class RunsContainer extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.user.id !== this.props.user.id) {
      this.props.fetchRuns(this.props.user.id);
    }
  }

  render() {
    console.log(this.props.runs);
    const runComps = this.props.runs.map(run => <li>{run.length}</li>);
    return (
      <>
        <Route path="/runs/new" render={() => <NewRunMap />} />
        <Route exact path="/runs/" render={() => runComps} />
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

export default withRouter(
  connect(
    msp,
    mdp
  )(RunsContainer)
);
