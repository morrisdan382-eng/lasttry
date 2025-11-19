// backend/models/Room.js
import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brightness: { type: Number, default: 0 }, // 0-100%
    temperature: { type: Number, default: 25 }, // default temp
    status: { type: String, enum: ["on", "off"], default: "off" }
  },
  { timestamps: true }
);

export default mongoose.model("Room", roomSchema);
