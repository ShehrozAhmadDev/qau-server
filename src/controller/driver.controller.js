import Driver from "../models/Driver.js";

// Create a new Driver
export const createDriver = async (req, res) => {
  try {
    const { name, contact, age } = req.body;
    const driver = new Driver({ name, contact, age });
    const newDriver = await driver.save();
    res.status(201).json(newDriver);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Drivers
export const getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific Driver by its ID
export const getDriverById = async (req, res) => {
  try {
    const { id } = req.params;
    const driver = await Driver.findById(id);
    if (!driver) {
      return res.status(404).json({ error: "Driver not found" });
    }
    res.status(200).json(driver);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a specific Driver by its ID
export const updateDriver = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, contact, age } = req.body;
    const updatedDriver = await Driver.findByIdAndUpdate(
      id,
      { name, contact, age },
      { new: true }
    );
    if (!updatedDriver) {
      return res.status(404).json({ error: "Driver not found" });
    }
    res.status(200).json(updatedDriver);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a specific Driver by its ID
export const deleteDriver = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDriver = await Driver.findByIdAndRemove(id);
    if (!deletedDriver) {
      return res.status(404).json({ error: "Driver not found" });
    }
    res.status(200).json({ message: "Driver deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
