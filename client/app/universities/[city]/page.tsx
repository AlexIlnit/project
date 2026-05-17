"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function CityUniversitiesPage() {
  const params = useParams();

  const city = String(params.city);

  const [universities, setUniversities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // slug -> normal city
  const cityMap: any = {
    minsk: "Минск",
    brest: "Брест",
    vitebsk: "Витебск",
    gomel: "Гомель",
    grodno: "Гродно",
    mogilev: "Могилев"
  };

  const cityName = cityMap[city];

  useEffect(() => {
    fetchUniversities();
  }, [city]);

  const fetchUniversities = async () => {
    try {
      const res = await fetch(
        `http://localhost:3001/institutions`
      );

      const data = await res.json();

      const filtered = data.filter(
        (u: any) =>
          u.city?.toLowerCase() ===
          cityName?.toLowerCase()
      );

      setUniversities(filtered);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-black">

      <Header />

      <main className="max-w-7xl mx-auto px-6 py-12">

        {/* HERO */}
        <div className="mb-12">

          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-5">
            🏙 Университеты города
          </div>

          <h1 className="text-5xl font-black mb-4">
            {cityName}
          </h1>

          <p className="text-gray-500 text-lg">
            Найдено университетов: {universities.length}
          </p>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="text-xl">
            Загрузка...
          </div>
        )}

        {/* EMPTY */}
        {!loading && universities.length === 0 && (
          <div className="bg-white rounded-3xl p-10 shadow-lg text-center">
            <div className="text-6xl mb-4">
              🏫
            </div>

            <div className="text-2xl font-bold mb-2">
              Университеты не найдены
            </div>

            <div className="text-gray-500">
              В базе пока нет данных для этого города
            </div>
          </div>
        )}

        {/* LIST */}
        <div className="space-y-8">

          {universities.map((i) => (

            <div
              key={i._id}
              className="bg-white rounded-[32px] shadow-xl border border-gray-100 p-8"
            >

              {/* TITLE */}
              <div className="mb-8">

                <h2 className="text-4xl font-black mb-3">
                  🏫 {i.name}
                </h2>
              </div>

              {/* MAIN CONTENT */}
              <div className="flex flex-col lg:flex-row justify-between gap-10 items-start mb-10">

                {/* LEFT */}
                <div className="flex-1 space-y-4">

                  <div className="bg-gray-50 rounded-2xl p-4">
                    <div className="font-semibold mb-1">
                      🏙 Город
                    </div>

                    <div className="text-gray-600 text-sm">
                      {i.city}
                    </div>
                  </div>

                  {i.website && (
                    <div className="bg-gray-50 rounded-2xl p-4">

                      <div className="font-semibold mb-1">
                        🌐 Сайт
                      </div>

                      <a
                        href={i.website}
                        target="_blank"
                        className="text-blue-500 underline break-all text-sm"
                      >
                        {i.website}
                      </a>
                    </div>
                  )}

                  {i.address && (
                    <div className="bg-gray-50 rounded-2xl p-4">

                      <div className="font-semibold mb-1">
                        📍 Адрес
                      </div>

                      <div className="text-gray-600 text-sm">
                        {i.address}
                      </div>
                    </div>
                  )}

                  {i.contacts && (
                    <div className="bg-gray-50 rounded-2xl p-4">

                      <div className="font-semibold mb-1">
                        📞 Контакты
                      </div>

                      <div className="text-gray-600 text-sm">
                        {i.contacts}
                      </div>
                    </div>
                  )}
                </div>

                {/* RIGHT IMAGE */}
                <div className="flex-shrink-0">

                  {i.image ? (
                    <img
                      src={i.image}
                      alt={i.name}
                      className="w-72 h-52 object-cover rounded-3xl shadow-xl border border-gray-200"
                    />
                  ) : (
                    <div className="w-72 h-52 rounded-3xl bg-gray-100 flex items-center justify-center text-6xl">
                      🏫
                    </div>
                  )}
                </div>
              </div>

              {/* TAGS */}
              <div className="space-y-5">

                {[
                  ["🏛 Факультеты", i.faculty],
                  ["🎓 Специальности", i.specialties],
                  ["📜 Квалификация", i.qualification],
                  ["📚 Предметы", i.subjects],
                  ["🔥 Интересы", i.interests]
                ].map(([title, value]: any, idx) => (

                  <div key={idx}>

                    <div className="font-semibold mb-3 text-lg">
                      {title}
                    </div>

                    <div className="flex flex-wrap gap-2">

                      {Array.isArray(value)
                        ? value.map((item: string, index: number) => (
                            <div
                              key={index}
                              className="px-4 py-2 rounded-xl bg-blue-50 text-blue-600 text-sm font-medium"
                            >
                              {item}
                            </div>
                          ))
                        : null}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}