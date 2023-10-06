import { useEffect, useState } from "react";

export const useGetLocation = () => {
  const [pos, setPos] = useState({ lat: 1.35, lng: 103.82 });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setPos({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  return pos;
};
