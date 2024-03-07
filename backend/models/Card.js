import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  sentTime: { type: Date, required: true, default: Date.now },
  image: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Card", cardSchema);
