// import express, { Request, Response } from "express";
// import { getRecommendations } from "../../services/recommend.service.ts";

// const router = express.Router();

// router.post("/", async (req: Request, res: Response) => {
//   console.log("\n==============================");
//   console.log("🚀 NEW /recommend REQUEST");
//   console.log("==============================");

//   try {
//     // ===============================
//     // 1. RAW REQUEST
//     // ===============================
//     console.log("📩 RAW BODY FROM FRONTEND:");
//     console.log(JSON.stringify(req.body, null, 2));

//     console.log("\n📊 TYPES:");
//     console.log("interests:", typeof req.body.interests, req.body.interests);
//     console.log("subjects:", typeof req.body.subjects, req.body.subjects);
//     console.log("city:", typeof req.body.city, req.body.city);

//     // ===============================
//     // 2. CALL SERVICE
//     // ===============================
//     console.log("\n⚙️ CALLING getRecommendations...\n");

//     // const result = await getRecommendations(req.body);
// console.log("➡ BEFORE SERVICE");

// let result;

// try {
//   result = await getRecommendations(req.body);
//   console.log("➡ AFTER SERVICE");
// } catch (e) {
//   console.log("💥 SERVICE CRASH:");
//   console.error(e);
//   throw e;
// }
//     // ===============================
//     // 3. SERVICE RESULT
//     // ===============================
//     console.log("\n==============================");
//     console.log("📦 RESULT FROM SERVICE");
//     console.log("==============================");

//     console.log("🎯 PROFESSIONS COUNT:", result.professions?.length || 0);
//     console.log("🏫 INSTITUTIONS COUNT:", result.institutions?.length || 0);

//     console.log("\n🏫 INSTITUTIONS:");
//     result.institutions?.forEach((i: any, idx: number) => {
//       console.log(
//         `${idx + 1}. ${i.name} | city=${i.city} | score=${i.score}`
//       );
//     });

//     console.log("\n==============================\n");

//     // ===============================
//     // 4. RESPONSE TO FRONTEND
//     // ===============================
//     return res.json(result);

//   } catch (error: any) {
//     // ===============================
//     // ERROR TRACE
//     // ===============================
//     console.log("\n❌ ERROR OCCURED:");
//     console.error(error);

//     console.log("\n📍 STACK:");
//     console.log(error.stack);

//     return res.status(500).json({
//       error: "Recommendation failed",
//       message: error.message,
//     });
//   }
// });

// export default router;

import express from "express";
import { recommendController } from "../controllers/recommend.controller.js";

const router = express.Router();

router.post("/", recommendController);

export default router;