import React, { Component } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import PolylineOverlay from "./PolylineOverlay";
import { connect } from "react-redux";
import haversineSum from "../HelperFunctions/haversineSum";
import { postRun } from "../actions";

class NewRunMap extends Component {
  state = {
    viewport: {
      width: "100%",
      height: 400,
      latitude: 40.6708,
      longitude: -73.9645,
      zoom: 8
    }
  };

  render() {
    const markerComps = this.props.markers.map(longLat => (
      <Marker
        longitude={longLat[0]}
        latitude={longLat[1]}
        offsetLeft={-10}
        offsetTop={-10}
      >
        <img
          width="20px"
          height="20px"
          src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png"
        />
      </Marker>
    ));
    return (
      <>
        <h1>{haversineSum(this.props.markers)}</h1>
        <button onClick={this.props.post}>Add to backend</button>
        <ReactMapGL
          {...this.state.viewport}
          onClick={e => {
            console.log(e);
            this.props.addMarker(e.lngLat);
          }}
          mapOptions={{ style: "mapbox://styles/mapbox/streets-v10" }}
          onViewportChange={viewport => this.setState({ viewport })}
          mapboxApiAccessToken={process.env.REACT_APP_API_KEY}
        >
          {markerComps}
          <PolylineOverlay points={this.props.markers} />
        </ReactMapGL>
      </>
    );
  }
}

function mdp(dispatch) {
  return {
    addMarker: longLat =>
      dispatch({
        type: "ADD-MARKER",
        payload: longLat
      }),
    post: () =>
      dispatch({
        type: "POST"
      })
  };
}

function msp(state) {
  return {
    markers: state.makeRunMarkers
  };
}

export default connect(
  msp,
  mdp
)(NewRunMap);
