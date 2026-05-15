import mongoose from "mongoose";
import Institution from "./models/Institution.js";

await mongoose.connect("mongodb://127.0.0.1:27017/education");

await Institution.deleteMany();

await Institution.insertMany([
  {
    name: "БГУ",
    city: "Минск",
    specialties: ["программирование", "экономика"],
    subjects: ["математика", "информатика"],
    interests: ["техника", "наука"]
  },
  {
    name: "БНТУ",
    city: "Минск",
    specialties: ["инженерия", "машиностроение"],
    subjects: ["математика", "физика"],
    interests: ["техника"]
  },
  {
    name: "ГрГУ",
    city: "Гродно",
    specialties: ["педагогика", "филология"],
    subjects: ["язык", "литература"],
    interests: ["творчество"]
  }
]);

console.log("Данные добавлены 🚀");
process.exit();