import mongoose from "mongoose";
var Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  regNo: { type: String },
  department: { type: String },
  phone: { type: String },
  scheduleId: { type: Schema.Types.ObjectId, ref: "Schedule" },
  role: {
    type: String,
    default: "User",
    enum: ["User", "Admin"],
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
