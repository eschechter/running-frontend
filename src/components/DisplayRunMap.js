import React, { Component } from "react";

import WebMercatorViewport from "viewport-mercator-project";
import { StaticMap, Marker } from "react-map-gl";
import PolylineOverlay from "./PolylineOverlay";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import haversineSum from "../HelperFunctions/haversineSum";

import startLine from "../images/start-line.png";
import runMarker from "../images/run-marker.png";
import checkeredFlag from "../images/checkered-flag.png";

import moment from "moment";

import FinishRunForm from "./FinishRunForm";

import speedCalculator from "../HelperFunctions/speedCalculator";

import { postFriendRun } from "../actions";

import Button from "react-bootstrap/Button";

class DisplayRunMap extends Component {
  state = {
    viewport: {
      width: window.innerWidth * 0.97,
      height: window.innerHeight * 0.7,
      latitude: 40.6708,
      longitude: -73.9645,
      zoom: 8
    },
    numResizes: 0,
    formSubmitted: false
  };

  componentDidMount() {
    if (this.props.displayedRun.id) {
      const longitudes = this.props.displayedRun.coordinates.map(
        point => point.x
      );
      const latitudes = this.props.displayedRun.coordinates.map(
        point => point.y
      );

      const maxLong = Math.max(...longitudes);
      const minLong = Math.min(...longitudes);
      const maxLat = Math.max(...latitudes);
      const minLat = Math.min(...latitudes);

      const viewport = new WebMercatorViewport({
        width: window.innerWidth * 0.97,
        height: window.innerHeight * 0.7
      });
      const bound = viewport.fitBounds([[minLong, minLat], [maxLong, maxLat]], {
        padding: 20,
        offset: [0, -40]
      });
      this.setState({
        viewport: {
          ...this.state.viewport,
          latitude: bound.latitude,
          longitude: bound.longitude,
          zoom: bound.zoom
        }
      });
      window.addEventListener("resize", this.resizeHandler);
    } else {
      this.props.history.push("/runs");
    }
  }

  resizeHandler = _ => {
    this.setState({
      numResizes: this.state.numResizes + 1,
      viewport: {
        ...this.state.viewport,
        height: window.innerHeight * 0.7,
        width: window.innerWidth * 0.97
      }
    });
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeHandler);
  }

  render() {
    if (this.props.displayedRun.id) {
      const arrayMarkers = this.props.displayedRun.coordinates.map(point => [
        point.x,
        point.y
      ]);

      let markerComps = [];
      for (let i = 0; i < arrayMarkers.length; i++) {
        let image = runMarker;
        if (i === 0) {
          image = startLine;
        } else if (i === arrayMarkers.length - 1) {
          image = checkeredFlag;
        }
        markerComps.push(
          <Marker
            key={i}
            longitude={arrayMarkers[i][0]}
            latitude={arrayMarkers[i][1]}
            offsetLeft={-10}
            offsetTop={-10}
          >
            <img width="20px" height="20px" src={image} />
          </Marker>
        );
      }
      const duration = this.props.displayedRun.completed
        ? moment.duration(this.props.displayedRun.duration * 1000)
        : null;
      console.log(arrayMarkers);

      return (
        <>
          <br />
          {this.props.displayedRun.user_id === this.props.user.id ? (
            <>
              <h1>My Run</h1>
              <hr />
            </>
          ) : (
            <>
              <h1>{`${this.props.possibleFriend.name}'s Run`}</h1>
              <hr />
            </>
          )}

          <h2>Distance: {haversineSum(arrayMarkers)} miles</h2>
          <hr />

          {this.props.displayedRun.completed ? (
            <>
              <h2>{`Time to complete: ${duration.hours()} hours, ${duration.minutes()} minutes, ${duration.seconds()} seconds`}</h2>
              <hr />
              <h3>
                {`Speed: ${speedCalculator(
                  this.props.displayedRun.length,
                  this.props.displayedRun.duration
                )} mph`}
              </h3>
            </>
          ) : (
            <>
              <h2>Currently Uncompleted</h2>
              <hr />
              {this.props.displayedRun.user_id === this.props.user.id ? (
                <FinishRunForm />
              ) : null}
            </>
          )}
          {this.props.displayedRun.user_id !== this.props.user.id ? (
            <Button
              disabled={this.state.formSubmitted}
              onClick={_ => {
                this.setState({ formSubmitted: true });
                this.props.postRun(this.props.history);
              }}
            >
              Copy this run for yourself!
            </Button>
          ) : null}

          <br />
          <div className="outer-map-wrapper">
            <div className="inner-map-wrapper">
              <StaticMap
                {...this.state.viewport}
                mapOptions={{ style: "mapbox://styles/mapbox/streets-v10" }}
                mapboxApiAccessToken={process.env.REACT_APP_API_KEY}
              >
                {markerComps}
                <PolylineOverlay
                  key={this.state.numResizes}
                  points={arrayMarkers}
                />
              </StaticMap>
            </div>
          </div>
        </>
      );
    } else {
      return <h1>Please select a run to display</h1>;
    }
  }
}
function msp(state) {
  return {
    displayedRun: state.displayedRun,
    possibleFriend: state.selectedFriend,
    user: state.user
  };
}

function mdp(dispatch) {
  return {
    postRun: history => dispatch(postFriendRun(history))
  };
}

export default withRouter(
  connect(
    msp,
    mdp
  )(DisplayRunMap)
);
