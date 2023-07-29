import { Client } from "@googlemaps/google-maps-services-js";
import Route from "../models/Route.js";
const client = new Client({});
import { calculateDistance } from "../utils/calculateDistance.js"; // You need to implement the calculateDistance function

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

    let closestRoute = null;
    let closestStop = null;
    let minDistance = Infinity;

    // Iterate through each route and its stops
    routes.forEach((route) => {
      route.stops.forEach((stop) => {
        const distanceToDropoff = calculateDistance(
          dropoff.latitude,
          dropoff.longitude,
          stop.latitude,
          stop.longitude
        );

        // Check if this stop is closer than the previously found closest stop
        if (distanceToDropoff < minDistance) {
          closestRoute = route;
          closestStop = stop;
          minDistance = distanceToDropoff;
        }
      });
    });

    if (closestRoute && closestStop) {
      // Log the closest stop and route

      // Return the closest route to the frontend
      console.log(closestRoute);
      res.status(200).json({ closestRoute });
    } else {
      res.status(404).json({ error: "No route found with stops" });
    }
  } catch (error) {
    console.error("Error fetching routes or optimizing path:", error);
    res.status(500).json({ error: "Server error" });
  }
};
