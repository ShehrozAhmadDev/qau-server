import mongoose from "mongoose";
var Schema = mongoose.Schema;
const busScheduleSchema = new Schema({
  licensePlate: { type: String, required: true },
  schedule: { type: Schema.Types.ObjectId, ref: "Schedule" },
  driverId: { type: Schema.Types.ObjectId, ref: "Driver" },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});

const BusSchedule = mongoose.model("BusSchedule", busScheduleSchema);

export default BusSchedule;
