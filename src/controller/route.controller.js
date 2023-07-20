import Route from "../models/Route.js";

// Create a new Route
const createRoute = async (req, res) => {
  try {
    const { route, stops, color, createdBy } = req.body;
    const newRoute = new Route({ route, stops, color, createdBy });
    await newRoute.save();
    res.status(201).json(newRoute);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Routes
const getAllRoutes = async (req, res) => {
  try {
    const routes = await Route.find().populate("stops").populate("createdBy");
    res.status(200).json(routes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific Route by its ID
const getRouteById = async (req, res) => {
  try {
    const { id } = req.params;
    const route = await Route.findById(id)
      .populate("stops")
      .populate("createdBy");
    if (!route) {
      return res.status(404).json({ error: "Route not found" });
    }
    res.status(200).json(route);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a specific Route by its ID
const updateRoute = async (req, res) => {
  try {
    const { id } = req.params;
    const { route, stops, color, createdBy } = req.body;
    const updatedRoute = await Route.findByIdAndUpdate(
      id,
      { route, stops, color, createdBy },
      { new: true }
    )
      .populate("stops")
      .populate("createdBy");
    if (!updatedRoute) {
      return res.status(404).json({ error: "Route not found" });
    }
    res.status(200).json(updatedRoute);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a specific Route by its ID
const deleteRoute = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRoute = await Route.findByIdAndRemove(id);
    if (!deletedRoute) {
      return res.status(404).json({ error: "Route not found" });
    }
    res.status(200).json({ message: "Route deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createRoute, getAllRoutes, getRouteById, updateRoute, deleteRoute };
