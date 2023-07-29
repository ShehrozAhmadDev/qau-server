import mongoose from "mongoose";
var Schema = mongoose.Schema;

const driverSchema = new Schema({
  name: { type: String, required: true },
  contact: { type: String },
  age: { type: Number },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});

const Driver = mongoose.model("Driver", driverSchema);

export default Driver;
