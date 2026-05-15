import express from "express";
import cors from "cors";
import recommendRoutes from "./routes/recommend.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/recommend", recommendRoutes);

export default app;