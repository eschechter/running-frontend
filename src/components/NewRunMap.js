import React, { Component } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import PolylineOverlay from "./PolylineOverlay";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import haversineSum from "../HelperFunctions/haversineSum";
import { postRun } from "../actions";
import startLine from "../images/start-line.png";
import runMarker from "../images/run-marker.png";

import Button from "react-bootstrap/Button";

class NewRunMap extends Component {
  state = {
    viewport: {
      width: "99%",
      height: "70%",
      latitude: 40.6708,
      longitude: -73.9645,
      zoom: 8
    },
    numResizes: 0
  };

  componentDidMount() {
    window.addEventListener("resize", this.resizeHandler);
    this.resizeHandler();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeHandler);
  }

  resizeHandler = () => {
    this.viewportChangeHandler({
      width: window.innerWidth * 0.99,
      height: window.innerHeight * 0.7
    });
    this.setState({
      numResizes: this.state.numResizes + 1
    });
  };

  viewportChangeHandler(viewport) {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    });
  }

  render() {
    console.log(this.props.markers);
    let markerComps = [];

    for (let i = 0; i < this.props.markers.length; i++) {
      markerComps.push(
        <Marker
          key={i}
          longitude={this.props.markers[i][0]}
          latitude={this.props.markers[i][1]}
          offsetLeft={-10}
          offsetTop={-10}
        >
          <img
            width="20px"
            height="20px"
            src={i === 0 ? startLine : runMarker}
          />
        </Marker>
      );
    }
    return (
      <>
        <h1>Distance: {haversineSum(this.props.markers)} miles</h1>
        <Button onClick={_ => this.props.postRun(this.props.history)}>
          Save Run
        </Button>
        {this.props.markers.length > 0 ? (
          <Button onClick={_ => this.props.removeMarker()}>
            Remove last point
          </Button>
        ) : null}

        <div className="outer-map-wrapper">
          <div className="inner-map-wrapper">
            <ReactMapGL
              {...this.state.viewport}
              onClick={e => {
                this.props.addMarker(e.lngLat);
              }}
              mapOptions={{ style: "mapbox://styles/mapbox/streets-v10" }}
              onViewportChange={viewport =>
                this.viewportChangeHandler(viewport)
              }
              mapboxApiAccessToken={process.env.REACT_APP_API_KEY}
            >
              {markerComps}
              <PolylineOverlay
                key={this.state.numResizes}
                points={this.props.markers}
              />
            </ReactMapGL>
          </div>
        </div>
      </>
    );
  }
}

function mdp(dispatch) {
  return {
    addMarker: longLat =>
      dispatch({
        type: "ADD_MARKER",
        payload: longLat
      }),
    removeMarker: () => dispatch({ type: "REMOVE_MARKER" }),
    postRun: history => dispatch(postRun(history))
  };
}

function msp(state) {
  return {
    markers: state.makeRunMarkers
  };
}

export default withRouter(
  connect(
    msp,
    mdp
  )(NewRunMap)
);
