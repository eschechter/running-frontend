import React from "react";
import { Line } from "react-chartjs-2";
import speedCalculator from "../HelperFunctions/speedCalculator";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { fetchDetailedRun } from "../actions";

function CompletedRunsChart(props) {
  const data = {
    labels: props.runs.map((_, index) => index + 1),
    datasets: [
      {
        label: "Speed in mph across runs",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: props.runs.map(run => speedCalculator(run.length, run.duration))
      }
    ]
  };
  return (
    <div>
      <h2>Completed Runs (click a point to see map)</h2>
      <Line
        onElementsClick={eles => {
          if (eles[0]) {
            const clickedRun = props.runs[eles[0]._index];
            props.fetchDetailedRun(props.history, clickedRun.id);
          }
        }}
        data={data}
      />
    </div>
  );
}

function mdp(dispatch) {
  return {
    fetchDetailedRun: (history, runId) =>
      dispatch(fetchDetailedRun(history, runId))
  };
}

export default withRouter(
  connect(
    null,
    mdp
  )(CompletedRunsChart)
);
