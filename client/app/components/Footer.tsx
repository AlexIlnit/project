"use client";

import { div } from "framer-motion/client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-10">

        {/* BRAND */}
        <div>
          <div className="flex items-center gap-3 mb-4">

            <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center text-white">
              🎓
            </div>

            <div className="font-bold text-lg">
              EduGuide
            </div>
          </div>

          <p className="text-sm text-gray-500 leading-relaxed">
            AI сервис профориентации и подбора университетов.
          </p>
        </div>

        {/* MENU */}
        <div>
          <div className="font-semibold mb-4">
            Навигация
          </div>

          <div className="space-y-2 text-sm text-gray-600">

            <Link
              href="/"
              className="block hover:text-blue-500 transition"
            >
              Главная
            </Link>

            <Link
              href="/universities"
              className="block hover:text-blue-500 transition"
            >
              Университеты
            </Link>

            <Link
              href="/onboarding"
              className="block hover:text-blue-500 transition"
            >
              Тест
            </Link>

            <Link
              href="/admin"
              className="block hover:text-blue-500 transition"
            >
              Админка
            </Link>
          </div>
        </div>

        {/* CONTACTS */}
        <div>
          <div className="font-semibold mb-4">
            Контакты
          </div>

          <div className="space-y-2 text-sm text-gray-600">
            <div>📧 support@eduguide.com</div>
            <div>📞 +375 (29) 000-00-00</div>
            <div>📍 Минск, Беларусь</div>
          </div>
        </div>
      </div>

      <div className="border-t py-4 text-center text-sm text-gray-500">
        © 2026 EduGuide. Все права защищены.
      </div>
    </footer>
  );
}