import mongoose from "mongoose";
var Schema = mongoose.Schema;

const stopSchema = new Schema({
  stopName: { type: String, required: true },
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});

const Stop = mongoose.model("Stop", stopSchema);

export default Stop;
