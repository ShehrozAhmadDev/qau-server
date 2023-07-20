import mongoose from "mongoose";
var Schema = mongoose.Schema;

const tripSchema = new Schema({
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  plannedTrip: { type: Object },
});

const Trip = mongoose.model("Trip", tripSchema);

export default Trip;
