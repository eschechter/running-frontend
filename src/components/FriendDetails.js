import React, { Component } from "react";

import { connect } from "react-redux";

import { withRouter, Route } from "react-router-dom";

import CompletedRunTable from "./CompletedRunTable";

class FriendDetails extends Component {
  state = {
    runs: []
  };

  componentDidUpdate(prevProps) {
    if (prevProps.user.id !== this.props.user.id) {
      this.setState({
        runs: this.props.friend.runs
      });
    }
  }

  componentDidMount() {
    if (this.props.user.id && this.props.friend) {
      this.setState({
        runs: this.props.friend.runs
      });
    } else {
      this.props.history.push("/runs/friends");
    }
  }
  render() {
    console.log(this.state);
    const completedRuns = this.state.runs.filter(run => run.completed);
    const pendingRuns = this.state.runs.filter(run => !run.completed);

    const pendingRunComps = pendingRuns.map(run => (
      <li>{`Length: ${run.length} miles`}</li>
    ));
    return (
      <>
        <h1>Friend details</h1>
        <ol>{pendingRunComps}</ol>
        <CompletedRunTable runs={completedRuns} />
      </>
    );
  }
}

function msp(state) {
  console.log(state);
  return {
    friend: state.selectedFriend,
    user: state.user
  };
}

export default withRouter(connect(msp)(FriendDetails));
