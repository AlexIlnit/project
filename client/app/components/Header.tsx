"use client";

import Link from "next/link";
import { GraduationCap } from "lucide-react";

export default function Header() {
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

          <Link
            href="/"
            className="hover:text-blue-500 transition"
          >
            Главная
          </Link>

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