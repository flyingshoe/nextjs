"use client";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { LinearProgress } from "@mui/material";
import { ReactElement, useEffect, useRef } from "react";

type MapProps = {
  center: google.maps.LatLngLiteral;
  zoom: number;
};

function MyMapComponent({ center, zoom }: MapProps) {
  const ref = useRef();

  useEffect(() => {
    new window.google.maps.Map(ref.current, {
      center,
      zoom,
    });
  }, []);

  return <div ref={ref} id="map" style={{ height: "calc(100vh - 68.5px)" }} />;
}

const render = (status: Status): ReactElement => {
  if (status === Status.FAILURE) {
    return <div>Error loading Google maps</div>;
  }
  return <LinearProgress />;
};

export default function GoogleMaps() {
  const center = { lat: 1.35, lng: 103.82 };
  const zoom = 11.5;

  return (
    <Wrapper
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
      render={render}
    >
      <MyMapComponent center={center} zoom={zoom} />
    </Wrapper>
  );
}
