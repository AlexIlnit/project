"use client";

import { useRouter } from "next/navigation";
import {
  MapPin,
  ChevronRight
} from "lucide-react";

export default function Cities() {
  const router = useRouter();

  const cities = [
    {
      name: "Минск",
      slug: "minsk",
      emoji: "🏙️"
    },
    {
      name: "Брест",
      slug: "brest",
      emoji: "🏛️"
    },
    {
      name: "Витебск",
      slug: "vitebsk",
      emoji: "🎨"
    },
    {
      name: "Гомель",
      slug: "gomel",
      emoji: "🌿"
    },
    {
      name: "Гродно",
      slug: "grodno",
      emoji: "🏰"
    },
    {
      name: "Могилев",
      slug: "mogilev",
      emoji: "📚"
    }
  ];

  return (
    <section className="py-24 px-6 bg-white">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-14">

          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-5">
            <MapPin size={16} />
            Университеты Беларуси
          </div>

          <h2 className="text-5xl font-black mb-4">
            Выберите
            <span className="text-blue-500">
              {" "}город
            </span>
          </h2>

          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Посмотрите все университеты по городам и найдите
            лучший вариант для поступления.
          </p>
        </div>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {cities.map((city) => (
            <button
              key={city.slug}
              onClick={() =>
                router.push(`/universities/${city.slug}`)
              }
              className="group bg-[#f5f7fb] hover:bg-blue-500 rounded-[32px] p-8 text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border border-gray-100"
            >
              <div className="flex items-center justify-between mb-8">

                <div className="w-16 h-16 rounded-3xl bg-white group-hover:bg-blue-400 transition flex items-center justify-center text-3xl shadow-md">
                  {city.emoji}
                </div>

                <ChevronRight className="text-gray-400 group-hover:text-white transition" />
              </div>

              <h3 className="text-3xl font-black mb-2 group-hover:text-white transition">
                {city.name}
              </h3>

              <p className="text-gray-500 group-hover:text-blue-100 transition">
                Смотреть университеты города
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}