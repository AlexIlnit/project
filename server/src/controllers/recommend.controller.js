import { getRecommendations } from "../services/recommend.service.js";

export const recommendController = async (req, res) => {
  console.log("\n====================");
  console.log("🚀 REQUEST /recommend");
  console.log("====================");

  try {
    const body = req.body ?? {};

    const interests = Array.isArray(body.interests) ? body.interests : [];
    const subjects = Array.isArray(body.subjects) ? body.subjects : [];
    const city = typeof body.city === "string" ? body.city : "";

    console.log("📩 BODY:", body);
    console.log("📊 PARSED:", { interests, subjects, city });

    const result = await getRecommendations({
      interests,
      subjects,
      city,
    });

    if (!result) {
      console.log("❌ No result from service");
      return res.status(500).json({ error: "No result" });
    }

    console.log("📦 RESULT OK");
    console.log("professions:", result.professions?.length || 0);
    console.log("institutions:", result.institutions?.length || 0);

    return res.json(result);

  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));

    console.error("❌ CONTROLLER ERROR:");
    console.error(error.message);
    console.error(error.stack);

    return res.status(500).json({
      error: error.message,
    });
  }
};