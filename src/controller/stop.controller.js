import Stop from "../models/Stop.js";

// Create a new Stop
export const createStop = async (req, res) => {
  try {
    const { stopName, latitude, longitude } = req.body;
    const stop = new Stop({ stopName, latitude, longitude });
    const newStop = await stop.save();
    res.status(201).json(newStop);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Stops
export const getAllStops = async (req, res) => {
  try {
    const stops = await Stop.find();
    res.status(200).json(stops);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific Stop by its ID
export const getStopById = async (req, res) => {
  try {
    const { id } = req.params;
    const stop = await Stop.findById(id);
    if (!stop) {
      return res.status(404).json({ error: "Stop not found" });
    }
    res.status(200).json(stop);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a specific Stop by its ID
export const updateStop = async (req, res) => {
  try {
    const { id } = req.params;
    const { stopName, latitude, longitude } = req.body;
    const updatedStop = await Stop.findByIdAndUpdate(
      id,
      { stopName, latitude, longitude },
      { new: true }
    );
    if (!updatedStop) {
      return res.status(404).json({ error: "Stop not found" });
    }
    res.status(200).json(updatedStop);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a specific Stop by its ID
export const deleteStop = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStop = await Stop.findByIdAndRemove(id);
    if (!deletedStop) {
      return res.status(404).json({ error: "Stop not found" });
    }
    res.status(200).json({ message: "Stop deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
