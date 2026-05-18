"use client";

import { useEffect, useState } from "react";
import { useStore } from "@/store/useStore";
import Header from "../components/Header";
import Footer from "../components/Footer";

const normalize = (v: string) =>
  v.toLowerCase().trim();

const toArray = (value: any) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return String(value).split(",").map((s) => s.trim());
};

const calcMatchScore = (uni: any, interests: string[], subjects: string[], city: string) => {
  let score = 0;
  let max = 0;

  // CITY
  max += 30;
  if (city && uni.city?.toLowerCase() === city.toLowerCase()) {
    score += 30;
  }

  // INTERESTS
  const uniInterests = toArray(uni.interests).map(normalize);
  const userInterests = interests.map(normalize);

  max += 35;
  const interestMatches = uniInterests.filter((i) =>
    userInterests.includes(i)
  ).length;

  score += Math.min(35, interestMatches * 10);

  // SUBJECTS
  const uniSubjects = toArray(uni.subjects).map(normalize);
  const userSubjects = subjects.map(normalize);

  max += 35;
  const subjectMatches = uniSubjects.filter((s) =>
    userSubjects.includes(s)
  ).length;

  score += Math.min(35, subjectMatches * 10);

  return Math.round((score / max) * 100);
};

export default function Results() {
  const interests = useStore(s => s.interests);
  const subjects = useStore(s => s.subjects);
  const city = useStore(s => s.city);

  const [data, setData] = useState<any>(null);
  

  useEffect(() => {
    // 🔥 не отправляем пустой запрос
    if (!interests.length && !subjects.length && !city) return;

    fetch(`${process.env.NEXT_PUBLIC_API}/recommend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        interests,
        subjects,
        city
      })
    })
      .then(res => res.json())
      .then(res => {
        console.log("SERVER RESPONSE:", res);
        setData(res);
      });
  }, [interests, subjects, city]);

  if (!data) {
    return (
      <div className="h-screen flex items-center justify-center">
        Загрузка...
      </div>
    );
  }

  // ✅ теперь после загрузки
  const professions = (data.professions || []).filter((p: any) => p.score > 0);
  const institutions = (data.institutions || []).filter((i: any) => i.score > 0);
  

  return (
<div className="min-h-screen bg-[#f5f7fb] text-black">

  <Header />

  <main className="px-6 py-12">

    <div className="max-w-6xl mx-auto">

      {/* ================= HERO ================= */}
      <div className="text-center mb-14">

        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-5">
          🏫 AI Рекомендации
        </div>

        <h1 className="text-5xl font-black mb-5 leading-tight">
          Подходящие
          <span className="text-blue-500"> университеты </span>
          для тебя
        </h1>

        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Мы подобрали лучшие учебные заведения на основе
          твоих интересов, предметов и выбранного города.
        </p>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">

        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
          <div className="text-4xl mb-3">🎯</div>

          <div className="text-3xl font-black mb-1">
            {institutions.length}
          </div>

          <div className="text-gray-500">
            Найдено университетов
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
          <div className="text-4xl mb-3">📚</div>

          <div className="text-3xl font-black mb-1">
            AI
          </div>

          <div className="text-gray-500">
            Персональный подбор
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
          <div className="text-4xl mb-3">🏛</div>

          <div className="text-3xl font-black mb-1">
            TOP
          </div>

          <div className="text-gray-500">
            Лучшие учреждения
          </div>
        </div>
      </div>

      {/* ================= ВУЗЫ ================= */}
      <div className="space-y-6">

        {institutions.length > 0 ? (
          institutions.map((i: any) => (
            <div
              key={i._id}
              className="group bg-white rounded-[32px] shadow-lg hover:shadow-2xl transition-all border border-gray-100 overflow-hidden"
            >

              <div className="grid md:grid-cols-[1fr_280px]">

                {/* LEFT CONTENT */}
                <div className="p-8">

                  {/* TOP */}
                  <div className="flex items-start justify-between gap-4 mb-5">

                    <div>
                      <h2 className="text-2xl font-black mb-2 group-hover:text-blue-500 transition">
                        🏫 {i.name}
                      </h2>

                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-sm">
                        📍 {i.city}
                      </div>
                    </div>

                    <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-2xl font-bold">
                      {i.score}
                    </div>
                  </div>

                  {/* SUBJECTS */}
                  {i.subjects && (
                    <div className="mb-6">

                      <div className="text-sm font-semibold text-gray-500 mb-3">
                        ПРЕДМЕТЫ
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {(Array.isArray(i.subjects)
                          ? i.subjects
                          : [i.subjects]
                        ).map((subject: string, index: number) => (
                          <div
                            key={index}
                            className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-sm font-medium"
                          >
                            {subject}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

{/* ================= AI RECOMMENDATION ENGINE ================= */}
<div className="mb-8">

  <div className="flex items-center justify-between mb-4">

    <div>
      <div className="text-sm font-semibold text-gray-500">
        🤖 AI РЕКОМЕНДАЦИЯ
      </div>

      <div className="text-lg font-bold">
        Почему этот вуз тебе подходит
      </div>
    </div>

    {/* MATCH SCORE BADGE */}
    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-2xl font-bold shadow-lg">
      {i.score ? `${Math.min(100, Math.round(i.score))}% match` : "AI match"}
    </div>
  </div>

  {/* MAIN CARD */}
  <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 border border-blue-100 rounded-[28px] p-6 shadow-lg">

    {/* MATCH LEVEL */}
    <div className="flex items-center gap-3 mb-5">

      <div className="w-12 h-12 rounded-2xl bg-blue-500 flex items-center justify-center text-white text-xl">
        🧠
      </div>

      <div>
        <div className="font-bold text-lg">
          AI анализ профиля
        </div>

        <div className="text-sm text-gray-500">
          Система сравнила твои интересы, предметы и город
        </div>
      </div>
    </div>

    {/* BREAKDOWN GRID */}
    <div className="grid md:grid-cols-2 gap-4">

      {/* CITY MATCH */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">

        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">📍</span>
          <div className="font-semibold">Локация</div>
        </div>

        <div className="text-sm text-gray-600">
          {city === i.city ? (
            <span className="text-green-600 font-medium">
              ✔ Идеально — ты выбрал этот город
            </span>
          ) : (
            <span>
              Вуз в городе <b>{i.city}</b>
            </span>
          )}
        </div>
      </div>

      {/* INTEREST MATCH */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">

        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">💡</span>
          <div className="font-semibold">Интересы</div>
        </div>

        <div className="text-sm text-gray-600">
          {Array.isArray(i.interests) ? (
            i.interests.some((x: string) =>
              interests.includes(x)
            ) ? (
              <span className="text-green-600 font-medium">
                ✔ Высокое совпадение интересов
              </span>
            ) : (
              "Частичное совпадение направлений"
            )
          ) : (
            "Анализ интересов выполнен"
          )}
        </div>
      </div>

      {/* SUBJECT MATCH */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">

        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">📚</span>
          <div className="font-semibold">Предметы</div>
        </div>

        <div className="text-sm text-gray-600">
          {(Array.isArray(i.subjects) ? i.subjects : [i.subjects])
            .some((s: string) =>
              subjects.includes(s)
            ) ? (
            <span className="text-green-600 font-medium">
              ✔ Подходит по школьным предметам
            </span>
          ) : (
            "Базовая совместимость"
          )}
        </div>
      </div>

      {/* CAREER FIT */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">

        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">🎯</span>
          <div className="font-semibold">Карьерный путь</div>
        </div>

        <div className="text-sm text-gray-600">
          Этот вуз формирует востребованные профессии
          на рынке труда Беларуси и СНГ
        </div>
      </div>
    </div>

    {/* AI INSIGHT FOOTER */}
    <div className="mt-5 p-4 bg-indigo-50 border border-indigo-100 rounded-2xl">

      <div className="font-semibold text-indigo-700 mb-1">
        🧠 AI Insight
      </div>

      <div className="text-sm text-gray-600">
        На основе твоего профиля этот университет входит в
        <b> топ-категорию рекомендаций</b>.
        Подходит по комбинации: интересы + предметы + город + направления обучения.
      </div>
    </div>

  </div>
</div>





                  {/* CONTACTS */}
                  <div className="grid md:grid-cols-2 gap-4 text-sm">

                    {i.address && (
                      <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-2xl">
                        <div className="text-xl">📍</div>

                        <div>
                          <div className="font-semibold mb-1">
                            Адрес
                          </div>

                          <div className="text-gray-600">
                            {i.address}
                          </div>
                        </div>
                      </div>
                    )}

                    {i.contacts && (
                      <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-2xl">
                        <div className="text-xl">📞</div>

                        <div>
                          <div className="font-semibold mb-1">
                            Контакты
                          </div>

                          <div className="text-gray-600">
                            {i.contacts}
                          </div>
                        </div>
                      </div>
                    )}

                    {i.website && (
                      <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-2xl md:col-span-2">
                        <div className="text-xl">🌐</div>

                        <div>
                          <div className="font-semibold mb-1">
                            Официальный сайт
                          </div>

                          <a
                            href={
                              i.website.startsWith("http")
                                ? i.website
                                : `https://${i.website}`
                            }
                            target="_blank"
                            className="text-blue-500 hover:text-blue-600 underline break-all"
                          >
                            {i.website}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>

                </div>

                {/* RIGHT IMAGE */}
                <div className="relative min-h-[260px] bg-gray-100">

                  {i.image ? (
                    <>
                      <img
                        src={i.image}
                        alt={i.name}
                        className="w-full h-full object-cover"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                      <div className="absolute bottom-5 left-5 text-white">
                        <div className="font-bold text-lg">
                          {i.city}
                        </div>

                        <div className="text-sm opacity-90">
                          Учебное заведение
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                      <div className="text-6xl mb-3">
                        🏫
                      </div>

                      <div>
                        Нет изображения
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-3xl shadow-lg p-16 text-center">

            <div className="text-7xl mb-6">
              😔
            </div>

            <h2 className="text-3xl font-black mb-4">
              Вузы не найдены
            </h2>

            <p className="text-gray-500 text-lg">
              Попробуйте изменить параметры поиска
            </p>
          </div>
        )}

      </div>
    </div>
  </main>

  <Footer />
</div>
  );
}