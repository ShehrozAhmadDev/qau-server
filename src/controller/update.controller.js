import Update from "../models/Update.js";

// Create a new Update
const createUpdate = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newUpdate = new Update({ title, description });
    await newUpdate.save();
    res.status(201).json(newUpdate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Updates
const getAllUpdates = async (req, res) => {
  try {
    const updates = await Update.find();
    res.status(200).json(updates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific Update by its ID
const getUpdateById = async (req, res) => {
  try {
    const { id } = req.params;
    const update = await Update.findById(id);
    if (!update) {
      return res.status(404).json({ error: "Update not found" });
    }
    res.status(200).json(update);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a specific Update by its ID
const updateUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const updatedUpdate = await Update.findByIdAndUpdate(
      id,
      { title, description, updatedAt: Date.now() },
      { new: true }
    );
    if (!updatedUpdate) {
      return res.status(404).json({ error: "Update not found" });
    }
    res.status(200).json(updatedUpdate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a specific Update by its ID
const deleteUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUpdate = await Update.findByIdAndRemove(id);
    if (!deletedUpdate) {
      return res.status(404).json({ error: "Update not found" });
    }
    res.status(200).json({ message: "Update deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  createUpdate,
  getAllUpdates,
  getUpdateById,
  updateUpdate,
  deleteUpdate,
};
