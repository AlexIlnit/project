import Institution from "../models/Institution.js";
import Profession from "../models/Profession.js";

const normalize = (s = "") =>
  String(s).toLowerCase().trim().replace(/\s+/g, " ");

// ===============================
// SCORE HELPER
// ===============================
function scoreMatch(userArr = [], dbArr = []) {
  if (!userArr.length || !dbArr.length) return 0;

  let hits = 0;

  for (const u of userArr) {
    for (const d of dbArr) {
      if (u.includes(d) || d.includes(u)) {
        hits++;
      }
    }
  }

  return hits / userArr.length;
}

// ===============================
// MAIN ENGINE
// ===============================
export async function getRecommendations(userData = {}) {
  console.log("⚙️ SERVICE START");

  const professions = await Profession.find();
  const institutions = await Institution.find();

  const user = {
    subjects: (userData.subjects || []).map(normalize),
    interests: (userData.interests || []).map(normalize),
    city: normalize(userData.city || "")
  };

  const noFilters =
    !user.city &&
    user.subjects.length === 0 &&
    user.interests.length === 0;

  console.log("USER:", user);
  console.log("NO FILTERS:", noFilters);

  // ===============================
  // PROFESSIONS (твоя сортировка)
  // ===============================
  const professionResults = professions.map((p) => {
    const subjects = (p.subjects || []).map(normalize);
    const interests = (p.interests || []).map(normalize);

    const score =
      scoreMatch(user.subjects, subjects) * 0.5 +
      scoreMatch(user.interests, interests) * 0.5;

    return {
      ...p.toObject(),
      score: noFilters ? 1 : score
    };
  });

  // ===============================
  // INSTITUTIONS (твоя логика + сортировка)
  // ===============================
  const institutionResults = institutions.map((inst) => {
    const city = normalize(inst.city);
    const subjects = (inst.subjects || []).map(normalize);
    const interests = (inst.interests || []).map(normalize);

    // 🔥 ЕСЛИ НЕТ ФИЛЬТРОВ → ВСЕ ВУЗЫ
    if (noFilters) {
      return {
        ...inst.toObject(),
        score: 1
      };
    }

    const cityScore = user.city ? (city === user.city ? 1 : 0) : 0;

    const subjectScore = scoreMatch(user.subjects, subjects);
    const interestScore = scoreMatch(user.interests, interests);

    const score =
      cityScore * 0.5 +
      subjectScore * 0.3 +
      interestScore * 0.2;

    return {
      ...inst.toObject(),
      score
    };
  });

  // ===============================
  // SORT (ВОТ ТВОЯ СОРТИРОВКА)
  // ===============================
  return {
    professions: professionResults.sort((a, b) => b.score - a.score),
    institutions: institutionResults.sort((a, b) => b.score - a.score)
  };
}