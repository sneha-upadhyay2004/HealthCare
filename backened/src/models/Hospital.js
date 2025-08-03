import mongoose from "mongoose";
import User from "./User.js"


const hospitalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  adminUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true, required: true },
});

const Hospital= mongoose.model("Hospital", hospitalSchema);
export default Hospital;

