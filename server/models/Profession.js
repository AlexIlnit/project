import mongoose from "mongoose";

const ProfessionSchema = new mongoose.Schema({
  name: String,
  subjects: [String],
  interests: [String],
  traits: [String], // 👈 ВАЖНО
  description: String
});

export default mongoose.model("Profession", ProfessionSchema);