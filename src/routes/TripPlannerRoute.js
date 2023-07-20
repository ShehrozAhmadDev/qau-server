const express = require('express');
const router = express.Router();

const tripPlanningController = require('../controllers/tripPlanningController');

// Route to plan a trip
router.post('/tripplanning', tripPlanningController.planTrip);

module.exports = router;
