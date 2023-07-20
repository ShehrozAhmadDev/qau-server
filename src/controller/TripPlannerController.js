const { Client } = require('@googlemaps/google-maps-services-js');

const client = new Client({});

// Function to plan a trip using the Google Maps Directions API
exports.planTrip = async (req, res, next) => {
  try {
    const { origin, destination } = req.body;

    const response = await client.directions({
      params: {
        origin,
        destination,
        key: 'YOUR_API_KEY',
      },
    });

    const routes = response.data.routes;
    // You can now process the routes and extract the necessary information to return to the client

    res.json(routes);
  } catch (error) {
    next(error);
  }
};
