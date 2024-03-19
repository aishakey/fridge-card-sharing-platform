import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, index: true },
  email: { type: String, required: true, unique: true, index: true },
  password: {
    type: String,
    required: function () {
      return this.provider === "local";
    },
    minLength: [6, "Password must be at least 6 characters long"],
  },
  provider: { type: String, required: true, default: "local" },
  profilePicture: String,
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.models?.User || mongoose.model("User", userSchema);
