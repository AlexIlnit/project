import app from "./app";
import mongoose from "mongoose";

const PORT = 3001;

mongoose.connect("mongodb://127.0.0.1:27017/education")
  .then(() => {
    console.log("✅ MongoDB connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("❌ Mongo error:", err);
  });