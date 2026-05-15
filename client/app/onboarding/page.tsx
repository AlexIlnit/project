"use client";

import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";

const interests = ["техника", "медицина", "спорт", "творчество"];
const subjects = ["математика", "физика", "химия", "языки", "информатика", "литература"];
const cities = ["Минск", "Гродно", "Брест", "Гомель", "Витебск", "Могилёв"];

export default function Onboarding() {
  const router = useRouter();

  const setCity = useStore(s => s.setCity);
  const selectedCity = useStore(s => s.city); 

  const toggleInterest = useStore(s => s.toggleInterest);
  const selectedInterests = useStore(s => s.interests);

  const toggleSubject = useStore(s => s.toggleSubject);
  const selectedSubjects = useStore(s => s.subjects);

  return (

    <div className="min-h-screen bg-white overflow-y-auto">
  <div className="max-w-md mx-auto p-6 text-black">
    {/* весь контент */}
  


    

      {/* ================= ИНТЕРЕСЫ ================= */}
      <h1 className="text-2xl font-bold mb-4">
        Выбери интересы
      </h1>

      <div className="grid grid-cols-2 gap-3 w-full max-w-md">
        {interests.map(i => (
          <button
            key={i}
            onClick={() => toggleInterest(i)}
            className={`p-3 rounded-xl border ${
              selectedInterests.includes(i)
                ? "bg-blue-500 text-white"
                : "bg-gray-100"
            }`}
          >
            {i}
          </button>
        ))}
      </div>

      {/* ================= ПРЕДМЕТЫ ================= */}
      <h2 className="text-xl font-bold mt-8 mb-4">
        Выбери предметы
      </h2>

      <div className="grid grid-cols-2 gap-3 w-full max-w-md">
        {subjects.map(s => (
          <button
            key={s}
            onClick={() => toggleSubject(s)}
            className={`p-3 rounded-xl border ${
              selectedSubjects.includes(s)
                ? "bg-green-500 text-white"
                : "bg-gray-100"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
<h2 className="text-xl font-bold mt-8 mb-4">
  Выбери город
</h2>

<div className="grid grid-cols-2 gap-3 w-full max-w-md">
  {cities.map(c => (
    <button
      key={c}
      onClick={() => setCity(c)}
      className={`p-3 rounded-xl border ${
        selectedCity === c
          ? "bg-purple-500 text-white"
          : "bg-gray-100"
      }`}
    >
      {c}
    </button>
  ))}
</div>
      {/* ================= КНОПКА ================= */}
      <button
        onClick={() => router.push("/")}
        className="mt-6 px-6 py-3 bg-black text-white rounded-xl ml-10"
      >
        Назад
      </button>
      <button
        onClick={() => router.push("/results")}
        className="mt-6 px-6 py-3 bg-black text-white rounded-xl ml-30"
      >
        Далее
      </button>
      

    </div>
    </div>
  );
}