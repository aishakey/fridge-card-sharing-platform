import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, index: true },
  email: { type: String, required: true, unique: true, index: true },
  password: {
    type: String,
    required: true,
    minLength: [6, "Password must be at least 6 characters long"],
    maxLength: [32, "Password must be no more than 32 characters long"],
  },
  profilePicture: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);
