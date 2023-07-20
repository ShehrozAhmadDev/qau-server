const express = require('express');
const router = express.Router();

const trackingController = require('../controllers/trackingController');

// Route to get tracking information for a trip
router.get('/tracking/:tripId', trackingController.getTrackingInfo);

// Route to update tracking information for a trip
router.post('/tracking/:tripId', trackingController.updateTrackingInfo);

module.exports = router;
