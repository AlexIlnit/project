"use client";

import {
  Brain,
  GraduationCap,
  Sparkles,
  Target
} from "lucide-react";

export default function Advantages() {
  const items = [
    {
      icon: <Brain className="text-blue-500" size={28} />,
      title: "AI Анализ",
      text: "Система анализирует ваши интересы, навыки и любимые предметы."
    },
    {
      icon: <Target className="text-green-500" size={28} />,
      title: "Точный подбор",
      text: "Подбираем университеты и специальности под ваш профиль."
    },
    {
      icon: <GraduationCap className="text-purple-500" size={28} />,
      title: "Лучшие вузы",
      text: "Рекомендуем подходящие университеты с высоким шансом поступления."
    },
    {
      icon: <Sparkles className="text-orange-500" size={28} />,
      title: "Современный подход",
      text: "Используем AI и аналитику для персональных рекомендаций."
    }
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4">
            Почему выбирают нас
          </h2>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Платформа помогает школьникам и студентам найти
            идеальный университет и направление обучения.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          {items.map((item, index) => (
            <div
              key={index}
              className="bg-[#f7f9fc] border border-gray-100 rounded-3xl p-6 hover:shadow-xl transition"
            >
              <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-sm mb-5">
                {item.icon}
              </div>

              <h3 className="font-bold text-xl mb-3">
                {item.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}