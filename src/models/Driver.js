import mongoose from "mongoose";
var Schema = mongoose.Schema;

const driverSchema = new Schema({
  driverName: { type: String, required: true },
  shiftStart: { type: Date, required: true },
  shiftEnd: { type: Date, required: true },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});

const Driver = mongoose.model("Driver", driverSchema);

export default Driver;
