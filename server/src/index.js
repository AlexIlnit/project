import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Institution from "./models/Institution.js";
import recommendRoutes from "./routes/recommend.routes.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import User from "./models/User.js";
import bcrypt from "bcryptjs";

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

const app = express();

app.use(cors());
app.use(express.json());
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });
app.use("/uploads", express.static("uploads"));

// =========================
// DB
// =========================
mongoose.connect("mongodb://127.0.0.1:27017/education")
  .then(() => console.log("🟢 Mongo connected"))
  .catch(err => console.error("🔴 Mongo error:", err));

// =========================
// ROUTES
// =========================
app.get("/", (req, res) => {
  res.send("SERVER OK 🚀");
});

// 🔥 ВАЖНО
app.use("/recommend", recommendRoutes);

// =========================
// GET ALL
// =========================
app.get("/institutions", async (req, res) => {
  try {
    const data = await Institution.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.post("/institutions", upload.single("image"), async (req, res) => {
  try {
    const body = req.body;

    const imageUrl = req.file
      ? `http://localhost:3001/uploads/${req.file.filename}`
      : "";

    const safeCreate = {
      ...body,
      ownerId: body.ownerId,
      image: imageUrl,

      faculty: (body.faculty || "").split(",").map(s => s.trim()).filter(Boolean),
      qualification: (body.qualification || "").split(",").map(s => s.trim()).filter(Boolean),
      specialties: (body.specialties || "").split(",").map(s => s.trim()).filter(Boolean),
      subjects: (body.subjects || "").split(",").map(s => s.trim()).filter(Boolean),
      interests: (body.interests || "").split(",").map(s => s.trim()).filter(Boolean),
    };

    const created = await Institution.create(safeCreate);

    res.json(created);
  } catch (err) {
    console.error("CREATE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// =========================
// UPDATE
// =========================
app.put("/institutions/:id", upload.single("image"), async (req, res) => {
  try {
    const body = req.body;

    const updatedData = {
      ...body,
      faculty: body.faculty?.split(",").map(s => s.trim()) || [],
      qualification: body.qualification?.split(",").map(s => s.trim()) || [],
    };

    if (req.file) {
      updatedData.image = `http://localhost:3001/uploads/${req.file.filename}`;
    }

    const updated = await Institution.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { returnDocument: "after" }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =========================
// DELETE
// =========================
app.delete("/institutions/:id", async (req, res) => {
  try {
    await Institution.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, "0.0.0.0", () => {
  console.log("🔥 Server running on 3001");
});
// REGISTER
app.post("/register", async (req, res) => {

  try {

    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).json({
        message: "Пользователь уже существует"
      });
    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      approved: false,
      role: "user"
    });

    res.json({
      message: "Пользователь создан"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Ошибка сервера"
    });
  }
});
// =========================
// LOGIN
// =========================
app.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Неверный email или пароль"
      });
    }

    // CHECK PASSWORD
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Неверный email или пароль"
      });
    }

    res.json({
      token: "logged",
      user
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Ошибка сервера"
    });
  }
});
// =========================
// GET USERS
// =========================
app.get("/users", async (req, res) => {

  try {

    const users = await User.find();

    res.json(users);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Ошибка сервера"
    });
  }
});
// =========================
// DELETE USER
// =========================
app.delete("/users/:id", async (req, res) => {
  try {

    await User.findByIdAndDelete(
      req.params.id
    );

    res.json({ ok: true });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});
// =========================
// TOGGLE ACCESS
// =========================
app.put("/users/:id/access", async (req, res) => {
  try {

    const user = await User.findById(req.params.id);

    user.approved = !user.approved;

    await user.save();

    res.json(user);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});
// UPDATE USER
app.put("/users/:id", async (req, res) => {
  try {

    const updated = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: "after" }
    );

    res.json(updated);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});