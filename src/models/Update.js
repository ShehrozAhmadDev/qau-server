import mongoose from "mongoose";
var Schema = mongoose.Schema;

const updateSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});

const Update = mongoose.model("Update", updateSchema);

export default Update;
