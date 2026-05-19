"use client";

import { useRouter } from "next/navigation";
import {
  GraduationCap,
  BookOpen,
  Users,
  Mail,
  Phone,
  MapPin
} from "lucide-react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Advantages from "./components/Advantages";
import Cities from "./components/Cities";
import CookieConsent from "./components/CookieConsent";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7fb] text-black">

      {/* ================= HEADER ================= */}
      <Header />

      {/* ================= HERO ================= */}
      <main className="flex-1 flex items-center justify-center px-6">

        <div className="max-w-5xl w-full grid md:grid-cols-2 gap-12 items-center mb-10">

          {/* LEFT */}
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <BookOpen size={16} />
              AI подбор университетов
            </div>

            <h1 className="text-5xl font-black leading-tight mb-6">
              🎓 Найди
              <span className="text-blue-500"> идеальный университет </span>
              для себя
            </h1>

            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Система профориентации анализирует ваши интересы,
              предметы и предпочтения, чтобы подобрать лучшие
              университеты и специальности.
            </p>

            <div className="flex gap-4 flex-wrap">
              <button
                onClick={() => router.push("/onboarding")}
                className="px-8 py-4 bg-blue-500 hover:bg-blue-600 transition text-white rounded-2xl font-semibold shadow-lg shadow-blue-200"
              >
                🚀 Начать подбор
              </button>

              <button className="px-8 py-4 bg-white border hover:bg-gray-50 transition rounded-2xl font-semibold shadow-sm">
                Подробнее
              </button>
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">
                <Users className="text-green-600" />
              </div>

              <div>
                <div className="font-bold text-lg">
                  AI Рекомендации
                </div>
                <div className="text-sm text-gray-500">
                  Персональный подбор
                </div>
              </div>
            </div>

            <div className="space-y-4">

              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100">
                <div className="font-semibold mb-1">
                  🎯 Высокий шанс поступления
                </div>
                <div className="text-sm text-gray-600">
                  Университеты сортируются по вашим интересам и предметам.
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100">
                <div className="font-semibold mb-1">
                  📚 AI анализ предметов
                </div>
                <div className="text-sm text-gray-600">
                  Система анализирует сильные стороны и предпочтения.
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-green-50 border border-green-100">
                <div className="font-semibold mb-1">
                  🏛 Подбор факультетов
                </div>
                <div className="text-sm text-gray-600">
                  Автоматические рекомендации по направлениям.
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* ================= Advantages ================= */}
      <Advantages />
      {/* ================= Cities ================= */}
      <Cities/>
      {/* ================= FOOTER ================= */}
      <Footer />
      <CookieConsent />
    </div>
  );
}
