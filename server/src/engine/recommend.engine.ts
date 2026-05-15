import Profession from "../models/Profession.js";
import Institution from "../models/Institution.js";

// ===============================
// 1. TYPES
// ===============================
export type UserData = {
  subjects?: string[];
  interests?: string[];
  city?: string;
};

// ===============================
// 2. NORMALIZATION
// ===============================
const normalize = (s: any) =>
  String(s || "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");

// ===============================
// 3. CHECK IF EMPTY USER
// ===============================
function isEmptyUser(user: Required<UserData>) {
  return (
    user.city === "" &&
    user.subjects.length === 0 &&
    user.interests.length === 0
  );
}

// ===============================
// 4. MATCH SCORE
// ===============================
function scoreMatch(userArr: string[], dbArr: string[]) {
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
// 5. MAIN ENGINE
// ===============================
export async function getRecommendations(userData: UserData) {
  console.log("\n⚙️ ENGINE START");
  console.log("INPUT:", userData);

  const user = {
    subjects: (userData.subjects || []).map(normalize),
    interests: (userData.interests || []).map(normalize),
    city: normalize(userData.city)
  };

  const noFilters = isEmptyUser(user);

  console.log("USER NORMALIZED:", user);
  console.log("NO FILTERS MODE:", noFilters);

  const [professions, institutions] = await Promise.all([
    Profession.find(),
    Institution.find()
  ]);

  console.log("DB LOAD:", {
    professions: professions.length,
    institutions: institutions.length
  });

  // ===============================
  // 6. PROFESSIONS ENGINE
  // ===============================
  const professionResults = professions.map((p: any) => {
    const subjects = (p.subjects || []).map(normalize);
    const interests = (p.interests || []).map(normalize);

    const score =
      scoreMatch(user.subjects, subjects) * 0.5 +
      scoreMatch(user.interests, interests) * 0.5;

    return {
      ...p.toObject(),
      score
    };
  });

  // ===============================
  // 7. INSTITUTIONS ENGINE
  // ===============================
  const institutionResults = institutions.map((inst: any) => {
    const city = normalize(inst.city);
    const subjects = (inst.subjects || []).map(normalize);
    const interests = (inst.interests || []).map(normalize);

    // ===============================
    // 🚨 NO FILTER MODE → ВСЕ ВУЗЫ
    // ===============================
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
  // 8. SORTING LAYER (ЕДИНЫЙ)
  // ===============================
  const sortByScore = (a: any, b: any) => b.score - a.score;

  const result = {
    professions: professionResults.sort(sortByScore).slice(0, 10),
    institutions: institutionResults.sort(sortByScore).slice(0, 20)
  };

  console.log("ENGINE RESULT:", {
    professions: result.professions.length,
    institutions: result.institutions.length
  });

  return result;
}