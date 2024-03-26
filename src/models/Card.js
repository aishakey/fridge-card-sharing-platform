import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  recipients: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  ],
  sentTime: { type: Date, required: true, default: Date.now },
  image: { type: String, required: true },
  text: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

export const Card = mongoose.models?.Card || mongoose.model("Card", cardSchema);
