import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true }, // ✅ new field
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: String },
  gender: { type: String },
  phone: { type: String },
  role: { type: String, enum: ["user", "hospital"], default: "user" },
  token: { type: String },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.generateToken = function () {
  return crypto.randomBytes(16).toString("hex");
};

const User = mongoose.model("User", userSchema);
export default User;




