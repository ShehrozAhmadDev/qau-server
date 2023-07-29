// Assuming you're using a library like geolib, but you can implement your own distance calculation function
import geolib from "geolib";

export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  return geolib.getDistance(
    { latitude: lat1, longitude: lon1 },
    { latitude: lat2, longitude: lon2 }
  );
};
