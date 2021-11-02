import React, { useState, useEffect } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";

const locations = [
  {
    name: "UCLA",
    lat: 34.12538,
    lng: -118.4719,
  },
  {
    name: "My home",
    lat: 33.80599,
    lng: -117.96576,
  },
];
function Map() {
  const [setlocation, setSlectLocation] = useState(null);

  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 34.12538, lng: -118.4719 }}
    >
      {locations.map((location) => {
        return (
          <Marker
            position={{
              lat: location.lat,
              lng: location.lng,
            }}
            onClick={() => {
              setSlectLocation(location);
            }}
          />
        );
      })}
      {setlocation && (
        <InfoWindow
          position={{
            lat: setlocation.lat,
            lng: setlocation.lng,
          }}
          onCloseClick={() => {
            setSlectLocation(null);
          }}
        >
          <div>{setlocation.name}</div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));
const API_KEY = "AIzaSyC6tYJVsPiub_eKzN5_0oDqKOXn3lNXGoA";

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${API_KEY}`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}
