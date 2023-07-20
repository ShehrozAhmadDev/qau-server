import mongoose from "mongoose";
var Schema = mongoose.Schema;

const routeSchema = new Schema({
  route: { type: String },
  stops: [{ type: Schema.Types.ObjectId, ref: "Stop" }],
  color: { type: String, default: "green" },
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

const Route = mongoose.model("Route", routeSchema);

export default Route;
