const Tracking = require('../models/Tracking');

// Get tracking information for a trip
exports.getTrackingInfo = async (req, res, next) => {
  try {
    const tripId = req.params.tripId;
    const trackingInfo = await Tracking.findOne({ tripId });
    if (!trackingInfo) {
      return res.status(404).json({ message: 'Tracking information not found' });
    }
    res.json(trackingInfo);
  } catch (error) {
    next(error);
  }
};

// Update tracking information for a trip
exports.updateTrackingInfo = async (req, res, next) => {
  try {
    const tripId = req.params.tripId;
    const { latitude, longitude } = req.body;

    let trackingInfo = await Tracking.findOne({ tripId });
    if (!trackingInfo) {
      trackingInfo = new Tracking({ tripId, latitude, longitude });
    } else {
      trackingInfo.latitude = latitude;
      trackingInfo.longitude = longitude;
    }
    await trackingInfo.save();

    res.json({ message: 'Tracking information updated successfully' });
  } catch (error) {
    next(error);
  }
};
