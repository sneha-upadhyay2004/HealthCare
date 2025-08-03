
import mongoose from "mongoose";
// import  Hospital  from "./Hospital";
// import user from "./User";

const emergencySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  // Prefilled User Info (Self Emergencies Only)
  // name: String,
  // email: String,
  // phone: String,
  // age: Number,
  // gender: String,
  for: { type: String, enum: ["self", "others"], required: true },
  location: {
    coordinates: { type: [Number], required: true }, // [lng, lat]
    address: { type: String, required: true },
  },
 image: {
    public_id: { type: String },
    url: { type: String },
  },
 helpedBy: {
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
},
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Emergency", emergencySchema);
