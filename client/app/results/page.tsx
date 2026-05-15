"use client";

import { useEffect, useState } from "react";
import { useStore } from "@/store/useStore";

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
    <div className="p-6 bg-[#f5f7fb] min-h-screen text-black">

      {/* ================= ПРОФЕССИИ ================= */}
      {/* <h1 className="text-2xl font-bold mb-4">
        🎯 Профессии
      </h1>

      {professions.length > 0 ? (
        professions.map((p: any) => (
          <div
            key={p._id}
            className="p-4 mb-3 bg-white rounded-xl shadow"
          >
            <div className="font-semibold">{p.name}</div>
            <div className="text-sm text-gray-500">
              Score: {p.score}
            </div>
          </div>
        ))
      ) : (
        <div>Профессии не найдены</div>
      )} */}

      {/* ================= ВУЗЫ ================= */}
      <h1 className="text-2xl font-bold mt-6 mb-4">
        🏫 Учебные заведения
      </h1>

      {institutions.length > 0 ? (
institutions.map((i: any) => (
  <div
    key={i._id}
    className="p-5 mb-4 bg-white rounded-2xl shadow hover:shadow-lg transition flex gap-4"
  >
    {/* LEFT CONTENT */}
    <div className="flex-1">

      <div className="text-lg font-semibold mb-1">
        🏫 {i.name}
      </div>

      <div className="text-sm text-gray-500 mb-2">
        🏙 {i.city}
      </div>

      {/* CONTACTS */}
      <div className="text-sm space-y-1 mb-3">

        {i.address && (
          <div className="flex items-center gap-2">
            📍 <span>{i.address}</span>
          </div>
        )}

        {i.website && (
          <div className="flex items-center gap-2">
            🌐
            <a
              href={i.website.startsWith("http") ? i.website : `https://${i.website}`}
              target="_blank"
              className="text-blue-500 underline"
            >
              {i.website}
            </a>
          </div>
        )}

        {i.contacts && (
          <div className="flex items-center gap-2">
            📞 <span>{i.contacts}</span>
          </div>
        )}

      </div>

      {/* SUBJECTS */}
      {i.subjects && (
        <div className="text-sm mb-2">
          📚{" "}
          {Array.isArray(i.subjects)
            ? i.subjects.join(", ")
            : i.subjects}
        </div>
      )}

      <div className="text-xs text-gray-400">
        Score: {i.score}
      </div>
    </div>

    {/* RIGHT IMAGE */}
    <div className="w-[120px] h-[100px] rounded-xl overflow-hidden bg-gray-200 flex-shrink-0">
      {i.image ? (
        <img
          src={i.image}
          alt={i.name}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
          Нет фото
        </div>
      )}
    </div>

  </div>
))
      ) : (
        <div>Вузы не найдены</div>
      )}

    </div>
  );
}