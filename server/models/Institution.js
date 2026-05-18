import mongoose from "mongoose";
const InstitutionSchema = new mongoose.Schema({
  name: String,
  city: String,
  ownerId: String,
  specialties: [String],
  subjects: [String],
  interests: [String],
  faculty: [String],
  qualification: [String],
});

export default mongoose.model("Institution", InstitutionSchema);