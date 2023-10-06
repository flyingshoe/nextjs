"use client";
import { useGetLocation } from "@/hooks";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { LinearProgress } from "@mui/material";
import React, { ReactElement, useEffect, useRef, useState } from "react";

type MapProps = {
  center: google.maps.LatLngLiteral;
  zoom: number;
};

function MyMapComponent({ center, zoom }: MapProps) {
  const ref: any = useRef(null);
  const { lat, lng } = useGetLocation();
  // Basic map render
  // useEffect(() => {
  //   const map = new window.google.maps.Map(ref.current, {
  //     center,
  //     zoom,
  //   });
  // }, []);

  // render map based on position
  useEffect(() => {
    const map = new window.google.maps.Map(ref.current, {
      center,
      zoom,
    });

    console.log("lat, lng", lat, lng);
    const marker = new window.google.maps.Marker({
      position: { lat, lng },
      map,
      title: "Uluru (Ayers Rock)",
    });
    marker.addListener("click", () => {
      new window.google.maps.InfoWindow({
        content: "address here",
        ariaLabel: "Uluru",
      }).open({
        anchor: marker,
        map,
      });
    });
    // marker.setOptions({ position: { lat: 1.36, lng: 103.92 } });
  }, [lat, lng]);

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
