import { Client } from "@googlemaps/google-maps-services-js";
import Route from "../models/Route.js";
const client = new Client({});
import { nearestNeighborTSP } from "../utils/routeOptimizer.js";
import axios from "axios";
// Function to plan a trip using the Google Maps Directions API
export const planTrip = async (req, res, next) => {
  try {
    const { origin, destination } = req.body;

    const response = await client.directions({
      params: {
        origin,
        destination,
        key: "AIzaSyC8sfL4qz3H4hOTb5azUcQKVig9h87nFW0",
      },
    });

    const routes = response.data.routes;
    res.json(routes);
  } catch (error) {
    next(error);
  }
};

export const generateOptimizePath = async (req, res, next) => {
  try {
    const { pickup, dropoff } = req.body;

    // Fetch all routes from the database
    const routes = await Route.find({}).populate("stops");
    console.log(routes);

    // Combine pickup and dropoff with start and end points of each route
    const waypoints = routes.reduce(
      (acc, route) => {
        acc.push({
          latitude: route.stops[0].latitude,
          longitude: route.stops[0].longitude,
        }); // Start point of the route
        acc.push({
          latitude: route.stops[route.stops.length - 1].latitude,
          longitude: route.stops[route.stops.length - 1].longitude,
        }); // End point of the route
        return acc;
      },
      [pickup, dropoff]
    );

    const optimizedPath = nearestNeighborTSP(waypoints, pickup);

    const googleApiKey = "AIzaSyC8sfL4qz3H4hOTb5azUcQKVig9h87nFW0";
    const waypointCoordinates = optimizedPath
      .map((point) => `${point.latitude},${point.longitude}`)
      .join("|");

    const apiUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${pickup.latitude},${pickup.longitude}&destination=${dropoff.latitude},${dropoff.longitude}&waypoints=optimize:true|${waypointCoordinates}&key=${googleApiKey}`;

    const response = await axios.get(apiUrl);

    const legs = response.data.routes[0].legs;
    const optimizedPathDetails = legs.map((leg) => {
      return {
        latitude: leg.start_location.lat,
        longitude: leg.start_location.lng,
        address: leg.start_address,
      };
    });
    optimizedPathDetails.push({
      latitude: dropoff.latitude,
      longitude: dropoff.longitude,
      address: legs[legs.length - 1].end_address,
    });
    console.log("Optimize Path", optimizedPathDetails);
    res.json({ optimizedPath: optimizedPathDetails });
  } catch (error) {
    console.error("Error fetching routes or optimizing path:", error);
    res.status(500).json({ error: "Server error" });
  }
};
