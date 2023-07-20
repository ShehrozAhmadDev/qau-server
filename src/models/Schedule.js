import mongoose from "mongoose";
var Schema = mongoose.Schema;

const scheduleSchema = new Schema({
  name: { type: String, required: true },
  route: { type: Schema.Types.ObjectId, ref: "Route" },
  startTime: { type: Date },
  endTime: { type: Date },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

export default Schedule;
