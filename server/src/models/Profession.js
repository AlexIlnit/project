import mongoose from "mongoose";

const ProfessionSchema = new mongoose.Schema({
  name: String,
  subjects: [String],
  interests: [String],
  specialties: [String],
  subjects: [String],
  qualification: [String],
  faculty: [String],
  interests: [String],

});
ProfessionSchema.index({ name: 1, city: 1 }, { unique: true });

export default mongoose.model("Profession", ProfessionSchema);