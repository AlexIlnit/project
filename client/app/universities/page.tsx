"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface Institution {
  _id: string;
  name: string;
  city: string;
  address?: string;
  website?: string;
  contacts?: string;
  image?: string;
  faculty?: string[];
  specialties?: string[];
  qualification?: string[];
  subjects?: string[];
  interests?: string[];
}

export default function UniversitiesPage() {
  const [universities, setUniversities] = useState<Institution[]>([]);
  const [loading, setLoading] = useState(true);
  const [cityFilter, setCityFilter] = useState("all");

  useEffect(() => {
    loadUniversities();
  }, []);

  const loadUniversities = async () => {
    try {
      const res = await fetch("http://localhost:3001/institutions");
      const data = await res.json();
      setUniversities(data);
    } catch (err) {
      console.error("LOAD ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  const toString = (arr?: string[]) =>
    Array.isArray(arr) ? arr.join(", ") : "—";

  // уникальные города
  const cities = Array.from(
    new Set(universities.map(u => u.city).filter(Boolean))
  );

  // фильтр
  const filteredUniversities =
    cityFilter === "all"
      ? universities
      : universities.filter(u => u.city === cityFilter);

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-black">
        <Header />

      {/* ================= HEADER + FILTER ================= */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-10">

        <div>
          <h1 className="text-4xl font-black mb-2">
            🎓 Университеты
          </h1>
          <p className="text-gray-600 text-lg">
            Все университеты из базы данных
          </p>
        </div>

        {/* FILTER */}
        <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-2xl shadow border">

          <span className="text-sm text-gray-500">
            🏙 Город:
          </span>

          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="outline-none text-sm font-medium bg-transparent"
          >
            <option value="all">Все города</option>
            {cities.map(city => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>

        </div>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="text-center text-gray-500 text-lg mt-20">
          Загрузка университетов...
        </div>
      )}

      {/* EMPTY */}
      {!loading && filteredUniversities.length === 0 && (
        <div className="text-center text-gray-500 text-lg mt-20">
          Университеты не найдены
        </div>
      )}

      {/* LIST */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 xl:grid-cols-3 gap-6">

        {filteredUniversities.map((uni) => (
          <div
            key={uni._id}
            className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition border border-gray-100"
          >

            {/* IMAGE */}
            {uni.image ? (
              <img
                src={uni.image}
                alt={uni.name}
                className="w-full h-52 object-cover"
              />
            ) : (
              <div className="w-full h-52 bg-gray-200 flex items-center justify-center text-5xl">
                🎓
              </div>
            )}

            {/* CONTENT */}
            <div className="p-6">

              <div className="flex justify-between items-start mb-3">
                <h2 className="text-2xl font-bold">
                  {uni.name}
                </h2>

                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                  {uni.city}
                </span>
              </div>

              <div className="text-sm text-gray-600 mb-2">
                📍 {uni.address || "Адрес не указан"}
              </div>

              {uni.website && (
                <a
                  href={uni.website}
                  target="_blank"
                  className="text-blue-500 text-sm hover:underline block mb-2"
                >
                  🌐 {uni.website}
                </a>
              )}

              {uni.contacts && (
                <div className="text-sm text-gray-600 mb-4">
                  📞 {uni.contacts}
                </div>
              )}

              <div className="mb-2">
                <div className="font-semibold text-sm">🏛 Факультеты</div>
                <div className="text-sm text-gray-600">
                  {toString(uni.faculty)}
                </div>
              </div>

              <div className="mb-2">
                <div className="font-semibold text-sm">🎓 Специальности</div>
                <div className="text-sm text-gray-600">
                  {toString(uni.specialties)}
                </div>
              </div>

              <div className="mb-2">
                <div className="font-semibold text-sm">📚 Предметы</div>
                <div className="text-sm text-gray-600">
                  {toString(uni.subjects)}
                </div>
              </div>

              <div>
                <div className="font-semibold text-sm">🔥 Интересы</div>

                <div className="flex flex-wrap gap-2 mt-2">
                  {uni.interests?.length ? (
                    uni.interests.map((i, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 px-3 py-1 rounded-full text-xs"
                      >
                        {i}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-gray-500">
                      Нет данных
                    </span>
                  )}
                </div>

              </div>

            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}