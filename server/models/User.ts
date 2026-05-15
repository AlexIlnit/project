import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  preferences: Object,
  saved: [String]
});