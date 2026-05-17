"use client";

import Link from "next/link";
import { GraduationCap, ChevronDown} from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [openCities, setOpenCities] = useState(false);

const cities = [
  {
    name: "Минск",
    slug: "minsk"
  },
  {
    name: "Брест",
    slug: "brest"
  },
  {
    name: "Витебск",
    slug: "vitebsk"
  },
  {
    name: "Гомель",
    slug: "gomel"
  },
  {
    name: "Гродно",
    slug: "grodno"
  },
  {
    name: "Могилев",
    slug: "mogilev"
  }
];
  return (
    <header className="w-full bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-blue-500 flex items-center justify-center text-white shadow-lg">
            <GraduationCap size={24} />
          </div>

          <div>
            <div className="font-bold text-lg leading-none">
              EduGuide
            </div>

            <div className="text-xs text-gray-500">
              AI Профориентация
            </div>
          </div>
        </Link>

        {/* MENU */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">



  {/* ALL UNIVERSITIES */}
  <div className="relative">

    <button
      onClick={() => setOpenCities(!openCities)}
      className="flex items-center gap-1 hover:text-blue-500 transition"
    >
      Города

      <ChevronDown
        size={16}
        className={`transition ${openCities ? "rotate-180" : ""}`}
      />
    </button>

    {openCities && (
      <div className="absolute top-10 left-0 w-56 bg-white border border-gray-100 shadow-2xl rounded-2xl p-3 z-50">

        <div className="flex flex-col">

          {cities.map((city) => (
  <Link
    key={city.slug}
    href={`/universities/${city.slug}`}
    className="px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-500 transition"
  >
    {city.name}
  </Link>
))}

        </div>
      </div>
    )}
  </div>

  <Link
    href="/universities"
    className="hover:text-blue-500 transition"
  >
    Университеты
  </Link>

  <Link
    href="/onboarding"
    className="hover:text-blue-500 transition"
  >
    Тест
  </Link>

  <Link
    href="/admin"
    className="hover:text-blue-500 transition"
  >
    Админка
  </Link>
</nav>
      </div>
    </header>
  );
}