import mongoose from "mongoose";

const InstitutionSchema = new mongoose.Schema({
  name: String,
  city: String,

  address: String,
  website: String,
  contacts: String,
  image: String,
  ownerId: String,

  specialties: [String],
  subjects: [String],
  qualification: [String],
  faculty: [String],
  interests: [String],

});
InstitutionSchema.index({ name: 1, city: 1 }, { unique: true });

export default mongoose.model("Institution", InstitutionSchema);

