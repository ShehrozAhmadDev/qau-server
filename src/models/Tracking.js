import mongoose from "mongoose";
var Schema = mongoose.Schema;

const trackingSchema = new Schema({
  tripId: { type: Schema.Types.ObjectId, ref: "Trip", required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

// Add a static method to find tracking information by tripId
trackingSchema.statics.findByTripId = function (tripId) {
  return this.findOne({ tripId }).exec();
};

// Add a static method to update tracking information by tripId
trackingSchema.statics.updateByTripId = function (tripId, latitude, longitude) {
  return this.findOneAndUpdate(
    { tripId },
    { latitude, longitude },
    { new: true }
  ).exec();
};

const Tracking = mongoose.model("Tracking", trackingSchema);

export default Tracking;
